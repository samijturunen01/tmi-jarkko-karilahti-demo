import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, ArrowUpRight, Check, Phone, Plus } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { Photo } from '../components/ui/Photo'
import { SectionHead } from '../components/ui/SectionHead'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { BeforeAfter } from '../components/home/BeforeAfter'
import { extraServices, serviceById, services } from '../data/services'
import { addonContext, formatPrice, priceById, priceNote, quoteHref, type ServiceId } from '../data/pricing'
import { describedProjects } from '../data/references'
import { company } from '../data/company'
import { track } from '../lib/analytics'

export function ServicePage({ id }: { id: ServiceId }) {
  const s = serviceById[id]
  const prices = s.priceIds.map((p) => priceById[p])
  const hasFrom = prices.some((p) => p.from)
  const refs = describedProjects.filter((p) => p.categories.some((c) => s.related.includes(c))).slice(0, id === 'ajovalot' ? 5 : 6)
  const others = services.filter((x) => x.id !== id)
  const extras = id === 'pesu' ? extraServices.filter((x) => x.id !== 'nahka') : id === 'sisatilat' ? extraServices.filter((x) => x.id === 'nahka') : []

  return (
    <>
      <PageIntro
        eyebrow={s.kicker}
        title={s.title}
        lead={s.lead}
        crumbs={[
          { to: '/palvelut', label: 'Palvelut' },
          { to: s.path, label: s.label },
        ]}
        aside={
          <div className="relative">
            <div className="overflow-hidden rounded-[26px] bg-ink-3">
              <Photo k={s.hero.key} alt={s.hero.alt} priority sizes="(min-width: 1024px) 40vw, 100vw" position={s.hero.position} className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-[20px] bg-paper p-5 text-graphite shadow-[0_24px_50px_-20px_rgba(0,0,0,.6)] sm:left-auto sm:w-[300px]">
              <p className="eyebrow text-steel">Hinnat</p>
              <ul className="mt-2 space-y-1.5">
                {prices.map((p) => (
                  <li key={p.id} className="flex items-baseline justify-between gap-3 text-[0.93rem]">
                    <span>{p.short}</span>
                    <span className="num shrink-0 font-[750]">{formatPrice(p, { addon: !!p.addonOf })}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to={quoteHref(...s.quoteTopics)}
            onClick={() => track('cta_click', { location: `service_${s.id}_intro`, label: 'tarjous' })}
            className="btn btn-primary"
          >
            {s.cta} <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={company.phone.href} onClick={() => track('phone_click', { location: `service_${s.id}` })} className="btn btn-ghost text-white">
            <Phone size={18} aria-hidden="true" /> <span className="num">{company.phone.display}</span>
          </a>
        </div>
      </PageIntro>

      {/* Needs */}
      <section className="bg-paper pb-20 pt-24 lg:py-28" aria-labelledby="tarve">
        <div className="container-x">
          <SectionHead eyebrow="Milloin palvelusta on apua" id="tarve" title="Tunnistatko tilanteen?" />
          <ul className={`mt-12 grid gap-px overflow-hidden rounded-[24px] bg-graphite/12 sm:grid-cols-2 ${s.needs.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {s.needs.map((n, i) => (
              <li key={n.title} className="bg-paper p-6 lg:p-7" data-reveal style={{ ['--d' as string]: i * 70 }}>
                <span className="num font-display text-[0.95rem] font-[700] text-k">0{i + 1}</span>
                <h3 className="mt-3 text-[1.2rem] font-[700] tracking-[-0.015em]">{n.title}</h3>
                <p className="mt-2 text-[0.97rem] text-steel">{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Includes + prices */}
      <section className="bg-paper-2 py-20 lg:py-28" aria-labelledby="sisalto-hinnat">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Mitä saat" id="sisalto-hinnat" title={s.includes.title} />
            <ul className="mt-8 space-y-3">
              {s.includes.items.map((it) => (
                <li key={it} className="flex gap-3 text-[1.02rem]" data-reveal>
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-k text-white">
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <div className="rounded-[26px] bg-chalk p-6 lg:p-9">
              <h3 className="font-display text-[1.5rem] font-[700] tracking-[-0.02em]">Hinnat</h3>
              <ul className="mt-5 divide-y divide-graphite/10 border-y border-graphite/10">
                {prices.map((p) => (
                  <li key={p.id} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-5">
                    <div>
                      <p className="font-[650]">{p.name}</p>
                      {p.includes && <p className="mt-1 text-[0.93rem] text-steel">{p.includes.join(' · ')}</p>}
                      {p.note && <p className="mt-1 text-[0.93rem] font-[600] text-k">{p.note}</p>}
                      {p.addonOf && <p className="mt-1 text-[0.88rem] text-steel">Lisäpalvelu {addonContext[p.addonOf]} yhteydessä</p>}
                    </div>
                    <div className="text-right">
                      <p className="num whitespace-nowrap font-display text-[1.6rem] font-[760] leading-none tracking-[-0.02em]">
                        {formatPrice(p, { addon: !!p.addonOf })}
                      </p>
                      <Link
                        to={quoteHref(p.addonOf ? p.addonOf : p.id, ...(p.addonOf ? [p.id] : []))}
                        className="mt-2 inline-flex items-center gap-1 text-[0.88rem] font-[650] text-k hover:underline"
                      >
                        <Plus size={15} aria-hidden="true" /> Tarjouspyyntöön
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              {hasFrom && <p className="mt-5 text-[0.92rem] text-steel">{priceNote}</p>}
              <Link to="/hinnasto" className="link-u mt-5 inline-block font-[600]">
                Katso koko hinnasto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {s.steps && (
        <section className="bg-paper py-20 lg:py-28" aria-labelledby="vaiheet">
          <div className="container-x">
            <SectionHead eyebrow="Työn vaiheet" id="vaiheet" title="Pohjatyöstä suojaan." />
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {s.steps.map((st, i) => (
                <li key={st.title} className="relative rounded-[24px] border border-graphite/12 bg-chalk p-7" data-reveal style={{ ['--d' as string]: i * 90 }}>
                  <span className="num font-display text-[3.4rem] font-[780] leading-none tracking-[-0.04em] text-k">{i + 1}</span>
                  <h3 className="mt-4 text-[1.25rem] font-[700]">{st.title}</h3>
                  <p className="mt-2 text-steel">{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {id === 'ajovalot' && (
        <section className="bg-paper py-20 lg:py-28" aria-labelledby="ennen-jalkeen">
          <div className="container-x">
            <SectionHead eyebrow="Ennen ja jälkeen" id="ennen-jalkeen" title="Sama umpio, sama päivä.">
              Aidot kuvat yrityksen referensseistä. Vedä valopalkkia tai valitse toinen auto.
            </SectionHead>
            <div className="mt-10" data-reveal>
              <BeforeAfter tone="light" />
            </div>
          </div>
        </section>
      )}

      {id === 'otsonointi' && (
        <section className="bg-paper py-16 lg:py-20" aria-label="Turvallisuus">
          <div className="container-x">
            <div className="flex gap-4 rounded-[22px] border border-graphite/15 bg-chalk p-6 lg:p-8" data-reveal>
              <AlertTriangle className="mt-0.5 shrink-0 text-k" size={24} aria-hidden="true" />
              <div>
                <h2 className="font-display text-[1.3rem] font-[700]">Otsonointi tehdään tyhjässä autossa</h2>
                <p className="mt-2 max-w-[70ch] text-steel">
                  Otsonia ei saa hengittää: autossa ei saa olla ihmisiä eikä eläimiä käsittelyn aikana, ja auto tuuletetaan käsittelyn jälkeen.
                  Jos vuokraat laitteen itse, kysy käyttöohjeet vuokrauksen yhteydessä.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {extras.length > 0 && (
        <section className="on-dark bg-ink py-20 text-white lg:py-28" aria-labelledby="lisat">
          <div className="container-x">
            <SectionHead eyebrow="Lisäksi" id="lisat" tone="dark" title={id === 'pesu' ? 'Muut ulkopintojen palvelut.' : 'Nahkaistuimille oma hoito.'} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {extras.map((x) => (
                <li key={x.id} className="overflow-hidden rounded-[22px] bg-ink-3" data-reveal>
                  <Photo k={x.photo.key} alt={x.photo.alt} sizes="(min-width: 1024px) 33vw, 50vw" className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-display text-[1.25rem] font-[680]">{x.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-fog">{x.text}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="num text-[0.9rem] font-[650] text-k-lite">{x.price}</span>
                      <Link to={quoteHref(x.topic)} className="inline-flex items-center gap-1.5 text-[0.92rem] font-[650] hover:text-k-lite">
                        <Plus size={16} aria-hidden="true" /> Tarjouspyyntöön
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {refs.length > 0 && (
        <section className="bg-paper py-20 lg:py-28" aria-labelledby="referenssit">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead eyebrow="Referenssit" id="referenssit" title="Tehtyjä töitä." />
              <Link to="/referenssit" className="link-u font-[650]" data-reveal>
                Kaikki referenssit
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
              {refs.map((p, i) => (
                <li key={p.id} data-reveal style={{ ['--d' as string]: i * 60 }}>
                  <Link to={`/referenssit?auto=${p.id}`} className="group block rounded-[20px]">
                    <div className="overflow-hidden rounded-[20px] bg-paper-2">
                      <Photo
                        k={(p.shots.find((x) => x.stage === 'jalkeen') ?? p.shots[0]).key}
                        alt={(p.shots.find((x) => x.stage === 'jalkeen') ?? p.shots[0]).alt}
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-3 text-[0.82rem] font-[650] uppercase tracking-[0.1em] text-steel">{p.vehicle}</p>
                    <p className="mt-1 font-[650] leading-snug group-hover:text-k">{p.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper-2 py-20 lg:py-28" aria-labelledby="ukk">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Kysymykset" id="ukk" title="Usein kysyttyä." />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={s.faq} />
          </div>
        </div>
      </section>

      <nav aria-label="Muut palvelut" className="bg-paper py-14">
        <div className="container-x">
          <p className="eyebrow text-steel">Muut palvelut</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.id}>
                <Link to={o.path} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-graphite/15 px-5 py-4 font-[650] hover:border-k hover:text-k">
                  {o.label}
                  <ArrowUpRight size={18} aria-hidden="true" className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CtaBand
        location={`service_${s.id}_closing`}
        title={id === 'maalipinta' ? 'Kerro autostasi – saat hinnan.' : 'Varataanko aika?'}
        text={
          hasFrom
            ? 'Kerro auton merkki, malli ja maalipinnan kunto. Hinta tarkentuu auton koon, värin ja kunnon mukaan.'
            : 'Valitse palvelut tarjouspyyntöön tai soita – sovitaan sinulle sopiva aika.'
        }
        cta={s.cta}
        topics={s.quoteTopics}
      />
    </>
  )
}
