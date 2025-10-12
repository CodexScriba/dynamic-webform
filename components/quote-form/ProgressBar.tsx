'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function ProgressBar ({ currentStep, totalSteps, stepTitle }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-semibold text-[#FF9500]">{stepTitle}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF9500] to-[#FFA500] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
