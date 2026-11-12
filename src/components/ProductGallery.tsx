import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Product, ProductView } from '../data/products'

function ViewImage({ view, alt }: { view: ProductView; alt: string }) {
  const zoom = view.zoom ?? 1
  return (
    <img
      src={view.src}
      alt={alt}
      draggable={false}
      className="h-full w-full select-none object-contain"
      style={zoom > 1 ? { transform: `scale(${zoom})`, transformOrigin: view.focus ?? '50% 50%' } : undefined}
    />
  )
}

/** Left column: main view with gentle pointer parallax + editorial thumbnail rail. */
export function ProductGallery({ product }: { product: Product }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const go = (i: number) => setState(([cur]) => [(i + product.views.length) % product.views.length, i > cur ? 1 : -1])
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 80, damping: 20 }), y = useSpring(my, { stiffness: 80, damping: 20 })
  const view = product.views[index]

  return (
    <div className="flex flex-col-reverse gap-6 md:flex-row md:gap-8">
      <ul className="flex justify-center gap-4 md:flex-col md:justify-start md:gap-5 md:pt-4" aria-label="Product views">
        {product.views.map((v, i) => (
          <li key={v.label}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={v.label}
              aria-current={i === index}
              className="group relative block h-20 w-14 overflow-hidden md:h-24 md:w-16"
            >
              <span className={`block h-full w-full transition duration-300 ${i === index ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`}>
                <ViewImage view={v} alt="" />
              </span>
              <span className={`absolute inset-x-2 -bottom-0 h-[2px] origin-left bg-ink transition-transform duration-500 ${i === index ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative flex-1">
        <div
          className="relative h-[58vh] cursor-pointer overflow-hidden md:h-[74vh]"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set(((e.clientX - r.left) / r.width - 0.5) * -14)
            my.set(((e.clientY - r.top) / r.height - 0.5) * -10)
          }}
          onPointerLeave={() => { mx.set(0); my.set(0) }}
          onClick={() => go(index + 1)}
          data-clash
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={index}
              custom={dir}
              className="absolute inset-0"
              style={{ x, y }}
              initial={{ opacity: 0, clipPath: dir >= 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)', transition: { duration: 0.7, ease: [0.7, 0, 0.2, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <ViewImage view={view} alt={`${product.name} — ${view.label}`} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex items-center justify-between font-wide text-xs font-light tracking-[0.2em]">
          <span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(product.views.length).padStart(2, '0')} · {view.label}</span>
          <span className="flex gap-2">
            <button type="button" aria-label="Previous view" onClick={() => go(index - 1)} className="rounded-full p-2 transition hover:-translate-x-0.5 hover:bg-peri/30"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Next view" onClick={() => go(index + 1)} className="rounded-full p-2 transition hover:translate-x-0.5 hover:bg-peri/30"><ArrowRight className="h-4 w-4" /></button>
          </span>
        </div>
      </div>
    </div>
  )
}
