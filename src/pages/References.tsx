import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { Photo } from '../components/ui/Photo'
import { CtaBand } from '../components/ui/CtaBand'
import { categories, projectById, projects, vehicleCount, type Category, type Project } from '../data/references'
import { quoteHref } from '../data/pricing'
import { track } from '../lib/analytics'

const coverOf = (p: Project) => p.shots.find((s) => s.stage === 'jalkeen') ?? p.shots[0]

export function References() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<Category | 'kaikki'>('kaikki')
  const openId = params.get('auto')
  const open = openId ? projectById[openId] : undefined

  const described = useMemo(
    () => projects.filter((p) => !p.categories.includes('muut') && (filter === 'kaikki' || p.categories.includes(filter as Category))),
    [filter],
  )
  const others = projects.filter((p) => p.categories.includes('muut'))
  const showOthers = filter === 'kaikki' || filter === 'muut'

  const openProject = (id: string) => {
    track('gallery_open', { project: id })
    const next = new URLSearchParams(params)
    next.set('auto', id)
    setParams(next, { preventScrollReset: true })
  }
  const close = useCallback(() => {
    const next = new URLSearchParams(params)
    next.delete('auto')
    setParams(next, { replace: true, preventScrollReset: true })
  }, [params, setParams])

  return (
    <>
      <PageIntro
        crumbs={[{ to: '/referenssit', label: 'Referenssit' }]}
        eyebrow="Referenssit"
        title="Ennen ja jälkeen – aidot kuvat tehdyistä töistä."
        lead={`${vehicleCount} autoa yrityksen omasta referenssigalleriasta: maalipinnan kunnostuksia, pinnoitteita, ajovaloumpioita ja sisätiloja. Kuvaukset ovat yrityksen omia.`}
      />

      <section className="bg-paper py-14 lg:py-20" aria-label="Referenssit">
        <div className="container-x">
          <div role="group" aria-label="Suodata referenssejä" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`chip shrink-0 border !px-4 !py-2.5 !text-[0.92rem] transition-colors ${
                  filter === c.id ? 'border-graphite bg-graphite text-white' : 'border-graphite/20 bg-chalk hover:border-graphite/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {described.length > 0 && (
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {described.map((p) => {
                const pair = p.categories.includes('ajovalot')
                const before = p.shots.find((s) => s.stage === 'ennen')
                const after = coverOf(p)
                return (
                  <li key={p.id}>
                    <button type="button" onClick={() => openProject(p.id)} className="group block w-full rounded-[22px] text-left" aria-haspopup="dialog">
                      <div className="relative overflow-hidden rounded-[22px] bg-paper-2">
                        {pair && before ? (
                          <div className="grid aspect-[4/3] grid-cols-2 gap-0.5">
                            <Photo k={before.key} alt={before.alt} sizes="(min-width: 1024px) 16vw, 45vw" className="size-full object-cover" />
                            <Photo k={after.key} alt={after.alt} sizes="(min-width: 1024px) 16vw, 45vw" className="size-full object-cover" />
                            <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[0.72rem] font-[700] uppercase tracking-[0.1em] text-white">Ennen</span>
                            <span className="absolute right-3 top-3 rounded-full bg-k px-2.5 py-1 text-[0.72rem] font-[700] uppercase tracking-[0.1em] text-white">Jälkeen</span>
                          </div>
                        ) : (
                          <Photo
                            k={after.key}
                            alt={after.alt}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        )}
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-[0.78rem] font-[650] text-white backdrop-blur-sm">
                          <Images size={15} aria-hidden="true" /> {p.shots.length}
                          <span className="sr-only">kuvaa</span>
                        </span>
                        {p.b2b && <span className="absolute left-3 top-3 rounded-full bg-k px-3 py-1.5 text-[0.75rem] font-[700] text-white">Yritysasiakas · {p.b2b}</span>}
                      </div>
                      <p className="mt-4 text-[0.8rem] font-[700] uppercase tracking-[0.12em] text-steel">{p.vehicle}</p>
                      <h2 className="mt-1.5 font-display text-[1.35rem] font-[700] leading-tight tracking-[-0.02em] group-hover:text-k">{p.title}</h2>
                      {p.text && <p className="mt-2 line-clamp-3 text-[0.95rem] text-steel">{p.text}</p>}
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tehdyt työt">
                        {p.work.map((w) => (
                          <li key={w} className="chip bg-paper-2 text-graphite">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {showOthers && (
            <section className="mt-20" aria-labelledby="muut-autot">
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-graphite/15 pt-10">
                <div>
                  <h2 id="muut-autot" className="display-m">
                    Lisää viimeisteltyjä autoja
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-steel">Kuvia yrityksen referenssigalleriasta – työn sisältö kerrotaan pyydettäessä.</p>
                </div>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
                {others.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => openProject(p.id)} className="group block w-full rounded-[18px] text-left" aria-haspopup="dialog">
                      <div className="overflow-hidden rounded-[18px] bg-paper-2">
                        <Photo
                          k={p.shots[0].key}
                          alt={p.shots[0].alt}
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="mt-2 text-[0.92rem] font-[650] leading-snug group-hover:text-k">{p.vehicle}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>

      <CtaBand
        location="references_closing"
        title="Seuraavaksi sinun autosi?"
        text="Kerro mitä autollesi toivot – maalipinnasta, ajovaloista tai sisätiloista. Kiinteät hinnat löydät hinnastosta."
      />

      {open && <Lightbox project={open} onClose={close} />}
    </>
  )
}

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)
  const n = project.shots.length
  const shot = project.shots[i]

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (!d.open) d.showModal()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
      if (d.open) d.close()
    }
  }, [])

  const go = (delta: number) => setI((v) => (v + delta + n) % n)

  return (
    <dialog
      ref={ref}
      aria-labelledby="lb-title"
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    >
      <div className="flex h-full flex-col lg:grid lg:grid-cols-[1fr_360px]">
        <div className="relative flex min-h-0 flex-1 items-center justify-center p-3 pt-16 lg:p-10">
          <figure className="relative m-0 flex h-full w-full items-center justify-center">
            <Photo key={shot.key} k={shot.key} alt={shot.alt} sizes="(min-width: 1024px) 70vw, 100vw" loading="eager" className="max-h-full w-auto max-w-full rounded-[14px] object-contain" />
          </figure>
          {n > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/80 hover:bg-ink lg:left-6" aria-label="Edellinen kuva">
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/80 hover:bg-ink lg:right-6" aria-label="Seuraava kuva">
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <div className="max-h-[42vh] overflow-y-auto bg-ink p-5 lg:max-h-none lg:p-8">
          <p className="eyebrow text-k-lite">{project.vehicle}</p>
          <h2 id="lb-title" className="mt-2 font-display text-[1.5rem] font-[700] leading-tight">
            {project.title}
          </h2>
          {project.text && <p className="mt-3 text-[0.97rem] text-fog">{project.text}</p>}
          <p className="num mt-4 flex items-center gap-2 text-[0.88rem] text-fog" aria-live="polite">
            Kuva {i + 1} / {n}
            {shot.stage && (
              <span className={`rounded-full px-2.5 py-1 text-[0.72rem] font-[700] uppercase tracking-[0.12em] text-white ${shot.stage === 'ennen' ? 'bg-white/15' : 'bg-k'}`}>
                {shot.stage === 'ennen' ? 'Ennen' : 'Jälkeen'}
              </span>
            )}
          </p>
          {n > 1 && (
            <ul className="mt-3 grid grid-cols-4 gap-2 lg:grid-cols-3">
              {project.shots.map((s, idx) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Näytä kuva ${idx + 1}`}
                    aria-current={idx === i ? 'true' : undefined}
                    className={`block overflow-hidden rounded-lg ring-2 ${idx === i ? 'ring-k' : 'ring-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <Photo k={s.key} alt="" sizes="100px" className="aspect-square w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link to={quoteHref()} className="btn btn-primary mt-6 w-full">
            Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <button type="button" onClick={onClose} className="absolute right-3 top-3 grid size-12 place-items-center rounded-full bg-white text-ink hover:bg-mist" aria-label="Sulje kuvagalleria">
        <X size={22} aria-hidden="true" />
      </button>
    </dialog>
  )
}
