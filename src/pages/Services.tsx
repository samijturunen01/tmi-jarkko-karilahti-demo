import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { Photo } from '../components/ui/Photo'
import { SectionHead } from '../components/ui/SectionHead'
import { CtaBand } from '../components/ui/CtaBand'
import { extraServices, services } from '../data/services'
import { formatPrice, priceById, priceNote, quoteHref } from '../data/pricing'
import { track } from '../lib/analytics'

const groups = [
  { title: 'Ulkopinnat', text: 'Pesu, maalipinnan kunnostus, suojaus ja kirkkaat ajovalot.', ids: ['maalipinta', 'ajovalot', 'pesu'] },
  { title: 'Sisätilat', text: 'Puhtaat pinnat, pestyt verhoilut ja raikas ilma.', ids: ['sisatilat', 'otsonointi'] },
] as const

export function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Palvelut"
        title="Auton fiksaus Joensuussa – ulkoa ja sisältä."
        lead="Käsinpesusta keraamiseen pinnoitteeseen ja sisäpuhdistuksesta otsonointiin. Valitse palvelu, katso mitä siihen kuuluu ja mitä se maksaa."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={quoteHref()} className="btn btn-primary">
            Pyydä tarjous
          </Link>
          <Link to="/hinnasto" className="btn btn-ghost text-white">
            Koko hinnasto
          </Link>
        </div>
      </PageIntro>

      {groups.map((g, gi) => (
        <section key={g.title} className={`${gi % 2 ? 'bg-paper-2' : 'bg-paper'} py-20 lg:py-28`} aria-labelledby={`ryhma-${gi}`}>
          <div className="container-x">
            <SectionHead eyebrow={`0${gi + 1} — ${g.title}`} id={`ryhma-${gi}`} title={g.text} className="max-w-3xl" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
              {g.ids.map((id, i) => {
                const s = services.find((x) => x.id === id)!
                return (
                  <article
                    key={s.id}
                    className={`group relative overflow-hidden rounded-[26px] bg-chalk ${g.ids.length === 3 && i === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}
                    data-reveal
                    style={{ ['--d' as string]: i * 80 }}
                  >
                    <div className="relative overflow-hidden">
                      <Photo
                        k={s.hero.key}
                        alt={s.hero.alt}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        position={s.hero.position}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                          g.ids.length === 3 && i === 0 ? 'aspect-[16/11] md:aspect-auto md:h-full' : 'aspect-[16/10]'
                        }`}
                      />
                      <span className="num absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-[0.85rem] font-[700] text-white backdrop-blur-sm">
                        {formatPrice(priceById[s.priceIds[0]])}
                      </span>
                    </div>
                    <div className="flex flex-col p-6 lg:p-9">
                      <p className="eyebrow text-k">{s.kicker}</p>
                      <h3 className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-[720] leading-[1.05] tracking-[-0.03em]">
                        <Link
                          to={s.path}
                          onClick={() => track('service_interest', { service: s.id, location: 'services_page' })}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {s.label}
                        </Link>
                      </h3>
                      <p className="mt-3 text-steel">{s.summary}</p>
                      <ul className="mt-5 space-y-1.5 text-[0.95rem]">
                        {s.priceIds.map((pid) => {
                          const p = priceById[pid]
                          return (
                            <li key={pid} className="flex justify-between gap-4 border-t border-graphite/10 pt-1.5">
                              <span>{p.short}</span>
                              <span className="num shrink-0 font-[650]">{formatPrice(p, { addon: !!p.addonOf })}</span>
                            </li>
                          )
                        })}
                      </ul>
                      <span className="mt-6 inline-flex items-center gap-2 font-[650] text-k">
                        Tutustu palveluun <ArrowUpRight size={18} aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="on-dark bg-ink py-20 text-white lg:py-28" aria-labelledby="lisapalvelut">
        <div className="container-x">
          <SectionHead eyebrow="03 — Lisäpalvelut" id="lisapalvelut" tone="dark" title="Viimeistely yksityiskohtiin asti.">
            Nämä tehdään yleensä muun käsittelyn yhteydessä. Kysy hinta – lisää palvelu tarjouspyyntöön yhdellä painalluksella.
          </SectionHead>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {extraServices.map((x, i) => (
              <li key={x.id} className="flex flex-col overflow-hidden rounded-[22px] bg-ink-3" data-reveal style={{ ['--d' as string]: i * 70 }}>
                <Photo k={x.photo.key} alt={x.photo.alt} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.25rem] font-[680] tracking-[-0.02em]">{x.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-fog">{x.text}</p>
                  <p className="num mt-4 text-[0.9rem] font-[650] text-k-lite">{x.price}</p>
                  <Link to={quoteHref(x.topic)} className="mt-4 inline-flex items-center gap-2 font-[650] text-white hover:text-k-lite">
                    <Plus size={18} aria-hidden="true" /> Lisää tarjouspyyntöön
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[70ch] text-[0.92rem] text-fog">{priceNote}</p>
        </div>
      </section>

      <CtaBand
        location="services_closing"
        title="Etkö ole varma, mitä autosi tarvitsee?"
        text="Kerro auton merkki, malli ja mitä haluaisit korjata – saat ehdotuksen ja hinnan. Voit myös soittaa suoraan."
      />
    </>
  )
}
