export type Character = {
  slug: string
  number: string
  /** Placeholder titles until Sam names each character. */
  title: string
  image: string
  width: number
  height: number
  /** Relative display height in the gallery (1 = full row height). */
  galleryScale: number
  description?: string
  /** Additional artworks (sketches, alternates) shown on the detail page. */
  artworks?: { src: string; alt: string; width: number; height: number }[]
  productSlug?: string
}

const c = (n: number, width: number, height: number, galleryScale: number, productSlug?: string): Character => {
  const number = String(n).padStart(2, '0')
  return {
    slug: `character-${number}`,
    number,
    title: `Character ${number}`,
    image: `/assets/characters/character-${number}.png`,
    width,
    height,
    galleryScale,
    productSlug,
  }
}

export const characters: Character[] = [
  c(1, 366, 933, 0.97, 'print-01'),
  c(2, 504, 924, 0.97),
  c(3, 732, 825, 0.86, 'print-03'),
  c(4, 501, 894, 0.95, 'print-04'),
  c(5, 291, 945, 1),
  c(6, 372, 900, 0.96, 'print-06'),
  c(7, 303, 918, 0.97, 'print-07'),
  c(8, 231, 918, 0.98),
  {
    slug: 'character-09',
    number: '09',
    title: 'Character 09',
    image: '/assets/characters/hero-lilac.png',
    width: 741,
    height: 2001,
    galleryScale: 1,
    productSlug: 'waynstead-001',
  },
]

export const getCharacter = (slug?: string) => characters.find((ch) => ch.slug === slug)
