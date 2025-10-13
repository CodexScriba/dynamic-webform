'use client'

import { UseFormReturn } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, UserRound, Phone, Mail } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

const labelClasses = 'text-sm font-medium text-slate-600'
const inputClasses =
  'h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0'
const fieldIconClasses =
  'pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400'

interface Page4BillingReviewProps {
  form: UseFormReturn<QuoteFormSchema>
}

export function Page4BillingReview ({ form }: Page4BillingReviewProps) {
  const clientId = form.watch('clientId')
  const showBilling = !clientId || clientId.trim() === ''

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <AnimatePresence>
        {showBilling && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Billing Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#002060]">💳 Billing Information</h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
              <p className="mt-2 text-xs text-slate-500">
                Only needed if this is your company&apos;s first time requesting an interpreter with us
              </p>
            </div>

            <FormField
              control={form.control}
              name="billingAddress"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className={labelClasses}>Billing Address</FormLabel>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-4 top-4 size-4 text-slate-400" aria-hidden="true" />
                    <FormControl>
                      <Textarea
                        placeholder="Enter billing address"
                        className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 pl-12 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="billingContactName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className={labelClasses}>Billing Contact Name</FormLabel>
                    <div className="relative">
                      <UserRound className={fieldIconClasses} aria-hidden="true" />
                      <FormControl>
                        <Input
                          placeholder="Enter billing contact name"
                          className={inputClasses}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingPhone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className={labelClasses}>Billing Contact Phone Number</FormLabel>
                    <div className="relative">
                      <Phone className={fieldIconClasses} aria-hidden="true" />
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          className={inputClasses}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="billingEmail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className={labelClasses}>Billing Contact Email</FormLabel>
                  <div className="relative">
                    <Mail className={fieldIconClasses} aria-hidden="true" />
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="billing@company.com"
                        className={inputClasses}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Section */}
      <div className={showBilling ? 'pt-6' : ''}>
        <h3 className="text-lg font-semibold text-[#002060]">✅ Review & Submit</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
        <p className="mt-2 text-sm text-slate-600">
          Please review your information before submitting. You can go back to edit any section.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Organization</p>
          <p className="text-sm text-slate-700 mt-1">{form.watch('orgName') || 'Not provided'}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Service Type</p>
          <p className="text-sm text-slate-700 mt-1 capitalize">
            {form.watch('serviceType') ?
              (form.watch('serviceType') === 'otp' ? 'Over-the-Phone' :
               form.watch('serviceType') === 'vri' ? 'Video/VRI' : 'Onsite')
              : 'Not selected'}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Appointment</p>
          <p className="text-sm text-slate-700 mt-1">
            {form.watch('date') && form.watch('time')
              ? `${form.watch('date')} at ${form.watch('time')} (${form.watch('timezone') || 'No timezone'})`
              : 'Not scheduled'}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Language(s)</p>
          <p className="text-sm text-slate-700 mt-1">{form.watch('languages') || 'Not specified'}</p>
        </div>
      </div>

      <div className="rounded-lg border-2 border-[#E67800]/30 bg-[#E67800]/5 p-4">
        <p className="text-sm text-[#002060]">
          <strong>Final check reminder:</strong> Confirm date/time, timezone, service type, languages, and location details are accurate.
        </p>
      </div>
    </motion.div>
  )
}
