import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type UICtx = { menuOpen: boolean; setMenuOpen: (v: boolean) => void; toggleMenu: () => void }
const Ctx = createContext<UICtx | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const value = useMemo(() => ({ menuOpen, setMenuOpen, toggleMenu: () => setMenuOpen((v) => !v) }), [menuOpen])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useUI() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useUI must be used inside UIProvider')
  return v
}
