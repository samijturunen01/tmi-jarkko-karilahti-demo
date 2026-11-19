import { useEffect } from 'react'

/**
 * Reveals [data-reveal] / [data-draw] / [data-inview] elements when they enter
 * the viewport (adds .is-in). One observer per page; re-scans when `key` changes.
 */
export function useReveals(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-inview], [data-draw]')).filter(
      (el) => !el.classList.contains('is-in'),
    )
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
