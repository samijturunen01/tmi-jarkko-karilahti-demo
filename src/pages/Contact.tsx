import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { QuoteForm } from '../components/forms/QuoteForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { Photo } from '../components/ui/Photo'
import { company, mailto } from '../data/company'
import { track } from '../lib/analytics'

export function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Yhteystiedot"
        title="Pyydä tarjous tai kysy vapaata aikaa."
        lead="Täytä tarjouspyyntö, soita tai lähetä sähköpostia. Kerro auton merkki ja malli sekä mitä autollesi toivot."
      />

      <section className="bg-paper py-14 lg:py-20" aria-label="Yhteydenotto">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ul className="grid gap-3">
                <li>
                  <a
                    href={company.phone.href}
                    onClick={() => track('phone_click', { location: 'contact' })}
                    className="group flex items-center gap-4 rounded-[22px] bg-ink p-5 text-white transition-colors hover:bg-ink-3"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-k">
                      <Phone size={22} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.85rem] text-fog">Soita</span>
                      <span className="num block font-display text-[1.6rem] font-[740] tracking-[-0.02em]">{company.phone.display}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={mailto('Tarjouspyyntö')}
                    onClick={() => track('email_click', { location: 'contact' })}
                    className="flex items-center gap-4 rounded-[22px] bg-chalk p-5 transition-colors hover:bg-paper-2"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper-2 text-k">
                      <Mail size={22} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.85rem] text-steel">Sähköposti</span>
                      <span className="block break-all font-[650]">{company.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 rounded-[22px] bg-chalk p-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper-2 text-k">
                    <MapPin size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.85rem] text-steel">Osoite</span>
                    <span className="block font-[650]">
                      {company.address.street}, {company.address.unit}
                    </span>
                    <span className="block">
                      {company.address.postalCode} {company.address.city} ({company.address.district})
                    </span>
                    <a href="#kartta" className="link-u mt-1 inline-block text-[0.92rem] font-[600] text-k">
                      Kartta ja reittiohjeet
                    </a>
                  </span>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-4 rounded-[22px] bg-paper-2 p-4">
                <Photo k="jarkko" alt="Jarkko Karilahti." sizes="64px" className="size-16 shrink-0 rounded-full object-cover" />
                <p className="text-[0.95rem]">
                  <span className="block font-[700]">{company.owner}</span>
                  <span className="text-steel">Yrittäjä – yhteydenotot suoraan Jarkolle.</span>
                </p>
              </div>

              <dl className="mt-6 space-y-1.5 text-[0.92rem] text-steel">
                <div className="flex gap-2">
                  <dt>Yritys:</dt>
                  <dd className="font-[600] text-graphite">{company.name}</dd>
                </div>
                <div className="flex gap-2">
                  <dt>Y-tunnus:</dt>
                  <dd className="num font-[600] text-graphite">{company.businessId}</dd>
                </div>
              </dl>
              <a
                href={company.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('facebook_click', { location: 'contact' })}
                className="link-u mt-5 inline-flex items-center gap-1.5 font-[650]"
              >
                Seuraa Facebookissa <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(avautuu uuteen välilehteen)</span>
              </a>
            </div>
          </div>

          <div id="tarjouspyynto" className="scroll-mt-28 lg:col-span-8">
            <h2 className="display-m">Tarjouspyyntö</h2>
            <p className="mt-3 max-w-[60ch] text-steel">Kolme lyhyttä kohtaa. Valitut palvelut näkyvät hintoineen, joten tiedät suunnan jo ennen vastausta.</p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section id="kartta" className="scroll-mt-24 bg-paper pb-20 lg:pb-28" aria-labelledby="kartta-otsikko">
        <div className="container-x">
          <h2 id="kartta-otsikko" className="display-m">
            Halli Salpakankaalla
          </h2>
          <p className="mt-3 max-w-[60ch] text-steel">
            {company.address.street} ({company.address.unit}), {company.address.postalCode} {company.address.city}.
          </p>
          <div className="mt-8">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  )
}
