import type { PriceId, ServiceId, TopicId } from './pricing'
import type { Category } from './references'

export interface Faq {
  q: string
  a: string
}

export interface Service {
  id: ServiceId
  path: string
  /** Navigation / list label. */
  label: string
  /** H1 on the service page. */
  title: string
  kicker: string
  /** One-line benefit used in lists. */
  summary: string
  lead: string
  hero: { key: string; alt: string; position?: string }
  /** Where the service helps – written from verified service descriptions and references. */
  needs: { title: string; text: string }[]
  includes: { title: string; items: string[] }
  steps?: { title: string; text: string }[]
  priceIds: PriceId[]
  quoteTopics: TopicId[]
  cta: string
  related: Category[]
  faq: Faq[]
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'maalipinta',
    path: '/palvelut/maalipinnan-kunnostus-ja-pinnoitus',
    label: 'Maalipinnan kunnostus ja pinnoitus',
    title: 'Maalipinnan kunnostus ja pinnoitus Joensuussa',
    kicker: 'Myllytys · kovavaha · keraaminen pinnoite',
    summary: 'Naarmut ja haalistuma pois koneellisesti, suojaksi kovavaha tai keraaminen pinnoite.',
    lead: 'Naarmuuntunut, haalistunut tai himmeä maalipinta saadaan usein takaisin kiiltäväksi koneellisella kunnostuksella eli myllytyksellä. Lopuksi pinta suojataan kovavahalla tai keraamisella pinnoitteella.',
    hero: { key: 'merca-1', alt: 'Kiiltävä musta Mercedes-Benz A-sarja myllytyksen ja nanopinnoituksen jälkeen.', position: '50% 55%' },
    needs: [
      { title: 'Pinta on naarmuinen ja himmeä', text: 'Käytön jäljet ja pesunaarmut näkyvät erityisesti tummassa maalissa. Koneellinen kunnostus tasoittaa pinnan ja palauttaa syvyyden.' },
      { title: 'Väri on haalistunut', text: 'Auringon haalistama väri voidaan kirkastaa – kuten referensseissä nähtävän Mitsubishin punainen maalipinta.' },
      { title: 'Uusi auto halutaan suojata heti', text: 'Pinnoitteen voi tehdä myös uudelle autolle. Teokem Oy:n uusi Transit Custom sai nanopinnoitteen heti teippauksen jälkeen.' },
      { title: 'Vanhempi auto ansaitsee kiillon', text: 'Vanhempienkin autojen fiksaus kannattaa: kunnostettu ja suojattu pinta on myös vaivattomampi pitää puhtaana.' },
    ],
    includes: {
      title: 'Työn kulku',
      items: [
        'Perusteellinen pesu ja pohjakäsittely',
        'Maalipinnan koneellinen kunnostus pinnan kunnon mukaan – tarvittaessa useampi läpikäynti',
        'Suojaus kovavahalla tai keraamisella pinnoitteella',
      ],
    },
    steps: [
      { title: 'Esipesu ja pohjakäsittely', text: 'Kiilto rakentuu puhtaalle pinnalle. Esimerkiksi referenssien Audi vaati perusteellisen esipesun ennen varsinaista työtä.' },
      { title: 'Koneellinen kunnostus', text: 'Pinta työstetään koneellisesti sen kunnon mukaan: kevyestä hionnasta ja pyörteenpoistosta aina kolmivaiheiseen (3-step) kiillotukseen.' },
      { title: 'Suojaus', text: 'Kunnostettu pinta suojataan kovavahalla tai keraamisella pinnoitteella. Keraamisella pinnoitteella on 1 vuoden takuu ja kesto jopa 3 vuotta.' },
    ],
    priceIds: ['kunnostus-vaha', 'kunnostus-keraaminen'],
    quoteTopics: ['kunnostus-vaha', 'kunnostus-keraaminen'],
    cta: 'Pyydä tarjous maalipinnasta',
    related: ['maalipinta', 'pinnoitteet'],
    faq: [
      {
        q: 'Mistä maalipinnan kunnostuksen hinta muodostuu?',
        a: 'Maalipinnan kunnostusten ja vahausten hinnat ovat alkaen-hintoja. Lopulliseen hintaan vaikuttavat auton koko, väri ja maalipinnan kunto. Pyydä tarjous, niin hinta tarkentuu juuri sinun autosi mukaan.',
      },
      {
        q: 'Kumpi suojaksi – kovavaha vai keraaminen pinnoite?',
        a: 'Molemmat suojaavat kunnostettua maalipintaa. Kunnostus kovavahalla alkaen 200 €, keraamisella pinnoitteella alkaen 350 €. Keraamiselle pinnoitteelle annetaan 1 vuoden takuu, ja sen kesto on jopa 3 vuotta.',
      },
      {
        q: 'Kannattaako vanhemman auton maalipintaa kunnostaa?',
        a: 'Kannattaa. Esimerkiksi referenssien Toyota ja Suzuki saivat kiiltonsa takaisin. Pinnan kunnosta riippuu, kuinka monta koneellista läpikäyntiä tarvitaan.',
      },
      {
        q: 'Pinnoitatteko myös uusia autoja ja pakettiautoja?',
        a: 'Kyllä. Esimerkiksi Teokem Oy:n uusi Ford Transit Custom sai maalipintansa suojaksi nanopinnoitteen heti teippauksen jälkeen.',
      },
    ],
    seo: {
      title: 'Maalipinnan kunnostus, myllytys ja keraaminen pinnoitus Joensuu | Tmi Jarkko Karilahti',
      description:
        'Auton maalipinnan koneellinen kunnostus (myllytys) ja suojaus Joensuussa: kovavahalla alk. 200 €, keraamisella pinnoitteella alk. 350 € – takuu 1 v, kesto jopa 3 v.',
    },
  },
  {
    id: 'ajovalot',
    path: '/palvelut/ajovalojen-kiillotus',
    label: 'Ajovaloumpioiden kiillotus',
    title: 'Ajovaloumpioiden kiillotus ja hartsipinnoitus',
    kicker: 'Kellastuneet umpiot kirkkaiksi · Joensuu',
    summary: 'Sameat ja kellastuneet umpiot hiotaan ja kiillotetaan – tai pinnoitetaan hartsilla.',
    lead: 'Kellastuneet ja sameat ajovaloumpiot vanhentavat auton ilmettä, ja samea umpio voi myös himmentää valokeilaa. Umpiot hiotaan ja kiillotetaan kirkkaiksi – tai hionnan jälkeen pinnoitetaan hartsilla.',
    hero: { key: 'hl-bmw-a-after', alt: 'BMW 5-sarjan ajovaloumpio kirkkaana hionnan ja kiillotuksen jälkeen.', position: '50% 45%' },
    needs: [
      { title: 'Umpio on kellastunut', text: 'Muoviumpion pinta kellastuu ja samenee vuosien mittaan. Hionta poistaa vaurioituneen pintakerroksen.' },
      { title: 'Auto näyttää vanhemmalta kuin on', text: 'Kirkkaat valot raikastavat koko auton ilmettä – usein edullisin tapa saada näkyvä ero aikaan.' },
      { title: 'Halutaan kestävämpi lopputulos', text: 'Hartsipinnoituksessa hiottu umpio saa uuden, suojaavan pintakerroksen.' },
    ],
    includes: {
      title: 'Kaksi vaihtoehtoa',
      items: ['Hionta + kiillotus – alk. 50 € / pari', 'Hionta + hartsipinnoitus – alk. 150 € / pari'],
    },
    priceIds: ['umpiot-kiillotus', 'umpiot-hartsi'],
    quoteTopics: ['umpiot-kiillotus'],
    cta: 'Pyydä tarjous ajovaloista',
    related: ['ajovalot'],
    faq: [
      {
        q: 'Mitä eroa on kiillotuksella ja hartsipinnoituksella?',
        a: 'Molemmissa umpio hiotaan ensin. Kiillotuksessa hiottu pinta kiillotetaan kirkkaaksi (alk. 50 €/pari). Hartsipinnoituksessa hiottu umpio saa uuden pinnoitekerroksen (alk. 150 €/pari).',
      },
      {
        q: 'Paljonko ajovalojen kiillotus maksaa?',
        a: 'Hionta ja kiillotus alkaen 50 € ja hionta ja hartsipinnoitus alkaen 150 € – hinnat ovat paria kohden.',
      },
      {
        q: 'Ovatko ennen ja jälkeen -kuvat aitoja?',
        a: 'Ovat. Kuvat ovat yrityksen omasta referenssigalleriasta, ja samasta umpiosta otetut kuvat on kuvattu saman päivän aikana ennen ja jälkeen käsittelyn.',
      },
    ],
    seo: {
      title: 'Ajovalojen kiillotus ja umpioiden hartsipinnoitus Joensuu | Tmi Jarkko Karilahti',
      description:
        'Kellastuneiden ajovaloumpioiden hionta ja kiillotus alk. 50 €/pari sekä hionta ja hartsipinnoitus alk. 150 €/pari Joensuussa. Katso aidot ennen ja jälkeen -kuvat.',
    },
  },
  {
    id: 'pesu',
    path: '/palvelut/kasinpesu-ja-vahaus',
    label: 'Käsinpesu ja vahaus',
    title: 'Auton käsinpesu ja vahaus Joensuussa',
    kicker: 'Käsinpesu 39 € · pesu + kovavahaus alk. 100 €',
    summary: 'Käsinpesu raudan- ja pienpoistolla, kovavahaus ja tuulilasin pinnoitus.',
    lead: 'Käsinpesu ja kuivaus 39 € – hintaan sisältyy raudan- ja pienpoisto. Kovavahauksessa maalipinta saa suojan, ja ulkopuoliset muovi- ja kumiosat käsitellään samalla.',
    hero: { key: 'v90-side', alt: 'Puhdas ja kiiltävä musta Volvo V90 Cross Country hallin edustalla.', position: '40% 60%' },
    needs: [
      { title: 'Säännöllinen huolellinen pesu', text: 'Käsinpesussa auto pestään ja kuivataan käsin. Hintaan sisältyy raudan- ja pienpoisto.' },
      { title: 'Kiilto ja suoja samalla kertaa', text: 'Pesu, maalipinnan kovavahaus ja ulkopuolisten muovi- ja kumiosien käsittely – alkaen 100 €.' },
      { title: 'Parempi näkyvyys sateella', text: 'Tuulilasin pinnoitus pesun yhteydessä vain +20 €. Pinnoitetulla lasilla vesi helmeilee.' },
    ],
    includes: {
      title: 'Ulkopintojen palvelut',
      items: [
        'Henkilöauton käsinpesu ja kuivaus, sis. raudan- ja pienpoiston – 39 €',
        'Tuulilasin pinnoitus pesun yhteydessä – +20 €',
        'Käsinpesu + kovavahaus + muovi- ja kumiosien käsittely – alk. 100 €',
        'Moottoritilan puhdistus – kysy hinta',
        'Chrome delete -teippaukset – kysy hinta',
      ],
    },
    priceIds: ['kasinpesu', 'tuulilasi', 'pesu-vaha'],
    quoteTopics: ['kasinpesu'],
    cta: 'Kysy pesuaikaa',
    related: ['pinnoitteet'],
    faq: [
      {
        q: 'Mitä 39 euron käsinpesuun kuuluu?',
        a: 'Henkilöauton ulkopuolinen käsinpesu ja kuivaus. Hintaan sisältyy raudan- ja pienpoisto.',
      },
      {
        q: 'Paljonko tuulilasin pinnoitus maksaa?',
        a: 'Pesun yhteydessä tehtynä tuulilasin pinnoitus maksaa 20 €.',
      },
      {
        q: 'Pesetkö myös pakettiautoja ja maastureita?',
        a: 'Hinnaston käsinpesuhinta koskee henkilöautoja. Isommista autoista kannattaa kysyä hinta erikseen – referensseissä on myös pakettiautoja ja maastureita.',
      },
      {
        q: 'Mitä on chrome delete?',
        a: 'Kromilistat ja -osat teipataan esimerkiksi mustiksi. Referensseissä Volvon kromisäleikkö sai mustan ilmeen. Kysy hinta autosi mukaan.',
      },
    ],
    seo: {
      title: 'Auton käsinpesu ja vahaus Joensuu – käsinpesu 39 € | Tmi Jarkko Karilahti',
      description:
        'Auton käsinpesu ja kuivaus 39 € (sis. raudan- ja pienpoiston), pesu + kovavahaus alk. 100 € ja tuulilasin pinnoitus +20 € Joensuun Salpakankaalla.',
    },
  },
  {
    id: 'sisatilat',
    path: '/palvelut/sisatilojen-puhdistus',
    label: 'Sisätilojen puhdistus',
    title: 'Auton sisäpuhdistus ja verhoilujen pesu Joensuussa',
    kicker: 'Sisäpuhdistus 65 € · verhoilujen pesu 60 €',
    summary: 'Imurointi, pinnat, kumimatot ja lasit – sekä verhoilujen pesu ja nahkapenkit.',
    lead: 'Sisätilojen puhdistuksessa auto imuroidaan, pinnat puhdistetaan, kumimatot pestään ja lasit pestään sisäpuolelta. Verhoilujen pesu ja nahkapenkkien käsittely palauttavat istuimet siistiksi.',
    hero: { key: 'merce-4', alt: 'Puhdistettu Mercedes-Benz E-sarjan sisätila ja nahkaistuimet.', position: '50% 50%' },
    needs: [
      { title: 'Arjen jäljet pois', text: 'Hiekka, pöly ja tahrat kertyvät huomaamatta. Sisäpuhdistus kattaa imuroinnin, pinnat, kumimatot ja lasit.' },
      { title: 'Istuimet ja verhoilut', text: 'Kangasverhoilut pestään (60 €). Nahkapenkit puhdistetaan ja käsitellään – kuten referenssien BMW:ssä.' },
      { title: 'Raikas ilma', text: 'Ilmastointijärjestelmän raikastuksen saa sisäpuhdistuksen yhteydessä +25 €.' },
    ],
    includes: {
      title: 'Sisäpuhdistukseen kuuluu',
      items: ['Sisätilojen imurointi', 'Pintojen puhdistus', 'Kumimattojen pesu', 'Lasien pesu sisäpuolelta'],
    },
    priceIds: ['sisapuhdistus', 'ilmastointi', 'verhoilu'],
    quoteTopics: ['sisapuhdistus'],
    cta: 'Kysy aikaa sisäpuhdistukseen',
    related: ['sisatilat'],
    faq: [
      {
        q: 'Mitä sisäpuhdistukseen kuuluu?',
        a: 'Sisätilojen imurointi, pintojen puhdistus, kumimattojen pesu ja lasien pesu sisäpuolelta. Hinta 65 €.',
      },
      {
        q: 'Voiko ilmastoinnin raikastaa samalla?',
        a: 'Voi. Ilmastointijärjestelmän raikastus sisäpuhdistuksen yhteydessä maksaa 25 €.',
      },
      {
        q: 'Mitä nahkapenkkien käsittely maksaa?',
        a: 'Nahkapenkkien käsittelylle ei ole kiinteää hintaa, sillä työ riippuu istuimista. Kerro autosta tarjouspyynnössä, niin saat hinnan.',
      },
      {
        q: 'Autossa on paha haju – riittääkö sisäpuhdistus?',
        a: 'Jos haju ei lähde puhdistuksella, apuna on otsonointi (110 €). Siihen sisältyy myös imurointi ja pintojen puhdistus.',
      },
    ],
    seo: {
      title: 'Auton sisäpuhdistus ja verhoilujen pesu Joensuu | Tmi Jarkko Karilahti',
      description:
        'Auton sisäpuhdistus 65 € (imurointi, pinnat, kumimatot, lasit), verhoilujen pesu 60 €, ilmastoinnin raikastus +25 € ja nahkapenkkien käsittely Joensuussa.',
    },
  },
  {
    id: 'otsonointi',
    path: '/palvelut/otsonointi',
    label: 'Otsonointi ja hajunpoisto',
    title: 'Auton otsonointi ja hajunpoisto Joensuussa',
    kicker: 'Otsonointi 110 € · laitevuokra 20 €/päivä',
    summary: 'Epämiellyttävät hajut poistetaan otsonoimalla – laitteen voi myös vuokrata.',
    lead: 'Haju, joka ei lähde tavallisella siivouksella? Otsonointi poistaa epämiellyttäviä hajuja sen sijaan, että ne peitettäisiin hajukuusella. Hintaan sisältyy myös imurointi ja pintojen puhdistus.',
    hero: { key: 'merce-5', alt: 'Puhdistettu Mercedes-Benz E-sarjan takaistuin.', position: '50% 55%' },
    needs: [
      { title: 'Haju ei lähde siivoamalla', text: 'Otsonointi käsittelee koko sisätilan ilman ja pinnat – myös paikat, joihin liina ei ylety.' },
      { title: 'Puhdistus samalla kertaa', text: 'Otsonoinnin hintaan (110 €) sisältyy sisätilojen imurointi ja pintojen puhdistus.' },
      { title: 'Teen itse', text: 'Otsonointilaitteen voi vuokrata 20 €/päivä – esimerkiksi useamman auton tai tilan käsittelyyn.' },
    ],
    includes: {
      title: 'Otsonointiin sisältyy',
      items: ['Sisätilojen otsonointi', 'Imurointi', 'Pintojen puhdistus'],
    },
    priceIds: ['otsonointi', 'otsonaattori'],
    quoteTopics: ['otsonointi'],
    cta: 'Kysy aikaa otsonointiin',
    related: ['sisatilat'],
    faq: [
      {
        q: 'Mitä otsonointi maksaa?',
        a: 'Sisätilojen otsonointi maksaa 110 €. Hintaan sisältyy myös imurointi ja pintojen puhdistus.',
      },
      {
        q: 'Voinko vuokrata otsonaattorin itse?',
        a: 'Voit. Otsonointilaitteen vuokra on 20 € päivältä. Kysy samalla laitteen käyttöohjeet.',
      },
      {
        q: 'Onko otsonointi turvallista?',
        a: 'Otsonia ei saa hengittää, joten auton on oltava tyhjä ihmisistä ja eläimistä käsittelyn ajan ja se tuuletetaan käsittelyn jälkeen. Kun otsonoinnin tekee ammattilainen, sinun ei tarvitse huolehtia tästä.',
      },
    ],
    seo: {
      title: 'Auton otsonointi ja hajunpoisto Joensuu – 110 € | Tmi Jarkko Karilahti',
      description:
        'Auton sisätilojen otsonointi 110 € Joensuussa – sisältää imuroinnin ja pintojen puhdistuksen. Otsonointilaitteen vuokraus 20 €/päivä.',
    },
  },
]

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<ServiceId, Service>

