import { NextResponse } from 'next/server'
import { z } from 'zod'

import type { AiParseRequestBody, AiParseResult } from '@/types/quote-form'

const requestSchema = z.object({
  aiAssistInput: z.string().min(1, 'Provide text for AI parsing')
})

const buildPrompt = (input: string) => `Extract appointment scheduling fields from this text. Return a JSON object with keys: orgName, serviceType (otp|vri|onsite), languages (array of strings), timezone, date, time, duration, address, locationDetails, pointOfContact, providerName, comments. Use null when a value is missing. Do not include protected health information such as patient names, dates of birth, or medical record numbers. Only return JSON.\n\nInput:\n"""${input}"""`

const OPENAI_URL = 'https://api.openai.com/v1/responses'
const MODEL_ID = 'gpt-4o-mini'
const REQUEST_TIMEOUT_MS = 10000

const parseAiJson = (raw: unknown): Partial<AiParseResult['fields']> => {
  if (!raw || typeof raw !== 'string') return {}
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => {
        if (Array.isArray(value)) return [key, value.map(item => String(item))]
        if (value === null) return [key, '']
        return [key, String(value ?? '')]
      })
    )
  } catch (error) {
    console.error('Unable to parse AI response JSON', error)
    return {}
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsedBody = requestSchema.safeParse(body)

  if (!parsedBody.success) {
    return NextResponse.json<AiParseResult>({
      success: false,
      fields: {},
      errors: parsedBody.error.issues.map(issue => issue.message)
    }, { status: 400 })
  }

  const { aiAssistInput } = parsedBody.data as AiParseRequestBody
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json<AiParseResult>({
      success: false,
      fields: {},
      errors: ['OpenAI API key is not configured. Add OPENAI_API_KEY to the environment.']
    }, { status: 200 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL_ID,
        input: buildPrompt(aiAssistInput),
        max_output_tokens: 800
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error', errorText)
      return NextResponse.json<AiParseResult>({
        success: false,
        fields: {},
        errors: ['Unable to parse details with AI. Please try again.']
      }, { status: 200 })
    }

    const result = await response.json() as { output?: Array<{ content?: Array<{ text?: string }> }> }
    const aiText = result.output?.[0]?.content?.[0]?.text ?? ''
    const fields = parseAiJson(aiText)

    return NextResponse.json<AiParseResult>({
      success: true,
      fields
    })
  } catch (error) {
    console.error('AI parsing failed', error)
    return NextResponse.json<AiParseResult>({
      success: false,
      fields: {},
      errors: ['AI assist timed out. Please try again or fill the form manually.']
    }, { status: 200 })
  } finally {
    clearTimeout(timeout)
  }
}
