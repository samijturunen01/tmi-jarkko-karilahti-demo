/**
 * Authentic references from the company's own reference page
 * (https://toiminimi-jarkko-karilahti.webnode.fi/referenssit/). Descriptions follow the
 * original captions; caption ↔ gallery pairing is documented in docs/CONTENT_SOURCES.md.
 */
export type Category = 'maalipinta' | 'pinnoitteet' | 'ajovalot' | 'sisatilat' | 'muut'

export const categories: { id: Category | 'kaikki'; label: string }[] = [
  { id: 'kaikki', label: 'Kaikki' },
  { id: 'maalipinta', label: 'Maalipinnan kunnostus' },
  { id: 'pinnoitteet', label: 'Pinnoitteet ja vahaus' },
  { id: 'ajovalot', label: 'Ajovalot' },
  { id: 'sisatilat', label: 'Sisätilat' },
  { id: 'muut', label: 'Muut autot' },
]

export interface Shot {
  key: string
  alt: string
  /** "Ennen"/"Jälkeen" label – only for verified same-day pairs. */
  stage?: 'ennen' | 'jalkeen'
}

export interface Project {
  id: string
  vehicle: string
  title: string
  text?: string
  work: string[]
  categories: Category[]
  shots: Shot[]
  b2b?: string
  /** Shown on the home page selection. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'bmw-5',
    vehicle: 'BMW 5-sarja',
    title: 'Keraaminen pinnoite ja nahkaistuimet',
    text: 'Tämä sporttisempi BMW sai maalipintansa suojaksi keraamisen pinnoitteen. Nahkaistuimet saivat samalla elvyttävän käsittelyn.',
    work: ['Keraaminen pinnoite', 'Nahkapenkkien käsittely'],
    categories: ['pinnoitteet', 'sisatilat'],
    featured: true,
    shots: [
      { key: 'bmw5-4', alt: 'Harmaa BMW 5-sarja edestä keraamisen pinnoituksen jälkeen.' },
      { key: 'bmw5-1', alt: 'Harmaa BMW 5-sarja sivulta.' },
      { key: 'bmw5-2', alt: 'BMW 5-sarjan keula ja kiiltävä konepelti.' },
      { key: 'bmw5-3', alt: 'BMW 5-sarja takaviistosta.' },
      { key: 'bmw5-5', alt: 'BMW 5-sarja takaa.' },
      { key: 'bmw5-seat', alt: 'BMW:n käsitelty musta nahkaistuin.' },
    ],
  },
  {
    id: 'teokem-transit',
    vehicle: 'Ford Transit Custom',
    title: 'Uuden pakettiauton nanopinnoitus',
    text: 'Teokem Oy:n Transit Custom sai uutuuttaan maalipintansa suojaksi nanopinnoitteen, kun ValoLux oli ensin teipannut Fordin todella upeasti.',
    work: ['Nanopinnoite'],
    categories: ['pinnoitteet'],
    b2b: 'Teokem Oy',
    featured: true,
    shots: [
      { key: 'teokem-2', alt: 'Teokem Oy:n teipattu musta Ford Transit Custom takaviistosta.' },
      { key: 'teokem-1', alt: 'Teokem Oy:n Ford Transit Custom edestä.' },
      { key: 'teokem-3', alt: 'Ford Transit Custom takaa, Teokem-teippaukset.' },
      { key: 'teokem-4', alt: 'Ford Transit Custom sivulta.' },
    ],
  },
  {
    id: 'mitsubishi-lancer',
    vehicle: 'Mitsubishi Lancer',
    title: 'Auringon haalistama punainen kirkkaaksi',
    text: 'Mitsubishin punainen maalipinta oli auringon vaikutuksesta reilusti muuttunut, ja oli aika kirkastaa väri takaisin entiseen kiiltoonsa. Viimeisessä kuvassa näkyy lähtötilanteen ja kerran työstetyn pinnan ero.',
    work: ['Maalipinnan kunnostus'],
    categories: ['maalipinta'],
    featured: true,
    shots: [
      { key: 'lancer-1', alt: 'Kirkkaan punainen Mitsubishi Lancer kunnostuksen jälkeen.' },
      { key: 'lancer-2', alt: 'Punainen Mitsubishi Lancer takaviistosta.' },
      { key: 'lancer-spot', alt: 'Lähikuva punaisesta maalipinnasta: haalistunut lähtötilanne ja kerran työstetty kiiltävä pinta rinnakkain.' },
    ],
  },
  {
    id: 'mercedes-a',
    vehicle: 'Mercedes-Benz A-sarja',
    title: 'Myllytys ja nanopinnoite',
    text: 'Mercedeksen maalipinnan kiilto saatiin palaamaan myllyttämällä ja suojaamalla nanopinnoitteella.',
    work: ['Myllytys', 'Nanopinnoite'],
    categories: ['maalipinta', 'pinnoitteet'],
    featured: true,
    shots: [
      { key: 'merca-1', alt: 'Kiiltävä musta Mercedes-Benz A-sarja edestä.' },
      { key: 'merca-2', alt: 'Musta Mercedes-Benz A-sarja sivulta hallin edustalla.' },
      { key: 'merca-3', alt: 'Mercedes-Benz A-sarja viistosti edestä.' },
      { key: 'merca-4', alt: 'Mercedes-Benz A-sarja takaa.' },
    ],
  },
  {
    id: 'dacia-duster',
    vehicle: 'Dacia Duster',
    title: 'Pohjakäsittely ja keraaminen pinnoite',
    text: 'Dacian maalipinta kirkastui huomattavasti kunnon pohjakäsittelyllä, ja suojaksi asennettiin keraaminen pinnoite.',
    work: ['Pohjakäsittely', 'Keraaminen pinnoite'],
    categories: ['maalipinta', 'pinnoitteet'],
    featured: true,
    shots: [
      { key: 'duster-4', alt: 'Musta Dacia Duster ulkona keraamisen pinnoituksen jälkeen.' },
      { key: 'duster-1', alt: 'Musta Dacia Duster takaviistosta hallissa.' },
      { key: 'duster-2', alt: 'Dacia Duster sivulta.' },
      { key: 'duster-3', alt: 'Dacia Dusterin kiiltävä kylki ja vanne.' },
    ],
  },
  {
    id: 'mercedes-e',
    vehicle: 'Mercedes-Benz E-sarja',
    title: 'Maalipinnan pohjustus, suojaus ja sisätilat',
    text: 'Mercedeksen maalipinta pohjustettiin ja suojattiin. Sisustan käsittelyn Mersu sai samalla kertaa.',
    work: ['Pohjustus', 'Suojaus', 'Sisätilojen käsittely'],
    categories: ['maalipinta', 'pinnoitteet', 'sisatilat'],
    featured: true,
    shots: [
      { key: 'merce-1', alt: 'Harmaa Mercedes-Benz E-sarja takaviistosta.' },
      { key: 'merce-2', alt: 'Mercedes-Benz E-sarja sivulta.' },
      { key: 'merce-3', alt: 'Mercedes-Benz E-sarja kokonaan sivulta.' },
      { key: 'merce-4', alt: 'Mercedes-Benz E-sarjan puhdistettu etuosa ja nahkaistuimet.' },
      { key: 'merce-5', alt: 'Mercedes-Benz E-sarjan puhdistettu takaistuin.' },
    ],
  },
  {
    id: 'volvo-xc60',
    vehicle: 'Volvo XC60',
    title: '3-step-kiillotus ja kovavaha',
    text: 'Volvon maalipinta oli jo naarmuinen ja haalistunut. Maalipinnalle tehtiin kolmivaiheinen (3-step) kiillotus ja suojaus kovavahalla.',
    work: ['3-step-kiillotus', 'Kovavaha'],
    categories: ['maalipinta', 'pinnoitteet'],
    shots: [{ key: 'xc60', alt: 'Musta Volvo XC60 kiillotuksen ja kovavahauksen jälkeen.' }],
  },
  {
    id: 'volvo-v40',
    vehicle: 'Volvo V40 Cross Country',
    title: 'Kevyt hionta, pyörteenpoisto ja vahaus',
    text: 'Tämänkin Volvon maalipinta saatiin takaisin kiiltäväksi. Maalipinnalle tehtiin kevyt hionta, käsittely pyörteenpoistoaineella ja täyteaineella ennen vahausta.',
    work: ['Kevyt hionta', 'Pyörteenpoisto', 'Vahaus'],
    categories: ['maalipinta', 'pinnoitteet'],
    shots: [{ key: 'v40', alt: 'Musta Volvo V40 Cross Country kiiltävänä vahauksen jälkeen.' }],
  },
  {
    id: 'suzuki',
    vehicle: 'Suzuki Grand Vitara',
    title: 'Useampi koneellinen läpikäynti',
    text: 'Suzukin maalipinnassa näkyivät jo käytön jäljet, joten se vaati useamman koneellisen läpikäynnin. Lopputuloksena naarmuton ja kiiltävä pinta.',
    work: ['Koneellinen kunnostus'],
    categories: ['maalipinta'],
    shots: [
      { key: 'suzuki-1', alt: 'Musta Suzuki-maasturi edestä kunnostuksen jälkeen.' },
      { key: 'suzuki-2', alt: 'Musta Suzuki-maasturi takaa.' },
    ],
  },
  {
    id: 'toyota',
    vehicle: 'Toyota',
    title: 'Vanhemman auton fiksaus',
    text: 'Vanhempienkin autojen fiksaus kannattaa. Tämän Toyotan maalipinta näyttää taas hyvältä ja on vaivattomampi pitää puhtaana.',
    work: ['Maalipinnan kunnostus'],
    categories: ['maalipinta'],
    shots: [{ key: 'toyota', alt: 'Harmaa Toyota kunnostetulla maalipinnalla hallissa.' }],
  },
  {
    id: 'audi-a3',
    vehicle: 'Audi A3',
    title: 'Perusteellinen esipesu ja kovavaha',
    text: 'Audi vaati perusteellisen esipesun, mutta nyt auto kiiltää jälleen. Maalipinnan suojaksi laitettiin kovavaha.',
    work: ['Esipesu', 'Kovavaha'],
    categories: ['pinnoitteet'],
    shots: [{ key: 'audi', alt: 'Valkoinen Audi A3 kiiltävänä hallissa.' }],
  },
  {
    id: 'volvo-v60',
    vehicle: 'Volvo V60',
    title: 'Musta väri vaatii enemmän',
    text: 'Musta väri vaatii aina enemmän, mutta lopputulos palkitsee.',
    work: ['Viimeistely'],
    categories: ['maalipinta'],
    shots: [{ key: 'v60', alt: 'Kiiltävä musta Volvo V60 takaviistosta.' }],
  },
  // ---- Headlight lenses (original caption: "Umpioiden kiillotusta") -------------------------
  {
    id: 'umpiot-bmw',
    vehicle: 'BMW 5-sarja',
    title: 'Ajovaloumpiot – ennen ja jälkeen',
    text: 'Kellastuneet umpiot kirkkaiksi. Kuvat on otettu 28.10.2020 klo 16.41 ja 17.26.',
    work: ['Umpioiden käsittely'],
    categories: ['ajovalot'],
    featured: true,
    shots: [
      { key: 'hl-bmw-a-before', alt: 'BMW:n kellastunut ja samea ajovaloumpio ennen käsittelyä.', stage: 'ennen' },
      { key: 'hl-bmw-a-after', alt: 'Sama BMW:n ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
      { key: 'hl-bmw-b-before', alt: 'BMW:n toinen ajovaloumpio sameana ennen käsittelyä.', stage: 'ennen' },
      { key: 'hl-bmw-b-after', alt: 'BMW:n toinen ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
    ],
  },
  {
    id: 'umpiot-valkoinen',
    vehicle: 'Valkoinen pikkuauto',
    title: 'Ajovaloumpiot – ennen ja jälkeen',
    text: 'Täysin sameat umpiot kirkastuivat. Kuvat on otettu 13.9.2021 klo 18.31 ja 18.57.',
    work: ['Umpioiden käsittely'],
    categories: ['ajovalot'],
    shots: [
      { key: 'hl-white-a-before', alt: 'Valkoisen pikkuauton samea, naarmuinen ajovaloumpio ennen käsittelyä.', stage: 'ennen' },
      { key: 'hl-white-a-after', alt: 'Sama ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
      { key: 'hl-white-b-before', alt: 'Valkoisen pikkuauton toinen ajovaloumpio sameana.', stage: 'ennen' },
      { key: 'hl-white-b-after', alt: 'Toinen ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
    ],
  },
  {
    id: 'umpiot-sininen',
    vehicle: 'Sininen henkilöauto',
    title: 'Ajovaloumpio – ennen ja jälkeen',
    text: 'Samea ja kellastunut umpio sai kirkkautensa takaisin.',
    work: ['Umpioiden käsittely'],
    categories: ['ajovalot'],
    shots: [
      { key: 'hl-blue-before', alt: 'Sinisen auton samea ajovaloumpio ennen käsittelyä.', stage: 'ennen' },
      { key: 'hl-blue-after', alt: 'Sinisen auton ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
    ],
  },
  {
    id: 'umpiot-hopea',
    vehicle: 'Hopea henkilöauto',
    title: 'Ajovaloumpio – ennen ja jälkeen',
    text: 'Kuvat on otettu 2.4.2019 klo 12.22 ja 12.40.',
    work: ['Umpioiden käsittely'],
    categories: ['ajovalot'],
    shots: [
      { key: 'hl-silver-before', alt: 'Hopeanvärisen auton samea ajovaloumpio ennen käsittelyä.', stage: 'ennen' },
      { key: 'hl-silver-after', alt: 'Sama ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
    ],
  },
  {
    id: 'umpiot-paku',
    vehicle: 'Hopea pakettiauto',
    title: 'Ajovaloumpiot – työn vaiheet',
    text: 'Umpiot aamulla ennen käsittelyä – ympäristö suojattuna teipillä – ja iltapäivällä valmiina. Kuvat 11.3.2021.',
    work: ['Umpioiden käsittely'],
    categories: ['ajovalot'],
    shots: [
      { key: 'hl-van-2', alt: 'Pakettiauton samea ajovaloumpio aamulla ennen käsittelyä.', stage: 'ennen' },
      { key: 'hl-van-1', alt: 'Ajovaloumpion ympäristö suojattuna maalarinteipillä.' },
      { key: 'hl-van-3', alt: 'Pakettiauton ajovaloumpio kirkkaana iltapäivällä.', stage: 'jalkeen' },
      { key: 'hl-van-4', alt: 'Pakettiauton toinen ajovaloumpio kirkkaana käsittelyn jälkeen.', stage: 'jalkeen' },
    ],
  },
  // ---- Reference gallery without a work description on the original site -----------------------
  ...(
    [
      ['volvo-v90', 'Volvo V90 Cross Country', ['v90-side', 'v90-front', 'v90-rear', 'v90-tail'], 'Musta Volvo V90 Cross Country'],
      ['porsche-cayenne', 'Porsche Cayenne', ['cayenne-1', 'cayenne-2', 'cayenne-3'], 'Porsche Cayenne talvella hallin edustalla'],
      ['mercedes-c', 'Mercedes-Benz C-sarja farmari', ['mercc-1', 'mercc-2', 'mercc-3'], 'Musta Mercedes-Benz C-sarjan farmari hallissa'],
      ['ford-mondeo', 'Ford Mondeo', ['mondeo-1', 'mondeo-2'], 'Punainen Ford Mondeo'],
      ['nissan-qashqai', 'Nissan Qashqai', ['qashqai-1', 'qashqai-2'], 'Ruskea Nissan Qashqai'],
      ['mini', 'Mini', ['mini-1', 'mini-2'], 'Punainen Mini valkoisella katolla'],
      ['hyundai-i30', 'Hyundai i30 farmari', ['i30-1', 'i30-2'], 'Punainen Hyundai i30 farmari'],
      ['bmw-x1', 'BMW X1', ['x1-1', 'x1-2'], 'Musta BMW X1 hallissa'],
      ['mitsubishi-l200', 'Mitsubishi L200', ['l200-1', 'l200-2'], 'Harmaa Mitsubishi L200 -avolava'],
      ['volvo-xc40', 'Volvo XC40', ['xc40-1'], 'Musta Volvo XC40'],
      ['bmw-7', 'BMW 7-sarja', ['bmw7'], 'Valkoinen BMW 7-sarja takaa'],
      ['skoda-punainen', 'Škoda, punainen', ['skoda-red'], 'Punainen Škoda hallissa'],
      ['skoda-farmari', 'Škoda farmari, valkoinen', ['skoda-white'], 'Valkoinen Škoda-farmari hallissa'],
      ['dacia-ruskea', 'Dacia Duster, ruskea', ['duster-brown'], 'Ruskea Dacia Duster hallissa'],
    ] as const
  ).map(
    ([id, vehicle, keys, alt]): Project => ({
      id,
      vehicle,
      title: 'Referenssigalleriasta',
      work: [],
      categories: ['muut'],
      shots: keys.map((key, i) => ({ key, alt: `${alt}${i ? ` (kuva ${i + 1})` : ''}.` })),
    }),
  ),
]

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<string, Project>
export const describedProjects = projects.filter((p) => !p.categories.includes('muut'))
export const vehicleCount = new Set(projects.map((p) => p.id)).size

/** Before/after cases for the comparison component (same headlight, same day). */
export const beforeAfter = [
  {
    id: 'bmw',
    label: 'BMW 5-sarja',
    before: { key: 'hl-bmw-a-before', alt: 'BMW 5-sarjan kellastunut ja samea ajovaloumpio ennen käsittelyä.', position: '50% 40%' },
    after: { key: 'hl-bmw-a-after', alt: 'Sama BMW 5-sarjan ajovaloumpio kirkkaana käsittelyn jälkeen.', position: '55% 38%' },
    time: '28.10.2020 · klo 16.41 → 17.26',
  },
  {
    id: 'valkoinen',
    label: 'Valkoinen pikkuauto',
    before: { key: 'hl-white-a-before', alt: 'Valkoisen pikkuauton täysin samea ajovaloumpio ennen käsittelyä.', position: '40% 45%' },
    after: { key: 'hl-white-a-after', alt: 'Sama ajovaloumpio kirkkaana käsittelyn jälkeen.', position: '50% 45%' },
    time: '13.9.2021 · klo 18.31 → 18.57',
  },
  {
    id: 'sininen',
    label: 'Sininen henkilöauto',
    before: { key: 'hl-blue-before', alt: 'Sinisen henkilöauton samea ajovaloumpio ennen käsittelyä.', position: '50% 45%' },
    after: { key: 'hl-blue-after', alt: 'Sama ajovaloumpio kirkkaana käsittelyn jälkeen.', position: '50% 45%' },
    time: '30.3.2020',
  },
  {
    id: 'hopea',
    label: 'Hopea henkilöauto',
    before: { key: 'hl-silver-before', alt: 'Hopeanvärisen auton kellastunut ajovaloumpio ennen käsittelyä.', position: '35% 55%' },
    after: { key: 'hl-silver-after', alt: 'Sama ajovaloumpio kirkkaana käsittelyn jälkeen.', position: '45% 55%' },
    time: '2.4.2019 · klo 12.22 → 12.40',
  },
] as const
