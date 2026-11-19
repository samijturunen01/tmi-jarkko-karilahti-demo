import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

const B = 'Tmi Jarkko Karilahti'

export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: `Auton fiksaus Joensuussa – käsinpesu, myllytys ja pinnoitus | ${B}`,
    description:
      'Auton fiksaus Joensuun Salpakankaalla: käsinpesu 39 €, maalipinnan kunnostus ja keraaminen pinnoite, ajovaloumpioiden kiillotus, sisäpuhdistus ja otsonointi. Katso hinnat ja pyydä tarjous.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: `Palvelut – auton pesu, kunnostus, pinnoitus ja sisäpuhdistus Joensuussa | ${B}`,
    description:
      'Kaikki auton fiksauspalvelut Joensuussa: käsinpesu ja vahaus, maalipinnan kunnostus ja pinnoitus, ajovalojen kiillotus, sisäpuhdistus, otsonointi ja chrome delete.',
  },
  ...services.map((s) => ({ path: s.path, label: s.label, title: s.seo.title, description: s.seo.description })),
  {
    path: '/hinnasto',
    label: 'Hinnasto',
    title: `Hinnasto – auton fiksauksen hinnat Joensuussa | ${B}`,
    description:
      'Auton fiksauksen hinnat: käsinpesu 39 €, sisäpuhdistus 65 €, verhoilujen pesu 60 €, otsonointi 110 €, umpioiden kiillotus alk. 50 €/pari ja maalipinnan kunnostus alk. 200 €.',
  },
  {
    path: '/referenssit',
    label: 'Referenssit',
    title: `Referenssit – ennen ja jälkeen -kuvat | ${B}`,
    description:
      'Aidot referenssit Joensuusta: maalipinnan kunnostukset, keraamiset pinnoitteet ja ajovaloumpioiden kiillotukset ennen ja jälkeen -kuvin.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: `Yhteystiedot ja tarjouspyyntö – Aspitie 17, Joensuu | ${B}`,
    description:
      'Pyydä tarjous tai kysy vapaata aikaa: puh. 044 284 1104, tmijarkkokarilahti@gmail.com. Aspitie 17 (halliosake 33), 80100 Joensuu. Y-tunnus 2986233-3.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: `Sivua ei löytynyt | ${B}`,
    description: 'Etsimääsi sivua ei löytynyt. Palaa etusivulle tai katso palvelut ja hinnasto.',
  },
]

export function metaFor(path: string): RouteMeta {
  const clean = path.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? routes.find((r) => r.path === '/404')!
}

export const nav = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/hinnasto', label: 'Hinnasto' },
  { to: '/referenssit', label: 'Referenssit' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
] as const
