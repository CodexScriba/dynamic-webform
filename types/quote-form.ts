export type ServiceType = 'otp' | 'vri' | 'onsite'

export interface QuoteFormValues {
  orgName: string
  hasAccount: boolean
  clientId: string
  requestorName: string
  requestorEmail: string
  requestorPhone: string
  serviceType: ServiceType | ''
  timezone: string
  date: string
  time: string
  duration: string
  address: string
  locationDetails: string
  languages: string[]
  preference: string
  followUpNeeded: boolean
  pointOfContact: string
  providerName: string
  comments: string
  costCenter: string
  altPhone: string
  vriRLCProvidesLink: boolean
  vriLink: string
  billingAddress: string
  billingContactName: string
  billingPhone: string
  billingEmail: string
  aiAssistInput: string
}

export interface QuoteFormDraftPayload {
  updatedAt: number
  currentPage: number
  aiAssistMode: boolean
  values: QuoteFormValues
}

export interface AiParseRequestBody {
  aiAssistInput: string
}

export interface AiParseResult {
  success: boolean
  fields: Partial<QuoteFormValues>
  errors?: string[]
}
