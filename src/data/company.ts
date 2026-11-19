/**
 * Verified company facts – sources in docs/CONTENT_SOURCES.md.
 * Opening hours are NOT published by the company, so none are shown.
 */
export const company = {
  name: 'Tmi Jarkko Karilahti',
  /** Short brand used in titles. */
  brand: 'Tmi Jarkko Karilahti',
  owner: 'Jarkko Karilahti',
  tagline: 'Loistavien autojen puolesta',
  businessId: '2986233-3',
  /** Business ID registered 27.2.2019 (Fonecta / PRH data). */
  foundedYear: 2019,
  foundedDate: '2019-02-27',
  phone: { display: '044 284 1104', e164: '+358442841104', href: 'tel:+358442841104' },
  email: 'tmijarkkokarilahti@gmail.com',
  address: {
    street: 'Aspitie 17',
    unit: 'halliosake 33',
    postalCode: '80100',
    city: 'Joensuu',
    district: 'Salpakangas',
    region: 'Pohjois-Karjala',
  },
  geo: { lat: 62.62969, lon: 29.78671 },
  facebook: 'https://www.facebook.com/Tmi-Jarkko-Karilahti-2308796516000684/',
  originalSite: 'https://toiminimi-jarkko-karilahti.webnode.fi/',
} as const

const q = encodeURIComponent(`${company.address.street}, ${company.address.postalCode} ${company.address.city}`)
export const maps = {
  embed: `https://www.google.com/maps?q=${q}&z=15&output=embed`,
  open: `https://www.google.com/maps/search/?api=1&query=${q}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
}

export const mailto = (subject?: string) => `mailto:${company.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
