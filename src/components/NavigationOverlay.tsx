import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useUI } from '../context/UIContext'
import { brand } from '../data/assets'
import { InstagramIcon } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/characters', label: 'Characters' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

/** Periwinkle disc that blooms out of the avatar (IONGAF-style), revealing oversized links. */
export function NavigationOverlay() {
  const { menuOpen, setMenuOpen } = useUI()
  const { pathname } = useLocation()
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstLink.current?.focus(), 350)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t); document.body.style.overflow = '' }
  }, [menuOpen, setMenuOpen])

  const origin = 'calc(100% - 52px) 64px'

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.nav
          id="site-menu"
          aria-label="Main"
          className="fixed inset-0 z-40 overflow-y-auto bg-peri"
          initial={{ clipPath: `circle(0px at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})`, transition: { duration: 0.8, ease: [0.7, 0, 0.2, 1] } }}
          exit={{ clipPath: `circle(0px at ${origin})`, transition: { duration: 0.55, ease: [0.6, 0, 0.3, 1], delay: 0.1 } }}
        >
          <div className="flex min-h-full flex-col justify-between px-5 pb-8 pt-28 md:px-[3vw] md:pt-[18vh]">
            <ul className="flex flex-col items-end gap-1 md:gap-0">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }}
                  exit={{ x: 40, opacity: 0, transition: { duration: 0.2, delay: (links.length - i) * 0.02 } }}
                >
                  <NavLink
                    ref={i === 0 ? firstLink : undefined}
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 md:gap-6"
                  >
                    {({ isActive }) => (
                      <>
                        <span className="font-wide text-xs font-light tracking-widest text-ink/70 md:text-sm">
                          0{i + 1}
                        </span>
                        <span
                          aria-current={isActive ? 'page' : undefined}
                          className={`wordmark text-[clamp(42px,7vw,112px)] uppercase leading-[0.98] transition-[color,transform] duration-500 group-hover:-translate-x-3 ${isActive ? 'text-ink' : 'text-white group-hover:text-ink'}`}
                        >
                          {l.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-12 flex items-end justify-between gap-6 text-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <a href={brand.instagramUrl} target="_blank" rel="noreferrer" aria-label="WAYNSTEAD on Instagram">
                <InstagramIcon className="h-9 w-9 md:h-11 md:w-11" />
              </a>
              <p className="max-w-[16ch] text-right font-wide text-sm font-light leading-snug md:text-lg">
                {brand.tagline.join(' ')}
              </p>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
