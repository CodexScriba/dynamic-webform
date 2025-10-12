import { z } from 'zod'

// Demo-friendly validation - minimal required fields, flexible formats
export const quoteFormSchema = z.object({
  // Organization Information - only orgName required
  orgName: z.string().min(1, 'Organization name is suggested'),
  hasAccount: z.boolean(),
  clientId: z.string().optional(),

  // Requestor Information - only name required
  requestorName: z.string().min(1, 'Requestor name is suggested'),
  requestorEmail: z.string().optional(), // Flexible email format for demo
  requestorPhone: z.string().optional(),

  // Service Details - required for meaningful demo
  serviceType: z.enum(['otp', 'vri', 'onsite', '']),

  // Appointment Details - all optional for demo flow
  timezone: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  duration: z.string().optional(),

  // Location - optional
  address: z.string().optional(),
  locationDetails: z.string().optional(),

  // Languages & Preferences - optional
  languages: z.string().optional(),
  preference: z.string().optional(),

  // VRI Options - optional
  vriRLCProvidesLink: z.boolean(),
  vriLink: z.string().optional(),

  // Contacts - optional
  pointOfContact: z.string().optional(),
  providerName: z.string().optional(),

  // Additional Information - optional
  comments: z.string().optional(),
  costCenter: z.string().optional(),
  altPhone: z.string().optional(),

  // Billing Information - optional
  billingAddress: z.string().optional(),
  billingContactName: z.string().optional(),
  billingPhone: z.string().optional(),
  billingEmail: z.string().optional()
})

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>

export const defaultFormValues: QuoteFormSchema = {
  orgName: '',
  hasAccount: false,
  clientId: '',
  requestorName: '',
  requestorEmail: '',
  requestorPhone: '',
  serviceType: '',
  timezone: '',
  date: '',
  time: '',
  duration: '',
  address: '',
  locationDetails: '',
  languages: '',
  preference: '',
  vriRLCProvidesLink: true,
  vriLink: '',
  pointOfContact: '',
  providerName: '',
  comments: '',
  costCenter: '',
  altPhone: '',
  billingAddress: '',
  billingContactName: '',
  billingPhone: '',
  billingEmail: ''
}
