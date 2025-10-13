'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { quoteFormSchema, defaultFormValues, QuoteFormSchema } from '@/lib/schemas/quote-form-schema'
import { saveDraft, loadDraft, clearDraft, hasDraft } from '@/lib/utils/draft-storage'
import { StepIndicator } from '@/components/quote-form/StepIndicator'
import { Page1IntroBasics } from '@/components/quote-form/Page1IntroBasics'
import { Page2ServiceAppointment } from '@/components/quote-form/Page2ServiceAppointment'
import { Page3Contacts } from '@/components/quote-form/Page3Contacts'
import { Page4Billing } from '@/components/quote-form/Page4Billing'
import { Page5Review } from '@/components/quote-form/Page5Review'
import { AIAssistPanel } from '@/components/quote-form/AIAssistPanel'
import { RightSidebar } from '@/components/quote-form/RightSidebar'

const STEPS = [
  { number: 1, title: 'Organization' },
  { number: 2, title: 'Service' },
  { number: 3, title: 'Location' },
  { number: 4, title: 'Billing' },
  { number: 5, title: 'Review' }
]

export default function WebformPage () {
  const [currentPage, setCurrentPage] = useState(1)
  const [aiAssistMode, setAiAssistMode] = useState(false)
  const [showDraftPrompt, setShowDraftPrompt] = useState(false)

  const form = useForm<QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: defaultFormValues,
    mode: 'onSubmit'
  })

  // Check for existing draft on mount
  useEffect(() => {
    if (hasDraft()) {
      setShowDraftPrompt(true)
    }
  }, [])

  // Auto-save draft (debounced)
  useEffect(() => {
    const subscription = form.watch((value) => {
      const timer = setTimeout(() => {
        saveDraft(value as QuoteFormSchema, currentPage)
      }, 2000)

      return () => clearTimeout(timer)
    })

    return () => subscription.unsubscribe()
  }, [form, currentPage])

  const handleRestoreDraft = () => {
    const { data, page } = loadDraft()
    if (data) {
      Object.keys(data).forEach((key) => {
        form.setValue(key as keyof QuoteFormSchema, data[key as keyof QuoteFormSchema])
      })
      setCurrentPage(page)
      toast.success('Draft restored successfully')
    }
    setShowDraftPrompt(false)
  }

  const handleDiscardDraft = () => {
    clearDraft()
    setShowDraftPrompt(false)
  }

  const handleNext = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleAIParse = async (input: string) => {
    try {
      const response = await fetch('/api/parse-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiAssistInput: input })
      })

      const result = await response.json()

      if (result.success && result.fields) {
        let fieldCount = 0

        Object.keys(result.fields).forEach((key) => {
          if (result.fields[key] !== undefined && result.fields[key] !== null) {
            form.setValue(key as keyof QuoteFormSchema, result.fields[key])
            fieldCount++
          }
        })

        setAiAssistMode(false)
        setCurrentPage(1)

        toast.success(`Successfully extracted ${fieldCount} fields! Please review and complete any missing information.`)
      } else {
        toast.error(result.errors?.[0] || 'Failed to parse input. Please try again or fill the form manually.')
      }
    } catch (error) {
      console.error('AI parse error:', error)
      toast.error('Failed to parse input. Please try again or fill the form manually.')
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Form submitted:', data)
    clearDraft()
    toast.success('Quote request submitted successfully! 🎉', {
      description: 'We\'ll get back to you shortly with availability.'
    })

    // Reset form after brief delay
    setTimeout(() => {
      form.reset()
      setCurrentPage(1)
    }, 2000)
  })

  const serviceType = form.watch('serviceType')
  const clientId = form.watch('clientId')
  const hasClientId = Boolean(clientId && clientId.trim() !== '')

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-10">
      <Toaster position="top-center" richColors />

      {/* Draft Restore Prompt */}
      {showDraftPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#002060]">Draft Found</h3>
            <p className="mt-2 text-sm text-slate-600">
              We found a saved draft. Would you like to restore it?
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleDiscardDraft}
                variant="outline"
                className="flex-1"
              >
                Start Fresh
              </Button>
              <Button
                onClick={handleRestoreDraft}
                className="flex-1 bg-[#E67800] hover:bg-[#CC6900]"
              >
                Restore Draft
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Single Card with Two-Column Layout */}
      <div className="grid w-full max-w-[1400px] min-h-[650px] grid-cols-1 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_40px_rgba(0,32,96,0.1)] md:grid-cols-[65%_35%]">
        {/* Left Panel - Form */}
        <div className="relative bg-white p-[50px] md:min-h-[650px]">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[200px] w-[250px] bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(230,120,0,0.12)_8px,rgba(230,120,0,0.12)_10px)]"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
          />

          <div className="relative z-10">
            <h2 className="text-[28px] font-bold text-[#002060]">Request a Quote</h2>
            <div className="mt-[15px] h-1 w-[60px] rounded bg-[#E67800]" />

            {!aiAssistMode && (
              <div className="mt-8 mb-8">
                <StepIndicator
                  currentStep={currentPage}
                  steps={STEPS}
                />
              </div>
            )}

            <Form {...form}>
              <form onSubmit={handleSubmit} noValidate className="mt-[35px] space-y-10">
                <AnimatePresence mode="wait">
                  {aiAssistMode ? (
                    <AIAssistPanel
                      key="ai-panel"
                      onParse={handleAIParse}
                      onCancel={() => setAiAssistMode(false)}
                    />
                  ) : currentPage === 1 ? (
                    <Page1IntroBasics key="page-1" form={form} />
                  ) : currentPage === 2 ? (
                    <Page2ServiceAppointment key="page-2" form={form} />
                  ) : currentPage === 3 ? (
                    <Page3Contacts key="page-3" form={form} />
                  ) : currentPage === 4 ? (
                    <Page4Billing key="page-4" form={form} />
                  ) : (
                    <Page5Review key="page-5" form={form} />
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {!aiAssistMode && (
                  <div className="flex justify-between pt-6 border-t border-slate-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentPage === 1}
                      className={`rounded-lg px-6 py-2 font-semibold transition-all ${
                        currentPage === 1
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      Back
                    </Button>
                    <div className="text-sm text-slate-500">
                      Step {currentPage} of {STEPS.length}
                    </div>
                    {currentPage < 5 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="rounded-lg bg-[#E67800] px-6 py-2 font-semibold text-white hover:bg-[#CC6900]"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="rounded-lg bg-[#E67800] px-6 py-2 font-semibold text-white hover:bg-[#CC6900]"
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>

        {/* Right Panel - Sidebar */}
        <div className="relative overflow-hidden bg-[#002060] p-[50px] text-white md:min-h-[650px]">
          <div className="pointer-events-none absolute -left-16 -top-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.3)_0%,rgba(74,144,226,0.15)_35%,rgba(74,144,226,0.06)_55%,transparent_75%)]" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.3)_0%,rgba(74,144,226,0.15)_35%,rgba(74,144,226,0.06)_55%,transparent_75%)]" />

          <RightSidebar
            currentPage={currentPage}
            serviceType={serviceType}
            hasClientId={hasClientId}
            aiAssistMode={aiAssistMode}
            onAIAssist={() => setAiAssistMode(true)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
