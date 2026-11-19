import { chromium } from '@playwright/test'
const b = await chromium.launch()
const page = await b.newPage()
await page.goto('http://127.0.0.1:4327/tmi-jarkko-karilahti-demo/hinnasto/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const r = await page.evaluate(() => {
  const txt = 'Auton fiksaus Joensuussa – käsinpesusta keraamiseen pinnoitteeseen. Kiilto takaisin. Maalipinnan kunnostus eli myllytys, kovavaha tai keraaminen pinnoite, ajovaloumpioiden kiillotus sekä sisätilojen puhdistus ja otsonointi.'
  const c = document.createElement('canvas').getContext('2d')
  const m = (f) => { c.font = f; return c.measureText(txt).width }
  return {
    bric700: m("700 100px 'Bricolage Grotesque Variable'"),
    arial700: m('700 100px Arial'),
    bric620: m("620 100px 'Bricolage Grotesque Variable'"),
    arial600: m('600 100px Arial'),
    inter400: m("400 100px 'Inter Tight Variable'"),
    arial400: m('400 100px Arial'),
    inter650: m("650 100px 'Inter Tight Variable'"),
    arialb: m('700 100px Arial'),
  }
})
console.log(r)
for (const [a, bb] of [['bric700', 'arial700'], ['bric620', 'arial600'], ['inter400', 'arial400'], ['inter650', 'arialb']]) console.log(a, (r[a] / r[bb] * 100).toFixed(1) + '%')
await b.close()
