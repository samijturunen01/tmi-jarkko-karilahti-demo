// Dev helper: capture frames of the homepage intro. Usage: node scripts/dev/intro-frames.mjs <outDir> [width] [height]
import { chromium } from '@playwright/test'
const [out, w = '1440', h = '900'] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: +w, height: +h } })
await page.goto('http://127.0.0.1:4327/tmi-jarkko-karilahti-demo/', { waitUntil: 'commit' })
await page.waitForFunction(() => window.__tjkReady === true)
const t0 = Date.now()
for (const t of [250, 650, 1050, 1500, 2300]) {
  const wait = t - (Date.now() - t0)
  if (wait > 0) await page.waitForTimeout(wait)
  const state = await page.locator('.hero-stage').getAttribute('data-intro')
  await page.screenshot({ path: `${out}/intro-${w}-${t}.png` })
  console.log(t, state)
}
await browser.close()
