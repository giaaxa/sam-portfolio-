import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Minus, Plus } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'
import { Accordion } from './Accordion'

/** Right column: oversized name, price, selectors, quantity, add-to-basket, accordions. */
export function ProductDetails({ product }: { product: Product }) {
  const { add } = useCart()
  const [option, setOption] = useState(product.options?.values[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => { setOption(product.options?.values[0]); setQty(1); setAdded(false) }, [product])
  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(t)
  }, [added])

  return (
    <div className="flex flex-col md:pl-[2vw]">
      <p className="font-wide text-[11px] font-light uppercase tracking-[0.3em] text-ink/70">{product.kind} · demo</p>
      <h1 className="wordmark mt-3 text-[clamp(64px,8vw,148px)] leading-[0.88]">{product.name}</h1>
      <p className="mt-2 font-wide text-[clamp(18px,1.6vw,26px)] font-extralight">{product.subtitle}</p>
      <p className="wordmark mt-8 text-[clamp(30px,2.6vw,44px)]">{formatPrice(product.price)}</p>

      {product.options && (
        <fieldset className="mt-8">
          <legend className="font-wide text-[11px] uppercase tracking-[0.3em]">{product.options.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.options.values.map((v) => (
              <label key={v} className="relative cursor-pointer">
                <input type="radio" name="option" value={v} checked={option === v} onChange={() => setOption(v)} className="peer sr-only" />
                <span className="relative z-10 block min-w-14 rounded-full border border-ink px-5 py-2 text-center font-display text-xs font-extrabold transition-colors peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                  {v}
                </span>
                {option === v && (
                  <motion.span layoutId={`opt-${product.slug}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-wrap items-stretch gap-3">
        <div className="flex items-center rounded-full border border-ink" role="group" aria-label="Quantity">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 transition hover:text-lilac"><Minus className="h-4 w-4" /></button>
          <span className="w-6 text-center font-display text-sm font-extrabold tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))} className="px-4 py-3 transition hover:text-lilac"><Plus className="h-4 w-4" /></button>
        </div>

        <motion.button
          type="button"
          onClick={() => { add(product.slug, option, qty); setAdded(true) }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex min-w-[220px] flex-1 items-center justify-center overflow-hidden rounded-full bg-ink px-8 py-4 text-white"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-lilac transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wide"
            >
              {added ? <><Check className="h-4 w-4" /> Added</> : <>Add to basket</>}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="mt-10">
        <Accordion title="description" defaultOpen>
          <p className="italic text-ink/70">{product.description}</p>
        </Accordion>
        <Accordion title="details">
          <ul className="list-inside list-disc space-y-1">
            {product.details.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </Accordion>
        <Accordion title="shipping + care">
          <p className="italic text-ink/70">Placeholder — shipping regions, times and care instructions to be supplied.</p>
        </Accordion>
      </div>

      {product.characterSlug && (
        <Link to={`/characters/${product.characterSlug}`} className="mt-8 self-start font-wide text-xs font-light uppercase tracking-[0.25em] underline decoration-ink/30 underline-offset-8 transition hover:decoration-ink">
          meet the character →
        </Link>
      )}
    </div>
  )
}
