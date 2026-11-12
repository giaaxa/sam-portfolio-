import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Product } from '../data/products'
import { formatPrice } from '../lib/format'

/** Cut-outs with name + price underneath — used for "you might like these" and the shop index. */
export function ProductCutout({ product, height = 'h-[38vh]', index = 0 }: { product: Product; height?: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link to={`/shop/${product.slug}`} className="group flex flex-col items-center text-center">
        <div className={`flex ${height} w-full items-end justify-center`}>
          <img
            src={product.image}
            alt=""
            loading="lazy"
            width={product.width}
            height={product.height}
            className="h-full max-w-full object-contain object-bottom transition duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-1"
          />
        </div>
        <p className="mt-6 font-display text-base font-extrabold uppercase">{product.name}</p>
        <p className="font-wide text-xs font-light">{product.subtitle}</p>
        <p className="mt-1 font-display text-sm font-extrabold">{formatPrice(product.price)}</p>
      </Link>
    </motion.div>
  )
}
