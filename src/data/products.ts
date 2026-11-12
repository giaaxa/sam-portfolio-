import { characters } from './characters'
import { heroAsset } from './assets'

export type ProductView = {
  src: string
  label: string
  /** Optional detail crop of the same artwork (CSS zoom + focal point). */
  zoom?: number
  focus?: string
}

export type Product = {
  slug: string
  name: string
  subtitle: string
  kind: string
  price: number
  image: string
  width: number
  height: number
  views: ProductView[]
  options?: { label: string; values: string[] }
  description: string
  details: string[]
  characterSlug?: string
}

/**
 * DEMO CATALOGUE — names, prices, formats and copy are placeholders
 * until Sam confirms the real range. Only the featured $29.99 comes
 * from the mockup.
 */
const PLACEHOLDER_COPY = 'Placeholder copy — product description to be supplied by Sam.'

const viewsFor = (src: string): ProductView[] => [
  { src, label: 'Full figure' },
  { src, label: 'Detail — head', zoom: 2.6, focus: '50% 10%' },
  { src, label: 'Detail — outfit', zoom: 1.7, focus: '50% 55%' },
]

const fromCharacter = (num: string, price: number): Product => {
  const ch = characters.find((c) => c.number === num)!
  return {
    slug: `print-${num}`,
    name: num,
    subtitle: `${ch.title.toLowerCase()} print`,
    kind: 'Art print',
    price,
    image: ch.image,
    width: ch.width,
    height: ch.height,
    views: viewsFor(ch.image),
    options: { label: 'Format', values: ['A4', 'A3'] },
    description: PLACEHOLDER_COPY,
    details: ['Format, paper and finish — to be confirmed', 'Demo listing'],
    characterSlug: ch.slug,
  }
}

export const products: Product[] = [
  {
    slug: 'waynstead-001',
    name: '001',
    subtitle: 'swing the bat',
    kind: 'Featured piece',
    price: 29.99,
    image: heroAsset.image,
    width: heroAsset.width,
    height: heroAsset.height,
    views: viewsFor(heroAsset.image),
    options: { label: 'Format', values: ['A4', 'A3', 'A2'] },
    description: PLACEHOLDER_COPY,
    details: ['Format, paper and finish — to be confirmed', 'Demo listing'],
    characterSlug: 'character-09',
  },
  fromCharacter('01', 24.99),
  fromCharacter('03', 34.99),
  fromCharacter('04', 24.99),
  fromCharacter('06', 27.99),
  fromCharacter('07', 24.99),
]

export const featuredProduct = products[0]
export const getProduct = (slug?: string) => products.find((p) => p.slug === slug)
