import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

const DRAFT_KEY = 'quote-form-draft'
const DRAFT_PAGE_KEY = 'quote-form-draft-page'

export function saveDraft (formData: QuoteFormSchema, currentPage: number): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      data: formData,
      timestamp: Date.now()
    }))
    localStorage.setItem(DRAFT_PAGE_KEY, currentPage.toString())
  } catch (error) {
    console.error('Failed to save draft:', error)
  }
}

export function loadDraft (): { data: QuoteFormSchema | null; page: number } {
  if (typeof window === 'undefined') return { data: null, page: 1 }

  try {
    const draftString = localStorage.getItem(DRAFT_KEY)
    const pageString = localStorage.getItem(DRAFT_PAGE_KEY)

    if (!draftString) return { data: null, page: 1 }

    const draft = JSON.parse(draftString)
    const page = pageString ? parseInt(pageString, 10) : 1

    return {
      data: draft.data,
      page: isNaN(page) ? 1 : page
    }
  } catch (error) {
    console.error('Failed to load draft:', error)
    return { data: null, page: 1 }
  }
}

export function clearDraft (): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(DRAFT_KEY)
    localStorage.removeItem(DRAFT_PAGE_KEY)
  } catch (error) {
    console.error('Failed to clear draft:', error)
  }
}

export function hasDraft (): boolean {
  if (typeof window === 'undefined') return false

  try {
    return localStorage.getItem(DRAFT_KEY) !== null
  } catch (error) {
    console.error('Failed to check draft:', error)
    return false
  }
}
