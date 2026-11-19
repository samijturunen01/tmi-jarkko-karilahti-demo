/**
 * Price list – copied from the company's own "Hinnasto" page
 * (https://toiminimi-jarkko-karilahti.webnode.fi/hintalista/). Do not change prices without
 * the customer's confirmation. "from" = alkaen-hinta.
 */
export type ServiceId = 'pesu' | 'maalipinta' | 'ajovalot' | 'sisatilat' | 'otsonointi'

export type PriceId =
  | 'kasinpesu'
  | 'pesu-vaha'
  | 'kunnostus-vaha'
  | 'kunnostus-keraaminen'
  | 'umpiot-kiillotus'
  | 'umpiot-hartsi'
  | 'sisapuhdistus'
  | 'verhoilu'
  | 'otsonointi'
  | 'otsonaattori'
  | 'tuulilasi'
  | 'ilmastointi'

export interface PriceItem {
  id: PriceId
  name: string
  /** Short label for chips and summaries. */
  short: string
  price: number
  from: boolean
  unit?: string
  includes?: string[]
  note?: string
  service: ServiceId
  /** Add-ons are only sold together with their parent item. */
  addonOf?: PriceId
}

export const priceItems: PriceItem[] = [
  {
    id: 'kasinpesu',
    name: 'Henkilöauton ulkopuolinen käsinpesu ja kuivaus',
    short: 'Käsinpesu',
    price: 39,
    from: false,
    includes: ['Sisältää raudan- ja pienpoiston'],
    service: 'pesu',
  },
  {
    id: 'tuulilasi',
    name: 'Tuulilasin pinnoitus pesun yhteydessä',
    short: 'Tuulilasin pinnoitus',
    price: 20,
    from: false,
    service: 'pesu',
    addonOf: 'kasinpesu',
  },
  {
    id: 'pesu-vaha',
    name: 'Käsinpesu ja kuivaus + maalipinnan kovavahaus + ulkopuolisten muovi- ja kumiosien käsittely',
    short: 'Pesu + kovavahaus',
    price: 100,
    from: true,
    service: 'pesu',
  },
  {
    id: 'kunnostus-vaha',
    name: 'Maalipinnan koneellinen kunnostus + suojaus kovavahalla',
    short: 'Kunnostus + kovavaha',
    price: 200,
    from: true,
    service: 'maalipinta',
  },
  {
    id: 'kunnostus-keraaminen',
    name: 'Maalipinnan koneellinen kunnostus + keraaminen pinnoite',
    short: 'Kunnostus + keraaminen pinnoite',
    price: 350,
    from: true,
    note: 'Keraamisella pinnoitteella takuu 1 vuosi, kesto jopa 3 vuotta.',
    service: 'maalipinta',
  },
  {
    id: 'umpiot-kiillotus',
    name: 'Ajovaloumpioiden hionta + kiillotus',
    short: 'Umpioiden kiillotus',
    price: 50,
    from: true,
    unit: '/pari',
    service: 'ajovalot',
  },
  {
    id: 'umpiot-hartsi',
    name: 'Ajovaloumpioiden hionta + hartsipinnoitus',
    short: 'Umpioiden hartsipinnoitus',
    price: 150,
    from: true,
    unit: '/pari',
    service: 'ajovalot',
  },
  {
    id: 'sisapuhdistus',
    name: 'Sisätilojen puhdistus',
    short: 'Sisäpuhdistus',
    price: 65,
    from: false,
    includes: ['Sisätilojen imurointi', 'Pintojen puhdistus', 'Kumimattojen pesu', 'Lasien pesu sisäpuolelta'],
    service: 'sisatilat',
  },
  {
    id: 'ilmastointi',
    name: 'Ilmastointijärjestelmän raikastus',
    short: 'Ilmastoinnin raikastus',
    price: 25,
    from: false,
    service: 'sisatilat',
    addonOf: 'sisapuhdistus',
  },
  {
    id: 'verhoilu',
    name: 'Auton verhoilujen pesu',
    short: 'Verhoilujen pesu',
    price: 60,
    from: false,
    service: 'sisatilat',
  },
  {
    id: 'otsonointi',
    name: 'Sisätilojen otsonointi',
    short: 'Otsonointi',
    price: 110,
    from: false,
    includes: ['Sisältää myös imuroinnin ja pintojen puhdistuksen'],
    service: 'otsonointi',
  },
  {
    id: 'otsonaattori',
    name: 'Otsonointilaitteen vuokraus',
    short: 'Otsonaattorin vuokraus',
    price: 20,
    from: false,
    unit: '/päivä',
    service: 'otsonointi',
  },
]

