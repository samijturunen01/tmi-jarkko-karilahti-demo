import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Info, Plus, X } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { CtaBand } from '../components/ui/CtaBand'
import { serviceById } from '../data/services'
import { addonContext, formatPrice, priceById, priceGroups, priceNote, quoteHref, type PriceId } from '../data/pricing'
import { track } from '../lib/analytics'

/**
 * Transparent price list (verified prices) with a quote builder: tick the services,
 * see the indicative "from" total, and carry the selection into the quote form.
 */
export function Pricing() {
  const [picked, setPicked] = useState<PriceId[]>([])

  const toggle = (id: PriceId) => {
    setPicked((cur) => {
      const item = priceById[id]
      if (cur.includes(id)) {
        // Removing a parent also removes its add-ons.
        return cur.filter((x) => x !== id && priceById[x].addonOf !== id)
      }
      track('price_builder_add', { item: id })
      const next = [...cur, id]
      if (item.addonOf && !next.includes(item.addonOf)) next.push(item.addonOf)
      return next
    })
  }

  const { total, anyFrom, perDay } = useMemo(() => {
    let t = 0
    let f = false
    let d = false
    for (const id of picked) {
      const p = priceById[id]
      if (p.unit === '/päivä') {
        d = true
        continue
      }
      t += p.price
      if (p.from) f = true
    }
    return { total: t, anyFrom: f, perDay: d }
  }, [picked])

  const summaryLabel = picked.length ? `${anyFrom ? 'alk. ' : ''}${total} €${perDay ? ' + laitevuokra' : ''}` : '—'

  return (
    <>
      <PageIntro
        crumbs={[{ to: '/hinnasto', label: 'Hinnasto' }]}
        eyebrow="Hinnasto"
        title="Hinnat näkyvillä – ei arvailua."
        lead="Kaikki hinnat suoraan yrityksen hinnastosta. Rastita palvelut, niin näet suuntaa-antavan kokonaishinnan ja voit lähettää valinnat tarjouspyyntönä."
      >
        <p className="mt-6 flex max-w-[60ch] gap-2.5 rounded-2xl border border-white/12 p-4 text-[0.92rem] text-fog">
          <Info size={18} className="mt-0.5 shrink-0 text-k-lite" aria-hidden="true" />
          {priceNote}
        </p>
      </PageIntro>

      <section className="bg-paper py-16 lg:py-24" aria-label="Hinnasto ja tarjouslaskuri">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            {priceGroups.map((g, gi) => {
              const service = serviceById[priceById[g.ids[0]].service]
              return (
                <section key={g.title} className={gi ? 'mt-14' : ''} aria-labelledby={`hg-${gi}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-graphite pb-3">
                    <h2 id={`hg-${gi}`} className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-[720] tracking-[-0.03em]">
                      {g.title}
                    </h2>
                    <Link to={service.path} className="link-u text-[0.92rem] font-[600] text-steel">
                      Palvelun tiedot
                    </Link>
                  </div>
                  <ul>
                    {g.ids.map((id) => {
                      const p = priceById[id]
                      const on = picked.includes(id)
                      return (
                        <li key={id} className={`border-b border-graphite/12 ${p.addonOf ? 'pl-5 sm:pl-8' : ''}`}>
                          <label className="group relative flex cursor-pointer items-start gap-4 py-5">
                            <input type="checkbox" className="peer absolute inset-0 size-full cursor-pointer appearance-none opacity-0" checked={on} onChange={() => toggle(id)} />
                            <span
                              aria-hidden="true"
                              className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-k ${
                                on ? 'border-k bg-k text-white' : 'border-graphite/30 bg-chalk group-hover:border-k'
                              }`}
                            >
                              {on && <Check size={16} strokeWidth={3} />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-[650] leading-snug">
                                {p.addonOf && <span className="mr-1.5 text-k">+</span>}
                                {p.name}
                              </span>
                              {p.includes && <span className="mt-1 block text-[0.93rem] text-steel">{p.includes.join(' · ')}</span>}
                              {p.note && <span className="mt-1 block text-[0.93rem] font-[600] text-k">{p.note}</span>}
                              {p.addonOf && <span className="mt-1 block text-[0.88rem] text-steel">Vain {addonContext[p.addonOf]} yhteydessä</span>}
                            </span>
                            <span className="num shrink-0 whitespace-nowrap text-right font-display text-[1.45rem] font-[760] leading-none tracking-[-0.02em] sm:text-[1.7rem]">
                              {formatPrice(p, { addon: !!p.addonOf })}
                            </span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}

            <div className="mt-14 rounded-[22px] bg-paper-2 p-6 lg:p-8">
              <h2 className="font-display text-[1.4rem] font-[700]">Hinta pyydettäessä</h2>
              <p className="mt-2 text-steel">
                Nahkapenkkien käsittely, moottoritilan puhdistus ja chrome delete -teippaukset hinnoitellaan auton mukaan.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(['nahka', 'moottoritila', 'chrome-delete'] as const).map((t) => (
                  <Link key={t} to={quoteHref(t)} className="chip border border-graphite/20 bg-chalk !py-2 hover:border-k hover:text-k">
                    <Plus size={15} aria-hidden="true" />
                    {t === 'nahka' ? 'Nahkapenkit' : t === 'moottoritila' ? 'Moottoritila' : 'Chrome delete'}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-4" aria-labelledby="valinnat-otsikko">
            <div className="on-dark sticky top-28 rounded-[26px] bg-ink p-6 text-white lg:p-8">
              <h2 id="valinnat-otsikko" className="eyebrow text-k-lite">
                Valintasi
              </h2>
              {picked.length ? (
                <ul className="mt-4 space-y-2.5">
                  {picked.map((id) => (
                    <li key={id} className="flex items-center justify-between gap-3 text-[0.95rem]">
                      <span className="min-w-0">{priceById[id].short}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="num font-[650]">{formatPrice(priceById[id], { addon: !!priceById[id].addonOf })}</span>
                        <button
                          type="button"
                          onClick={() => toggle(id)}
                          className="grid size-7 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                          aria-label={`Poista ${priceById[id].short}`}
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[0.95rem] text-fog">Rastita palvelut listasta – yhteishinta päivittyy tähän.</p>
              )}
              <div className="mt-6 border-t border-white/12 pt-5" aria-live="polite">
                <p className="text-[0.88rem] text-fog">Suuntaa-antava yhteishinta</p>
                <p className="num mt-1 font-display text-[2.5rem] font-[780] leading-none tracking-[-0.03em]">{summaryLabel}</p>
                {anyFrom && <p className="mt-2 text-[0.85rem] text-fog">Alkaen-hinnat tarkentuvat auton koon, värin ja maalipinnan kunnon mukaan.</p>}
              </div>
              <Link
                to={quoteHref(...picked)}
                onClick={() => track('price_builder_quote', { items: picked.length })}
                className="btn btn-primary mt-6 w-full"
              >
                {picked.length ? 'Pyydä tarjous valituista' : 'Pyydä tarjous'} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <p className="mt-3 text-center text-[0.82rem] text-fog">Laskuri ei tee varausta – se esitäyttää tarjouspyynnön.</p>
            </div>
          </aside>
        </div>
      </section>

      {picked.length > 0 && (
        <div className="on-dark fixed inset-x-0 bottom-0 z-[45] border-t border-white/10 bg-ink px-4 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-3 text-white lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <p className="min-w-0 text-[0.85rem] leading-tight text-fog">
              {picked.length} valittu
              <span className="num block font-display text-[1.3rem] font-[760] text-white">{summaryLabel}</span>
            </p>
            <Link to={quoteHref(...picked)} onClick={() => track('price_builder_quote', { items: picked.length, location: 'mobile_bar' })} className="btn btn-primary !min-h-[48px] shrink-0">
              Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      <CtaBand
        location="pricing_closing"
        title="Kysyttävää hinnoista?"
        text="Soita tai lähetä viesti – kerro auton merkki ja malli, niin hinta tarkentuu."
      />
    </>
  )
}
