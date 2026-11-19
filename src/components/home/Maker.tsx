import { Photo } from '../ui/Photo'
import { company } from '../../data/company'

/** The person behind the work – verified facts only. */
export function Maker() {
  return (
    <section className="bg-paper py-20 lg:py-32" aria-labelledby="tekija-otsikko">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <figure className="relative m-0 max-w-[460px] lg:col-span-5" data-reveal>
          <div className="overflow-hidden rounded-[28px] bg-paper-2">
            <Photo
              k="jarkko"
              alt="Jarkko Karilahti, Tmi Jarkko Karilahden yrittäjä."
              sizes="(min-width: 1024px) 460px, 90vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <figcaption className="absolute -bottom-5 right-4 rounded-2xl bg-ink px-5 py-3 text-white shadow-xl">
            <span className="block font-display text-lg font-[700]">{company.owner}</span>
            <span className="text-[0.85rem] text-fog">Yrittäjä · {company.name}</span>
          </figcaption>
        </figure>
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-k" data-reveal>
            <span className="h-px w-8 bg-k" aria-hidden="true" /> Tekijä
          </p>
          <h2 id="tekija-otsikko" className="display-l mt-4 max-w-[15ch]" data-reveal>
            Yksi tekijä, oma nimi ovessa.
          </h2>
          <blockquote className="mt-8 border-l-[3px] border-k pl-6" data-reveal>
            <p className="font-display text-[clamp(1.3rem,1.05rem+0.9vw,1.85rem)] font-[560] leading-[1.3] tracking-[-0.015em] text-graphite">
              ”Tarjoan autosi pinnoille kokonaisvaltaista puhdistusta laadukkailla aineilla työn laadusta tinkimättä.”
            </p>
            <footer className="mt-3 text-[0.92rem] text-steel">— {company.owner}</footer>
          </blockquote>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3" data-reveal>
            <div className="border-t border-graphite/15 pt-4">
              <dt className="text-[0.85rem] text-steel">Yritys</dt>
              <dd className="mt-1 font-[650]">
                Toiminimi vuodesta {company.foundedYear}
                <br />
                <span className="num font-[500] text-steel">Y-tunnus {company.businessId}</span>
              </dd>
            </div>
            <div className="border-t border-graphite/15 pt-4">
              <dt className="text-[0.85rem] text-steel">Halli</dt>
              <dd className="mt-1 font-[650]">
                {company.address.street}, {company.address.unit}
                <br />
                <span className="font-[500] text-steel">
                  {company.address.district}, {company.address.city}
                </span>
              </dd>
            </div>
            <div className="border-t border-graphite/15 pt-4">
              <dt className="text-[0.85rem] text-steel">Autot</dt>
              <dd className="mt-1 font-[650]">
                Henkilöautoista pakettiautoihin
                <br />
                <span className="font-[500] text-steel">myös yritysten autot</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
