import type { QuoteFormDraftPayload, QuoteFormValues } from '@/types/quote-form'

const DRAFT_KEY_PREFIX = 'quote-draft-'
const LATEST_POINTER_KEY = `${DRAFT_KEY_PREFIX}latest`

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const buildDraftPayload = (values: QuoteFormValues, currentPage: number, aiAssistMode: boolean): QuoteFormDraftPayload => ({
  updatedAt: Date.now(),
  values,
  currentPage,
  aiAssistMode
})

const getLatestDraftKey = (): string | null => {
  if (!isBrowser()) return null

  const pointer = window.localStorage.getItem(LATEST_POINTER_KEY)
  if (pointer) return pointer

  const potentialKeys = Object.keys(window.localStorage).filter(key => key.startsWith(DRAFT_KEY_PREFIX))
  if (!potentialKeys.length) return null

  const sorted = potentialKeys.sort((a, b) => {
    const aTime = Number.parseInt(a.replace(DRAFT_KEY_PREFIX, ''), 10)
    const bTime = Number.parseInt(b.replace(DRAFT_KEY_PREFIX, ''), 10)
    return bTime - aTime
  })

  return sorted[0]
}

export const saveDraft = (values: QuoteFormValues, currentPage: number, aiAssistMode: boolean) => {
  if (!isBrowser()) return

  const payload = buildDraftPayload(values, currentPage, aiAssistMode)
  const storageKey = `${DRAFT_KEY_PREFIX}${payload.updatedAt}`

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(payload))
    window.localStorage.setItem(LATEST_POINTER_KEY, storageKey)
  } catch (error) {
    console.error('Unable to save draft', error)
  }
}

export const loadDraft = (): QuoteFormDraftPayload | null => {
  if (!isBrowser()) return null

  const latestKey = getLatestDraftKey()
  if (!latestKey) return null

  try {
    const raw = window.localStorage.getItem(latestKey)
    if (!raw) return null
    return JSON.parse(raw) as QuoteFormDraftPayload
  } catch (error) {
    console.error('Unable to load draft', error)
    return null
  }
}

export const clearDraft = () => {
  if (!isBrowser()) return

  const latestKey = getLatestDraftKey()
  try {
    if (latestKey) {
      window.localStorage.removeItem(latestKey)
    }
    window.localStorage.removeItem(LATEST_POINTER_KEY)
  } catch (error) {
    console.error('Unable to clear draft', error)
  }
}
