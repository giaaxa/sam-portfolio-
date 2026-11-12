import { useParams } from 'react-router-dom'
import { getProduct, products } from '../data/products'
import { ProductGallery } from '../components/ProductGallery'
import { ProductDetails } from '../components/ProductDetails'
import { ProductCutout } from '../components/ProductStrip'
import { Footer } from '../components/Footer'
import NotFoundPage from './NotFoundPage'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFoundPage />
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4)

  return (
    <>
      <div className="px-5 pb-24 pt-28 md:px-[2.4vw] md:pt-[16vh]">
        <div key={product.slug} className="grid gap-12 md:grid-cols-[60%_40%] md:gap-0">
          <ProductGallery product={product} />
          <ProductDetails product={product} />
        </div>

        <section aria-label="You might like these" className="mt-32">
          <h2 className="font-wide text-xs font-light uppercase tracking-[0.3em]">you might like these</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-4">
            {related.map((p, i) => <li key={p.slug}><ProductCutout product={p} height="h-[30vh]" index={i} /></li>)}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  )
}
