"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Check, Globe, Hash, Mail, Phone, Star, UserRound, Video, MapPin, Zap } from "lucide-react"
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
}

const Page = () => {
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")

  const form = useForm<RequestQuoteFormValues>({
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
    },
  })

  const preferredInterpreter = form.watch("preferredInterpreter")

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
            <Form {...form}>
              <form
                className="mt-[35px] space-y-10"
                onSubmit={form.handleSubmit(handleSubmit)}
                noValidate
              >
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

                {/* Service Details Section */}
                <div className="space-y-6 border-t border-slate-200 pt-8">
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
                        <FormControl>
                          <Textarea
                            placeholder="Follow-up, Consultation..."
                            className="min-h-[100px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF9500]/40 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
            <div className="mt-8 flex flex-wrap gap-2 text-[#FFB347]">
              <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
                ISO Certified
              </div>
              <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
                On-Site Specialists
              </div>
              <div className="rounded-full border border-[#FF9500]/40 bg-[#FF9500]/20 px-3 py-1.5 text-[11px] font-semibold">
                24/7 Availability
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
