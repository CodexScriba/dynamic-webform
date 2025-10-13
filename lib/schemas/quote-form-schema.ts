import { z } from 'zod'

import type { QuoteFormValues, ServiceType } from '@/types/quote-form'

const serviceTypeValues: ServiceType[] = ['otp', 'vri', 'onsite']

export const quoteFormSchema = z.object({
  orgName: z.string().min(1, 'Organization name is required'),
  hasAccount: z.boolean(),
  clientId: z.string(),
  requestorName: z.string().min(1, 'Requestor name is required'),
  requestorEmail: z.string(),
  requestorPhone: z.string(),
  serviceType: z
    .union([z.enum(serviceTypeValues), z.literal('')])
    .refine(value => value !== '', { message: 'Select a service type' }),
  timezone: z.string(),
  date: z.string(),
  time: z.string(),
  duration: z.string(),
  address: z.string(),
  locationDetails: z.string(),
  languages: z.array(z.string()),
  preference: z.string(),
  followUpNeeded: z.boolean(),
  pointOfContact: z.string(),
  providerName: z.string(),
  comments: z.string(),
  costCenter: z.string(),
  altPhone: z.string(),
  vriRLCProvidesLink: z.boolean(),
  vriLink: z.string(),
  billingAddress: z.string(),
  billingContactName: z.string(),
  billingPhone: z.string(),
  billingEmail: z.string(),
  aiAssistInput: z.string()
})

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>

export const defaultQuoteFormValues: QuoteFormValues = {
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
  languages: [],
  preference: '',
  followUpNeeded: false,
  pointOfContact: '',
  providerName: '',
  comments: '',
  costCenter: '',
  altPhone: '',
  vriRLCProvidesLink: true,
  vriLink: '',
  billingAddress: '',
  billingContactName: '',
  billingPhone: '',
  billingEmail: '',
  aiAssistInput: ''
}
