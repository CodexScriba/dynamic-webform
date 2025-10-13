'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/quote-form/StepIndicator'
import { Page1IntroBasics } from '@/components/quote-form/Page1IntroBasics'
import { Page2Appointment } from '@/components/quote-form/Page2Appointment'
import { Page3Contacts } from '@/components/quote-form/Page3Contacts'
import { Page4BillingReview } from '@/components/quote-form/Page4BillingReview'
import { AIAssistPanel } from '@/components/quote-form/AIAssistPanel'
import { RightSidebar } from '@/components/quote-form/RightSidebar'
import { PAGE_DESCRIPTIONS } from '@/components/quote-form/constants'
import { clearDraft, loadDraft, saveDraft } from '@/lib/utils/draft-storage'
import { defaultQuoteFormValues, quoteFormSchema } from '@/lib/schemas/quote-form-schema'
import type { AiParseResult, QuoteFormValues } from '@/types/quote-form'

const containerClasses = 'grid w-full max-w-[1400px] min-h-[680px] grid-cols-1 overflow-hidden rounded-[18px] bg-white shadow-[0_16px_40px_rgba(0,32,96,0.15)] md:grid-cols-[65%_35%]'

const WebformPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [aiAssistMode, setAiAssistMode] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [draftValues, setDraftValues] = useState<QuoteFormValues>(defaultQuoteFormValues)
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: defaultQuoteFormValues,
    mode: 'onSubmit'
  })

  useEffect(() => {
    const draft = loadDraft()
    if (draft) {
      form.reset(draft.values)
      setAiAssistMode(draft.aiAssistMode)
      setCurrentStep(draft.currentPage)
      setDraftValues(draft.values)
    }
    setHasLoadedDraft(true)
  }, [form])

  useEffect(() => {
    const subscription = form.watch(value => {
      setDraftValues(value as QuoteFormValues)
      setAiError(null)
    })
    return () => subscription.unsubscribe()
  }, [form])

  useEffect(() => {
    if (!hasLoadedDraft) return
    const handle = setTimeout(() => {
      saveDraft(draftValues, currentStep, aiAssistMode)
    }, 2000)
    return () => clearTimeout(handle)
  }, [draftValues, currentStep, aiAssistMode, hasLoadedDraft])

  const handleNext = useCallback(() => {
    setCurrentStep(step => Math.min(step + 1, PAGE_DESCRIPTIONS.length))
  }, [])

  const handleBack = useCallback(() => {
    setCurrentStep(step => Math.max(step - 1, 1))
  }, [])

  const handleManualSave = useCallback(() => {
    saveDraft(form.getValues(), currentStep, aiAssistMode)
    toast.success('Draft saved locally')
  }, [aiAssistMode, currentStep, form])

  const handleRefresh = useCallback(() => {
    form.reset(defaultQuoteFormValues)
    clearDraft()
    setCurrentStep(1)
    setAiAssistMode(false)
    toast.message('Form reset', {
      description: 'All fields cleared and draft removed.'
    })
  }, [form])

  const handleSubmitForm = form.handleSubmit(values => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Request submitted!', {
        description: 'We will follow up with scheduling details shortly.'
      })
      clearDraft()
      form.reset(defaultQuoteFormValues)
      setCurrentStep(1)
      setAiAssistMode(false)
    }, 800)
    console.log('Demo submission payload', values)
  })

  const handleAiAssistToggle = useCallback(() => {
    setAiAssistMode(mode => !mode)
    setAiError(null)
  }, [])

  const handleAiParse = useCallback(async () => {
    const input = form.getValues('aiAssistInput').trim()
    if (!input) {
      setAiError('Paste details so the assistant can parse them.')
      return
    }

    setIsParsing(true)
    setAiError(null)

    try {
      const response = await fetch('/api/parse-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiAssistInput: input })
      })

      const data = (await response.json()) as AiParseResult
      if (!data.success) {
        setAiError(data.errors?.[0] ?? 'AI assist could not parse the details.')
        return
      }

      Object.entries(data.fields ?? {}).forEach(([key, value]) => {
        if (!value) return

        if (key === 'languages') {
          const languages = Array.isArray(value)
            ? value
            : String(value)
                .split(',')
                .map(item => item.trim())
                .filter(Boolean)
          form.setValue('languages', languages, { shouldDirty: true })
          return
        }

        if (key in defaultQuoteFormValues) {
          form.setValue(key as keyof QuoteFormValues, String(value), {
            shouldDirty: true
          })
        }
      })

      toast.success('Fields updated from AI assist', {
        description: 'Review each page before submitting.'
      })
      setAiAssistMode(false)
    } catch (error) {
      console.error('AI assist error', error)
      setAiError('Unable to reach the AI service. Try again later.')
    } finally {
      setIsParsing(false)
    }
  }, [form])

  const renderCurrentStep = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <Page1IntroBasics form={form} />
      case 2:
        return <Page2Appointment form={form} />
      case 3:
        return <Page3Contacts form={form} />
      case 4:
      default:
        return <Page4BillingReview form={form} />
    }
  }, [currentStep, form])

  const canSubmit = currentStep === PAGE_DESCRIPTIONS.length && !aiAssistMode
  const hasClientId = Boolean(draftValues.clientId)

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-10'>
      <div className={containerClasses}>
        <div className='relative bg-white p-[50px]'>
          <div
            className='pointer-events-none absolute right-0 top-0 h-[220px] w-[260px] bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(255,149,0,0.12)_8px,rgba(255,149,0,0.12)_10px)]'
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
          />
          <div className='relative z-10 flex h-full flex-col'>
            {!aiAssistMode && (
              <StepIndicator currentStep={currentStep} steps={PAGE_DESCRIPTIONS} />
            )}

            <Form {...form}>
              <form onSubmit={handleSubmitForm} className='flex h-full flex-col'>
                <div className='flex-1'>
                  <AnimatePresence mode='wait'>
                    {aiAssistMode ? (
                      <motion.div
                        key='ai-mode'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <AIAssistPanel
                          form={form}
                          isParsing={isParsing}
                          onParse={handleAiParse}
                          onCancel={handleAiAssistToggle}
                          lastError={aiError}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`step-${currentStep}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className='space-y-8'
                      >
                        {renderCurrentStep}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!aiAssistMode && (
                  <div className='mt-10 flex flex-wrap items-center justify-between gap-3'>
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='ghost'
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className='rounded-lg px-4 py-2 text-sm font-semibold text-[#002060] hover:text-[#FF9500] disabled:opacity-40'
                      >
                        Back
                      </Button>
                      <Button
                        type='button'
                        onClick={handleNext}
                        disabled={currentStep === PAGE_DESCRIPTIONS.length}
                        className='rounded-lg bg-[#FF9500] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,149,0,0.3)] hover:bg-[#FF8500] disabled:opacity-40'
                      >
                        Continue
                      </Button>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={handleManualSave}
                        className='rounded-lg border-[#002060] px-4 py-2 text-sm font-semibold text-[#002060] hover:text-[#FF9500]'
                      >
                        Save draft
                      </Button>
                      <Button
                        type='button'
                        variant='ghost'
                        onClick={handleAiAssistToggle}
                        className='rounded-lg px-4 py-2 text-sm font-semibold text-[#002060] hover:text-[#FF9500]'
                      >
                        AI Assisted Submit
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>

        <RightSidebar
          currentPage={currentStep}
          serviceType={draftValues.serviceType}
          aiAssistMode={aiAssistMode}
          hasClientId={hasClientId}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitForm}
          onAiAssistToggle={handleAiAssistToggle}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  )
}

export default WebformPage
