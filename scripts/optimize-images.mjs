/**
 * Builds responsive WebP variants of the authentic photographs (scripts/photo-manifest.mjs)
 * into public/images/p/, a social share image, favicons, and writes the intrinsic sizes to
 * src/data/photoSizes.json (used for width/height attributes → no layout shift).
 *
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { photos } from './photo-manifest.mjs'
import { logoPaths, LOGO_VIEWBOX } from './logo-paths.mjs'

const SRC = 'source-assets/original'
const OUT = 'public/images/p'
const WIDTHS = [480, 960, 1600]
await fs.mkdir(OUT, { recursive: true })

const sizes = {}
for (const [key, file] of Object.entries(photos)) {
  const img = sharp(path.join(SRC, file)).rotate()
  const meta = await img.metadata()
  const portrait = (meta.orientation ?? 1) >= 5
  const w = portrait ? meta.height : meta.width
  const h = portrait ? meta.width : meta.height
  const widths = WIDTHS.filter((x) => x < w * 0.98)
  widths.push(Math.min(w, 1920))
  const uniq = [...new Set(widths)].sort((a, b) => a - b)
  for (const width of uniq) {
    const out = path.join(OUT, `${key}-${width}.webp`)
    if (!process.argv.includes('--force') && (await fs.stat(out).catch(() => null))) continue
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width <= 480 ? 72 : 78, effort: 5, smartSubsample: true })
      .toFile(out)
  }
  sizes[key] = { w, h, widths: uniq }
}
await fs.writeFile('src/data/photoSizes.json', JSON.stringify(sizes, null, 1) + '\n')

// ---- Social share image (1200×630): authentic Volvo V90 photo + authentic logo -------------
const logoSvg = (ink) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}" width="420">
  <path fill="${ink}" d="${logoPaths.tmi}"/><path fill="${ink}" d="${logoPaths.jarko}"/>
  <path fill="${ink}" d="${logoPaths.karilahti}"/><path fill="#3434f4" d="${logoPaths.k}"/></svg>`)
const photo = await sharp(path.join(SRC, photos['v90-side'])).rotate().resize(820, 630, { fit: 'cover', position: 'centre' }).toBuffer()
const panel = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0b0d10"/><stop offset="0.82" stop-color="#0b0d10"/><stop offset="1" stop-color="#0b0d10" stop-opacity="0"/></linearGradient></defs>
  <rect width="520" height="630" fill="url(#g)"/>
  <rect x="56" y="452" width="56" height="3" fill="#3434f4"/>
  <text x="56" y="500" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#f4f5f2">Auton fiksaus Joensuussa</text>
  <text x="56" y="540" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#aeb4bd">Käsinpesu · myllytys · pinnoitus · sisäpuhdistus</text>
</svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0b0d10' } })
  .composite([
    { input: photo, left: 380, top: 0 },
    { input: panel, left: 0, top: 0 },
    { input: await sharp(logoSvg('#f4f5f2')).png().toBuffer(), left: 48, top: 150 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/images/og-karilahti.jpg')

// ---- Favicons: the blue K on lacquer black ------------------------------------------------------
const kBox = '104 92 142 90' // crop around the K in logo coordinates
const icon = (size, radius) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="${radius}" fill="#0b0d10"/>
  <svg x="10" y="12" width="80" height="76" viewBox="${kBox}" preserveAspectRatio="xMidYMid meet"><path fill="#4b4bff" d="${logoPaths.k}"/></svg>
</svg>`)
await sharp(icon(32, 18)).png().toFile('public/favicon-32.png')
await sharp(icon(192, 22)).png().toFile('public/icon-192.png')
await sharp(icon(180, 0)).png().toFile('public/apple-touch-icon.png')
await fs.writeFile('public/favicon.svg', icon(64, 18))

console.log(`Optimised ${Object.keys(photos).length} photos → ${OUT}`)
