import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Hero } from '../components/home/Hero'
import { ServiceIndex } from '../components/home/ServiceIndex'
import { BeforeAfter } from '../components/home/BeforeAfter'
import { PaintStory } from '../components/home/PaintStory'
import { FeaturedRefs } from '../components/home/FeaturedRefs'
import { Maker } from '../components/home/Maker'
import { Process } from '../components/home/Process'
import { SectionHead } from '../components/ui/SectionHead'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { faqs } from '../data/faq'
import { quoteHref } from '../data/pricing'
import { serviceById } from '../data/services'
import { track } from '../lib/analytics'

export function Home() {
  return (
    <>
      <Hero />
      <ServiceIndex />

      {/* Signature proof: same headlight, same day */}
      <section className="on-dark bg-ink py-20 text-white lg:py-32" aria-labelledby="ero-otsikko">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Ennen ja jälkeen" id="ero-otsikko" tone="dark" title="Näe ero omin silmin.">
              Kellastuneet ajovaloumpiot kirkkaiksi – aidot kuvat samasta umpiosta, otettu saman päivän aikana. Vedä valopalkkia tai
              valitse toinen auto.
            </SectionHead>
            <div className="mt-8 rounded-[22px] border border-white/12 p-6" data-reveal>
              <p className="text-[0.9rem] text-fog">Ajovaloumpioiden hionta + kiillotus</p>
              <p className="num mt-1 font-display text-[2.2rem] font-[760] leading-none tracking-[-0.03em]">
                <span className="text-base font-[600] tracking-normal text-fog">alk. </span>50 €<span className="text-base font-[600] tracking-normal text-fog"> / pari</span>
              </p>
              <p className="mt-3 text-[0.9rem] text-fog">Hionta + hartsipinnoitus alk. 150 € / pari</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to={quoteHref('umpiot-kiillotus')}
                  onClick={() => track('cta_click', { location: 'home_before_after', label: 'tarjous_ajovalot' })}
                  className="btn btn-primary w-full"
                >
                  Pyydä tarjous ajovaloista <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to={serviceById.ajovalot.path} className="link-u self-start font-[600] text-white">
                  Lue ajovalojen kiillotuksesta
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <BeforeAfter />
          </div>
        </div>
      </section>

      <div className="bg-paper pt-20 lg:pt-32" />
      <PaintStory />
      <FeaturedRefs />
      <Maker />
      <Process />

      <section className="bg-paper py-20 lg:py-32" aria-labelledby="ukk-otsikko">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Usein kysyttyä" id="ukk-otsikko" title="Ennen kuin tuot auton." />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        location="home_closing"
        title="Tuodaanko kiilto takaisin?"
        text="Kerro autostasi ja toiveistasi. Kiinteähintaiset palvelut näet hinnastosta – maalipinnan kunnostuksesta saat tarjouksen autosi koon, värin ja kunnon mukaan."
      />
    </>
  )
}
