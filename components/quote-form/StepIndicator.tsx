import { motion } from 'framer-motion'

interface StepMetadata {
  id: number
  title: string
  description: string
}

interface StepIndicatorProps {
  currentStep: number
  steps: StepMetadata[]
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className='mt-6 mb-8'>
      <div className='flex items-center justify-between gap-4'>
        {steps.map((step, index) => {
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id

          return (
            <div key={step.id} className='flex flex-1 items-center'>
              <div className='flex flex-1 flex-col items-center gap-2'>
                <motion.div
                  className='flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold'
                  animate={{
                    borderColor: isActive || isCompleted ? '#FF9500' : '#CBD5F5',
                    backgroundColor: isActive || isCompleted ? '#FF9500' : '#FFFFFF',
                    color: isActive || isCompleted ? '#FFFFFF' : '#94A3B8'
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                >
                  {step.id}
                </motion.div>
                <div className='text-center'>
                  <div className={`text-xs font-semibold ${isActive || isCompleted ? 'text-[#FF9500]' : 'text-slate-400'}`}>
                    {step.title}
                  </div>
                  <div className='text-[11px] text-slate-400'>{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className='h-0.5 flex-1'
                  animate={{ backgroundColor: isCompleted ? '#FF9500' : '#CBD5F5' }}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: '-48px' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
