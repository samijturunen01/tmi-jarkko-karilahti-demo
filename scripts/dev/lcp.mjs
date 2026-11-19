import { chromium } from '@playwright/test'
const [u, w = '1440'] = process.argv.slice(2)
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: +w, height: 900 } })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send('Network.enable')
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 })
const reqs = []
page.on('requestfinished', async (r) => { const t = r.timing(); reqs.push([Math.round(t.responseEnd + (t.startTime - 0)), r.url().split('/').pop().slice(0, 50)]) })
await page.addInitScript(() => {
  window.__lcp = []
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push([Math.round(e.startTime), e.size, e.element ? e.element.tagName + '.' + String(e.element.className).slice(0, 60) : e.url]) }).observe({ type: 'largest-contentful-paint', buffered: true })
})
await page.goto(u, { waitUntil: 'load' })
await page.waitForTimeout(4500)
console.log(await page.evaluate(() => window.__lcp))
const res = await page.evaluate(() => performance.getEntriesByType('resource').map((r) => [Math.round(r.startTime), Math.round(r.responseEnd), r.name.split('/').pop().slice(0, 45)]))
console.log(res.slice(0, 25).map((x) => x.join('  ')).join('\n'))
await b.close()
