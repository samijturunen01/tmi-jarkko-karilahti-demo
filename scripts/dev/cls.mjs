import { chromium } from '@playwright/test'
const [u] = process.argv.slice(2)
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send('Network.enable')
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 })
await page.addInitScript(() => {
  window.__shifts = []
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      if (e.hadRecentInput) continue
      window.__shifts.push({ t: Math.round(e.startTime), v: +e.value.toFixed(4), src: (e.sources || []).map((s) => (s.node ? (s.node.className?.baseVal ?? s.node.className ?? s.node.nodeName) + '' : '?').slice(0, 70) + ` ${Math.round(s.previousRect.y)}→${Math.round(s.currentRect.y)} h${Math.round(s.previousRect.height)}→${Math.round(s.currentRect.height)}`) })
    }
  }).observe({ type: 'layout-shift', buffered: true })
})
await page.goto(u, { waitUntil: 'load' })
await page.waitForTimeout(4000)
console.log(JSON.stringify(await page.evaluate(() => window.__shifts), null, 1))
await b.close()
