// Dev helper: screenshots of the built site. Usage: node scripts/dev/shot.mjs <outDir> <path> [width] [height] [full] [waitMs]
import { chromium } from '@playwright/test'
const [out, p = '', w = '1440', h = '900', full = '1', wait = '2600', rm = ''] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, reducedMotion: rm ? 'reduce' : 'no-preference' })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto(`http://127.0.0.1:4327/tmi-jarkko-karilahti-demo/${p}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(+wait)
if (full === '1') {
  // trigger reveals
  const H = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < H; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(60)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1200)
}
const name = `${out}/${(p || 'home').replace(/[/?#=,]+/g, '_')}-${w}.png`
await page.screenshot({ path: name, fullPage: full === '1' })
const ow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
console.log(name, 'overflowX', ow, errors.length ? 'ERRORS: ' + errors.join(' | ') : 'no console errors')
await browser.close()
