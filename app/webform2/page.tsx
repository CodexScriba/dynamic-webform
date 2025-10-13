"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Calendar, Check, Clock, DollarSign, FileText, Globe, Hash, Link as LinkIcon, Mail, Phone, Star, UserRound, Video, MapPin, Zap } from "lucide-react"
import { useForm } from "react-hook-form"

const FEATURES = [
  {
    icon: Check,
    title: "📅 High Success Rate",
    description: "90% success rate when given 3 days or more.",
  },
  {
    icon: Star,
    title: "💰 Risk-Free Booking",
    description: "Free cancellation up to 24 hours.",
  },
  {
    icon: Zap,
    title: "📱 Flexible Service Options",
    description: "Video, phone, and on-site interpretation available.",
  },
] as const

const SERVICE_TYPES = [
  { id: "phone", label: "Over-the-Phone", icon: Phone },
  { id: "video", label: "Video Schedule", icon: Video },
  { id: "onsite", label: "ONSITE", icon: MapPin },
] as const

const TIMEZONES = [
  { value: "America/New_York", label: "America/New York (EST/EDT)" },
  { value: "America/Chicago", label: "America/Chicago (CST/CDT)" },
  { value: "America/Denver", label: "America/Denver (MST/MDT)" },
  { value: "America/Los_Angeles", label: "America/Los Angeles (PST/PDT)" },
  { value: "America/Phoenix", label: "America/Phoenix (MST)" },
  { value: "America/Anchorage", label: "America/Anchorage (AKST/AKDT)" },
  { value: "Pacific/Honolulu", label: "Pacific/Honolulu (HST)" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
] as const

const DURATION_OPTIONS = [
  { value: "0.5", label: "0.5 hours (30 min)" },
  { value: "1", label: "1 hour" },
  { value: "1.5", label: "1.5 hours" },
  { value: "2", label: "2 hours" },
  { value: "2.5", label: "2.5 hours" },
  { value: "3", label: "3 hours" },
  { value: "4", label: "4 hours" },
  { value: "8", label: "8 hours (full day)" },
] as const

const labelClasses = "text-sm font-medium text-slate-600"
const inputClasses =
  "h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
const fieldIconClasses =
  "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
type RequestQuoteFormValues = {
  organizationName: string
  clientId: string
  requestorName: string
  requestorEmail: string
  requestorPhone: string
  serviceType: string
  language: string
  preferredInterpreter: string
  interpreterName: string
  interpreterGender: string
  appointmentDetails: string
  checkInInstructions: string
  // Appointment Info
  address: string
  timezone: string
  appointmentDate: string
  appointmentTime: string
  estimatedDuration: string
  // VRI Options
  vriLinkOption: string
  vriCustomLink: string
  // Additional
  pointOfContactName: string
  onsiteContactName: string
  doctorName: string
  additionalComments: string
  costCenterNumber: string
  facilityPhoneNumber: string
  billingAddress: string
  billingContactName: string
  billingContactPhone: string
  billingContactEmail: string
}

const Page = () => {
  const form = useForm<RequestQuoteFormValues>({
    defaultValues: {
      organizationName: "",
      clientId: "",
      requestorName: "",
      requestorEmail: "",
      requestorPhone: "",
      serviceType: "",
      language: "",
      preferredInterpreter: "false",
      interpreterName: "",
      interpreterGender: "",
      appointmentDetails: "",
      checkInInstructions: "",
      address: "",
      timezone: "",
      appointmentDate: "",
      appointmentTime: "",
      estimatedDuration: "",
      vriLinkOption: "lls",
      vriCustomLink: "",
      pointOfContactName: "",
      onsiteContactName: "",
      doctorName: "",
      additionalComments: "",
      costCenterNumber: "",
      facilityPhoneNumber: "",
      billingAddress: "",
      billingContactName: "",
      billingContactPhone: "",
      billingContactEmail: "",
    },
  })

  const preferredInterpreter = form.watch("preferredInterpreter")
  const serviceType = form.watch("serviceType")
  const vriLinkOption = form.watch("vriLinkOption")

  const handleSubmit = (values: RequestQuoteFormValues) => {
    console.log("Request quote submission", values)
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <div className="relative w-full max-w-5xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-0 top-4 -z-10 rounded-[40px] bg-gradient-to-b from-[#f0f2f5]/0 via-[#f0f2f5]/70 to-[#f0f2f5]"
          />

          <div className="relative overflow-hidden rounded-[28px] bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-sm ring-1 ring-white/40 ring-inset md:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.45)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f0f2f5]/80 via-white/50 to-transparent"
            />

            <div className="relative z-10 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#002060]">Request a Quote</h2>
              <div className="mt-3 h-1 w-[60px] rounded bg-[#E67800]" />
              <p className="mt-3 text-sm leading-[1.7] text-[#666666]">
                Connect with our expert team for professional language services
              </p>
              <Form {...form}>
                <form
                  className="mt-8 space-y-8"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  noValidate
                >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Name of your company/organization</FormLabel>
                        <div className="relative">
                          <UserRound className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              placeholder="Enter organization name"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Client ID (if applicable)</FormLabel>
                        <div className="relative">
                          <Hash className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              placeholder="Enter client ID"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requestorName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Requestor Name</FormLabel>
                        <div className="relative">
                          <UserRound className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              placeholder="Enter requestor name"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requestorEmail"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>
                          Requestor Email Address
                        </FormLabel>
                        <div className="relative">
                          <Mail className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="requestor@company.com"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requestorPhone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>
                          Requestor Phone Number
                        </FormLabel>
                        <div className="relative">
                          <Phone className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Service Details Section */}
                <div className="space-y-6 border-t border-slate-200 pt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">Service Details</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
                  </div>

                  {/* Service Type */}
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className={labelClasses}>Service Type</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-3 gap-3">
                            {SERVICE_TYPES.map((service) => {
                              const Icon = service.icon
                              const isSelected = field.value === service.id
                              return (
                                <button
                                  key={service.id}
                                  type="button"
                                  onClick={() => {
                                    field.onChange(service.id)
                                  }}
                                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                                    isSelected
                                      ? "border-[#E67800] bg-[#E67800]/10 shadow-md"
                                      : "border-slate-200 bg-white hover:border-[#E67800]/50 hover:bg-slate-50"
                                  }`}
                                >
                                  <Icon
                                    className={`size-6 ${isSelected ? "text-[#E67800]" : "text-slate-600"}`}
                                  />
                                  <span
                                    className={`text-sm font-medium ${
                                      isSelected ? "text-[#E67800]" : "text-slate-700"
                                    }`}
                                  >
                                    {service.label}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Language, Gender Preference, and Preferred Interpreter - Single Row */}
                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Language</FormLabel>
                          <div className="relative">
                            <Globe className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                placeholder="e.g., Spanish, Mandarin"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interpreterGender"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>
                            Interpreter Gender Preference
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#E67800]/40 focus:ring-offset-0">
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="no-preference">Rather not say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredInterpreter"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>
                            Preferred Interpreter
                          </FormLabel>
                          <div className="flex h-11 items-center rounded-2xl border-none bg-slate-50 px-4 shadow-inner">
                            <FormControl>
                              <Switch
                                checked={field.value === "true"}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked ? "true" : "false")
                                  if (!checked) {
                                    form.setValue("interpreterName", "")
                                  }
                                }}
                                className="data-[state=checked]:bg-[#E67800]"
                              />
                            </FormControl>
                            <span className="ml-3 text-sm font-medium text-slate-700">
                              {field.value === "true" ? "Yes" : "No"}
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Conditional Interpreter Name */}
                  {preferredInterpreter === "true" && (
                    <FormField
                      control={form.control}
                      name="interpreterName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Interpreter Name</FormLabel>
                          <div className="relative">
                            <UserRound className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                placeholder="Enter interpreter name"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Appointment Details */}
                  <FormField
                    control={form.control}
                    name="appointmentDetails"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>
                          Appointment General Details
                        </FormLabel>
                        <div className="relative">
                          <FileText className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              placeholder="Follow-up, Consultation..."
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Point of Contact and Onsite Contact Name */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pointOfContactName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Name of Point of Contact</FormLabel>
                          <div className="relative">
                            <UserRound className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                placeholder="Enter point of contact name"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="onsiteContactName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Name of onsite contact person</FormLabel>
                          <div className="relative">
                            <UserRound className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                placeholder="Enter onsite contact name"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Doctor's or Provider's Name */}
                  <FormField
                    control={form.control}
                    name="doctorName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Doctor&apos;s or Provider&apos;s Name (If applicable)</FormLabel>
                        <div className="relative">
                          <UserRound className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              placeholder="Enter doctor or provider name"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Section 3 - Appointment Info */}
                <div className="space-y-6 border-t border-slate-200 pt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">📅 Appointment Info</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
                  </div>

                  {/* Address/Location */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Address / Location</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter appointment address or location"
                            className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional Check-in Instructions */}
                  <FormField
                    control={form.control}
                    name="checkInInstructions"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Additional check-in instructions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Building name, department, floor, suite or room #, etc."
                            className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-slate-500">
                          Be very specific (e.g., building name, department, floor, suite or room #)
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Timezone and Duration */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Time Zone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#E67800]/40 focus:ring-offset-0">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIMEZONES.map((tz) => (
                                <SelectItem key={tz.value} value={tz.value}>
                                  {tz.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimatedDuration"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Estimated Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#E67800]/40 focus:ring-offset-0">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DURATION_OPTIONS.map((duration) => (
                                <SelectItem key={duration.value} value={duration.value}>
                                  {duration.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Date of Appointment</FormLabel>
                          <div className="relative">
                            <Calendar className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                type="date"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="appointmentTime"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Time of Appointment</FormLabel>
                          <div className="relative">
                            <Clock className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                type="time"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 4 - VRI Options */}
                {serviceType === "video" && (
                  <div className="space-y-6 border-t border-slate-200 pt-8">
                    <div>
                      <h3 className="text-lg font-semibold text-[#002060]">🖥 VRI Options</h3>
                      <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
                    </div>

                    <FormField
                      control={form.control}
                      name="vriLinkOption"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className={labelClasses}>VRI Link Option</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 rounded-lg border-2 border-slate-200 p-4 transition-colors hover:border-[#E67800]/50">
                                <RadioGroupItem value="own" id="own" />
                                <label
                                  htmlFor="own"
                                  className="flex-1 cursor-pointer text-sm font-medium text-slate-700"
                                >
                                  I will use my own link
                                </label>
                              </div>
                              <div className="flex items-center space-x-3 rounded-lg border-2 border-slate-200 p-4 transition-colors hover:border-[#E67800]/50">
                                <RadioGroupItem value="lls" id="lls" />
                                <label
                                  htmlFor="lls"
                                  className="flex-1 cursor-pointer text-sm font-medium text-slate-700"
                                >
                                  Provide a HIPAA-compliant link (LLS)
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {vriLinkOption === "own" && (
                      <FormField
                        control={form.control}
                        name="vriCustomLink"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className={labelClasses}>Provide Your Link</FormLabel>
                            <div className="relative">
                              <LinkIcon className={fieldIconClasses} aria-hidden="true" />
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="https://example.com/meeting"
                                  className={inputClasses}
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}

                {/* Section 5 - Additional Sections and Comments */}
                <div className="space-y-6 border-t border-slate-200 pt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">💬 Additional Sections and Comments</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
                  </div>

                  {/* Additional Comments */}
                  <FormField
                    control={form.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Additional Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any additional comments..."
                            className="min-h-[100px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-slate-500">
                          Do not include PHI or patient identifiers.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cost Center and Facility Phone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="costCenterNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Cost Center Number</FormLabel>
                          <div className="relative">
                            <DollarSign className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                placeholder="Enter cost center number"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facilityPhoneNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Facility Phone Number</FormLabel>
                          <div className="relative">
                            <Phone className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 6 - Billing Information */}
                <div className="space-y-6 border-t border-slate-200 pt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">💳 Billing Information</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#E67800]" />
                    <p className="mt-2 text-xs text-slate-500">
                      Only needed if this is your company&apos;s first time requesting an onsite interpreter with us
                    </p>
                  </div>

                  {/* Billing Address */}
                  <FormField
                    control={form.control}
                    name="billingAddress"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Billing Address</FormLabel>
                        <div className="relative">
                          <Building2 className="pointer-events-none absolute left-4 top-4 size-4 text-slate-400" aria-hidden="true" />
                          <FormControl>
                            <Textarea
                              placeholder="Enter billing address"
                              className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 pl-12 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Billing Contact Name and Phone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="billingContactName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Billing Contact Name</FormLabel>
                          <div className="relative">
                            <UserRound className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                placeholder="Enter billing contact name"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="billingContactPhone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Billing Contact Phone Number</FormLabel>
                          <div className="relative">
                            <Phone className={fieldIconClasses} aria-hidden="true" />
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                className={inputClasses}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Billing Contact Email */}
                  <FormField
                    control={form.control}
                    name="billingContactEmail"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Billing Contact Email</FormLabel>
                        <div className="relative">
                          <Mail className={fieldIconClasses} aria-hidden="true" />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="billing@company.com"
                              className={inputClasses}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* CTA Section at Bottom */}
                <div className="border-t border-slate-200 pt-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                      variant="ghost"
                      className="rounded-lg bg-transparent px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.5px] text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-800"
                      type="button"
                    >
                      Refresh
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-lg border-2 border-[#E67800] bg-white px-6 py-2.5 text-sm font-bold uppercase tracking-[0.5px] text-[#E67800] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#E67800]/10"
                      type="button"
                    >
                      AI Assisted Submit
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-lg border-0 bg-gradient-to-br from-[#E67800] to-[#FFA500] px-6 py-2.5 text-sm font-bold uppercase tracking-[0.5px] text-white shadow-[0_4px_15px_rgba(230,120,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:from-[#CC6900] hover:to-[#E67800] hover:bg-transparent hover:shadow-[0_6px_20px_rgba(230,120,0,0.4)] hover:text-white focus-visible:ring-[#E67800]/40"
                      type="submit"
                    >
                      Submit Request
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Page
