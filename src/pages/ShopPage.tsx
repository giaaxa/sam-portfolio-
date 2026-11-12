import { products } from '../data/products'
import { ProductCutout } from '../components/ProductStrip'
import { Tagline } from '../components/Tagline'
import { Footer } from '../components/Footer'

export default function ShopPage() {
  const [featured, ...rest] = products
  return (
    <>
      <div className="px-5 pb-28 pt-28 md:px-[2.4vw] md:pt-[18vh]">
        <h1 className="sr-only">Shop</h1>
        <div className="grid items-end gap-12 md:grid-cols-[1fr_auto_1fr]">
          <Tagline className="text-xl md:text-[clamp(20px,1.8vw,30px)]" />
          <div className="md:w-[22vw] md:min-w-[260px]"><ProductCutout product={featured} height="h-[56vh]" /></div>
          <p className="font-wide text-xs font-light uppercase tracking-[0.3em] md:text-right">demo catalogue · {products.length} pieces</p>
        </div>
        <ul className="mt-28 grid grid-cols-2 gap-x-6 gap-y-20 md:grid-cols-5 md:gap-x-[2vw]">
          {rest.map((p, i) => <li key={p.slug}><ProductCutout product={p} index={i} /></li>)}
        </ul>
      </div>
      <Footer />
    </>
  )
}
