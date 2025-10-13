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
      <div className="flex-1 space-y-6">
        {aiAssistMode ? (
          <AIAssistSidebarContent />
        ) : currentPage === 1 ? (
          <Page1SidebarContent />
        ) : currentPage === 2 ? (
          <Page2SidebarContent serviceType={serviceType} />
        ) : currentPage === 3 ? (
          <Page3SidebarContent />
        ) : currentPage === 4 ? (
          <Page4SidebarContent hasClientId={hasClientId} />
        ) : (
          <Page5SidebarContent />
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
              className="w-full rounded-lg border-0 bg-gradient-to-br from-[#E67800] to-[#FFA500] px-8 py-5 text-[16px] font-bold uppercase tracking-[0.5px] text-white shadow-[0_4px_15px_rgba(230,120,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:from-[#CC6900] hover:to-[#E67800] hover:bg-transparent hover:shadow-[0_6px_20px_rgba(230,120,0,0.4)] hover:text-white focus-visible:ring-[#E67800]/40"
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
    { icon: Check, title: 'High Success Rate', description: '90% success rate when given 3 days or more lead time. Early booking recommended!' },
    { icon: Star, title: 'Risk-Free Booking', description: 'Free cancellation up to 24 hours before appointment. No penalties.' },
    { icon: Zap, title: 'Flexible Service Options', description: 'Video, phone, and on-site interpretation available across 200+ languages.' }
  ]

  return (
    <>
      <div className="inline-block">
        <h3 className="relative text-[32px] font-bold pl-[24px]">
          <span className="absolute left-0 top-0 h-full w-[5px] rounded bg-[#E67800]" />
          Why Choose Us?
        </h3>
      </div>
      <div className="mt-8 space-y-6">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-lg border-l-[3px] border-[#E67800] bg-white/10 p-5 transition-all duration-300 hover:translate-x-1 hover:bg-white/20"
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#E67800] to-[#FFA500] shadow-lg">
              <Icon className="size-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h4 className="text-[18px] font-semibold text-white">{title}</h4>
              <p className="text-[16px] leading-relaxed text-white/90">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-6 flex flex-wrap gap-3 max-w-[420px]">
        <div className="rounded-full border border-[#E67800]/40 bg-[#E67800]/20 px-3.5 py-1.5 text-[11px] font-semibold text-[#FFB347]">
          ISO Certified
        </div>
        <div className="rounded-full border border-[#E67800]/40 bg-[#E67800]/20 px-3.5 py-1.5 text-[11px] font-semibold text-[#FFB347]">
          200+ Languages
        </div>
        <div className="rounded-full border border-[#E67800]/40 bg-[#E67800]/20 px-3.5 py-1.5 text-[11px] font-semibold text-[#FFB347]">
          HIPAA Compliant
        </div>
      </div>
    </>
  )
}

function Page2SidebarContent ({ serviceType }: { serviceType: string }) {
  return (
    <>
      <div>
        <h3 className="text-[28px] font-bold">
          {serviceType === 'vri' ? 'VRI Setup Tips' :
           serviceType === 'otp' ? 'Phone Tips' :
           serviceType === 'onsite' ? 'On-Site Guide' :
           'Service Selection'}
        </h3>
        <div className="mt-3 h-1 w-12 rounded bg-[#E67800]" />
      </div>

      {!serviceType && (
        <div className="mt-6 space-y-6">
          <p className="text-[16px] leading-relaxed text-white/95">
            Select the service type that best fits your needs. Each option offers professional interpretation with qualified interpreters.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-white/10 p-4 border-l-4 border-[#E67800]">
              <p className="text-base font-semibold text-white mb-1">Over-the-Phone</p>
              <p className="text-sm text-white/85">Best for quick consultations and phone appointments. Instant availability for most languages.</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 border-l-4 border-[#E67800]">
              <p className="text-base font-semibold text-white mb-1">Video/VRI</p>
              <p className="text-sm text-white/85">Ideal for visual communication needs. HIPAA-compliant platform provided or use your own.</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 border-l-4 border-[#E67800]">
              <p className="text-base font-semibold text-white mb-1">Onsite</p>
              <p className="text-sm text-white/85">Professional in-person interpreters. Perfect for medical procedures, legal proceedings, and critical meetings.</p>
            </div>
          </div>
        </div>
      )}

      {serviceType === 'vri' && (
        <div className="mt-6 space-y-6">
          <p className="text-[16px] leading-relaxed text-white/95">
            Video Remote Interpretation (VRI) combines the convenience of remote services with visual communication.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-white/10 p-4 border border-white/20">
              <p className="text-base font-semibold text-white mb-2">Platform Options</p>
              <p className="text-sm text-white/85 leading-relaxed">
                Choose whether we provide a HIPAA-compliant video link or you&apos;ll use your own platform. Both options ensure security and quality.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 border border-white/20">
              <p className="text-base font-semibold text-white mb-2">Best Practices</p>
              <ul className="space-y-2 text-sm text-white/85">
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Join 5 minutes early to test audio/video</li>
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Ensure good lighting and stable internet</li>
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Position camera at eye level</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {serviceType === 'otp' && (
        <div className="mt-6 space-y-6">
          <p className="text-[16px] leading-relaxed text-white/95">
            Over-the-phone interpretation provides quick access to professional interpreters for immediate communication needs.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-white/10 p-4 border border-white/20">
              <p className="text-base font-semibold text-white mb-2">Environment Setup</p>
              <p className="text-sm text-white/85 leading-relaxed">
                Find a quiet room to ensure the best call quality. Background noise can interfere with interpretation accuracy.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 border border-white/20">
              <p className="text-base font-semibold text-white mb-2">Preparation Tips</p>
              <ul className="space-y-2 text-sm text-white/85">
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Have backup contact number ready</li>
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Test phone line before appointment</li>
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Speak clearly and at moderate pace</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {serviceType === 'onsite' && (
        <div className="mt-6 space-y-6">
          <p className="text-[16px] leading-relaxed text-white/95">
            Professional in-person interpreters provide the highest level of communication support for critical situations.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-white/10 p-4 border border-white/20">
              <p className="text-base font-semibold text-white mb-2">Location Information</p>
              <p className="text-sm text-white/85 leading-relaxed">
                Provide detailed location info: building name, department, floor, suite/room number, and parking instructions.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 border border-white/20">
              <p className="text-base font-semibold text-white mb-2">Arrival Details</p>
              <ul className="space-y-2 text-sm text-white/85">
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Include check-in procedures</li>
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Specify parking or public transit options</li>
                <li className="flex gap-2"><span className="text-[#E67800]">•</span> Note any security requirements</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-lg bg-gradient-to-r from-[#E67800]/20 to-[#FFA500]/20 p-4 border border-[#E67800]/30">
        <p className="text-base font-semibold flex items-center gap-2 text-white">
          <Clock className="h-4 w-4 text-[#E67800]" />
          Scheduling Tip
        </p>
        <p className="text-sm text-white/90 mt-2 leading-relaxed">
          Book at least 3 days in advance for ~90% fill rate. Rush requests available for urgent needs.
        </p>
      </div>
    </>
  )
}

function Page3SidebarContent () {
  return (
    <>
      <div>
        <h3 className="text-[28px] font-bold">Location Guide</h3>
        <div className="mt-3 h-1 w-12 rounded bg-[#E67800]" />
      </div>

      <p className="mt-6 text-[16px] leading-relaxed text-white/95">
        Accurate location and contact details ensure interpreters arrive at the right place and time.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">Location Best Practices</p>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-[#E67800]">•</span> Include full street address</li>
            <li className="flex gap-2"><span className="text-[#E67800]">•</span> Specify building name and entrance</li>
            <li className="flex gap-2"><span className="text-[#E67800]">•</span> Note department, floor, and room number</li>
            <li className="flex gap-2"><span className="text-[#E67800]">•</span> Add parking or transit instructions</li>
          </ul>
        </div>

        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">Point of Contact</p>
          <p className="text-sm text-white/85 leading-relaxed">
            Provide the on-site contact who will meet or coordinate with the interpreter. Example: &quot;Maria Lopez, Radiology Front Desk, ext. 2455&quot;
          </p>
        </div>

        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">Provider Information</p>
          <p className="text-sm text-white/85 leading-relaxed">
            Include the doctor or provider name for medical appointments. This helps our interpreters prepare appropriately.
          </p>
        </div>


      </div>


    </>
  )
}

function Page4SidebarContent ({ hasClientId }: { hasClientId: boolean }) {
  return (
    <>
      <div>
        <h3 className="text-[28px] font-bold">Billing Details</h3>
        <div className="mt-3 h-1 w-12 rounded bg-[#E67800]" />
      </div>

      <p className="mt-6 text-[16px] leading-relaxed text-white/95">
        {hasClientId
          ? "We'll use your existing account information for billing."
          : "Provide billing details for new customer setup."}
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold flex items-center gap-2 text-white mb-2">
            <Shield className="h-4 w-4 text-[#E67800]" />
            {hasClientId ? 'Existing Customer' : 'New Customer Setup'}
          </p>
          <p className="text-sm text-white/85 leading-relaxed">
            {hasClientId
              ? "Your billing information is securely stored. We'll use it for this request."
              : "First-time customers need to provide billing details. This information is securely encrypted and stored."}
          </p>
        </div>

        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">Cost Center</p>
          <p className="text-sm text-white/85 leading-relaxed">
            If your organization uses cost centers or department codes for billing allocation, enter it here to ensure proper routing.
          </p>
        </div>

        {!hasClientId && (
          <div className="rounded-lg bg-white/10 p-4 border border-white/20">
            <p className="text-base font-semibold text-white mb-2">Security & Privacy</p>
            <ul className="space-y-2 text-sm text-white/85">
              <li className="flex gap-2"><span className="text-[#E67800]">•</span> All data encrypted in transit and at rest</li>
              <li className="flex gap-2"><span className="text-[#E67800]">•</span> PCI DSS compliant payment processing</li>
              <li className="flex gap-2"><span className="text-[#E67800]">•</span> HIPAA-compliant data handling</li>
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-lg border-2 border-amber-400/30 bg-amber-400/10 p-4">
        <p className="text-base font-semibold text-white mb-1">Almost Done!</p>
        <p className="text-sm text-white/90">
          One more step: Review all your information before final submission.
        </p>
      </div>
    </>
  )
}

function Page5SidebarContent () {
  return (
    <>
      <div>
        <h3 className="text-[28px] font-bold">Final Review</h3>
        <div className="mt-3 h-1 w-12 rounded bg-[#E67800]" />
      </div>

      <p className="mt-6 text-[16px] leading-relaxed text-white/95">
        Review all information carefully before submitting your quote request.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">Pre-Submission Checklist</p>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-[#E67800]">✓</span> Date, time, and timezone are correct</li>
            <li className="flex gap-2"><span className="text-[#E67800]">✓</span> Service type matches your needs</li>
            <li className="flex gap-2"><span className="text-[#E67800]">✓</span> Language requirements are accurate</li>
            <li className="flex gap-2"><span className="text-[#E67800]">✓</span> Location details are complete</li>
            <li className="flex gap-2"><span className="text-[#E67800]">✓</span> Contact information is current</li>
          </ul>
        </div>

        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">What Happens Next?</p>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-[#E67800]">1.</span> We review your request</li>
            <li className="flex gap-2"><span className="text-[#E67800]">2.</span> Confirm interpreter availability</li>
            <li className="flex gap-2"><span className="text-[#E67800]">3.</span> Send confirmation within 24 hours</li>
            <li className="flex gap-2"><span className="text-[#E67800]">4.</span> Reminder sent before appointment</li>
          </ul>
        </div>

        <div className="rounded-lg bg-white/10 p-4 border border-white/20">
          <p className="text-base font-semibold text-white mb-2">Need Changes?</p>
          <p className="text-sm text-white/85 leading-relaxed">
            Use the &quot;Back&quot; button to edit any section. All your information is saved as you navigate.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border-2 border-green-400/30 bg-green-400/10 p-4">
        <p className="text-base font-semibold text-white mb-1 flex items-center gap-2">
          <Check className="h-4 w-4 text-green-400" />
          Ready to Submit!
        </p>
        <p className="text-sm text-white/90">
          Click &quot;Complete&quot; below to submit your quote request. We&apos;ll respond shortly!
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
          <Sparkles className="h-6 w-6 text-[#E67800]" />
          Paste details to auto-fill
        </h3>
        <div className="mt-2 h-1 w-12 rounded bg-[#E67800]" />
      </div>

      <p className="text-base leading-relaxed text-white/90">
        Copy request info from your system (EHR/CRM/email/ticket). We&apos;ll parse date/time, timezone, service type, language(s), address or link, and contact details.
      </p>

      <div className="space-y-3">
        <p className="text-base font-semibold">What to include:</p>
        <ul className="text-sm space-y-1 text-white/90 list-disc list-inside">
          <li>Languages needed</li>
          <li>Date, time, and timezone</li>
          <li>Location address or video link</li>
          <li>Point of contact</li>
          <li>Onsite instructions</li>
        </ul>
      </div>

      <div className="rounded-lg border-2 border-amber-400/30 bg-amber-400/10 p-3">
        <p className="text-sm text-white">
          <strong>What to exclude:</strong> Do not paste PHI (patient names, DOBs, MRNs, clinical notes)
        </p>
      </div>

      <div className="rounded-lg bg-white/10 p-4">
        <p className="text-base font-semibold">Next step:</p>
        <p className="text-sm text-white/90 mt-2">
          Click &quot;Use AI to fill out the form&quot;. We&apos;ll pre-fill fields and show anything we couldn&apos;t determine.
        </p>
      </div>
    </>
  )
}
