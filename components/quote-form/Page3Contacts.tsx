import { UseFormReturn } from 'react-hook-form'
import { UserRound, Stethoscope, Phone, Hash } from 'lucide-react'

import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import type { QuoteFormValues } from '@/types/quote-form'

interface Page3ContactsProps {
  form: UseFormReturn<QuoteFormValues>
}

export const Page3Contacts = ({ form }: Page3ContactsProps) => {
  const followUpNeeded = form.watch('followUpNeeded')

  return (
    <div className='space-y-6'>
      <section className='grid gap-6 lg:grid-cols-2'>
        <FormField
          control={form.control}
          name='pointOfContact'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Point of Contact</FormLabel>
              <FormControl>
                <div className='relative'>
                  <UserRound className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                  <Input {...field} className='h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0' placeholder='Day-of coordinator or host name' />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='providerName'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Doctor/Provider Name</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Stethoscope className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                  <Input {...field} className='h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0' placeholder='Provider leading the appointment' />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </section>

      <section className='grid gap-6 lg:grid-cols-2'>
        <FormField
          control={form.control}
          name='costCenter'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Cost Center Number</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Hash className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                  <Input {...field} className='h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0' placeholder='Optional billing reference' />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='altPhone'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Alternate Phone</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Phone className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                  <Input {...field} className='h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0' placeholder='Backup contact number' />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </section>

      <section className='space-y-4'>
        <FormField
          control={form.control}
          name='comments'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Comments</FormLabel>
              <FormControl>
                <Textarea {...field} className='min-h-[120px] rounded-2xl border-none bg-slate-50 px-4 py-3 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0' placeholder='Add day-of details, parking instructions, or dial-in notes. Avoid PHI or patient identifiers.' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='followUpNeeded'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 shadow-inner'>
              <div>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Would you like a follow-up?</FormLabel>
                <p className='text-xs text-slate-500'>We can confirm via email with scheduling options.</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {followUpNeeded && (
          <div className='rounded-2xl bg-[#FF9500]/10 p-4 text-sm text-[#7C4A00]'>
            We will follow up using the contact information provided above with a quote summary.
          </div>
        )}
      </section>
    </div>
  )
}
