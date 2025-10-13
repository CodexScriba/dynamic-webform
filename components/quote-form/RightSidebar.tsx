import { Button } from '@/components/ui/button'
import type { ServiceType } from '@/types/quote-form'

interface RightSidebarProps {
  currentPage: number
  serviceType: ServiceType | ''
  aiAssistMode: boolean
  hasClientId: boolean
  canSubmit: boolean
  isSubmitting: boolean
  onSubmit: () => void
  onAiAssistToggle: () => void
  onRefresh: () => void
}

const FEATURE_CALLOUTS = [
  {
    emoji: '📅',
    title: 'High Success Rate',
    description: '90% fill when requests arrive 3+ days ahead.'
  },
  {
    emoji: '💰',
    title: 'Risk-Free Booking',
    description: 'Free cancellation up to 24 hours before the appointment.'
  },
  {
    emoji: '📱',
    title: 'Flexible Options',
    description: 'Video, phone, and onsite interpreters available nationwide.'
  }
]

const BADGES = ['ISO Certified', 'Onsite Specialists', '24/7 Availability']

export const RightSidebar = ({
  currentPage,
  serviceType,
  aiAssistMode,
  hasClientId,
  canSubmit,
  isSubmitting,
  onSubmit,
  onAiAssistToggle,
  onRefresh
}: RightSidebarProps) => {
  const renderGuidance = () => {
    if (aiAssistMode) {
      return (
        <div className='space-y-4 rounded-2xl border border-[#FF9500]/30 bg-[#FFFAF2] p-4 text-sm text-[#7C4A00]'>
          <div className='text-base font-semibold text-[#7C4A00]'>AI Assist tips</div>
          <ul className='space-y-1 text-xs'>
            <li>• Paste service type, date, time, and timezone.</li>
            <li>• List languages, location or meeting link, and point of contact.</li>
            <li>• Leave out PHI such as patient names or record numbers.</li>
          </ul>
          <p className='text-xs'>After parsing, review the form pages to confirm details before submitting.</p>
        </div>
      )
    }

    switch (currentPage) {
      case 1:
        return (
          <div className='space-y-3 rounded-2xl bg-white p-4 shadow-inner'>
            <div className='text-sm font-semibold text-[#002060]'>What you will need</div>
            <ul className='space-y-1 text-xs text-slate-500'>
              <li>• Appointment date, time, and timezone</li>
              <li>• Language(s) requested</li>
              <li>• Point of contact and backup number</li>
              <li>• Address or meeting link</li>
            </ul>
            <p className='text-xs font-medium text-[#7C4A00]'>Reminder: do not include PHI such as patient names or MRNs.</p>
          </div>
        )
      case 2:
        if (serviceType === 'vri') {
          return (
            <div className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
              <div className='text-sm font-semibold text-[#002060]'>VRI setup</div>
              <ul className='space-y-1 text-xs text-slate-500'>
                <li>• Toggle on if Random Language Company should send the secure link.</li>
                <li>• If you host, paste the exact video link and admit the interpreter promptly.</li>
                <li>• Join 5 minutes early to check audio/video.</li>
              </ul>
            </div>
          )
        }

        if (serviceType === 'otp') {
          return (
            <div className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
              <div className='text-sm font-semibold text-[#002060]'>Over-the-phone tips</div>
              <p className='text-xs text-slate-500'>Have a quiet room and a backup number ready in case the line drops.</p>
            </div>
          )
        }

        if (serviceType === 'onsite') {
          return (
            <div className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
              <div className='text-sm font-semibold text-[#002060]'>Onsite checklist</div>
              <ul className='space-y-1 text-xs text-slate-500'>
                <li>• Share building, floor, and room details.</li>
                <li>• Include parking or security instructions.</li>
                <li>• Provide a contact reachable on arrival.</li>
              </ul>
            </div>
          )
        }

        return (
          <div className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
            <div className='text-sm font-semibold text-[#002060]'>Scheduling guidance</div>
            <p className='text-xs text-slate-500'>We fill ~90% of requests when submitted 3+ days in advance. Urgent requests are routed immediately.</p>
          </div>
        )
      case 3:
        return (
          <div className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
            <div className='text-sm font-semibold text-[#002060]'>Contacts & notes</div>
            <ul className='space-y-1 text-xs text-slate-500'>
              <li>• Point of contact should be reachable during the appointment.</li>
              <li>• Add parking codes, maps, or dial-in instructions.</li>
              <li>• Keep comments operational—avoid PHI.</li>
            </ul>
          </div>
        )
      case 4:
      default:
        return (
          <div className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
            <div className='text-sm font-semibold text-[#002060]'>Final check</div>
            <ul className='space-y-1 text-xs text-slate-500'>
              <li>• Confirm date, time, and timezone accuracy.</li>
              <li>• Review language list and location/link.</li>
              <li>• {hasClientId ? 'We will use the billing details already on file.' : 'Enter billing contacts so invoices route correctly.'}</li>
            </ul>
          </div>
        )
    }
  }

  return (
    <aside className='flex h-full flex-col justify-between bg-[#F7F9FF] p-6'>
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold text-[#002060]'>Why work with us?</h3>
          <p className='text-sm text-slate-500'>Trusted by healthcare networks, insurers, and Fortune 500 teams.</p>
        </div>
        <div className='space-y-3 rounded-2xl bg-white p-4 shadow-inner'>
          {FEATURE_CALLOUTS.map(feature => (
            <div key={feature.title} className='flex gap-3'>
              <span className='text-lg'>{feature.emoji}</span>
              <div>
                <div className='text-sm font-semibold text-[#002060]'>{feature.title}</div>
                <p className='text-xs text-slate-500'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-2 text-xs font-semibold text-[#002060]'>
          {BADGES.map(badge => (
            <span key={badge} className='rounded-full bg-slate-100 px-3 py-1 shadow-inner'>
              {badge}
            </span>
          ))}
        </div>
        {renderGuidance()}
      </div>

      <div className='mt-8 space-y-3'>
        <Button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className='w-full rounded-lg bg-[#002060] py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,32,96,0.25)] hover:bg-[#001540] disabled:opacity-50'
        >
          {isSubmitting ? 'Submitting…' : 'Submit Request'}
        </Button>
        <Button
          onClick={onAiAssistToggle}
          variant='outline'
          className='w-full rounded-lg border-[#FF9500] text-sm font-semibold text-[#FF9500] hover:bg-[#FF9500]/10'
        >
          {aiAssistMode ? 'Return to form' : 'AI Assisted Submit'}
        </Button>
        <Button
          onClick={onRefresh}
          variant='ghost'
          className='w-full text-sm font-semibold text-[#002060] hover:text-[#FF9500]'
        >
          Refresh form
        </Button>
      </div>
    </aside>
  )
}
