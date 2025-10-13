"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Check, Clock, DollarSign, FileText, Globe, Hash, Link as LinkIcon, Mail, MapPinned, MessageSquare, Phone, Star, UserRound, Video, MapPin, Zap } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"

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
  "h-11 rounded-2xl border-none bg-slate-50 pl-12 pr-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0"
const fieldIconClasses =
  "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
type RequestQuoteFormValues = {
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
  additionalComments: string
  costCenterNumber: string
  facilityPhoneNumber: string
}

const STEPS = [
  { id: 1, title: "Contact Info", description: "Your details" },
  { id: 2, title: "Service Details", description: "Service requirements" },
  { id: 3, title: "Appointment", description: "Schedule details" },
  { id: 4, title: "Additional", description: "Final details" },
] as const

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")

  const form = useForm<RequestQuoteFormValues>({
    mode: "onChange",
    defaultValues: {
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
      address: "",
      timezone: "",
      appointmentDate: "",
      appointmentTime: "",
      estimatedDuration: "",
      vriLinkOption: "lls",
      vriCustomLink: "",
      additionalComments: "",
      costCenterNumber: "",
      facilityPhoneNumber: "",
    },
  })

  const preferredInterpreter = form.watch("preferredInterpreter")
  const serviceType = form.watch("serviceType")
  const vriLinkOption = form.watch("vriLinkOption")

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (values: RequestQuoteFormValues) => {
    console.log("Request quote submission", values)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-10">
      <div className="grid w-full max-w-[1400px] min-h-[650px] grid-cols-1 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_40px_rgba(0,32,96,0.1)] md:grid-cols-[65%_35%]">
        <div className="relative bg-white p-[50px] md:min-h-[650px]">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[200px] w-[250px] bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(255,149,0,0.12)_8px,rgba(255,149,0,0.12)_10px)]"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
          />

          <div className="relative z-10">
            <h2 className="text-[28px] font-bold text-[#002060]">Request a Quote</h2>
            <div className="mt-[15px] h-1 w-[60px] rounded bg-[#FF9500]" />
            <p className="mt-5 text-[14px] leading-[1.7] text-[#666666]">
              Connect with our expert team for professional language services
            </p>

            {/* Step Indicator */}
            <div className="mt-8 mb-8">
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          currentStep >= step.id
                            ? "border-[#FF9500] bg-[#FF9500] text-white"
                            : "border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        <span className="text-sm font-semibold">{step.id}</span>
                      </div>
                      <div className="mt-2 text-center">
                        <div
                          className={`text-xs font-semibold ${
                            currentStep >= step.id ? "text-[#FF9500]" : "text-slate-400"
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-[10px] text-slate-400">{step.description}</div>
                      </div>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 transition-all duration-300 ${
                          currentStep > step.id ? "bg-[#FF9500]" : "bg-slate-300"
                        }`}
                        style={{ marginTop: "-45px" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Form {...form}>
              <form
                className="mt-[35px] space-y-10"
                onSubmit={form.handleSubmit(handleSubmit)}
                noValidate
              >
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="clientId"
                    rules={{ required: "Client ID is required" }}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Client ID</FormLabel>
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
                    rules={{ required: "Requestor name is required" }}
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
                    rules={{
                      required: "Requestor email address is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Enter a valid email address",
                      },
                    }}
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
                )}

                {/* Step 2: Service Details Section */}
                {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">Service Details</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
                  </div>

                  {/* Service Type */}
                  <FormField
                    control={form.control}
                    name="serviceType"
                    rules={{ required: "Service type is required" }}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className={labelClasses}>Service Type *</FormLabel>
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
                                    setSelectedServiceType(service.id)
                                  }}
                                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                                    isSelected
                                      ? "border-[#FF9500] bg-[#FF9500]/10 shadow-md"
                                      : "border-slate-200 bg-white hover:border-[#FF9500]/50 hover:bg-slate-50"
                                  }`}
                                >
                                  <Icon
                                    className={`size-6 ${isSelected ? "text-[#FF9500]" : "text-slate-600"}`}
                                  />
                                  <span
                                    className={`text-sm font-medium ${
                                      isSelected ? "text-[#FF9500]" : "text-slate-700"
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
                      rules={{ required: "Language is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Language *</FormLabel>
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
                              <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#FF9500]/40 focus:ring-offset-0">
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
                            Preferred Interpreter *
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
                                className="data-[state=checked]:bg-[#FF9500]"
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
                      rules={{ required: "Interpreter name is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Interpreter Name *</FormLabel>
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
                    rules={{ required: "Appointment details are required" }}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>
                          Appointment General Details *
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
                </div>
                )}

                {/* Step 3: Appointment Info */}
                {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">📅 Appointment Info</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
                  </div>

                  {/* Address/Location */}
                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "Address/Location is required" }}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClasses}>Address / Location *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter appointment address or location"
                            className="min-h-[80px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
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
                              <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#FF9500]/40 focus:ring-offset-0">
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
                              <SelectTrigger className="h-11 rounded-2xl border-none bg-slate-50 shadow-inner focus:ring-2 focus:ring-[#FF9500]/40 focus:ring-offset-0">
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
                      rules={{ required: "Appointment date is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Date of Appointment *</FormLabel>
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
                      rules={{ required: "Appointment time is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Time of Appointment *</FormLabel>
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
                )}

                {/* Step 4: Additional Options */}
                {currentStep === 4 && (
                <>
                {/* VRI Options */}
                {serviceType === "video" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#002060]">🖥 VRI Options</h3>
                      <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
                    </div>

                    <FormField
                      control={form.control}
                      name="vriLinkOption"
                      rules={{ required: "VRI link option is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className={labelClasses}>VRI Link Option *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 rounded-lg border-2 border-slate-200 p-4 transition-colors hover:border-[#FF9500]/50">
                                <RadioGroupItem value="own" id="own" />
                                <label
                                  htmlFor="own"
                                  className="flex-1 cursor-pointer text-sm font-medium text-slate-700"
                                >
                                  I will use my own link
                                </label>
                              </div>
                              <div className="flex items-center space-x-3 rounded-lg border-2 border-slate-200 p-4 transition-colors hover:border-[#FF9500]/50">
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

                {/* Additional Sections and Comments */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#002060]">💬 Additional Sections and Comments</h3>
                    <div className="mt-1 h-0.5 w-12 rounded bg-[#FF9500]" />
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
                            className="min-h-[100px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0"
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
                      rules={{ required: "Cost center number is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClasses}>Cost Center Number *</FormLabel>
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
                </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`rounded-lg px-6 py-2 font-semibold transition-all ${
                      currentStep === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    Back
                  </Button>
                  <div className="text-sm text-slate-500">
                    Step {currentStep} of {STEPS.length}
                  </div>
                  {currentStep < STEPS.length ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="rounded-lg bg-[#FF9500] px-6 py-2 font-semibold text-white hover:bg-[#FF8500]"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="rounded-lg bg-[#FF9500] px-6 py-2 font-semibold text-white hover:bg-[#FF8500]"
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#002060] p-[50px] text-white md:min-h-[650px]">
          <div className="pointer-events-none absolute -left-16 -top-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.3)_0%,rgba(74,144,226,0.15)_35%,rgba(74,144,226,0.06)_55%,transparent_75%)]" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.3)_0%,rgba(74,144,226,0.15)_35%,rgba(74,144,226,0.06)_55%,transparent_75%)]" />
          <div className="relative z-10 flex h-full flex-col">
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
            <div className="mt-8 flex flex-wrap gap-3 pb-4 text-[#FFB347]">
              <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
                ISO Certified
              </div>
              <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
                On-Site Specialists
              </div>
            </div>
            <div className="mt-8 h-px bg-white/20" />
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="ghost"
                className="w-full rounded-lg border-0 bg-gradient-to-br from-[#FF9500] to-[#FFA500] px-8 py-5 text-[16px] font-bold uppercase tracking-[0.5px] text-white shadow-[0_4px_15px_rgba(255,149,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:from-[#FF8500] hover:to-[#FF9500] hover:bg-transparent hover:shadow-[0_6px_20px_rgba(255,149,0,0.4)] hover:text-white focus-visible:ring-[#FF9500]/40"
              >
                Submit Request
              </Button>
              <Button
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
