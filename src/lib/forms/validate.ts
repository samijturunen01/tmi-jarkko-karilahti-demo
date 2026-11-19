import type { FieldErrors, QuoteRequest } from './types'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE = /^\+?[0-9 ()-]{6,20}$/

/** Client-side validation. A future backend must validate again server-side. */
export function validate(d: QuoteRequest): FieldErrors {
  const e: FieldErrors = {}
  if (!d.topics.length) e.topics = 'Valitse vähintään yksi palvelu – tai ”Muu / en ole varma”.'
  if (d.vehicle.trim().length < 2) e.vehicle = 'Kerro auton merkki ja malli – auton koko vaikuttaa hintaan.'
  if (d.topics.includes('muu') && d.details.trim().length < 5) e.details = 'Kerro lyhyesti, mitä autolle toivot.'
  if (d.details.length > 2000) e.details = 'Viesti on liian pitkä (enintään 2000 merkkiä).'
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  const phone = d.phone.trim()
  const email = d.email.trim()
  if (!phone && !email) e.contact = 'Anna puhelinnumero tai sähköposti, jotta sinulle voidaan vastata.'
  if (phone && !PHONE.test(phone)) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (email && !EMAIL.test(email)) e.email = 'Tarkista sähköpostiosoite (esim. nimi@esimerkki.fi).'
  return e
}