/** Services without their own page (original "Palvelut" list). */
export const extraServices = [
  {
    id: 'tuulilasi',
    title: 'Tuulilasin pinnoitus',
    text: 'Vesi helmeilee pois lasilta. Pesun yhteydessä +20 €.',
    price: '+20 € pesun yhteydessä',
    photo: { key: 'windshield', alt: 'Pinnoitettu tuulilasi, jolla vesi helmeilee pisaroiksi.' },
    topic: 'tuulilasi' as TopicId,
  },
  {
    id: 'moottoritila',
    title: 'Moottoritilan puhdistus',
    text: 'Siisti moottoritila helpottaa tarkastuksia ja viimeistelee myyntikuntoon laitetun auton.',
    price: 'Kysy hinta',
    photo: { key: 'engine', alt: 'Puhdistettu moottoritila.' },
    topic: 'moottoritila' as TopicId,
  },
  {
    id: 'chrome-delete',
    title: 'Chrome delete -teippaukset',
    text: 'Kromiosat teipataan esimerkiksi mustiksi – kuvassa Volvon säleikkö ennen ja jälkeen.',
    price: 'Kysy hinta',
    photo: { key: 'chrome-delete', alt: 'Volvon kromisäleikkö ennen teippausta (ylhäällä) ja mustaksi teipattuna (alhaalla).' },
    topic: 'chrome-delete' as TopicId,
  },
  {
    id: 'nahka',
    title: 'Nahkapenkkien käsittely',
    text: 'Nahkaistuimet puhdistetaan ja käsitellään – ne saavat elvyttävän hoidon.',
    price: 'Kysy hinta',
    photo: { key: 'leather-seat', alt: 'Käsitelty BMW:n nahkaistuin.' },
    topic: 'nahka' as TopicId,
  },
] as const
