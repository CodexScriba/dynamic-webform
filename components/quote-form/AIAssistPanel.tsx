import { UseFormReturn } from 'react-hook-form'
import { Sparkle, CircleAlert, Loader2 } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import type { QuoteFormValues } from '@/types/quote-form'

interface AIAssistPanelProps {
  form: UseFormReturn<QuoteFormValues>
  isParsing: boolean
  onParse: () => void
  onCancel: () => void
  lastError?: string | null
}

export const AIAssistPanel = ({ form, isParsing, onParse, onCancel, lastError }: AIAssistPanelProps) => {
  return (
    <div className='flex min-h-[500px] flex-col justify-between rounded-[16px] bg-white p-6 shadow-[0_16px_40px_rgba(0,32,96,0.12)]'>
      <div className='space-y-6'>
        <div className='flex items-start gap-3 rounded-2xl bg-[#002060]/5 p-4'>
          <Sparkle className='mt-1 size-5 text-[#FF9500]' />
          <div>
            <h2 className='text-lg font-semibold text-[#002060]'>Paste details to auto-fill</h2>
            <p className='text-sm text-slate-500'>Copy scheduling info from an email, ticket, or EHR. The AI will map key fields for you.</p>
          </div>
        </div>
        <FormField
          control={form.control}
          name='aiAssistInput'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Request details</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Example: Requesting Spanish interpreter for 3/22 at 2:15 PM PT. Location is 1234 Wellness Ave, Radiology, 3rd floor. Point of contact: Maria Lopez (555-321-7777).' className='min-h-[220px] rounded-2xl border-none bg-slate-50 px-4 py-3 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0' />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='rounded-2xl border border-[#FF9500]/30 bg-[#FFFAF2] p-4 text-sm text-[#7C4A00]'>
          <p className='font-semibold'>What to include</p>
          <ul className='mt-2 space-y-1 text-xs'>
            <li>• Languages requested</li>
            <li>• Date, time, and timezone</li>
            <li>• Location or video link</li>
            <li>• Day-of point of contact</li>
          </ul>
          <p className='mt-3 text-xs font-medium'>Do not include PHI (patient names, DOBs, MRNs).</p>
        </div>
        {lastError && (
          <div className='flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
            <CircleAlert className='mt-0.5 size-4' />
            <span>{lastError}</span>
          </div>
        )}
      </div>
      <div className='mt-6 flex flex-wrap items-center gap-3'>
        <Button onClick={onParse} disabled={isParsing} className='flex items-center gap-2 rounded-lg bg-[#FF9500] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,149,0,0.25)] hover:bg-[#FF8500]'>
          {isParsing && <Loader2 className='size-4 animate-spin' />}
          Use AI to fill out the form
        </Button>
        <Button variant='ghost' onClick={onCancel} disabled={isParsing} className='text-sm font-semibold text-[#002060] hover:text-[#FF9500]'>
          Exit AI mode
        </Button>
      </div>
    </div>
  )
}
