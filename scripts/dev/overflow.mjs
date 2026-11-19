import { chromium } from '@playwright/test'
const [p = '', w = '390'] = process.argv.slice(2)
const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: +w, height: 844 } })
await page.goto(`http://127.0.0.1:4327/tmi-jarkko-karilahti-demo/${p}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const r = await page.evaluate(() => {
  const W = window.innerWidth
  const out = []
  for (const el of document.querySelectorAll('body *')) {
    const rc = el.getBoundingClientRect()
    if (rc.right > W + 1 && rc.width > 0) {
      // skip if an ancestor clips
      let a = el.parentElement, clipped = false
      while (a && a !== document.body) {
        const s = getComputedStyle(a)
        if (/(hidden|clip|auto|scroll)/.test(s.overflowX) && a.getBoundingClientRect().right <= W + 1) { clipped = true; break }
        a = a.parentElement
      }
      if (!clipped) out.push(`${el.tagName}.${String(el.className).slice(0, 90)} right=${Math.round(rc.right)}`)
    }
  }
  return out.slice(0, 12)
})
console.log(r.join('\n'))
await b.close()
