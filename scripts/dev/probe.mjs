import { chromium } from '@playwright/test'
const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://127.0.0.1:4327/tmi-jarkko-karilahti-demo/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.locator('[data-wipe]').first().scrollIntoViewIfNeeded()
await page.waitForTimeout(1500)
console.log(await page.evaluate(() => {
  const el = document.querySelector('[data-wipe]')
  const img = el.querySelector('img')
  return { cls: el.className, clip: getComputedStyle(el).clipPath, h: el.getBoundingClientRect().height, img: img && [img.currentSrc, img.complete, img.naturalWidth, getComputedStyle(img).display, img.getBoundingClientRect().height] }
}))
await b.close()
