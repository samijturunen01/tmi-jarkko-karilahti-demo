// Dev helper: builds labelled contact sheets of source images for visual review.
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const [src, out, perArg, filter] = process.argv.slice(2)
const per = Number(perArg || 20)
await fs.mkdir(out, { recursive: true })
let files = (await fs.readdir(src)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
if (filter) files = files.filter((f) => new RegExp(filter).test(f))
const W = 320, H = 240, cols = 5
for (let s = 0; s * per < files.length; s++) {
  const chunk = files.slice(s * per, s * per + per)
  const rows = Math.ceil(chunk.length / cols)
  const composites = []
  for (const [i, f] of chunk.entries()) {
    const meta = await sharp(path.join(src, f)).metadata()
    const img = await sharp(path.join(src, f)).rotate().resize(W, H - 28, { fit: 'contain', background: '#222' }).toBuffer()
    const x = (i % cols) * W, y = Math.floor(i / cols) * H
    composites.push({ input: img, left: x, top: y })
    const label = `${s * per + i}: ${f.split('__')[1] || f} ${meta.width}x${meta.height}`.replace(/&/g, '&amp;')
    composites.push({ input: Buffer.from(`<svg width="${W}" height="28"><rect width="100%" height="100%" fill="#000"/><text x="6" y="19" font-size="14" fill="#fff" font-family="Arial">${label}</text></svg>`), left: x, top: y + H - 28 })
  }
  await sharp({ create: { width: cols * W, height: rows * H, channels: 3, background: '#111' } }).composite(composites).jpeg({ quality: 80 }).toFile(path.join(out, `sheet-${s}.jpg`))
}
console.log(files.length, 'images')
