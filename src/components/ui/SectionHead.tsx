import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  id?: string
  children?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
  as?: 'h1' | 'h2'
}

export function SectionHead({ eyebrow, title, id, children, tone = 'light', className = '', as: H = 'h2' }: Props) {
  return (
    <div className={className} data-reveal>
      <p className={`eyebrow flex items-center gap-3 ${tone === 'dark' ? 'text-k-lite' : 'text-k'}`}>
        <span className={`h-px w-8 ${tone === 'dark' ? 'bg-k-lite' : 'bg-k'}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <H id={id} className={`display-l mt-4 ${tone === 'dark' ? 'text-white' : 'text-graphite'}`}>
        {title}
      </H>
      {children && <div className={`lead mt-5 max-w-[60ch] ${tone === 'dark' ? 'text-fog' : 'text-steel'}`}>{children}</div>}
    </div>
  )
}
