'use client'

import { UseFormReturn } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Hash, UserRound, Mail, Phone } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

const labelClasses = 'text-sm font-medium text-slate-600'
const inputClasses =
  'h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
const fieldIconClasses =
  'pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400'

interface Page1IntroBasicsProps {
  form: UseFormReturn<QuoteFormSchema>
}

export function Page1IntroBasics ({ form }: Page1IntroBasicsProps) {
  const hasAccount = form.watch('hasAccount')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Organization Information */}
      <div>
        <h3 className="text-lg font-semibold text-[#002060]">Organization Information</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Name of your company/organization</FormLabel>
              <div className="relative">
                <Building2 className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    placeholder="Enter organization name"
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
          name="hasAccount"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Do you have an account with us?</FormLabel>
              <div className="flex h-11 items-center rounded-2xl border-none bg-slate-50 px-4 shadow-inner">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-[#FF9500]"
                  />
                </FormControl>
                <span className="ml-3 text-sm font-medium text-slate-700">
                  {field.value ? 'Yes' : 'No'}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <AnimatePresence>
        {hasAccount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className={labelClasses}>Client ID</FormLabel>
                  <div className="relative">
                    <Hash className={fieldIconClasses} aria-hidden="true" />
                    <FormControl>
                      <Input
                        placeholder="Enter your client ID"
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

      {/* Requestor Information */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-[#002060]">Requestor Information</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <FormField
          control={form.control}
          name="requestorName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Requestor Name</FormLabel>
              <div className="relative">
                <UserRound className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    placeholder="Enter requestor name"
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
          name="requestorPhone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Requestor Phone</FormLabel>
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

        <FormField
          control={form.control}
          name="requestorEmail"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Requestor Email</FormLabel>
              <div className="relative">
                <Mail className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    type="email"
                    placeholder="requestor@company.com"
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
