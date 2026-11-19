import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { SectionHead } from '../ui/SectionHead'
import { services } from '../../data/services'
import { formatPrice, priceById } from '../../data/pricing'
import { track } from '../../lib/analytics'

export const servicePrice = (id: (typeof services)[number]['id']) => {
  const s = services.find((x) => x.id === id)!
  return formatPrice(priceById[s.priceIds[0]])
}

/** Editorial service index – the hovered/focused row lights up its photo on desktop. */
export function ServiceIndex() {
  const [active, setActive] = useState(0)
  // Only the first preview loads up front; the rest are fetched once the visitor engages with the list
  // (otherwise they compete with the hero photo for bandwidth).
  const [primed, setPrimed] = useState(false)

  return (
    <section className="bg-paper py-20 lg:py-32" aria-labelledby="palvelut-otsikko">
      <div className="container-x">
        <SectionHead eyebrow="Palvelut" id="palvelut-otsikko" title={<>Mitä autollesi tehdään?</>}>
          Viisi palvelukokonaisuutta – pesusta pinnoitukseen ja sisätiloista hajunpoistoon. Hinnat ovat esillä, joten tiedät
          suunnan jo ennen yhteydenottoa.
        </SectionHead>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Sticky preview (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[28px] bg-ink-3">
              {services.map((s, i) => (i === 0 || primed) && (
                <Photo
                  key={s.id}
                  k={s.hero.key}
                  alt=""
                  aria-hidden="true"
                  sizes="40vw"
                  position={s.hero.position}
                  className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                    i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-7 pt-24">
                <p className="eyebrow text-k-lite">{String(active + 1).padStart(2, '0')} / 05</p>
                <p className="mt-2 font-display text-2xl font-[680] text-white">{services[active].label}</p>
              </div>
            </div>
          </div>

          <ol className="border-t border-graphite/15 lg:col-span-7" onPointerEnter={() => setPrimed(true)} onFocus={() => setPrimed(true)}>
            {services.map((s, i) => (
              <li key={s.id} className="border-b border-graphite/15" data-reveal style={{ ['--d' as string]: i * 70 }}>
                <Link
                  to={s.path}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => track('service_interest', { service: s.id, location: 'home_index' })}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-1 py-6 sm:gap-x-6 lg:py-8"
                >
                  <span className="num pt-1.5 text-[0.85rem] font-[650] text-steel" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-display text-[clamp(1.45rem,1.1rem+1.4vw,2.35rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-graphite transition-colors group-hover:text-k">
                      {s.label}
                    </span>
                    <span className="mt-2 block max-w-[46ch] text-steel">{s.summary}</span>
                    <span className="num mt-3 inline-block rounded-full bg-graphite px-3 py-1 text-[0.85rem] font-[650] text-white">
                      {servicePrice(s.id)}
                    </span>
                  </span>
                  <span className="flex flex-col items-end gap-3">
                    <Photo
                      k={s.hero.key}
                      alt=""
                      aria-hidden="true"
                      sizes="96px"
                      position={s.hero.position}
                      className="size-[72px] rounded-2xl object-cover sm:size-24 lg:hidden"
                    />
                    <span className="grid size-11 place-items-center rounded-full border border-graphite/20 text-graphite transition-all duration-300 group-hover:border-k group-hover:bg-k group-hover:text-white">
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
