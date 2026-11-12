import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProduct } from '../data/products'

export type CartLine = { key: string; slug: string; option?: string; qty: number }

type CartCtx = {
  lines: CartLine[]
  count: number
  subtotal: number
  add: (slug: string, option: string | undefined, qty: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
  /** Increments on every add — drives the basket "bump" animation. */
  pulse: number
}

const STORAGE_KEY = 'waynstead.cart.v1'
const Ctx = createContext<CartCtx | null>(null)

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartLine[]
    return Array.isArray(parsed) ? parsed.filter((l) => getProduct(l.slug) && l.qty > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load)
  const [isOpen, setOpen] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — cart still works in memory */
    }
  }, [lines])

  const add = useCallback((slug: string, option: string | undefined, qty: number) => {
    const key = `${slug}::${option ?? ''}`
    setLines((ls) => {
      const found = ls.find((l) => l.key === key)
      if (found) return ls.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
      return [...ls, { key, slug, option, qty }]
    })
    setPulse((p) => p + 1)
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty: Math.min(99, qty) } : l))))
  }, [])

  const remove = useCallback((key: string) => setLines((ls) => ls.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.slug)?.price ?? 0) * l.qty, 0)
    return {
      lines, count, subtotal, add, setQty, remove, clear, pulse,
      isOpen, open: () => setOpen(true), close: () => setOpen(false),
    }
  }, [lines, add, setQty, remove, clear, pulse, isOpen])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useCart must be used inside CartProvider')
  return v
}
