import { NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest) {
  try {
    const { aiAssistInput } = await request.json()

    if (!aiAssistInput || typeof aiAssistInput !== 'string') {
      return NextResponse.json(
        { success: false, fields: {}, errors: ['Invalid input provided'] },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured')
      return NextResponse.json(
        { success: false, fields: {}, errors: ['AI parsing service not configured'] },
        { status: 500 }
      )
    }

    const prompt = `Extract appointment scheduling fields from this text. Return JSON with these keys:
- orgName (string): organization/company name
- serviceType (string): "otp" for phone, "vri" for video, "onsite" for on-site (REQUIRED)
- languages (string): comma-separated language list
- timezone (string): timezone identifier like "America/New_York"
- date (string): date in YYYY-MM-DD format
- time (string): time in HH:MM format (24-hour)
- duration (string): duration like "1" or "2.5"
- address (string): physical address
- locationDetails (string): building/room/floor details
- pointOfContact (string): contact person name
- providerName (string): doctor/provider name
- comments (string): additional notes
- vriLink (string): video meeting link if mentioned

Set null for any field not found. Do not extract PHI like patient names, DOBs, or MRNs.

Text to parse:
${aiAssistInput}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that extracts structured appointment data from unstructured text. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        {
          success: false,
          fields: {},
          errors: ['AI parsing service unavailable. Please try again.']
        },
        { status: 500 }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          fields: {},
          errors: ['No response from AI parsing service']
        },
        { status: 500 }
      )
    }

    const parsedFields = JSON.parse(content)

    // Filter out null values
    const cleanedFields: Record<string, string> = {}
    Object.entries(parsedFields).forEach(([key, value]) => {
      if (value !== null && value !== '' && typeof value === 'string') {
        cleanedFields[key] = value
      }
    })

    return NextResponse.json({
      success: true,
      fields: cleanedFields,
      errors: []
    })
  } catch (error) {
    console.error('Parse quote error:', error)
    return NextResponse.json(
      {
        success: false,
        fields: {},
        errors: ['Failed to parse input. Please try again or fill the form manually.']
      },
      { status: 500 }
    )
  }
}
