import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, CircleAlert, Info, LoaderCircle, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { formatPrice, isTopic, priceById, topicGroups, topicLabel, type PriceId, type TopicId } from '../../data/pricing'
import { emptyQuote, type FieldErrors, type QuoteRequest, type SubmitResult } from '../../lib/forms/types'
import { validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import { track } from '../../lib/analytics'

const errorOrder: (keyof FieldErrors)[] = ['topics', 'vehicle', 'details', 'name', 'contact', 'phone', 'email']
const fieldFor: Record<keyof FieldErrors, string> = {
  topics: 'f-topics',
  vehicle: 'f-vehicle',
  details: 'f-details',
  timing: 'f-timing',
  name: 'f-name',
  contact: 'f-phone',
  phone: 'f-phone',
  email: 'f-email',
}

export function QuoteForm() {
  const [params] = useSearchParams()
  const [data, setData] = useState<QuoteRequest>(emptyQuote())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<SubmitResult | null>(null)
  const started = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  // Preselect services from ?valinnat=a,b (links from prices, services and the price builder).
  const valinnat = params.get('valinnat')
  useEffect(() => {
    if (!valinnat) return
    const ids = valinnat.split(',').filter(isTopic)
    // Applied after hydration on purpose: prerendered HTML has no query string, so reading the URL
    // during render would cause a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (ids.length) setData((d) => ({ ...d, topics: Array.from(new Set(ids)) as TopicId[] }))
  }, [valinnat])

  const set = <K extends keyof QuoteRequest>(k: K, v: QuoteRequest[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'tarjouspyynto' })
    }
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k] || (k === 'phone' || k === 'email' ? errors.contact : false)) {
      setErrors((e) => {
        const n = { ...e }
        delete n[k]
        if (k === 'phone' || k === 'email') delete n.contact
        return n
      })
    }
  }

  const toggleTopic = (id: TopicId) => {
    const on = data.topics.includes(id)
    set('topics', on ? data.topics.filter((t) => t !== id) : [...data.topics, id])
  }

  const priced = data.topics.filter((t): t is PriceId => t in priceById && priceById[t as PriceId].unit !== '/päivä')
  const estimate = priced.reduce((sum, t) => sum + priceById[t].price, 0)
  const estimateFrom = priced.some((t) => priceById[t].from)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) {
      track('form_validation_error', { fields: Object.keys(errs).length })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(data)
      setResult(res)
      setStatus('done')
      track('form_submit_success', { form: 'tarjouspyynto', topics: data.topics.length, demo: res.demo })
      requestAnimationFrame(() => doneRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 flex items-start gap-1.5 text-[0.9rem] font-[550] text-[#b3242b]">
        <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {errors[k]}
      </p>
    ) : null
  const describedBy = (...ks: (keyof FieldErrors)[]) => ks.filter((k) => errors[k]).map((k) => `${uid}-${k}-err`).join(' ') || undefined

  if (status === 'done' && result) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-[26px] bg-chalk p-7 outline-none lg:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-k text-white">
          <Check size={28} strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-[1.9rem] font-[740] tracking-[-0.03em]">{result.message}</h3>
        {result.demo && (
          <p className="mt-3 max-w-[56ch] text-steel">
            Tämä on verkkosivujen konseptidemo: lomake ei lähettänyt eikä tallentanut tietojasi. Tavoitat yrityksen oikeasti puhelimella tai
            sähköpostilla.
          </p>
        )}
        <dl className="mt-6 grid gap-2 rounded-2xl bg-paper p-5 text-[0.95rem]">
          <div className="flex gap-2">
            <dt className="text-steel">Palvelut:</dt>
            <dd className="font-[600]">{data.topics.map(topicLabel).join(', ')}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-steel">Auto:</dt>
            <dd className="font-[600]">{data.vehicle}</dd>
          </div>
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={company.phone.href} onClick={() => track('phone_click', { location: 'form_done' })} className="btn btn-primary">
            <Phone size={18} aria-hidden="true" /> Soita {company.phone.display}
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setStatus('idle')
              setResult(null)
            }}
          >
            Muokkaa pyyntöä
          </button>
        </div>
      </div>
    )
  }

  const errorList = errorOrder.filter((k) => errors[k])

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[26px] bg-chalk p-5 sm:p-7 lg:p-10" aria-describedby={`${uid}-demo`}>
      <p id={`${uid}-demo`} className="flex gap-2.5 rounded-2xl bg-paper-2 p-4 text-[0.88rem] text-steel">
        <Info size={18} className="mt-0.5 shrink-0 text-k" aria-hidden="true" />
        {isDemoMode()
          ? 'Konseptidemo: lomake ei lähetä eikä tallenna tietoja. Pakolliset kentät on merkitty tähdellä (*).'
          : 'Pakolliset kentät on merkitty tähdellä (*).'}
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-5 rounded-2xl border-2 border-[#b3242b] bg-[#fdf1f1] p-4 outline-none">
          <p className="font-[700] text-[#8f1c22]">Tarkista {errorList.length === 1 ? 'yksi kohta' : `${errorList.length} kohtaa`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.93rem]">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${fieldFor[k]}`} className="link-u text-[#8f1c22]">
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 1 – services */}
      <fieldset id="f-topics" tabIndex={-1} className="mt-8 outline-none" aria-describedby={describedBy('topics')}>
        <legend className="font-display text-[1.35rem] font-[700] tracking-[-0.02em]">
          <span className="num mr-2 text-k">1</span>Mitä autolle tehdään? <span className="text-k">*</span>
        </legend>
        <p className="mt-1 text-[0.93rem] text-steel">Valitse yksi tai useampi.</p>
        {err('topics')}
        <div className="mt-4 space-y-5">
          {topicGroups.map((g) => (
            <div key={g.title}>
              <p className="text-[0.8rem] font-[700] uppercase tracking-[0.12em] text-steel">{g.title}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {g.ids.map((id) => {
                  const on = data.topics.includes(id)
                  const p = priceById[id as PriceId]
                  return (
                    <label
                      key={id}
                      className={`relative inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-[0.93rem] font-[600] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-k ${
                        on ? 'border-k bg-k text-white' : 'border-graphite/20 bg-chalk text-graphite hover:border-k'
                      }`}
                    >
                      <input type="checkbox" className="absolute inset-0 size-full cursor-pointer appearance-none rounded-full opacity-0" checked={on} onChange={() => toggleTopic(id)} />
                      {on && <Check size={15} strokeWidth={3} aria-hidden="true" />}
                      {topicLabel(id)}
                      {p && <span className={`num font-[500] ${on ? 'text-white/80' : 'text-steel'}`}>{formatPrice(p, { addon: !!p.addonOf })}</span>}
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        {priced.length > 0 && (
          <p className="mt-5 rounded-2xl bg-paper p-4 text-[0.95rem]" aria-live="polite">
            Hinnaston mukaan yhteensä{' '}
            <strong className="num font-[750]">
              {estimateFrom ? 'alk. ' : ''}
              {estimate} €
            </strong>
            {estimateFrom && <span className="text-steel"> – alkaen-hinnat tarkentuvat auton koon, värin ja kunnon mukaan.</span>}
          </p>
        )}
      </fieldset>

      {/* 2 – vehicle */}
      <fieldset className="mt-10">
        <legend className="font-display text-[1.35rem] font-[700] tracking-[-0.02em]">
          <span className="num mr-2 text-k">2</span>Auto ja toiveet
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="f-vehicle" className="font-[650]">
              Auton merkki ja malli <span className="text-k">*</span>
            </label>
            <input
              id="f-vehicle"
              className="field mt-2"
              value={data.vehicle}
              onChange={(e) => set('vehicle', e.target.value)}
              placeholder="esim. Volvo V60, musta"
              autoComplete="off"
              aria-invalid={!!errors.vehicle}
              aria-describedby={describedBy('vehicle')}
              required
            />
            {err('vehicle')}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-details" className="font-[650]">
              Lisätiedot <span className="font-[450] text-steel">(vapaaehtoinen)</span>
            </label>
            <textarea
              id="f-details"
              className="field mt-2"
              value={data.details}
              onChange={(e) => set('details', e.target.value)}
              placeholder="Esim. naarmut, haalistuma, tahrat tai hajut – kaikki mikä auttaa arvioimaan työn."
              maxLength={2000}
              aria-invalid={!!errors.details}
              aria-describedby={describedBy('details')}
            />
            {err('details')}
          </div>
          <div>
            <label htmlFor="f-timing" className="font-[650]">
              Toivottu ajankohta <span className="font-[450] text-steel">(vapaaehtoinen)</span>
            </label>
            <select id="f-timing" className="field mt-2" value={data.timing} onChange={(e) => set('timing', e.target.value as QuoteRequest['timing'])}>
              <option value="">Ei väliä</option>
              <option value="pian">Mahdollisimman pian</option>
              <option value="kuukausi">Kuukauden sisällä</option>
              <option value="joustava">Joustava – sovitaan</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* 3 – contact */}
      <fieldset className="mt-10">
        <legend className="font-display text-[1.35rem] font-[700] tracking-[-0.02em]">
          <span className="num mr-2 text-k">3</span>Yhteystietosi
        </legend>
        <p className="mt-1 text-[0.93rem] text-steel">Anna puhelinnumero tai sähköposti – kumpi sinulle sopii.</p>
        {err('contact')}
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="f-name" className="font-[650]">
              Nimi <span className="text-k">*</span>
            </label>
            <input
              id="f-name"
              className="field mt-2"
              value={data.name}
              onChange={(e) => set('name', e.target.value)}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy('name')}
              required
            />
            {err('name')}
          </div>
          <div>
            <label htmlFor="f-phone" className="font-[650]">
              Puhelin
            </label>
            <input
              id="f-phone"
              type="tel"
              inputMode="tel"
              className="field mt-2"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              placeholder="040 123 4567"
              aria-invalid={!!(errors.phone || errors.contact)}
              aria-describedby={describedBy('phone', 'contact')}
            />
            {err('phone')}
          </div>
          <div>
            <label htmlFor="f-email" className="font-[650]">
              Sähköposti
            </label>
            <input
              id="f-email"
              type="email"
              inputMode="email"
              className="field mt-2"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              placeholder="nimi@esimerkki.fi"
              aria-invalid={!!(errors.email || errors.contact)}
              aria-describedby={describedBy('email', 'contact')}
            />
            {err('email')}
          </div>
        </div>
      </fieldset>

      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-2xl bg-[#fdf1f1] p-4 font-[600] text-[#8f1c22]">
          Lähetys epäonnistui. Soita {company.phone.display} tai lähetä sähköpostia {company.email}.
        </p>
      )}

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Lähetetään…
            </>
          ) : (
            'Lähetä tarjouspyyntö'
          )}
        </button>
        <p className="text-[0.88rem] text-steel">
          Kiire? Soita{' '}
          <a href={company.phone.href} className="link-u num font-[650] text-graphite">
            {company.phone.display}
          </a>
        </p>
      </div>
    </form>
  )
}
