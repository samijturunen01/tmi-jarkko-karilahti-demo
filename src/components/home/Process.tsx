import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { quoteHref } from '../../data/pricing'
import { SectionHead } from '../ui/SectionHead'

const steps = [
  {
    title: 'Kerro autosta',
    text: 'Valitse palvelut tarjouspyyntölomakkeella tai soita. Auton merkki ja malli auttavat arvioimaan työn.',
  },
  {
    title: 'Hinta ja aika',
    text: 'Kiinteät hinnat näet hinnastosta. Maalipinnan töissä hinta tarkentuu auton koon, värin ja maalipinnan kunnon mukaan.',
  },
  {
    title: 'Auto Salpakankaalle',
    text: `Tuo auto sovittuna aikana osoitteeseen ${company.address.street} (${company.address.unit}), ${company.address.city}.`,
  },
]

export function Process() {
  return (
    <section className="bg-paper-2 py-20 lg:py-28" aria-labelledby="asiointi-otsikko">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Asiointi" id="asiointi-otsikko" title="Kolme askelta kiiltoon." />
          <Link to={quoteHref()} className="btn btn-primary mt-8" data-reveal>
            Aloita tarjouspyyntö
          </Link>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-[22px] bg-paper p-6 lg:p-7" data-reveal style={{ ['--d' as string]: i * 90 }}>
              <span className="num grid size-11 place-items-center rounded-full bg-ink font-display text-lg font-[750] text-white">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[1.25rem] font-[700] tracking-[-0.015em]">{s.title}</h3>
              <p className="mt-2 text-steel">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
