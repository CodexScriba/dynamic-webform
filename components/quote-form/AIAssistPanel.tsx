'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface AIAssistPanelProps {
  onParse: (input: string) => Promise<void>
  onCancel: () => void
}

export function AIAssistPanel ({ onParse, onCancel }: AIAssistPanelProps) {
  const [aiInput, setAiInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleParse = async () => {
    if (!aiInput.trim()) {
      toast.error('Please enter some text to parse')
      return
    }

    setIsLoading(true)
    try {
      await onParse(aiInput)
    } catch (error) {
      console.error('Parse error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#E67800]" />
            <h2 className="text-2xl font-bold text-[#002060]">AI Assisted Form Fill</h2>
          </div>
          <div className="mt-2 h-1 w-[60px] rounded bg-[#E67800]" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="rounded-xl bg-[#002060]/5 p-6 space-y-3">
        <h3 className="font-semibold text-[#002060]">How it works</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Paste the scheduling details from your system (EHR/CRM/email/ticket). We&apos;ll parse it and fill the form for you.
        </p>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">What to include:</p>
          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Languages needed</li>
            <li>Date, time, and timezone</li>
            <li>Location address or video meeting link</li>
            <li>Point of contact information</li>
            <li>Any special instructions</li>
          </ul>
        </div>
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-900">
            ⚠️ Privacy Reminder: Avoid PHI (patient names, DOBs, MRNs). You may include language, date/time, timezone, address, meeting links, and contacts.
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600">
          Paste your scheduling details
        </label>
        <Textarea
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="Example:

Need Spanish interpreter for video appointment
Tuesday Oct 15, 2025 at 2:30 PM Pacific Time
Duration: 1 hour
Zoom link: https://zoom.us/j/123456789
Contact: Dr. Sarah Johnson (555-0123)
Building A, Room 302"
          className="min-h-[300px] rounded-2xl border-none bg-slate-50 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-[#E67800]/40 focus-visible:ring-offset-0 font-mono text-sm"
          disabled={isLoading}
        />
        <p className="text-xs text-slate-500">
          {aiInput.length} characters
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-lg bg-transparent px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.5px] text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-800"
        >
          Cancel
        </Button>
        <Button
          onClick={handleParse}
          disabled={isLoading || !aiInput.trim()}
          className="rounded-lg border-0 bg-gradient-to-br from-[#E67800] to-[#FFA500] px-6 py-2.5 text-sm font-bold uppercase tracking-[0.5px] text-white shadow-[0_4px_15px_rgba(230,120,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:from-[#CC6900] hover:to-[#E67800] hover:shadow-[0_6px_20px_rgba(230,120,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Parsing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Use AI to fill out the form
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
