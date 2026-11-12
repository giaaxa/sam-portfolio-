# WAYNSTEAD — prototype

A working prototype of Sam's WAYNSTEAD site: React 19, TypeScript, Vite, Tailwind v4, Motion and React Router. React Three Fiber is included but only loads once a head model is supplied.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```

## Routes
| Route | What |
|---|---|
| `/` | Hero, then the scroll-driven wave and the character gallery, then the footer |
| `/characters` | Gallery on its own (the wave sweeps in when the page opens) |
| `/characters/:slug` | Character page: drawing, number and title, previous/next (arrow keys work too), link to the print |
| `/shop`, `/shop/:slug` | Shop index and product page |
| `/about`, `/contact`, `/terms` | Placeholder pages |

## Where things live
- `src/data/assets.ts`: **all asset paths** (avatar, hero image, turntable frames, Instagram URL)
- `src/data/characters.ts`: one entry per character. Adding an entry creates its page.
- `src/data/products.ts`: demo catalogue (only the $29.99 featured price comes from the mockup)
- `references/`: Sam's mockups and the IONGAF screenshots. **For reference only, not used by the site.**

## Assets needed from Sam
Everything in `public/assets/characters/` and `public/assets/brand/avatar-head.png` is a **temporary crop taken from the flattened mockups**. These crops are low-resolution and look soft at large sizes. To replace them, overwrite the files with the same names, or change the paths in `src/data`.

1. ~~3D head model~~ **Done.** `PearlSculpt_WebVer2.glb` is at `public/assets/models/waynstead-head.glb`, compressed with meshopt from 6.5 MB to 1.1 MB. It plays Sam's own 360° spin, slowed to 0.35× (`SPIN_SPEED` in `AvatarModel.tsx`), held centred, and paused on hover. This export has black eyes and no sunglasses, unlike the still in the mockups. Swap the file if there's a newer version.
2. **Turntable frames for the hero figure** (for example 24–36 PNGs taken around the figure, or a 3D model) for the spin slider. List them in `heroAsset.turntableFrames`. Until then the slider is shown but disabled, so a flat image is never spun.
3. **Original high-res transparent PNGs** of the hero figure (`hero-lilac.png`) and the 8 gallery characters (`character-01…08.png`), plus any more characters for the gallery.
4. **The basket icon.** The current net-bag icon is a stand-in drawn in code (`src/components/Icons.tsx`).
5. **Logo font.** WAYNSTEAD is currently set in *Unbounded 900* and the tagline in *Lexend Exa Light* (both open-licensed). Swap them if Sam has custom fonts.
6. **Content:** character names and descriptions, product names, formats and prices, the about and contact copy, the Instagram URL, and the legal text.
7. **Checkout.** The basket works (stored in localStorage), but checkout is turned off until an ecommerce provider is connected.
