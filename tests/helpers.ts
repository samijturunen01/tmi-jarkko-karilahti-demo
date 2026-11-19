import type { Page } from '@playwright/test'

export const BASE = '/tmi-jarkko-karilahti-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /Kiilto takaisin/ },
  { path: 'palvelut/', h1: /Auton fiksaus Joensuussa – ulkoa ja sisältä/ },
  { path: 'palvelut/maalipinnan-kunnostus-ja-pinnoitus/', h1: /Maalipinnan kunnostus ja pinnoitus Joensuussa/ },
  { path: 'palvelut/ajovalojen-kiillotus/', h1: /Ajovaloumpioiden kiillotus ja hartsipinnoitus/ },
  { path: 'palvelut/kasinpesu-ja-vahaus/', h1: /Auton käsinpesu ja vahaus Joensuussa/ },
  { path: 'palvelut/sisatilojen-puhdistus/', h1: /Auton sisäpuhdistus ja verhoilujen pesu/ },
  { path: 'palvelut/otsonointi/', h1: /Auton otsonointi ja hajunpoisto/ },
  { path: 'hinnasto/', h1: /Hinnat näkyvillä/ },
  { path: 'referenssit/', h1: /Ennen ja jälkeen/ },
  { path: 'yhteystiedot/', h1: /Pyydä tarjous tai kysy vapaata aikaa/ },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Hinnasto', 'Referenssit', 'Yhteystiedot']

export const PHONE = 'tel:+358442841104'
export const EMAIL = 'mailto:tmijarkkokarilahti@gmail.com'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __tjkReady?: boolean }).__tjkReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Valikko' }).click()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

export const introState = (page: Page) => page.locator('.hero-stage').getAttribute('data-intro')
