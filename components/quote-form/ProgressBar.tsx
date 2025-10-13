'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function ProgressBar ({ currentStep, totalSteps, stepTitle }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#002060]">
            {currentStep}/{totalSteps}
          </span>
          <span className="text-sm font-semibold text-[#FF9500]">{stepTitle}</span>
        </div>
        <span className="text-xs font-medium text-slate-500">
          {progress.toFixed(0)}% Complete
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF9500] via-[#FFA500] to-[#FFB520] shadow-[0_0_8px_rgba(255,149,0,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
