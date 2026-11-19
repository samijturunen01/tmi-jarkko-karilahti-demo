import { LOGO_BLUE, LOGO_VIEWBOX, logoPaths } from './logoPaths'

interface LogoProps {
  tone?: 'dark' | 'light'
  className?: string
  /** Accessible name; omit when the logo sits inside a labelled link. */
  title?: string
  /** Per-part classes for the hero animation. */
  parts?: boolean
}

/**
 * The authentic Tmi Jarkko Karilahti logo – vectorised from the original artwork
 * (scripts/trace-logo.mjs). Script lettering + the shared blue "K".
 */
export function Logo({ tone = 'dark', className, title, parts }: LogoProps) {
  const ink = tone === 'light' ? '#f3f4f1' : '#0b0d10'
  const part = (n: string) => (parts ? `hero-logo-part ${n}` : undefined)
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path className={part('tmi')} fill={ink} d={logoPaths.tmi} />
      <path className={part('jarko')} fill={ink} d={logoPaths.jarko} />
      <path className={part('karilahti')} fill={ink} d={logoPaths.karilahti} />
      <path className={parts ? 'k' : undefined} fill={LOGO_BLUE} d={logoPaths.k} />
    </svg>
  )
}
