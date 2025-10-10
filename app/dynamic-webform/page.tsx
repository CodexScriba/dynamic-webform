"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check, Star, Zap } from "lucide-react"

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

const Page = () => {
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
            <form className="mt-[35px] space-y-[22px]">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[#002060]"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="h-[52px] rounded-md border-2 border-[#E8E8E8] bg-[#FAFAFA] px-4 text-[14px] transition-all duration-300 focus-visible:border-[#FF9500] focus-visible:bg-white focus-visible:shadow-[0_4px_12px_rgba(255,149,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[#002060]"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  className="h-[52px] rounded-md border-2 border-[#E8E8E8] bg-[#FAFAFA] px-4 text-[14px] transition-all duration-300 focus-visible:border-[#FF9500] focus-visible:bg-white focus-visible:shadow-[0_4px_12px_rgba(255,149,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[#002060]"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  className="h-[52px] rounded-md border-2 border-[#E8E8E8] bg-[#FAFAFA] px-4 text-[14px] transition-all duration-300 focus-visible:border-[#FF9500] focus-visible:bg-white focus-visible:shadow-[0_4px_12px_rgba(255,149,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[#002060]">
                  Service Type
                </Label>
                <Select>
                  <SelectTrigger className="h-[52px] rounded-md border-2 border-[#E8E8E8] bg-[#FAFAFA] px-4 text-left text-[14px] text-[#444444] transition-all duration-300 focus-visible:border-[#FF9500] focus-visible:bg-white focus-visible:shadow-[0_4px_12px_rgba(255,149,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Choose service" />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-white text-[#444444] shadow-[0_12px_30px_rgba(0,32,96,0.18)]">
                    <SelectItem value="interpretation">Interpretation</SelectItem>
                    <SelectItem value="translation">Translation</SelectItem>
                    <SelectItem value="localization">Localization</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[#002060]"
                >
                  Project Details
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe your project requirements..."
                  className="min-h-[110px] rounded-md border-2 border-[#E8E8E8] bg-[#FAFAFA] px-4 py-3 text-[14px] transition-all duration-300 focus-visible:border-[#FF9500] focus-visible:bg-white focus-visible:shadow-[0_4px_12px_rgba(255,149,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#002060] p-[50px] text-white md:min-h-[650px]">
          <div className="pointer-events-none absolute -left-16 -top-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,144,226,0.3)_0%,rgba(74,144,226,0.15)_35%,rgba(74,144,226,0.06)_55%,transparent_75%)]" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,149,0,0.25)_0%,rgba(255,149,0,0.12)_35%,rgba(255,149,0,0.05)_55%,transparent_75%)]" />
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
            <div className="mt-10 flex flex-col gap-3">
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
