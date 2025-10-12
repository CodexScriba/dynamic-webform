'use client'

import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Sparkles, Clock, Shield } from 'lucide-react'

interface RightSidebarProps {
  currentPage: number
  serviceType: string
  hasClientId: boolean
  aiAssistMode: boolean
  onAIAssist: () => void
  onSubmit: () => void
}

export function RightSidebar ({
  currentPage,
  serviceType,
  hasClientId,
  aiAssistMode,
  onAIAssist,
  onSubmit
}: RightSidebarProps) {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <div className="flex-1">
        {aiAssistMode ? (
          <AIAssistSidebarContent />
        ) : currentPage === 1 ? (
          <Page1SidebarContent />
        ) : currentPage === 2 ? (
          <Page2SidebarContent serviceType={serviceType} />
        ) : currentPage === 3 ? (
          <Page3SidebarContent />
        ) : (
          <Page4SidebarContent hasClientId={hasClientId} />
        )}
      </div>

      {/* CTAs - Always at bottom */}
      {!aiAssistMode && (
        <>
          <div className="mt-auto h-px bg-white/20" />
          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={onSubmit}
              variant="ghost"
              className="w-full rounded-lg border-0 bg-gradient-to-br from-[#FF9500] to-[#FFA500] px-8 py-5 text-[16px] font-bold uppercase tracking-[0.5px] text-white shadow-[0_4px_15px_rgba(255,149,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:from-[#FF8500] hover:to-[#FF9500] hover:bg-transparent hover:shadow-[0_6px_20px_rgba(255,149,0,0.4)] hover:text-white focus-visible:ring-[#FF9500]/40"
            >
              Submit Request
            </Button>
            <Button
              onClick={onAIAssist}
              variant="ghost"
              className="w-full rounded-lg border-2 border-white bg-white/20 px-8 py-5 text-[16px] font-bold uppercase tracking-[0.5px] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/30 hover:text-white"
            >
              AI Assisted Submit
            </Button>
            <Button
              variant="ghost"
              className="w-full rounded-lg bg-transparent px-8 py-4 text-[15px] font-semibold uppercase tracking-[0.5px] text-white/70 transition-all duration-300 hover:text-white"
            >
              Refresh
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

function Page1SidebarContent () {
  const FEATURES = [
    { icon: Check, title: '📅 High Success Rate', description: '90% success rate when given 3 days or more.' },
    { icon: Star, title: '💰 Risk-Free Booking', description: 'Free cancellation up to 24 hours.' },
    { icon: Zap, title: '📱 Flexible Service Options', description: 'Video, phone, and on-site interpretation available.' }
  ]

  return (
    <>
      <div className="inline-block">
        <h3 className="relative text-[32px] font-bold pl-[24px]">
          <span className="absolute left-0 top-0 h-full w-[5px] rounded bg-[#FF9500]" />
          Why us?
        </h3>
      </div>
      <p className="mt-4 text-[17px] leading-relaxed text-white/90">
        Trusted by insurance companies and Fortune 500 companies.
      </p>
      <div className="mt-8 space-y-5">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-lg border-l-[3px] border-[#FF9500] bg-white/10 p-4 transition-all duration-300 hover:translate-x-1 hover:bg-white/20"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF9500] to-[#FFA500] text-[18px] font-bold text-white">
              <Icon className="size-5" strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[18px] font-semibold">{title}</h4>
              <p className="text-[15px] text-white/85">{description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2 text-[#FFB347]">
        <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
          ISO Certified
        </div>
        <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
          On-Site Specialists
        </div>
        <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
          24/7 Availability
        </div>
      </div>
    </>
  )
}

function Page2SidebarContent ({ serviceType }: { serviceType: string }) {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold">
          {serviceType === 'vri' ? '🖥 VRI Setup Tips' :
           serviceType === 'otp' ? '📞 Phone Interpreting Tips' :
           serviceType === 'onsite' ? '🏢 On-Site Checklist' :
           '📋 Scheduling Guidance'}
        </h3>
        <div className="mt-2 h-1 w-12 rounded bg-[#FF9500]" />
      </div>

      {serviceType === 'vri' && (
        <div className="space-y-4">
          <p className="text-sm text-white/90">
            <strong>Toggle explanation:</strong> Choose whether we provide a HIPAA-compliant video link or you&apos;ll use your own platform.
          </p>
          <p className="text-sm text-white/90">
            <strong>Best practice:</strong> Join the video call 5 minutes early to test audio and video.
          </p>
        </div>
      )}

      {serviceType === 'otp' && (
        <div className="space-y-4">
          <p className="text-sm text-white/90">
            <strong>Quiet room:</strong> Ensure a quiet environment for the best call quality.
          </p>
          <p className="text-sm text-white/90">
            <strong>Backup number:</strong> Have an alternate phone number ready in case of connection issues.
          </p>
        </div>
      )}

      {serviceType === 'onsite' && (
        <div className="space-y-4">
          <p className="text-sm text-white/90">
            <strong>Location details:</strong> Provide building name, department, floor, suite or room number.
          </p>
          <p className="text-sm text-white/90">
            <strong>Parking instructions:</strong> Include parking information if applicable.
          </p>
        </div>
      )}

      <div className="rounded-lg bg-white/10 p-4">
        <p className="text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#FF9500]" />
          Scheduling guidance
        </p>
        <p className="text-xs text-white/90 mt-2">
          ~90% fill rate with 3+ days lead time. Book early for best availability!
        </p>
      </div>
    </>
  )
}

function Page3SidebarContent () {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold">💡 Helpful Tips</h3>
        <div className="mt-2 h-1 w-12 rounded bg-[#FF9500]" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-[#FF9500]">Point of Contact</p>
          <p className="text-xs text-white/90 mt-1">
            Use on-site or meeting host contact, e.g., &quot;Maria Lopez, Radiology Front Desk&quot;
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#FF9500]">Comments Field</p>
          <p className="text-xs text-white/90 mt-1">
            Do not include PHI. Helpful: campus map link, parking code, front-desk phone
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#FF9500]">Cost Center</p>
          <p className="text-xs text-white/90 mt-1">
            Enter code so billing routes correctly
          </p>
        </div>
      </div>

      <div className="rounded-lg border-2 border-amber-400/30 bg-amber-400/10 p-3">
        <p className="text-xs text-white">
          <strong>Almost there!</strong> Just billing and review left.
        </p>
      </div>
    </>
  )
}

function Page4SidebarContent ({ hasClientId }: { hasClientId: boolean }) {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold">💳 Billing & Final Check</h3>
        <div className="mt-2 h-1 w-12 rounded bg-[#FF9500]" />
      </div>

      <div className="rounded-lg bg-white/10 p-4">
        <p className="text-sm font-semibold flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#FF9500]" />
          {hasClientId ? 'Billing on File' : 'Billing Information Required'}
        </p>
        <p className="text-xs text-white/90 mt-2">
          {hasClientId
            ? "We&apos;ll use your existing account billing information."
            : "Since no client ID was provided, please enter billing details."}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Final check reminder:</p>
        <ul className="text-xs space-y-2 text-white/90">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#FF9500] flex-shrink-0 mt-0.5" />
            <span>Confirm date, time, and timezone accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#FF9500] flex-shrink-0 mt-0.5" />
            <span>Verify service type selection</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#FF9500] flex-shrink-0 mt-0.5" />
            <span>Double-check language requirements</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#FF9500] flex-shrink-0 mt-0.5" />
            <span>Confirm location/link accuracy</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border-2 border-green-400/30 bg-green-400/10 p-3">
        <p className="text-sm text-white">
          <strong>Ready to submit!</strong> Review your information and click Submit Request.
        </p>
      </div>
    </>
  )
}

function AIAssistSidebarContent () {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#FF9500]" />
          Paste details to auto-fill
        </h3>
        <div className="mt-2 h-1 w-12 rounded bg-[#FF9500]" />
      </div>

      <p className="text-sm leading-relaxed text-white/90">
        Copy request info from your system (EHR/CRM/email/ticket). We&apos;ll parse date/time, timezone, service type, language(s), address or link, and contact details.
      </p>

      <div className="space-y-3">
        <p className="text-sm font-semibold">What to include:</p>
        <ul className="text-xs space-y-1 text-white/90 list-disc list-inside">
          <li>Languages needed</li>
          <li>Date, time, and timezone</li>
          <li>Location address or video link</li>
          <li>Point of contact</li>
          <li>Onsite instructions</li>
        </ul>
      </div>

      <div className="rounded-lg border-2 border-amber-400/30 bg-amber-400/10 p-3">
        <p className="text-xs text-white">
          <strong>What to exclude:</strong> Do not paste PHI (patient names, DOBs, MRNs, clinical notes)
        </p>
      </div>

      <div className="rounded-lg bg-white/10 p-4">
        <p className="text-sm font-semibold">Next step:</p>
        <p className="text-xs text-white/90 mt-2">
          Click &quot;Use AI to fill out the form&quot;. We&apos;ll pre-fill fields and show anything we couldn&apos;t determine.
        </p>
      </div>
    </>
  )
}
