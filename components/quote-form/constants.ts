import { CalendarClock, Headset, MapPinned, Video } from 'lucide-react'

import type { ServiceType } from '@/types/quote-form'

export const SERVICE_TYPE_OPTIONS: Array<{ id: ServiceType; label: string; description: string; icon: typeof Headset }> = [
  {
    id: 'otp',
    label: 'Over-the-Phone',
    description: 'Fast connections for remote interpreting',
    icon: Headset
  },
  {
    id: 'vri',
    label: 'Video (VRI)',
    description: 'HIPAA-compliant on-demand video sessions',
    icon: Video
  },
  {
    id: 'onsite',
    label: 'Onsite',
    description: 'Interpreter arrives at your location',
    icon: MapPinned
  }
]

export const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern (ET)' },
  { value: 'America/Chicago', label: 'Central (CT)' },
  { value: 'America/Denver', label: 'Mountain (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific (PT)' },
  { value: 'America/Phoenix', label: 'Arizona (MST)' },
  { value: 'America/Anchorage', label: 'Alaska (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii (HST)' },
  { value: 'UTC', label: 'UTC' }
]

export const DURATION_OPTIONS = [
  { value: '0.5', label: '30 minutes' },
  { value: '1', label: '1 hour' },
  { value: '1.5', label: '1.5 hours' },
  { value: '2', label: '2 hours' },
  { value: '3', label: '3 hours' },
  { value: '4', label: '4 hours' },
  { value: '8', label: 'Full day (8 hours)' }
]

export const LANGUAGE_OPTIONS = [
  'Spanish',
  'American Sign Language (ASL)',
  'Mandarin',
  'Cantonese',
  'Arabic',
  'Vietnamese',
  'French',
  'Russian',
  'Tagalog',
  'German',
  'Korean',
  'Hindi'
]

export const PREFERENCE_OPTIONS = [
  { value: 'first-available', label: 'First available interpreter' },
  { value: 'specific-provider', label: 'Specific interpreter requested' },
  { value: 'gender-preference', label: 'Gender preference noted' }
]

export const PAGE_DESCRIPTIONS = [
  {
    id: 1,
    title: 'Basics',
    description: 'Organization and requestor information'
  },
  {
    id: 2,
    title: 'Appointment',
    description: 'Scheduling and location details'
  },
  {
    id: 3,
    title: 'Contacts',
    description: 'Day-of contacts and notes'
  },
  {
    id: 4,
    title: 'Review',
    description: 'Billing details and confirmation'
  }
]

export const FOLLOW_UP_OPTIONS = [
  { value: true, label: 'Yes, contact me with a quote' },
  { value: false, label: 'No, I will follow up later' }
]

export const APPOINTMENT_ICONS = {
  timezone: CalendarClock
}
