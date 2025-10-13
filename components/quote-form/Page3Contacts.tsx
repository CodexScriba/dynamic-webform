'use client'

import { UseFormReturn } from 'react-hook-form'
import { motion } from 'framer-motion'
import { UserRound, MapPin } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

const labelClasses = 'text-sm font-medium text-slate-600'
const inputClasses =
  'h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0'
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
      {/* Location */}
      <div>
        <h3 className="text-lg font-semibold text-[#002060]">Location</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClasses}>Address / Location</FormLabel>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-4 size-4 text-slate-400" aria-hidden="true" />
              <FormControl>
                <Textarea
                  placeholder="Enter appointment address or location"
                  className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 pl-12 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
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
        name="locationDetails"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClasses}>Additional check-in instructions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Building name, department, floor, suite or room #, etc."
                className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                {...field}
              />
            </FormControl>
            <p className="text-xs text-slate-500">
              Be very specific (e.g., building name, department, floor, suite or room #)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Point of Contact & Provider */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-[#002060]">Point of Contact & Provider</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
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

      {/* Additional Comments */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-[#002060]">Additional Comments</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
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
                className="min-h-[100px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
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
    </motion.div>
  )
}
