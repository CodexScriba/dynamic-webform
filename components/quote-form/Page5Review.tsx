'use client'

import { UseFormReturn } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Check, AlertCircle, Building2, User, Calendar, MapPin, Phone } from 'lucide-react'
import { QuoteFormSchema } from '@/lib/schemas/quote-form-schema'

interface Page5ReviewProps {
  form: UseFormReturn<QuoteFormSchema>
}

export function Page5Review ({ form }: Page5ReviewProps) {
  const formValues = form.getValues()
  const hasClientId = Boolean(formValues.clientId && formValues.clientId.trim() !== '')

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'otp':
        return 'Over-the-Phone'
      case 'vri':
        return 'Video/VRI'
      case 'onsite':
        return 'Onsite'
      default:
        return 'Not selected'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-[#002060]">Review & Submit</h3>
        <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
        <p className="mt-3 text-sm text-slate-600">
          Please review your information carefully before submitting. You can go back to edit any section.
        </p>
      </div>

      {/* Important Reminder */}
      <div className="rounded-lg border-2 border-[#E67800]/30 bg-[#E67800]/5 p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-[#E67800] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[#002060]">Final check reminder:</p>
          <p className="text-xs text-slate-700 mt-1">
            Confirm date/time, timezone, service type, languages, and location details are accurate.
          </p>
        </div>
      </div>

      {/* Organization Information */}
      <div className="rounded-xl bg-slate-50 p-5 space-y-4 border border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-300">
          <Building2 className="h-4 w-4 text-[#E67800]" />
          <h4 className="text-sm font-bold text-[#002060] uppercase tracking-wide">Organization</h4>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-slate-500">Organization Name</p>
            <p className="text-sm text-slate-900 mt-0.5">{formValues.orgName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Account Status</p>
            <p className="text-sm text-slate-900 mt-0.5">
              {formValues.hasAccount ? `Existing (${formValues.clientId || 'ID not provided'})` : 'New Customer'}
            </p>
          </div>
        </div>
      </div>

      {/* Requestor Information */}
      <div className="rounded-xl bg-slate-50 p-5 space-y-4 border border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-300">
          <User className="h-4 w-4 text-[#E67800]" />
          <h4 className="text-sm font-bold text-[#002060] uppercase tracking-wide">Requestor</h4>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold text-slate-500">Name</p>
            <p className="text-sm text-slate-900 mt-0.5">{formValues.requestorName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Phone</p>
            <p className="text-sm text-slate-900 mt-0.5">{formValues.requestorPhone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Email</p>
            <p className="text-sm text-slate-900 mt-0.5 break-all">{formValues.requestorEmail || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Service & Appointment */}
      <div className="rounded-xl bg-slate-50 p-5 space-y-4 border border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-300">
          <Calendar className="h-4 w-4 text-[#E67800]" />
          <h4 className="text-sm font-bold text-[#002060] uppercase tracking-wide">Service & Appointment</h4>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-slate-500">Service Type</p>
            <p className="text-sm text-slate-900 mt-0.5">{getServiceTypeLabel(formValues.serviceType)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Languages</p>
            <p className="text-sm text-slate-900 mt-0.5">{formValues.languages || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Date & Time</p>
            <p className="text-sm text-slate-900 mt-0.5">
              {formValues.date && formValues.time
                ? `${formValues.date} at ${formValues.time}`
                : 'Not scheduled'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Timezone & Duration</p>
            <p className="text-sm text-slate-900 mt-0.5">
              {formValues.timezone || 'No timezone'} • {formValues.duration ? `${formValues.duration}h` : 'No duration'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Gender Preference</p>
            <p className="text-sm text-slate-900 mt-0.5 capitalize">{formValues.preference || 'Not specified'}</p>
          </div>
          {formValues.serviceType === 'vri' && (
            <div>
              <p className="text-xs font-semibold text-slate-500">VRI Link</p>
              <p className="text-sm text-slate-900 mt-0.5">
                {formValues.vriRLCProvidesLink ? 'Provider will supply' : formValues.vriLink || 'Not provided'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Location & Contacts */}
      <div className="rounded-xl bg-slate-50 p-5 space-y-4 border border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-300">
          <MapPin className="h-4 w-4 text-[#E67800]" />
          <h4 className="text-sm font-bold text-[#002060] uppercase tracking-wide">Location & Contacts</h4>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500">Address / Location</p>
            <p className="text-sm text-slate-900 mt-0.5 whitespace-pre-wrap">{formValues.address || 'Not provided'}</p>
          </div>
          {formValues.locationDetails && (
            <div>
              <p className="text-xs font-semibold text-slate-500">Check-in Instructions</p>
              <p className="text-sm text-slate-900 mt-0.5 whitespace-pre-wrap">{formValues.locationDetails}</p>
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">Point of Contact</p>
              <p className="text-sm text-slate-900 mt-0.5">{formValues.pointOfContact || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Doctor/Provider</p>
              <p className="text-sm text-slate-900 mt-0.5">{formValues.providerName || 'Not provided'}</p>
            </div>
          </div>
          {formValues.comments && (
            <div>
              <p className="text-xs font-semibold text-slate-500">Additional Comments</p>
              <p className="text-sm text-slate-900 mt-0.5 whitespace-pre-wrap">{formValues.comments}</p>
            </div>
          )}
        </div>
      </div>

      {/* Billing & Additional */}
      <div className="rounded-xl bg-slate-50 p-5 space-y-4 border border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-300">
          <Phone className="h-4 w-4 text-[#E67800]" />
          <h4 className="text-sm font-bold text-[#002060] uppercase tracking-wide">Billing & Additional</h4>
        </div>
        {!hasClientId && formValues.billingAddress ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Billing Address</p>
              <p className="text-sm text-slate-900 mt-0.5 whitespace-pre-wrap">{formValues.billingAddress}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-slate-500">Billing Contact Name</p>
                <p className="text-sm text-slate-900 mt-0.5">{formValues.billingContactName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Billing Phone</p>
                <p className="text-sm text-slate-900 mt-0.5">{formValues.billingPhone || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold text-slate-500">Billing Email</p>
                <p className="text-sm text-slate-900 mt-0.5">{formValues.billingEmail || 'Not provided'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Existing customer:</strong> Billing information on file will be used.
            </p>
          </div>
        )}
        {formValues.costCenter && (
          <div>
            <p className="text-xs font-semibold text-slate-500">Cost Center Number</p>
            <p className="text-sm text-slate-900 mt-0.5">{formValues.costCenter}</p>
          </div>
        )}
      </div>

      {/* Final Checklist */}
      <div className="rounded-xl border-2 border-green-500/30 bg-green-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Check className="h-5 w-5 text-green-600" />
          <h4 className="text-sm font-bold text-green-900">Pre-submission Checklist</h4>
        </div>
        <ul className="space-y-2 text-xs text-green-900">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Date, time, and timezone are accurate</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Service type matches your needs</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Language requirements are correct</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Location/link information is accurate</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Contact information is up to date</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-[#002060] to-[#003580] p-5 text-white">
        <p className="text-sm font-semibold">Ready to submit?</p>
        <p className="text-xs mt-1 text-white/90">
          Click the &quot;Complete&quot; button below to submit your quote request. We&apos;ll get back to you shortly!
        </p>
      </div>
    </motion.div>
  )
}
