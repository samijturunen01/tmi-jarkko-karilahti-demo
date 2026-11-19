import { useId, useState } from 'react'
import { Photo } from '../ui/Photo'
import { beforeAfter } from '../../data/references'
import { track } from '../../lib/analytics'

/**
 * Honest before/after: the two photos are separate shots of the same headlight (same day),
 * so they sit side by side – each framed on its own subject – instead of being overlaid.
 * The light-bar divider (a native range input → keyboard, touch and screen readers) shifts
 * the emphasis between "Ennen" and "Jälkeen".
 */
export function BeforeAfter({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [caseId, setCaseId] = useState<string>(beforeAfter[0].id)
  const [pos, setPos] = useState(50)
  const [touched, setTouched] = useState(false)
  const id = useId()
  const c = beforeAfter.find((x) => x.id === caseId) ?? beforeAfter[0]
  const dark = tone === 'dark'
  // The pointer maps 1:1 to the divider; the visible split stays between 20 % and 80 %.
  const shown = Math.min(80, Math.max(20, pos))

  const onInput = (v: number) => {
    setPos(v)
    if (!touched) {
      setTouched(true)
      track('before_after_interact', { case: c.id })
    }
  }

  return (
    <div>
      <div role="group" aria-label="Valitse auto" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {beforeAfter.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={b.id === caseId}
            onClick={() => {
              setCaseId(b.id)
              setPos(50)
            }}
            className={`chip shrink-0 border !px-4 !py-2 transition-colors ${
              b.id === caseId
                ? 'border-k bg-k text-white'
                : dark
                  ? 'border-white/20 text-fog hover:border-white/50 hover:text-white'
                  : 'border-graphite/20 text-steel hover:border-graphite/50 hover:text-graphite'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="relative mt-5 overflow-hidden rounded-[22px] bg-ink-3 lg:rounded-[28px]">
        <div className="flex aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/10]">
          <figure className="ba-panel relative m-0 overflow-hidden" style={{ flexBasis: `${shown}%` }}>
            <Photo
              key={c.before.key}
              k={c.before.key}
              alt={c.before.alt}
              sizes="(min-width: 1024px) 60vw, 90vw"
              position={c.before.position}
              className="absolute inset-0 size-full object-cover"
            />
            <figcaption className="absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1.5 text-[0.78rem] font-[700] uppercase tracking-[0.12em] text-white backdrop-blur-sm lg:left-5 lg:top-5">
              Ennen
            </figcaption>
          </figure>
          <figure className="ba-panel relative m-0 overflow-hidden" style={{ flexBasis: `${100 - shown}%` }}>
            <Photo
              key={c.after.key}
              k={c.after.key}
              alt={c.after.alt}
              sizes="(min-width: 1024px) 60vw, 90vw"
              position={c.after.position}
              className="absolute inset-0 size-full object-cover"
            />
            <figcaption className="absolute right-3 top-3 rounded-full bg-k px-3 py-1.5 text-[0.78rem] font-[700] uppercase tracking-[0.12em] text-white lg:right-5 lg:top-5">
              Jälkeen
            </figcaption>
          </figure>
        </div>
        {/* The light bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_18px_4px_rgba(220,228,255,.75)] transition-[left] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ left: `${shown}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_30px_rgba(0,0,0,.45)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          Siirrä vertailun jakajaa: ennen- ja jälkeen-kuvan osuus
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => onInput(Number(e.target.value))}
          aria-valuetext={`Ennen ${shown} %, jälkeen ${100 - shown} %`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className={`mt-3 text-[0.88rem] ${dark ? 'text-fog' : 'text-steel'}`}>
        <span className="font-[650]">{c.label}</span> · kuvattu <span className="num">{c.time}</span> · samasta umpiosta ennen ja jälkeen käsittelyn
      </p>
    </div>
  )
}
