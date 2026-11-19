import { expect, test } from '@playwright/test'
import { isMobile, navLabels, openNav, PHONE, ready, url } from './helpers'

test('"Etusivu" is the first navigation item and the active item is marked', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  await ready(page)
  const nav = await openNav(page)
  const links = nav.getByRole('link')
  await expect(links.first()).toHaveText(/Etusivu/)
  for (const [i, label] of navLabels.entries()) await expect(links.nth(i)).toContainText(label)
  await expect(nav.getByRole('link', { name: /Hinnasto/ })).toHaveAttribute('aria-current', 'page')
})

test('"Palvelut" is active on individual service pages', async ({ page }) => {
  test.skip(isMobile(page), 'desktop nav')
  await page.goto(url('palvelut/otsonointi/'))
  await ready(page)
  await expect(page.getByRole('navigation', { name: 'Päävalikko' }).getByRole('link', { name: 'Palvelut' })).toHaveAttribute('aria-current', 'page')
})

test('logo links to the homepage', async ({ page }) => {
  await page.goto(url('referenssit/'))
  await ready(page)
  await page.getByRole('link', { name: 'Tmi Jarkko Karilahti – etusivu' }).first().click()
  await expect(page).toHaveURL(/tmi-jarkko-karilahti-demo\/?$/)
  await expect(page.locator('h1')).toContainText('Kiilto takaisin')
})

test('navigation menu opens the destination page at the very top', async ({ page }) => {
  await page.goto(url('palvelut/maalipinnan-kunnostus-ja-pinnoitus/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1500))
  await page.waitForTimeout(150)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Referenssit/ }).click()
  await expect(page).toHaveURL(/referenssit\/?$/)
  await expect(page.locator('h1')).toContainText('Ennen ja jälkeen')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('quote CTA lands on the form with the service preselected', async ({ page }) => {
  await page.goto(url('palvelut/ajovalojen-kiillotus/'))
  await ready(page)
  await page.getByRole('link', { name: /Pyydä tarjous ajovaloista/ }).first().click()
  await expect(page).toHaveURL(/yhteystiedot\?valinnat=umpiot-kiillotus#tarjouspyynto$/)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('tarjouspyynto')?.getBoundingClientRect().top ?? 9999)), { timeout: 4000 })
    .toBeLessThan(160)
  await expect(page.getByRole('checkbox', { name: /Umpioiden kiillotus/ })).toBeChecked()
})

test('back and forward restore the scroll position', async ({ page }) => {
  await page.goto(url('palvelut/maalipinnan-kunnostus-ja-pinnoitus/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1100))
  await page.waitForTimeout(250)
  await page.locator('footer a[href$="/hinnasto"]').first().dispatchEvent('click')
  await expect(page).toHaveURL(/hinnasto\/?$/)
  await page.goBack()
  await expect(page).toHaveURL(/maalipinnan-kunnostus-ja-pinnoitus\/$/)
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(1100)
  await page.goForward()
  await expect(page).toHaveURL(/hinnasto\/?$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('anchor links land on their section', async ({ page }) => {
  await page.goto(url('yhteystiedot/#kartta'))
  await ready(page)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('kartta')?.getBoundingClientRect().top ?? 9999)))
    .toBeLessThan(160)
})

test('direct deep links and refresh work on nested routes', async ({ page }) => {
  await page.goto(url('palvelut/sisatilojen-puhdistus/'))
  await ready(page)
  await expect(page.locator('h1')).toContainText('sisäpuhdistus')
  await page.reload()
  await ready(page)
  await expect(page.locator('h1')).toContainText('sisäpuhdistus')
})

test('page transitions are immediate (no blocking overlay)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const nav = await openNav(page)
  const t0 = Date.now()
  await nav.getByRole('link', { name: /Yhteystiedot/ }).click()
  await expect(page.locator('h1')).toContainText('Pyydä tarjous')
  expect(Date.now() - t0).toBeLessThan(1500)
  const covered = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    return !!el?.closest('[role="dialog"], dialog, [class*="fixed"][class*="inset-0"]')
  })
  expect(covered).toBe(false)
})

test('mobile menu opens, closes with Escape and navigates', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url())
  await ready(page)
  const toggle = page.getByRole('button', { name: 'Valikko' })
  await toggle.click()
  const menu = page.getByRole('navigation', { name: 'Mobiilivalikko' })
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('link').first()).toContainText('Etusivu')
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(page.getByRole('button', { name: 'Valikko' })).toBeFocused()
  await page.getByRole('button', { name: 'Valikko' }).click()
  const close = page.getByRole('button', { name: 'Sulje' })
  await expect(close).toBeVisible()
  await close.click()
  await expect(menu).toBeHidden()
  await page.getByRole('button', { name: 'Valikko' }).click()
  await menu.getByRole('link', { name: /Palvelut/ }).first().click()
  await expect(page).toHaveURL(/palvelut\/?$/)
  await expect(menu).toBeHidden()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('mobile action bar offers call and quote', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url('palvelut/'))
  await ready(page)
  const bar = page.locator('[data-action-bar]')
  await expect(bar.getByRole('link', { name: /Soita/ })).toHaveAttribute('href', PHONE)
  await bar.getByRole('link', { name: /Pyydä tarjous/ }).click()
  await expect(page).toHaveURL(/yhteystiedot\/?#tarjouspyynto$/)
})
