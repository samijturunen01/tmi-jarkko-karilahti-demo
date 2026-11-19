import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { company, mailto } from '../../data/company'
import { nav } from '../../data/seo'
import { services } from '../../data/services'
import { track } from '../../lib/analytics'

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink pb-28 pt-20 text-fog lg:pb-12">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" aria-label={`${company.name} – etusivu`} className="inline-block rounded-md">
              <Logo tone="light" img className="h-[84px] w-auto" />
            </Link>
            <p className="mt-6 max-w-xs font-display text-xl font-[650] tracking-[-0.02em] text-white">
              {company.tagline}.
            </p>
            <p className="mt-3 max-w-xs text-[0.95rem]">Auton fiksaus Joensuun Salpakankaalla – ammattitaidolla ja kilpailukykyisin hinnoin.</p>
          </div>

          <nav aria-label="Alatunnisteen valikko">
            <p className="eyebrow text-white/60">Sivut</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-white/60">Palvelut</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/60">Yhteystiedot</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={company.phone.href} onClick={() => track('phone_click', { location: 'footer' })} className="inline-flex items-center gap-2.5 text-lg font-[650] text-white hover:text-k-lite">
                  <Phone size={18} aria-hidden="true" /> <span className="num">{company.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={mailto()} onClick={() => track('email_click', { location: 'footer' })} className="inline-flex items-center gap-2.5 break-all hover:text-white">
                  <Mail size={18} aria-hidden="true" className="shrink-0" /> {company.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0" />
                <span>
                  {company.address.street} ({company.address.unit})
                  <br />
                  {company.address.postalCode} {company.address.city}
                </span>
              </li>
              <li>
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('facebook_click', { location: 'footer' })}
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  Facebook <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(avautuu uuteen välilehteen)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {company.name} · Y-tunnus <span className="num">{company.businessId}</span>
          </p>
          <p className="text-fog/80">
            Verkkosivukonsepti: Hades Design – demo, ei yrityksen virallinen sivusto.
          </p>
        </div>
      </div>
    </footer>
  )
}
