'use client'

import { UseFormReturn } from 'react-hook-form'
import { motion } from 'framer-motion'
import { UserRound, Phone, DollarSign } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

const labelClasses = 'text-sm font-medium text-slate-600'
const inputClasses =
  'h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
const fieldIconClasses =
  'pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400'

interface Page3ContactsProps {
  form: UseFormReturn<QuoteFormSchema>
}

export function Page3Contacts ({ form }: Page3ContactsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Contacts */}
      <div>
        <h3 className="text-lg font-semibold text-[#002060]">👥 Contacts</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
      </div>

      <FormField
        control={form.control}
        name="pointOfContact"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClasses}>Point of Contact</FormLabel>
            <div className="relative">
              <UserRound className={fieldIconClasses} aria-hidden="true" />
              <FormControl>
                <Input
                  placeholder="Onsite or meeting host contact"
                  className={inputClasses}
                  {...field}
                />
              </FormControl>
            </div>
            <p className="text-xs text-slate-500">
              Use on-site or meeting host contact, e.g., &quot;Maria Lopez, Radiology Front Desk&quot;
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="providerName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClasses}>Doctor/Provider Name</FormLabel>
            <div className="relative">
              <UserRound className={fieldIconClasses} aria-hidden="true" />
              <FormControl>
                <Input
                  placeholder="Enter doctor or provider name"
                  className={inputClasses}
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Information */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-[#002060]">💬 Additional Information</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
      </div>

      <FormField
        control={form.control}
        name="comments"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClasses}>Additional Comments</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter any additional comments..."
                className="min-h-[100px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0"
                {...field}
              />
            </FormControl>
            <p className="text-xs text-slate-500">
              Do not include PHI or patient identifiers. Helpful: campus map link, parking code, front-desk phone
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="costCenter"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Cost Center Number</FormLabel>
              <div className="relative">
                <DollarSign className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    placeholder="Enter cost center number"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
              </div>
              <p className="text-xs text-slate-500">
                Enter code so billing routes correctly
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="altPhone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Alternate Phone</FormLabel>
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
    </motion.div>
  )
}
