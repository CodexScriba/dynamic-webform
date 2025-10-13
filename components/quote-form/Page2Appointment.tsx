'use client'

import { UseFormReturn } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Globe, Link as LinkIcon } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

const labelClasses = 'text-sm font-medium text-slate-600'
const inputClasses =
  'h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0'
const fieldIconClasses =
  'pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400'

const TIMEZONES = [
  { value: 'America/New_York', label: 'America/New York (EST/EDT)' },
  { value: 'America/Chicago', label: 'America/Chicago (CST/CDT)' },
  { value: 'America/Denver', label: 'America/Denver (MST/MDT)' },
  { value: 'America/Los_Angeles', label: 'America/Los Angeles (PST/PDT)' },
  { value: 'America/Phoenix', label: 'America/Phoenix (MST)' },
  { value: 'America/Anchorage', label: 'America/Anchorage (AKST/AKDT)' },
  { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu (HST)' },
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' }
] as const

const DURATION_OPTIONS = [
  { value: '0.5', label: '0.5 hours (30 min)' },
  { value: '1', label: '1 hour' },
  { value: '1.5', label: '1.5 hours' },
  { value: '2', label: '2 hours' },
  { value: '2.5', label: '2.5 hours' },
  { value: '3', label: '3 hours' },
  { value: '4', label: '4 hours' },
  { value: '8', label: '8 hours (full day)' }
] as const

interface Page2AppointmentProps {
  form: UseFormReturn<QuoteFormSchema>
}

export function Page2Appointment ({ form }: Page2AppointmentProps) {
  const serviceType = form.watch('serviceType')
  const vriRLCProvidesLink = form.watch('vriRLCProvidesLink')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Appointment Details */}
      <div>
        <h3 className="text-lg font-semibold text-[#002060]">📅 Appointment Details</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Time Zone</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#E67800]/40 focus:ring-offset-0">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Estimated Duration</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#E67800]/40 focus:ring-offset-0">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DURATION_OPTIONS.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Date of Appointment</FormLabel>
              <div className="relative">
                <Calendar className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    type="date"
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
          name="time"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Time of Appointment</FormLabel>
              <div className="relative">
                <Clock className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    type="time"
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

      {/* Location */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-[#002060]">📍 Location</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClasses}>Address / Location</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter appointment address or location"
                className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                {...field}
              />
            </FormControl>
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

      {/* Languages & Preferences */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-[#002060]">🌐 Languages & Preferences</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Language(s)</FormLabel>
              <div className="relative">
                <Globe className={fieldIconClasses} aria-hidden="true" />
                <FormControl>
                  <Input
                    placeholder="e.g., Spanish, Mandarin"
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
          name="preference"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Interpreter Gender Preference</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#E67800]/40 focus:ring-offset-0">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="no-preference">Rather not say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* VRI Options - Conditional */}
      {serviceType === 'vri' && (
        <div className="space-y-6 border-t border-slate-200 pt-8">
          <div>
            <h3 className="text-lg font-semibold text-[#002060]">🖥 VRI Options</h3>
            <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
          </div>

          <FormField
            control={form.control}
            name="vriRLCProvidesLink"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className={labelClasses}>
                  Will we provide a HIPAA-compliant video link?
                </FormLabel>
                <div className="flex h-11 items-center rounded-2xl border-none bg-slate-50 px-4 shadow-inner">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[#E67800]"
                    />
                  </FormControl>
                  <span className="ml-3 text-sm font-medium text-slate-700">
                    {field.value ? 'Yes, provide link' : 'No, I will provide my own'}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatePresence>
            {!vriRLCProvidesLink && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="vriLink"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className={labelClasses}>Provide Your Link</FormLabel>
                      <div className="relative">
                        <LinkIcon className={fieldIconClasses} aria-hidden="true" />
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://example.com/meeting"
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
        </div>
      )}
    </motion.div>
  )
}
