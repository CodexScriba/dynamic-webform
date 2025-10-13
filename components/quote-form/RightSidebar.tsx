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
  const renderContent = () => {
    if (aiAssistMode) {
      return (
        <div className='space-y-4'>
          <div>
            <h3 className='text-lg font-semibold text-[#002060]'>Paste details to auto-fill</h3>
            <p className='text-sm text-slate-500'>Copy scheduling details from your system. We will map the essentials and highlight anything missing.</p>
          </div>
          <div className='space-y-3 rounded-2xl bg-white p-4 shadow-inner'>
            <p className='text-sm font-semibold text-[#002060]'>Include</p>
            <ul className='space-y-1 text-xs text-slate-500'>
              <li>• Service type, date, time, and timezone</li>
              <li>• Languages requested</li>
              <li>• Location or video link</li>
              <li>• Day-of contact name and phone</li>
            </ul>
            <p className='text-xs font-medium text-[#7C4A00]'>Exclude patient identifiers or clinical notes (PHI).</p>
          </div>
          <div className='rounded-2xl border border-[#FF9500]/30 bg-[#FFFAF2] p-3 text-xs text-[#7C4A00]'>
            After parsing you can fine-tune fields on any page before submitting.
          </div>
        </div>
      )
    }

    switch (currentPage) {
      case 1:
        return (
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold text-[#002060]'>Why us?</h3>
              <p className='text-sm text-slate-500'>Trusted by insurance carriers and Fortune 500 organizations.</p>
            </div>
            <ul className='space-y-2 rounded-2xl bg-white p-4 shadow-inner'>
              <li className='text-sm text-[#002060]'>📅 <span className='font-semibold'>High Success Rate</span> · 90% fill with 3+ days notice</li>
              <li className='text-sm text-[#002060]'>💰 <span className='font-semibold'>Risk-Free Booking</span> · Free cancellation up to 24 hours</li>
              <li className='text-sm text-[#002060]'>📱 <span className='font-semibold'>Flexible Options</span> · Video, phone, onsite availability</li>
            </ul>
            <div className='space-y-2 rounded-2xl bg-slate-50 p-4 shadow-inner'>
              <p className='text-sm font-semibold text-[#002060]'>What you will need</p>
              <ul className='space-y-1 text-xs text-slate-500'>
                <li>• Appointment date and timezone</li>
                <li>• Language(s) requested</li>
                <li>• Point of contact and backup number</li>
                <li>• Address or meeting link</li>
              </ul>
              <p className='text-xs font-medium text-[#7C4A00]'>Privacy reminder: refrain from sharing PHI such as patient names or MRNs.</p>
            </div>
          </div>
        )
      case 2:
        if (serviceType === 'vri') {
          return (
            <div className='space-y-4 rounded-2xl bg-slate-50 p-4 shadow-inner'>
              <p className='text-sm font-semibold text-[#002060]'>VRI Setup Tips</p>
              <ul className='space-y-1 text-xs text-slate-500'>
                <li>• Toggle “RLC provides link” if you want us to send the secure link.</li>
                <li>• If you host, paste the exact video link and admit the interpreter.</li>
                <li>• Join 5 minutes early to verify audio/video.</li>
              </ul>
            </div>
          )
        }

        if (serviceType === 'otp') {
          return (
            <div className='space-y-3 rounded-2xl bg-slate-50 p-4 shadow-inner'>
              <p className='text-sm font-semibold text-[#002060]'>Phone Interpreting Tips</p>
              <p className='text-xs text-slate-500'>Have a quiet space and a backup number ready in case the connection drops.</p>
            </div>
          )
        }

        if (serviceType === 'onsite') {
          return (
            <div className='space-y-3 rounded-2xl bg-slate-50 p-4 shadow-inner'>
              <p className='text-sm font-semibold text-[#002060]'>Onsite Checklist</p>
              <ul className='space-y-1 text-xs text-slate-500'>
                <li>• Share building, floor, and room details.</li>
                <li>• Include parking and entry instructions.</li>
                <li>• Provide a point of contact available on arrival.</li>
              </ul>
            </div>
          )
        }

        return (
          <div className='space-y-3 rounded-2xl bg-slate-50 p-4 shadow-inner'>
            <p className='text-sm font-semibold text-[#002060]'>Scheduling guidance</p>
            <p className='text-xs text-slate-500'>We fill ~90% of requests when submitted 3+ days in advance. Urgent requests are routed immediately.</p>
          </div>
        )
      case 3:
        return (
          <div className='space-y-4 rounded-2xl bg-slate-50 p-4 shadow-inner'>
            <p className='text-sm font-semibold text-[#002060]'>Contacts & Notes</p>
            <ul className='space-y-1 text-xs text-slate-500'>
              <li>• Point of contact should be reachable during the appointment.</li>
              <li>• Share parking codes, building maps, or intake instructions.</li>
              <li>• Avoid PHI; keep details operational.</li>
            </ul>
          </div>
        )
      case 4:
      default:
        return (
          <div className='space-y-4 rounded-2xl bg-slate-50 p-4 shadow-inner'>
            <p className='text-sm font-semibold text-[#002060]'>Final check</p>
            <ul className='space-y-1 text-xs text-slate-500'>
              <li>• Confirm date, time, and timezone accuracy.</li>
              <li>• Review languages and access instructions.</li>
              <li>• {hasClientId ? 'Billing on file will be used for this request.' : 'Enter billing contacts so invoices route correctly.'}</li>
            </ul>
          </div>
        )
    }
  }

  return (
    <aside className='flex h-full flex-col justify-between bg-[#F7F9FF] p-6'>
      <div className='space-y-6'>{renderContent()}</div>
      <div className='mt-8 space-y-3'>
        <Button
          onClick={() => onSubmit()}
          disabled={!canSubmit || isSubmitting}
          className='w-full rounded-lg bg-[#002060] py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,32,96,0.25)] hover:bg-[#001540] disabled:opacity-50'
        >
          {isSubmitting ? 'Submitting…' : 'Submit Request'}
        </Button>
        <Button onClick={onAiAssistToggle} variant='outline' className='w-full rounded-lg border-[#FF9500] text-sm font-semibold text-[#FF9500] hover:bg-[#FF9500]/10'>
          {aiAssistMode ? 'Return to form' : 'AI Assisted Submit'}
        </Button>
        <Button onClick={onRefresh} variant='ghost' className='w-full text-sm font-semibold text-[#002060] hover:text-[#FF9500]'>
          Refresh form
        </Button>
      </div>
    </aside>
  )
}
