import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { LOGO_BLUE, LOGO_VIEWBOX, logoPaths } from '../brand/logoPaths'
import { company } from '../../data/company'
import { quoteHref } from '../../data/pricing'
import { vehicleCount } from '../../data/references'
import { introAllowed, prefersReducedMotion, releaseIntroHold } from '../../lib/intro'
import { gsap } from '../../lib/motion'
import { track } from '../../lib/analytics'

const HERO = { key: 'v90-front', alt: 'Peilikirkkaaksi viimeistelty musta Volvo V90 Cross Country – puut heijastuvat konepellistä.' }

/**
 * Signature intro "Tarkastusvalo": a raking inspection light sweeps over a hazed,
 * swirl-marked photo of real work and leaves mirror gloss behind it, while the authentic
 * logo is written in and the blue K catches the light. Copy and CTAs are readable from
 * the first paint; nothing waits for the animation.
 */
export function Hero() {
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    if (!introAllowed() || prefersReducedMotion()) {
      releaseIntroHold()
      el.dataset.intro = 'skipped'
      return
    }
    const parts = el.querySelectorAll<SVGPathElement>('.hero-logo-part')
    const k = el.querySelector<SVGPathElement>('.hero-logo .k')
    const glint = el.querySelector<SVGRectElement>('.k-glint')
    // Inline start state takes over from the pre-paint CSS hold without a flash.
    gsap.set(el, { '--p': 0 })
    gsap.set(parts, { '--lp': 0 })
    gsap.set(k, { opacity: 0, scale: 1.12, rotate: -3, transformOrigin: '40% 60%' })
    releaseIntroHold()
    el.dataset.intro = 'playing'

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        el.dataset.intro = 'done'
      },
    })
    tl.to(el, { '--p': 1, duration: 1.55, ease: 'power2.inOut' }, 0)
      .to(parts[0], { '--lp': 1, duration: 0.5, ease: 'power2.out' }, 0.1)
      .to(parts[1], { '--lp': 1, duration: 0.6, ease: 'power2.out' }, 0.3)
      .to(parts[2], { '--lp': 1, duration: 0.7, ease: 'power2.out' }, 0.5)
      .to(k, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2.2)' }, 0.72)
      .fromTo(glint, { attr: { x: 60 } }, { attr: { x: 300 }, duration: 0.85, ease: 'power2.inOut' }, 1.0)

    return () => {
      tl.kill()
      gsap.set(el, { '--p': 1 })
      gsap.set(parts, { '--lp': 1 })
      gsap.set(k, { opacity: 1, scale: 1, rotate: 0 })
      el.dataset.intro = el.dataset.intro === 'playing' ? 'skipped' : el.dataset.intro
    }
  }, [])

  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white" aria-labelledby="hero-otsikko">
      {/* ambient gloss */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_78%_30%,rgba(52,52,244,0.20),transparent_70%)]"
      />
      <div
        ref={stage}
        data-intro="pending"
        className="hero-stage container-x relative grid gap-y-8 pb-14 pt-5 lg:min-h-[min(calc(100svh-110px),820px)] lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:pb-20 lg:pt-10"
      >
        {/* Photo + logo plate */}
        <div className="relative lg:order-2 lg:col-span-6 lg:col-start-7">
          <div className="hero-frame relative aspect-[16/11] overflow-hidden rounded-[22px] bg-ink-3 sm:aspect-[16/10] lg:aspect-[4/5] lg:max-h-[700px] lg:rounded-[30px]">
            <Photo
              k={HERO.key}
              alt={HERO.alt}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              position="50% 58%"
              className="absolute inset-0 size-full object-cover"
            />
            {/* Haze + swirl marks that the light clears */}
            <div className="hero-haze absolute inset-0" aria-hidden="true">
              <Photo
                k={HERO.key}
                alt=""
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                position="50% 58%"
                className="absolute inset-0 size-full object-cover [filter:saturate(.3)_brightness(.55)_contrast(.8)_blur(1.5px)]"
              />
              <svg className="absolute inset-0 size-full opacity-70 mix-blend-screen" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="swirlFade" cx="50%" cy="45%" r="60%">
                    <stop offset="0" stopColor="#fff" stopOpacity=".55" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g fill="none" stroke="url(#swirlFade)" strokeWidth=".7">
                  {Array.from({ length: 26 }, (_, i) => (
                    <circle key={i} cx={210 + (i % 3) * 6} cy={230 - (i % 4) * 5} r={10 + i * 9} strokeDasharray={`${18 + (i % 5) * 9} ${10 + (i % 3) * 8}`} />
                  ))}
                </g>
              </svg>
            </div>
            {/* The inspection light */}
            <div
              aria-hidden="true"
              className="hero-beam pointer-events-none absolute -inset-y-[10%] w-[30%] -skew-x-12 mix-blend-screen [background:linear-gradient(90deg,transparent,rgba(214,222,255,.08)_25%,rgba(240,244,255,.62)_50%,rgba(214,222,255,.08)_75%,transparent)]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
            <p className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1.5 text-[0.74rem] font-[600] text-white/90 backdrop-blur-md lg:right-5 lg:top-5">
              Referenssi · Volvo V90 Cross Country
            </p>
          </div>

          {/* Authentic logo plate */}
          <div className="hero-logo absolute -bottom-6 left-3 rounded-[18px] border border-white/12 bg-ink/85 px-4 pb-3 pt-3.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)] backdrop-blur-md sm:left-5 lg:-bottom-8 lg:-left-14 lg:rounded-[24px] lg:px-7 lg:pb-5 lg:pt-6">
            <svg viewBox={LOGO_VIEWBOX} className="h-[64px] w-auto sm:h-[78px] lg:h-[118px]" role="img" aria-label={company.name}>
              <defs>
                <clipPath id="kClip">
                  <path d={logoPaths.k} />
                </clipPath>
                <linearGradient id="kGlint" x1="0" x2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset=".5" stopColor="#fff" stopOpacity=".85" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="hero-logo-part" fill="#f3f4f1" d={logoPaths.tmi} />
              <path className="hero-logo-part" fill="#f3f4f1" d={logoPaths.jarko} />
              <path className="hero-logo-part" fill="#f3f4f1" d={logoPaths.karilahti} />
              <path className="k" fill={LOGO_BLUE} d={logoPaths.k} />
              <g clipPath="url(#kClip)">
                <rect className="k-glint" x="300" y="60" width="44" height="140" fill="url(#kGlint)" transform="skewX(-20)" />
              </g>
            </svg>
            <p className="mt-1.5 border-t border-white/10 pt-1.5 text-[0.62rem] font-[650] uppercase tracking-[0.2em] text-fog lg:mt-3 lg:pt-3 lg:text-[0.7rem]">
              {company.tagline}
            </p>
          </div>
        </div>

        {/* Copy – visible immediately */}
        <div className="relative pt-6 lg:order-1 lg:col-span-6 lg:pt-0">
          <p className="eyebrow flex items-center gap-3 text-k-lite">
            <span className="h-px w-8 bg-k-lite" aria-hidden="true" />
            Auton fiksaus · Joensuu
          </p>
          <h1 id="hero-otsikko" className="mt-5">
            <span className="display-xl block">Kiilto takaisin.</span>
            <span className="mt-4 block max-w-[22ch] font-display text-[clamp(1.35rem,1.05rem+1.2vw,2.05rem)] font-[620] leading-[1.12] tracking-[-0.02em] text-mist">
              Auton fiksaus Joensuussa – käsinpesusta keraamiseen pinnoitteeseen.
            </span>
          </h1>
          <p className="lead mt-6 max-w-[54ch] text-fog">
            Maalipinnan kunnostus eli myllytys, kovavaha tai keraaminen pinnoite, ajovaloumpioiden kiillotus sekä sisätilojen
            puhdistus ja otsonointi. Hinnat näet etukäteen: <strong className="font-[650] text-white">käsinpesu 39 €</strong>,{' '}
            <strong className="font-[650] text-white">sisäpuhdistus 65 €</strong>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={quoteHref()} onClick={() => track('cta_click', { location: 'hero', label: 'pyyda_tarjous' })} className="btn btn-primary">
              Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/hinnasto" onClick={() => track('cta_click', { location: 'hero', label: 'hinnasto' })} className="btn btn-ghost text-white">
              Katso hinnasto
            </Link>
          </div>
          <p className="mt-5 text-[0.95rem] text-fog">
            tai soita{' '}
            <a href={company.phone.href} onClick={() => track('phone_click', { location: 'hero' })} className="link-u num inline-flex items-center gap-1.5 font-[650] text-white">
              <Phone size={15} aria-hidden="true" /> {company.phone.display}
            </a>
          </p>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6 text-[0.86rem]">
            <div>
              <dt className="text-fog">Toiminut</dt>
              <dd className="num mt-1 font-display text-xl font-[700] text-white">vuodesta {company.foundedYear}</dd>
            </div>
            <div>
              <dt className="text-fog">Referensseissä</dt>
              <dd className="num mt-1 font-display text-xl font-[700] text-white">{vehicleCount} autoa</dd>
            </div>
            <div>
              <dt className="text-fog">Halli</dt>
              <dd className="mt-1 font-display text-xl font-[700] text-white">Salpakangas</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
