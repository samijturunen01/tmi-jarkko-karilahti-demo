import { expect, test } from '@playwright/test'
import { EMAIL, PHONE, ready, url } from './helpers'

test('quote form validates, keeps input and shows the demo confirmation without sending anything', async ({ page }) => {
  const posts: string[] = []
  page.on('request', (r) => {
    if (r.method() !== 'GET') posts.push(r.url())
  })
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  const form = page.locator('form')
  await form.getByLabel(/Auton merkki ja malli/).fill('Volvo V60')
  await form.getByRole('button', { name: 'Lähetä tarjouspyyntö' }).click()
  // error summary lists the missing items and gets focus
  const alert = form.getByRole('alert')
  await expect(alert).toBeFocused()
  await expect(alert).toContainText('Valitse vähintään yksi palvelu')
  await expect(alert).toContainText('Kirjoita nimesi')
  await expect(alert).toContainText('puhelinnumero tai sähköposti')
  // input is preserved
  await expect(form.getByLabel(/Auton merkki ja malli/)).toHaveValue('Volvo V60')
  await form.getByRole('checkbox', { name: /Sisäpuhdistus/ }).check()
  await expect(form.getByText(/Hinnaston mukaan yhteensä/)).toContainText('65 €')
  await form.getByLabel('Nimi').fill('Testi Asiakas')
  await form.getByLabel('Sähköposti').fill('virhe@')
  await form.getByRole('button', { name: 'Lähetä tarjouspyyntö' }).click()
  await expect(form.getByRole('alert')).toContainText('Tarkista sähköpostiosoite')
  await form.getByLabel('Sähköposti').fill('testi@example.com')
  await form.getByRole('button', { name: 'Lähetä tarjouspyyntö' }).click()
  await expect(page.getByRole('status')).toContainText('Demoversio – viestiä ei lähetetty.')
  expect(posts).toEqual([])
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)).toBe(0)
})

test('price builder sums prices, links add-ons and carries the selection to the form', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  await ready(page)
  await page.getByRole('checkbox', { name: /Tuulilasin pinnoitus pesun yhteydessä/ }).check()
  // the add-on brings its parent (hand wash 39 €) along
  await expect(page.getByRole('checkbox', { name: /ulkopuolinen käsinpesu/ })).toBeChecked()
  await page.getByRole('checkbox', { name: /kunnostus \+ keraaminen pinnoite/ }).check()
  const summary = page.locator('aside')
  await expect(summary).toContainText('alk. 409 €')
  await summary.getByRole('link', { name: /Pyydä tarjous valituista/ }).click()
  await expect(page).toHaveURL(/yhteystiedot\?valinnat=/)
  await expect(page.getByRole('checkbox', { name: /Käsinpesu/ })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: /Tuulilasin pinnoitus/ })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: /keraaminen pinnoite/ })).toBeChecked()
})

test('before/after comparison responds to keyboard and switches cases', async ({ page }) => {
  await page.goto(url('palvelut/ajovalojen-kiillotus/'))
  await ready(page)
  const slider = page.getByRole('slider', { name: /vertailun jakajaa/ })
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', 'Ennen 52 %, jälkeen 48 %')
  await page.getByRole('button', { name: 'Valkoinen pikkuauto' }).click()
  await expect(page.getByRole('button', { name: 'Valkoinen pikkuauto' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('img', { name: /Valkoisen pikkuauton täysin samea/ })).toBeVisible()
})

test('reference filters and the accessible lightbox work', async ({ page }) => {
  await page.goto(url('referenssit/'))
  await ready(page)
  await page.getByRole('button', { name: 'Ajovalot', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: /Ajovaloumpio/ }).first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Keraaminen pinnoite ja nahkaistuimet' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Kaikki', exact: true }).click()
  await page.getByRole('button', { name: /Keraaminen pinnoite ja nahkaistuimet/ }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('Kuva 1 / 6')
  await page.keyboard.press('ArrowRight')
  await expect(dialog).toContainText('Kuva 2 / 6')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(/referenssit\/$/)
})

test('a reference link from the home page opens the right project', async ({ page }) => {
  await page.goto(url('referenssit/?auto=teokem-transit'))
  await ready(page)
  await expect(page.getByRole('dialog')).toContainText('Teokem Oy')
})

test('contact page: click-to-call, email, click-to-load map and directions', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator(`main a[href="${PHONE}"]`).first()).toBeVisible()
  await expect(page.locator(`main a[href^="${EMAIL}"]`).first()).toBeVisible()
  // nothing is loaded from Google before the visitor asks for the map
  await expect(page.locator('iframe')).toHaveCount(0)
  const directions = page.getByRole('link', { name: /Katso reittiohjeet/ })
  await expect(directions).toHaveAttribute('href', /google\.com\/maps\/dir\/\?api=1&destination=Aspitie%2017%2C%2080100%20Joensuu/)
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  const map = page.locator('iframe')
  await expect(map).toHaveAttribute('src', /maps\?q=Aspitie%2017%2C%2080100%20Joensuu&z=15&output=embed/)
  await expect(map).toHaveAttribute('title', /Aspitie 17/)
})

test('FAQ answers open and close', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const q = page.getByText('Miksi osa hinnoista on alkaen-hintoja?')
  await q.click()
  await expect(page.getByText(/Lopulliseen hintaan vaikuttavat auton koko, väri ja maalipinnan kunto/).first()).toBeVisible()
})
