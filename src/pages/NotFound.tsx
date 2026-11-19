import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../data/services'

export function NotFound() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="swirl-bg pointer-events-none absolute -right-20 top-10 size-[560px] rounded-full" />
      <div className="container-x relative py-24 lg:py-36">
        <p className="eyebrow text-k-lite">Virhe 404</p>
        <h1 className="display-xl mt-5 max-w-[12ch]">Tämä kohta jäi kiillottamatta.</h1>
        <p className="lead mt-6 max-w-[52ch] text-fog">
          Etsimääsi sivua ei löytynyt – se on ehkä siirtynyt. Näistä pääset jatkamaan:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            Etusivulle <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/hinnasto" className="btn btn-ghost text-white">
            Hinnasto
          </Link>
          <Link to="/yhteystiedot" className="btn btn-ghost text-white">
            Yhteystiedot
          </Link>
        </div>
        <ul className="mt-14 grid max-w-3xl gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.id}>
              <Link to={s.path} className="flex items-center justify-between rounded-2xl border border-white/12 px-5 py-4 font-[600] hover:border-k-lite">
                {s.label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
