import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { company, maps } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps: nothing is loaded from Google until the visitor asks for
 * the map (no API key needed). Directions and "open in Google Maps" work without loading it.
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false)
  return (
    <div className="overflow-hidden rounded-[26px] bg-ink-3">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
        {load ? (
          <iframe
            title={`Kartta: ${company.name}, ${company.address.street}, ${company.address.city}`}
            src={maps.embed}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="on-dark absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center text-white">
            {/* Stylised street grid – decorative placeholder, not a map */}
            <svg aria-hidden="true" className="absolute inset-0 size-full opacity-30" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
              <g fill="none" stroke="#5c6470" strokeWidth="1.2">
                <path d="M-20 300 C180 260 260 120 520 110 S820 60 840 40" />
                <path d="M120 -20 L220 420" />
                <path d="M-20 160 L840 210" />
                <path d="M430 -20 C440 140 470 260 520 420" />
                <path d="M640 -20 L600 420" />
              </g>
              <circle cx="455" cy="190" r="70" fill="none" stroke="#3434f4" strokeOpacity=".5" />
              <circle cx="455" cy="190" r="120" fill="none" stroke="#3434f4" strokeOpacity=".25" />
            </svg>
            <span className="relative grid size-14 place-items-center rounded-full bg-k shadow-[0_0_0_10px_rgba(52,52,244,.2)]">
              <MapPin size={26} aria-hidden="true" />
            </span>
            <div className="relative">
              <p className="font-display text-[1.4rem] font-[700]">
                {company.address.street}, {company.address.unit}
              </p>
              <p className="text-fog">
                {company.address.postalCode} {company.address.city} · {company.address.district}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoad(true)
                track('map_load')
              }}
              className="btn btn-light relative"
            >
              Näytä kartta
            </button>
            <p className="relative max-w-sm text-[0.82rem] text-fog">Kartta ladataan Googlelta vasta, kun painat painiketta.</p>
          </div>
        )}
      </div>
      <div className="on-dark flex flex-wrap gap-3 p-4 sm:p-5">
        <a
          href={maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('directions_click')}
          className="btn btn-primary !min-h-[46px] flex-1 sm:flex-none"
        >
          <Navigation size={18} aria-hidden="true" /> Katso reittiohjeet
          <span className="sr-only">(avautuu uuteen välilehteen)</span>
        </a>
        <a href={maps.open} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-[46px] flex-1 text-white sm:flex-none">
          Avaa Google Mapsissa
          <span className="sr-only">(avautuu uuteen välilehteen)</span>
        </a>
      </div>
    </div>
  )
}
