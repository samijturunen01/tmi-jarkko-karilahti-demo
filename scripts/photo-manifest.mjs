/**
 * Authentic photographs used on the site (all from the company's own Webnode site,
 * https://toiminimi-jarkko-karilahti.webnode.fi/ – see docs/ASSET_PROVENANCE.md).
 * key → source file in source-assets/original/ (prefix = Webnode file id).
 * Excluded on purpose: images8AAKV481 / images97H91UDC / imagesQZYUL80Y / images.jpeg
 * (low-res third-party stock pictures) and w.png (Wunderbaum trademark artwork).
 */
export const photos = {
  // Owner portrait (contact page of the original site)
  jarkko: '200000022-1ac321bbdf__1111.jpg',

  // Volvo V90 Cross Country (reference gallery, no work description on the original site)
  'v90-front': '200000128-f3729f372b__20210629_205103.jpg',
  'v90-side': '200000130-21ed521ed7__20210629_205051.jpg',
  'v90-rear': '200000127-d1b5cd1b5e__20210629_205034.jpg',
  'v90-tail': '200000129-1e9f21e9f4__20210629_205130.jpg',

  // BMW 5-sarja – ceramic coating + leather seats
  'bmw5-1': '200000086-57e3657e38__IMG_20200530_155358.jpg',
  'bmw5-2': '200000087-998e0998e3__IMG_20200530_155018.jpg',
  'bmw5-3': '200000088-212d9212db__IMG_20200530_154505.jpg',
  'bmw5-4': '200000089-e974ce974e__IMG_20200530_154253.jpg',
  'bmw5-5': '200000090-9ef009ef02__IMG_20200530_154703.jpg',
  'bmw5-seat': '200000091-8cfc58cfc7__IMG_20200530_123324.jpg',

  // Dacia Duster – base treatment + ceramic coating
  'duster-1': '200000100-2c5482c54b__IMG_20200906_103900.jpg',
  'duster-2': '200000101-263f4263f9__IMG_20200906_103523.jpg',
  'duster-3': '200000102-744f0744f4__IMG_20200906_103346.jpg',
  'duster-4': '200000103-35be735bea__IMG_20200906_103225.jpg',

  // Mercedes-Benz A-sarja – machine polish + nano coating
  'merca-1': '200000120-c14a1c14a2__20210615_160027.jpg',
  'merca-2': '200000118-0205202055__20210615_160002.jpg',
  'merca-3': '200000119-e3da3e3da6__20210615_155946.jpg',
  'merca-4': '200000121-d6acdd6acf__20210615_160015.jpg',

  // Teokem Oy – Ford Transit Custom, nano coating after ValoLux wrap
  'teokem-1': '200000108-d5f66d5f68__20210316_122310.jpg',
  'teokem-2': '200000109-b8dadb8db0__20210316_122344.jpg',
  'teokem-3': '200000110-d60a0d60a2__20210316_122444.jpg',
  'teokem-4': '200000111-07afa07afc__20210316_122322.jpg',

  // Mercedes-Benz E-sarja – paint prep + protection, interior
  'merce-1': '200000094-613a5613a7__IMG_20200622_222002.jpg',
  'merce-2': '200000093-827e2827e4__IMG_20200622_222153.jpg',
  'merce-3': '200000095-0973409737__IMG_20200622_221833.jpg',
  'merce-4': '200000097-ce6ddce6df__IMG_20200622_212659.jpg',
  'merce-5': '200000096-72a3f72a42__IMG_20200622_212708.jpg',

  // Mitsubishi Lancer – sun-faded red paint restored (last photo = test spot)
  'lancer-1': '200000141-aea5caea5e__20210824_202906.jpg',
  'lancer-2': '200000142-debcbdebce__20210824_202933.jpg',
  'lancer-spot': '200000143-9d2e79d2e9__20210824_161755.jpg',

  // Single-photo references with descriptions
  xc60: '200000002-504aa51417__volvoxc60-8.jpg',
  v40: '200000010-4d3524e318__v40cc.jpg',
  toyota: '200000037-80cfd80cff__IMG_20191103_195009.jpg',
  'suzuki-1': '200000061-77f7577f77__IMG-20191207-WA0007.jpg',
  'suzuki-2': '200000062-4b9c64b9c8__IMG-20191207-WA0006.jpg',
  audi: '200000077-a2737a2739__IMG_20200131_232008.jpg',
  v60: '200000030-3fde13fde5__IMG_20190825_124630.jpg',

  // Headlight lenses – pairs (before = earlier timestamp, after = later the same day)
  'hl-bmw-a-before': '200000104-2600326007__20201028_164105.jpg',
  'hl-bmw-a-after': '200000105-720b4720b8__20201028_172631.jpg',
  'hl-bmw-b-before': '200000106-962d6962db__20201028_164116.jpg',
  'hl-bmw-b-after': '200000107-ae82eae833__20201028_172642.jpg',
  'hl-white-a-before': '200000154-37f2137f23__20210913_183107.jpg',
  'hl-white-a-after': '200000155-4d2f14d2f4__20210913_185702.jpg',
  'hl-white-b-before': '200000150-0a4690a46a__20210913_183119.jpg',
  'hl-white-b-after': '200000151-a0cc0a0cc2__20210913_185711.jpg',
  'hl-blue-before': '200000084-10edd10ee0__IMG-20200330-WA0003.jpg',
  'hl-blue-after': '200000085-4652c4652e__IMG-20200330-WA0004.jpg',
  'hl-silver-before': '200000075-85b7885b7a__IMG_20190402_122200-2.jpg',
  'hl-silver-after': '200000076-42d4742d49__IMG_20190402_124043-3.jpg',
  'hl-van-1': '200000112-7cb447cb47__20210311_075859.jpg',
  'hl-van-2': '200000114-25c9d25c9f__20210311_075827.jpg',
  'hl-van-3': '200000113-dc141dc144__20210311_130123.jpg',
  'hl-van-4': '200000115-b6e29b6e2b__20210311_130136.jpg',

  // Service photos (original "Palvelut" page)
  engine: '200000058-19ba619ba8__IMG_20191110_164125.jpg',
  windshield: '200000060-3533c3533e__IMG_20191130_193956.jpg',
  'chrome-delete': '200000272-cac66cac69__IMG-20230902-WA0000-6.jpeg',
  'leather-seat': '200000274-c9997c999a__bmwpenkki.jpeg',

  // Reference gallery without work descriptions on the original site
  'mercc-1': '200000080-3298632989__IMG_20200223_141758.jpg',
  'mercc-2': '200000083-07dc807dcb__IMG_20200223_141615.jpg',
  'mercc-3': '200000081-e0cd8e0cda__IMG_20200222_132823.jpg',
  'xc40-1': '200000162-9306b9306e__FB_IMG_1663776053028.jpg',
  'cayenne-1': '200000159-6b59a6b59d__20220331_072006.jpg',
  'cayenne-2': '200000160-67c2267c24__20220331_071952.jpg',
  'cayenne-3': '200000161-5769e576a0__20220331_072023.jpg',
  'mondeo-1': '200000132-6135061353__20210729_192117.jpg',
  'mondeo-2': '200000134-631ed631ef__20210729_192128.jpg',
  'qashqai-1': '200000135-1f3ff1f401__20210718_105617.jpg',
  'qashqai-2': '200000137-d2951d2954__20210718_105550.jpg',
  'mini-1': '200000138-b0c70b0c72__20210712_215416.jpg',
  'mini-2': '200000140-b9d21b9d23__20210712_215446.jpg',
  'i30-1': '200000124-7319a7319d__20210620_141242-0.jpg',
  'i30-2': '200000126-4583645838__20210620_141317.jpg',
  'x1-1': '200000117-28cd528cd8__bmw2.jpg',
  'x1-2': '200000116-d6134d6136__bmw1.jpg',
  'l200-1': '200000166-a4847a4849__20220802_211232.jpg',
  'l200-2': '200000170-729687296a__20220802_211148.jpg',
  'skoda-red': '200000028-742e5742e7__IMG_20191101_220845.jpg',
  'skoda-white': '200000029-53a2b53a2d__IMG_20190907_120751.jpg',
  bmw7: '200000035-b6f8ab6f8d__IMG_20191102_195431.jpg',
  'duster-brown': '200000011-90b5c91ae8__duster.jpg',
}
