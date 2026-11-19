import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { company, mailto } from '../../data/company'
import { quoteHref, type TopicId } from '../../data/pricing'
import { track } from '../../lib/analytics'

interface Props {
  title: string
  text: string
  cta?: string
  topics?: TopicId[]
  location: string
}

/** Closing call to action – dark lacquer panel with the inspection-light gleam. */
export function CtaBand({ title, text, cta = 'Pyydä tarjous', topics = [], location }: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white" aria-labelledby={`cta-${location}`}>
      <div aria-hidden="true" className="swirl-bg pointer-events-none absolute -right-24 -top-24 size-[520px] rounded-full opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-10 left-[58%] w-40 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
      />
      <div className="container-x relative grid gap-10 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-28">
        <div data-reveal>
          <h2 id={`cta-${location}`} className="display-l max-w-[16ch]">
            {title}
          </h2>
          <p className="lead mt-5 max-w-[52ch] text-fog">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={quoteHref(...topics)}
              onClick={() => track('cta_click', { location, label: 'pyyda_tarjous' })}
              className="btn btn-primary"
            >
              {cta} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={company.phone.href} onClick={() => track('phone_click', { location })} className="btn btn-ghost text-white">
              <Phone size={18} aria-hidden="true" /> <span className="num">{company.phone.display}</span>
            </a>
          </div>
        </div>
        <div data-reveal style={{ ['--d' as string]: 120 }} className="text-[0.97rem] text-fog lg:justify-self-end lg:text-right">
          <p className="eyebrow text-white/60">Suoraan Jarkolle</p>
          <a href={mailto()} onClick={() => track('email_click', { location })} className="link-u mt-3 inline-flex items-center gap-2 break-all text-white">
            <Mail size={17} aria-hidden="true" className="shrink-0" /> {company.email}
          </a>
          <p className="mt-2">
            {company.address.street}, {company.address.district}, {company.address.city}
          </p>
        </div>
      </div>
    </section>
  )
}
