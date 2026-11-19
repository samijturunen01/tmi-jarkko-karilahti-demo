import { Plus } from 'lucide-react'
import type { Faq } from '../../data/services'

/** Native <details> accordion: keyboard and screen-reader friendly, works without JS. */
export function FaqList({ items, tone = 'light' }: { items: Faq[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <div className={`border-t ${dark ? 'border-white/12' : 'border-graphite/15'}`}>
      {items.map((f) => (
        <details key={f.q} className={`group border-b ${dark ? 'border-white/12' : 'border-graphite/15'}`}>
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[1.18rem] font-[650] leading-snug tracking-[-0.015em] [&::-webkit-details-marker]:hidden ${
              dark ? 'text-white' : 'text-graphite'
            }`}
          >
            {f.q}
            <span
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-300 group-open:rotate-45 ${
                dark ? 'bg-white/10 text-white' : 'bg-graphite/8 text-graphite'
              }`}
              aria-hidden="true"
            >
              <Plus size={18} />
            </span>
          </summary>
          <p className={`max-w-[70ch] pb-6 pr-12 ${dark ? 'text-fog' : 'text-steel'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
