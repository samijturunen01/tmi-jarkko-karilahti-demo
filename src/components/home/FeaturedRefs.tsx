import { Link } from 'react-router-dom'
import { ArrowRight, Images } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { SectionHead } from '../ui/SectionHead'
import { projects } from '../../data/references'

/** Horizontal strip of authentic, described references. */
export function FeaturedRefs() {
  const featured = projects.filter((p) => p.featured && !p.categories.includes('ajovalot'))
  return (
    <section className="on-dark overflow-hidden bg-ink py-20 text-white lg:py-32" aria-labelledby="referenssit-otsikko">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Referenssit" id="referenssit-otsikko" tone="dark" title="Valmiita autoja Joensuusta.">
          Aidot kuvat ja kuvaukset tehdyistä töistä – henkilöautoista yrityksen pakettiautoon.
        </SectionHead>
        <Link to="/referenssit" className="btn btn-ghost text-white" data-reveal>
          Kaikki referenssit <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:gap-6 sm:px-7 lg:px-[max(44px,calc((100vw-1320px)/2+44px))]">
        {featured.map((p, i) => (
          <li key={p.id} className="w-[82vw] max-w-[400px] shrink-0 snap-start" data-reveal style={{ ['--d' as string]: i * 80 }}>
            <Link to={`/referenssit?auto=${p.id}`} className="group block rounded-[22px]">
              <div className="relative overflow-hidden rounded-[22px] bg-ink-3">
                <Photo
                  k={p.shots[0].key}
                  alt={p.shots[0].alt}
                  sizes="(min-width: 640px) 400px, 82vw"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-[0.78rem] font-[650] backdrop-blur-sm">
                  <Images size={15} aria-hidden="true" /> {p.shots.length} kuvaa
                </span>
                {p.b2b && <span className="absolute left-3 top-3 rounded-full bg-k px-3 py-1.5 text-[0.75rem] font-[700]">Yritysasiakas</span>}
              </div>
              <p className="eyebrow mt-5 text-k-lite">{p.vehicle}</p>
              <h3 className="mt-2 font-display text-[1.4rem] font-[680] leading-tight tracking-[-0.02em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-[0.95rem] text-fog">{p.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