/** Genitive phrase for add-ons: "käsinpesun yhteydessä". */
export const addonContext: Partial<Record<PriceId, string>> = {
  kasinpesu: 'käsinpesun',
  sisapuhdistus: 'sisäpuhdistuksen',
}

export const priceById = Object.fromEntries(priceItems.map((p) => [p.id, p])) as Record<PriceId, PriceItem>

export const formatPrice = (p: Pick<PriceItem, 'price' | 'from' | 'unit'>, opts: { addon?: boolean } = {}) =>
  `${opts.addon ? '+' : p.from ? 'alk. ' : ''}${p.price} €${p.unit ?? ''}`

/** Verified pricing note from the original price list. */
export const priceNote =
  'Maalipinnan vahausten ja kunnostusten hinnat ovat alkaen-hintoja. Lopulliseen hintaan vaikuttavat auton koko, väri ja maalipinnan kunto.'

export const priceGroups: { title: string; ids: PriceId[] }[] = [
  { title: 'Pesu ja vahaus', ids: ['kasinpesu', 'tuulilasi', 'pesu-vaha'] },
  { title: 'Maalipinnan kunnostus ja suojaus', ids: ['kunnostus-vaha', 'kunnostus-keraaminen'] },
  { title: 'Ajovaloumpiot', ids: ['umpiot-kiillotus', 'umpiot-hartsi'] },
  { title: 'Sisätilat', ids: ['sisapuhdistus', 'ilmastointi', 'verhoilu'] },
  { title: 'Otsonointi ja hajunpoisto', ids: ['otsonointi', 'otsonaattori'] },
]

/** Services offered on the original site without a published price. */
export type ExtraId = 'nahka' | 'moottoritila' | 'chrome-delete' | 'muu'
export const extras: { id: ExtraId; short: string }[] = [
  { id: 'nahka', short: 'Nahkapenkkien käsittely' },
  { id: 'moottoritila', short: 'Moottoritilan puhdistus' },
  { id: 'chrome-delete', short: 'Chrome delete -teippaus' },
  { id: 'muu', short: 'Muu / en ole varma' },
]

export type TopicId = PriceId | ExtraId
export const topicLabel = (id: TopicId) => priceById[id as PriceId]?.short ?? extras.find((e) => e.id === id)?.short ?? id
export const isTopic = (v: string): v is TopicId => v in priceById || extras.some((e) => e.id === v)

/** Form chip groups (contact form). */
export const topicGroups: { title: string; ids: TopicId[] }[] = [
  { title: 'Ulkopinnat', ids: ['kasinpesu', 'tuulilasi', 'pesu-vaha', 'kunnostus-vaha', 'kunnostus-keraaminen', 'chrome-delete', 'moottoritila'] },
  { title: 'Ajovalot', ids: ['umpiot-kiillotus', 'umpiot-hartsi'] },
  { title: 'Sisätilat', ids: ['sisapuhdistus', 'ilmastointi', 'verhoilu', 'nahka', 'otsonointi', 'otsonaattori'] },
  { title: 'Muu', ids: ['muu'] },
]

/** Link to the contact form with topics preselected. */
export const quoteHref = (...ids: TopicId[]) => `/yhteystiedot${ids.length ? `?valinnat=${ids.join(',')}` : ''}#tarjouspyynto`
