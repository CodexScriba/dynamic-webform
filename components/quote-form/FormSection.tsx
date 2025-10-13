import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  accent?: boolean
}

export const FormSection = ({ title, description, children, accent = false }: FormSectionProps) => {
  return (
    <section className='space-y-4'>
      <div>
        <h3 className='text-lg font-semibold text-[#002060]'>{title}</h3>
        {description ? <p className='text-sm text-slate-500'>{description}</p> : null}
        <div className={`mt-2 h-0.5 w-12 rounded ${accent ? 'bg-[#FF9500]' : 'bg-[#002060]/20'}`} />
      </div>
      {children}
    </section>
  )
}
