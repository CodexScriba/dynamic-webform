'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
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
              <div className="flex flex-col items-center">
                <motion.div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'border-[#FF9500] bg-[#FF9500] text-white'
                      : isActive
                        ? 'border-[#FF9500] bg-white text-[#FF9500]'
                        : 'border-slate-300 bg-white text-slate-400'
                  }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </motion.div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium ${
                      isActive || isCompleted ? 'text-[#002060]' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
              {!isLast && (
                <div className="mx-2 flex-1">
                  <div
                    className={`h-0.5 transition-all duration-300 ${
                      isCompleted ? 'bg-[#FF9500]' : 'bg-slate-300'
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
