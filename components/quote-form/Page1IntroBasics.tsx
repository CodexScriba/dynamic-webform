import { UseFormReturn, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Phone, Building2, UserRound } from 'lucide-react'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { SERVICE_TYPE_OPTIONS } from './constants'
import type { QuoteFormValues } from '@/types/quote-form'
import { FormSection } from './FormSection'

interface Page1IntroBasicsProps {
  form: UseFormReturn<QuoteFormValues>
}

const cardBaseClasses = 'flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-inner transition'
const inputClasses = 'h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
const neutralInputClasses = 'h-11 rounded-2xl border-none bg-slate-50 px-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'

export const Page1IntroBasics = ({ form }: Page1IntroBasicsProps) => {
  const hasAccount = form.watch('hasAccount')
  return (
    <div className='space-y-10'>
      <FormSection title='Organization Information' description='Let us know who is requesting service.' accent>
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]'>
          <FormField
            control={form.control}
            name='orgName'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Organization Name</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Building2 className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input {...field} className={inputClasses} placeholder='Healthcare network, hospital, or clinic' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name='hasAccount'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 shadow-inner'>
                <div>
                  <FormLabel className='text-sm font-semibold text-[#002060]'>Do you have an account?</FormLabel>
                  <p className='text-xs text-slate-500'>Toggle on if you already have a Client ID.</p>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {hasAccount && (
          <FormField
            control={form.control}
            name='clientId'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Client ID</FormLabel>
                <FormControl>
                  <Input {...field} className={neutralInputClasses} placeholder='Enter your existing Client ID' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </FormSection>

      <FormSection title='Requestor Information' description='We will follow up using these contact details.'>
        <div className='grid gap-6 md:grid-cols-3'>
          <FormField
            control={form.control}
            name='requestorName'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Name</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <UserRound className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input {...field} className={inputClasses} placeholder='Full name' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='requestorEmail'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Email</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Mail className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input {...field} className={inputClasses} placeholder='name@organization.com' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='requestorPhone'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Phone</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Phone className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input {...field} className={inputClasses} placeholder='(555) 000-1234' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormSection>

      <FormSection title='Service Type' description='Choose the interpreting format that fits your appointment.'>
        <FormField
          control={form.control}
          name='serviceType'
          render={({ field }) => (
            <div className='grid gap-4 md:grid-cols-3'>
              {SERVICE_TYPE_OPTIONS.map(option => {
                const Icon = option.icon
                const isSelected = field.value === option.id

                return (
                  <motion.button
                    type='button'
                    key={option.id}
                    onClick={() => field.onChange(option.id)}
                    className={cn(
                      cardBaseClasses,
                      isSelected
                        ? 'border-[#FF9500] shadow-[0_12px_24px_rgba(255,149,0,0.15)]'
                        : 'hover:border-[#FF9500]/50'
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn('flex size-10 items-center justify-center rounded-full', isSelected ? 'bg-[#FF9500]/10 text-[#FF9500]' : 'bg-[#002060]/5 text-[#002060]')}>
                      <Icon className='size-5' />
                    </div>
                    <div className='mt-3 text-left'>
                      <div className='text-sm font-semibold text-[#002060]'>{option.label}</div>
                      <p className='text-xs text-slate-500'>{option.description}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          )}
        />
      </FormSection>
    </div>
  )
}
