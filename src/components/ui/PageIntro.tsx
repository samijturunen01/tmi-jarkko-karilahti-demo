import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  crumbs?: { to: string; label: string }[]
  children?: ReactNode
  aside?: ReactNode
}

/** Dark page header shared by sub pages. */
export function PageIntro({ eyebrow, title, lead, crumbs = [], children, aside }: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_85%_0%,rgba(52,52,244,0.22),transparent_70%)]" />
      <div className="container-x relative grid gap-10 pb-14 pt-8 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-12">
        <div className="lg:col-span-7">
          <nav aria-label="Murupolku" className="text-[0.85rem] text-fog">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-white">
                  Etusivu
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.to} className="flex items-center gap-1.5">
                  <ChevronRight size={14} aria-hidden="true" />
                  <Link to={c.to} className="hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow mt-8 flex items-center gap-3 text-k-lite">
            <span className="h-px w-8 bg-k-lite" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="display-l mt-4 max-w-[18ch]">{title}</h1>
          {lead && <p className="lead mt-6 max-w-[58ch] text-fog">{lead}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  )
}
