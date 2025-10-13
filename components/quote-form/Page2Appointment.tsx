import { UseFormReturn } from 'react-hook-form'
import { Calendar, Clock, MapPinned, Languages, Link as LinkIcon } from 'lucide-react'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { DURATION_OPTIONS, LANGUAGE_OPTIONS, PREFERENCE_OPTIONS, TIMEZONE_OPTIONS } from './constants'
import type { QuoteFormValues } from '@/types/quote-form'
import { FormSection } from './FormSection'

interface Page2AppointmentProps {
  form: UseFormReturn<QuoteFormValues>
}

const timedInputClasses = 'h-11 w-full rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
const plainInputClasses = 'h-11 w-full rounded-2xl border-none bg-slate-50 px-4 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'

export const Page2Appointment = ({ form }: Page2AppointmentProps) => {
  const serviceType = form.watch('serviceType')
  const vriRLCProvidesLink = form.watch('vriRLCProvidesLink')
  const languages = form.watch('languages')

  return (
    <div className='space-y-10'>
      <FormSection title='Appointment Details' description='Share when the interpreter is needed.' accent>
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'>
          <FormField
            control={form.control}
            name='timezone'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Timezone</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-left text-sm shadow-inner focus:ring-0 focus:ring-offset-0'>
                      <div className='flex items-center gap-3'>
                        <Calendar className='size-4 text-slate-400' />
                        <SelectValue placeholder='Choose timezone' />
                      </div>
                    </SelectTrigger>
                    <SelectContent className='rounded-2xl border border-slate-200 bg-white shadow-lg'>
                      {TIMEZONE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='duration'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Duration</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 text-left text-sm shadow-inner focus:ring-0 focus:ring-offset-0'>
                      <div className='flex items-center gap-3'>
                        <Clock className='size-4 text-slate-400' />
                        <SelectValue placeholder='Estimated duration' />
                      </div>
                    </SelectTrigger>
                    <SelectContent className='rounded-2xl border border-slate-200 bg-white shadow-lg'>
                      {DURATION_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid gap-6 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Date</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Calendar className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input type='date' {...field} className={timedInputClasses} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Time</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Clock className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                    <Input type='time' {...field} className={timedInputClasses} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormSection>

      <FormSection title='Location' description='Tell the interpreter how to access the appointment.'>
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Address or Meeting Location</FormLabel>
              <FormControl>
                <div className='relative'>
                  <MapPinned className='pointer-events-none absolute left-4 top-3 size-4 text-slate-400' />
                  <Textarea
                    {...field}
                    className='min-h-[90px] rounded-2xl border-none bg-slate-50 pl-12 pr-4 pt-3 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
                    placeholder='Street, building, suite, or video platform details'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='locationDetails'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Location Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className='min-h-[80px] rounded-2xl border-none bg-slate-50 px-4 py-3 text-sm shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0'
                  placeholder='Parking instructions, floor, room number, entry notes'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title='Languages & Preferences' description='Pick the languages needed and any preferences.'>
        <FormField
          control={form.control}
          name='languages'
          render={() => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Languages Needed</FormLabel>
              <FormControl>
                <ToggleGroup
                  type='multiple'
                  className='grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-2 shadow-inner md:grid-cols-3'
                  value={languages}
                  onValueChange={value => form.setValue('languages', value, { shouldDirty: true })}
                >
                  {LANGUAGE_OPTIONS.map(language => (
                    <ToggleGroupItem
                      key={language}
                      value={language}
                      className={cn(
                        'rounded-xl border border-transparent px-3 py-2 text-xs font-medium transition',
                        languages.includes(language)
                          ? 'bg-[#FF9500]/10 text-[#FF9500] hover:bg-[#FF9500]/20'
                          : 'bg-white text-[#002060] hover:bg-slate-100'
                      )}
                    >
                      <div className='flex items-center gap-2'>
                        <Languages className='size-4' />
                        <span className='text-left'>{language}</span>
                      </div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='preference'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='text-sm font-semibold text-[#002060]'>Preference</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='h-11 rounded-2xl border-none bg-slate-50 px-4 text-left text-sm shadow-inner focus:ring-0 focus:ring-offset-0'>
                    <SelectValue placeholder='Interpreter preference' />
                  </SelectTrigger>
                  <SelectContent className='rounded-2xl border border-slate-200 bg-white shadow-lg'>
                    {PREFERENCE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      {serviceType === 'vri' && (
        <FormSection
          title='VRI Link Setup'
          description='Choose who provides the HIPAA-compliant video link.'
        >
          <FormField
            control={form.control}
            name='vriRLCProvidesLink'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 shadow-inner'>
                <FormLabel className='text-sm font-semibold text-[#002060]'>Random Language Company provides the link</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          {!vriRLCProvidesLink && (
            <FormField
              control={form.control}
              name='vriLink'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='text-sm font-semibold text-[#002060]'>Appointment VRI Link</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <LinkIcon className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                      <Input {...field} className={plainInputClasses} placeholder='https://meeting-link.example.com' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </FormSection>
      )}
    </div>
  )
}
