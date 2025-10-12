export interface QuoteFormData {
  // Organization Information
  orgName: string
  hasAccount: boolean
  clientId: string

  // Requestor Information
  requestorName: string
  requestorEmail: string
  requestorPhone: string

  // Service Details
  serviceType: 'otp' | 'vri' | 'onsite' | ''

  // Appointment Details
  timezone: string
  date: string
  time: string
  duration: string

  // Location
  address: string
  locationDetails: string

  // Languages & Preferences
  languages: string
  preference: string

  // VRI Options
  vriRLCProvidesLink: boolean
  vriLink: string

  // Contacts
  pointOfContact: string
  providerName: string

  // Additional Information
  comments: string
  costCenter: string
  altPhone: string

  // Billing Information
  billingAddress: string
  billingContactName: string
  billingPhone: string
  billingEmail: string
}

export interface ParsedQuoteFields {
  success: boolean
  fields: Partial<QuoteFormData>
  errors?: string[]
}

export type ServiceType = 'otp' | 'vri' | 'onsite'

export interface StepData {
  number: number
  title: string
  description: string
}
