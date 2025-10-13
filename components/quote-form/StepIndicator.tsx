'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
}

interface StepIndicatorProps {
  currentStep: number
  steps: Step[]
}

export function StepIndicator ({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep
          const isCompleted = step.number < currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.number} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-[#E67800] bg-[#E67800] shadow-[0_0_12px_rgba(230,120,0,0.4)] text-white'
                      : isCompleted
                      ? 'border-[#E67800] bg-[#E67800] text-white'
                      : 'border-slate-300 bg-white text-slate-400'
                  }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.08 : 1
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    <span className="text-sm font-bold">{step.number}</span>
                  )}
                </motion.div>
                <span
                  className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? 'text-[#E67800] font-semibold'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {!isLast && (
                <div className="mx-3 flex-1">
                  <div
                    className={`h-0.5 transition-all duration-500 ${
                      isCompleted ? 'bg-[#E67800]' : 'bg-slate-300'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
