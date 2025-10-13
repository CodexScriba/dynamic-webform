import { UseFormReturn } from 'react-hook-form'
import { Building2, Phone, Mail } from 'lucide-react'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SERVICE_TYPE_OPTIONS } from './constants'
import type { QuoteFormValues } from '@/types/quote-form'
import { FormSection } from './FormSection'

interface Page4BillingReviewProps {
  form: UseFormReturn<QuoteFormValues>
}

const plainInputClasses = 'h-11 rounded-2xl border-none bg-slate-50 px-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'

export const Page4BillingReview = ({ form }: Page4BillingReviewProps) => {
  const clientId = form.watch('clientId')
  const values = form.watch()

  const serviceTypeLabel = SERVICE_TYPE_OPTIONS.find(option => option.id === values.serviceType)?.label ?? 'Not selected'
  const languages = values.languages.length ? values.languages.join(', ') : 'None listed'

  return (
    <div className='space-y-10'>
      {!clientId && (
        <FormSection
          title='Billing Information'
          description='Provide billing contacts when you do not have a Client ID on file.'
          accent
        >
          <FormField
            control={form.control}
            name='billingAddress'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Billing Address</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Building2 className='pointer-events-none absolute left-4 top-3 size-4 text-slate-400' />
                    <Textarea
                      {...field}
                      className='min-h-[100px] rounded-2xl border-none bg-slate-50 pl-12 pr-4 pt-3 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
                      placeholder='Street, city, state, ZIP'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid gap-6 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='billingContactName'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='text-sm font-semibold text-[#002060]'>Billing Contact Name</FormLabel>
                  <FormControl>
                    <Input {...field} className={plainInputClasses} placeholder='Name handling invoices' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='billingPhone'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='text-sm font-semibold text-[#002060]'>Billing Phone</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Phone className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                      <Input {...field} className={plainInputClasses} placeholder='(555) 000-5678' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='billingEmail'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Billing Email</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Mail className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input {...field} className={plainInputClasses} placeholder='billing@organization.com' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
      )}

      <FormSection title='Review Details' description='Double-check date, time, languages, and contact information before submitting.'>
        <div className='grid gap-4 rounded-2xl bg-slate-50 p-6 shadow-inner md:grid-cols-2'>
          <ReviewRow label='Organization' value={values.orgName || 'Not provided'} />
          <ReviewRow label='Requestor' value={values.requestorName || 'Not provided'} />
          <ReviewRow label='Service Type' value={serviceTypeLabel} />
          <ReviewRow label='Languages' value={languages} />
          <ReviewRow label='Appointment' value={[values.date, values.time].filter(Boolean).join(' · ') || 'Not scheduled yet'} />
          <ReviewRow label='Timezone' value={values.timezone || 'Not selected'} />
          <ReviewRow label='Location' value={values.address || 'Not provided'} multiLine />
          <ReviewRow label='Point of Contact' value={values.pointOfContact || 'Not provided'} />
        </div>
        <div className='rounded-2xl border border-[#FF9500]/40 bg-white p-4 text-sm text-slate-600 shadow-sm'>
          Submission is for demo only. We will display a confirmation toast and clear your draft when you click Submit Request.
        </div>
      </FormSection>
    </div>
  )
}

interface ReviewRowProps {
  label: string
  value: string
  multiLine?: boolean
}

const ReviewRow = ({ label, value, multiLine }: ReviewRowProps) => {
  return (
    <div className='rounded-xl bg-white px-4 py-3 shadow-sm'>
      <div className='text-xs font-semibold uppercase tracking-wide text-[#7A8BB0]'>{label}</div>
      <div className={`mt-1 text-sm text-[#002060] ${multiLine ? 'whitespace-pre-line' : ''}`}>{value}</div>
    </div>
  )
}
