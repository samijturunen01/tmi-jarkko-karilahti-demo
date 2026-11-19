import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { SectionHead } from '../ui/SectionHead'
import { serviceById } from '../../data/services'
import { priceNote, quoteHref } from '../../data/pricing'
import { track } from '../../lib/analytics'

/** Paint correction explained + the two protection options (verified prices and terms). */
export function PaintStory() {
  const s = serviceById.maalipinta
  return (
    <section className="bg-paper pb-20 lg:pb-32" aria-labelledby="maalipinta-otsikko">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="relative m-0 lg:col-span-5" data-reveal>
          <div className="overflow-hidden rounded-[28px] bg-ink-3" data-wipe>
            <Photo
              k="lancer-spot"
              alt="Lähikuva Mitsubishin punaisesta maalipinnasta: haalistunut lähtötilanne ja kerran työstetty kiiltävä pinta rinnakkain."
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 max-w-[46ch] text-[0.92rem] text-steel">
            <span className="font-[650] text-graphite">Mitsubishi Lancer:</span> lähikuvassa näkyy auringon haalistaman lähtötilanteen ja
            kerran työstetyn pinnan ero.
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHead eyebrow="Maalipinnan kunnostus" id="maalipinta-otsikko" title="Kiilto syntyy pohjatyöstä.">
            Pelkkä vaha ei poista naarmuja eikä haalistumaa. Siksi maalipinta ensin puhdistetaan ja kunnostetaan koneellisesti – vasta
            sitten se suojataan.
          </SectionHead>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[22px] bg-graphite/12 sm:grid-cols-3">
            {s.steps!.map((st, i) => (
              <li key={st.title} className="bg-paper p-5 sm:p-6" data-reveal style={{ ['--d' as string]: i * 90 }}>
                <span className="num font-display text-3xl font-[750] text-k">{i + 1}</span>
                <h3 className="mt-3 text-[1.15rem] font-[700] tracking-[-0.01em]">{st.title}</h3>
                <p className="mt-2 text-[0.95rem] text-steel">{st.text}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 font-display text-[1.6rem] font-[700] tracking-[-0.02em]" data-reveal>
            Valitse suoja
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] border border-graphite/15 bg-chalk p-6" data-reveal>
              <p className="eyebrow text-steel">Kunnostus + kovavaha</p>
              <p className="num mt-3 font-display text-[2.6rem] font-[760] leading-none tracking-[-0.03em]">
                <span className="text-[1rem] font-[600] tracking-normal text-steel">alk. </span>200 €
              </p>
              <p className="mt-4 text-[0.95rem] text-steel">Kunnostettu pinta suojataan kovavahalla – edullisempi suojausvaihtoehto.</p>
            </div>
            <div className="relative overflow-hidden rounded-[22px] bg-ink p-6 text-white" data-reveal style={{ ['--d' as string]: 100 }}>
              <div aria-hidden="true" className="absolute -inset-y-8 right-6 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="eyebrow text-k-lite">Kunnostus + keraaminen pinnoite</p>
              <p className="num mt-3 font-display text-[2.6rem] font-[760] leading-none tracking-[-0.03em]">
                <span className="text-[1rem] font-[600] tracking-normal text-fog">alk. </span>350 €
              </p>
              <p className="mt-4 flex items-center gap-2 text-[0.95rem] font-[600]">
                <ShieldCheck size={18} className="text-k-lite" aria-hidden="true" /> Takuu 1 vuosi · kesto jopa 3 vuotta
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-[60ch] text-[0.92rem] text-steel">{priceNote}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              to={quoteHref(...s.quoteTopics)}
              onClick={() => track('cta_click', { location: 'home_paint', label: 'tarjous_maalipinta' })}
              className="btn btn-primary"
            >
              Pyydä tarjous maalipinnasta <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to={s.path} className="link-u font-[650] text-graphite">
              Lue lisää kunnostuksesta
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
