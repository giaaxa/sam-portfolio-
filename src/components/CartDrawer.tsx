import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import { formatPrice } from '../lib/format'

export function CartDrawer() {
  const { isOpen, close, lines, setQty, remove, subtotal, count } = useCart()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 200)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; clearTimeout(t) }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-peri/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Basket"
            className="absolute inset-y-0 left-0 flex w-full max-w-[440px] flex-col bg-white text-ink shadow-[30px_0_60px_-30px_rgba(83,99,142,.35)]"
            initial={{ x: '-100%' }}
            animate={{ x: 0, transition: { type: 'spring', stiffness: 260, damping: 32 } }}
            exit={{ x: '-100%', transition: { duration: 0.35, ease: [0.6, 0, 0.3, 1] } }}
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-6">
              <h2 className="wordmark text-2xl uppercase">Basket <span className="font-wide text-base font-light">({count})</span></h2>
              <button ref={closeRef} onClick={close} aria-label="Close basket" className="rounded-full p-2 transition hover:rotate-90 hover:bg-peri/30">
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="font-wide text-lg font-light">your basket is empty</p>
                <Link to="/shop" onClick={close} className="rounded-full border border-ink px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wide transition hover:bg-ink hover:text-white">
                  Visit the shop
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/15 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => {
                      const p = getProduct(l.slug)
                      if (!p) return null
                      return (
                        <motion.li
                          key={l.key}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                          className="flex gap-4 py-5"
                        >
                          <Link to={`/shop/${p.slug}`} onClick={close} className="flex h-24 w-16 shrink-0 items-end justify-center">
                            <img src={p.image} alt="" className="max-h-full max-w-full object-contain" />
                          </Link>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between gap-2">
                              <div>
                                <p className="font-display text-sm font-extrabold uppercase">{p.name}</p>
                                <p className="font-wide text-xs font-light">{p.subtitle}{l.option ? ` · ${l.option}` : ''}</p>
                              </div>
                              <p className="font-display text-sm font-extrabold">{formatPrice(p.price * l.qty)}</p>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center rounded-full border border-ink/40">
                                <button aria-label="Decrease quantity" onClick={() => setQty(l.key, l.qty - 1)} className="p-2 hover:text-lilac"><Minus className="h-3.5 w-3.5" /></button>
                                <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">{l.qty}</span>
                                <button aria-label="Increase quantity" onClick={() => setQty(l.key, l.qty + 1)} className="p-2 hover:text-lilac"><Plus className="h-3.5 w-3.5" /></button>
                              </div>
                              <button onClick={() => remove(l.key)} className="text-xs underline underline-offset-4 opacity-70 hover:opacity-100">Remove</button>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-ink/15 px-6 pb-6 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-wide text-sm font-light uppercase tracking-widest">Subtotal</span>
                    <span className="wordmark text-2xl">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    disabled
                    className="mt-5 w-full cursor-not-allowed rounded-full bg-ink/25 py-4 font-display text-sm font-extrabold uppercase tracking-wide text-white"
                  >
                    Checkout unavailable
                  </button>
                  <p className="mt-3 text-center text-xs text-ink/70">
                    Demo basket — no payment provider is connected yet.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
