import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useAnimationControls } from 'motion/react'
import { BasketIcon } from './Icons'
import { RotatingAvatar } from './RotatingAvatar'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

/** Wordmark drops to 50% opacity whenever a [data-clash] element (artwork) passes beneath it. */
function useClash(ref: React.RefObject<HTMLElement | null>, disabled: boolean) {
  const [clash, setClash] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const el = ref.current
      if (!el || disabled) return setClash(false)
      const r = el.getBoundingClientRect()
      const hit = Array.from(document.querySelectorAll<HTMLElement>('[data-clash]')).some((n) => {
        const b = n.getBoundingClientRect()
        return b.bottom > r.top + 6 && b.top < r.bottom - 6 && b.right > r.left && b.left < r.right
      })
      setClash(hit)
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check) }
    schedule()
    const t = setTimeout(schedule, 700) // after page transition
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf); clearTimeout(t)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, disabled, pathname])
  return clash
}

export function Header() {
  const { count, open, pulse } = useCart()
  const { menuOpen, setMenuOpen } = useUI()
  const wordRef = useRef<HTMLAnchorElement>(null)
  const clash = useClash(wordRef, menuOpen)
  const bump = useAnimationControls()

  useEffect(() => {
    if (pulse) bump.start({ scale: [1, 1.28, 0.92, 1], rotate: [0, -10, 6, 0], transition: { duration: 0.6 } })
  }, [pulse, bump])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="relative flex items-start justify-between px-4 pt-3 md:px-[1.6vw] md:pt-[1.6vh]">
        <motion.button
          type="button"
          onClick={() => { setMenuOpen(false); open() }}
          animate={bump}
          whileHover={{ y: -2 }}
          className="pointer-events-auto relative mt-1 text-basket"
          aria-label={`Open basket, ${count} item${count === 1 ? '' : 's'}`}
        >
          <BasketIcon className="h-9 w-8 md:h-12 md:w-10" />
          <span
            className="absolute -right-2 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-basket px-1 text-[11px] font-semibold text-white ring-2 ring-white md:h-6 md:min-w-6 md:text-xs"
            aria-hidden="true"
          >
            {count}
          </span>
        </motion.button>

        <Link
          ref={wordRef}
          to="/"
          onClick={() => setMenuOpen(false)}
          aria-label="WAYNSTEAD — home"
          className="wordmark pointer-events-auto absolute left-1/2 top-4 -translate-x-1/2 text-[clamp(22px,3.2vw,56px)] text-ink transition-opacity duration-500 md:top-[2.3vh]"
          style={{ opacity: clash ? 0.5 : 1 }}
        >
          WAYNSTEAD
        </Link>

        <div className="pointer-events-auto">
          <RotatingAvatar />
        </div>
      </div>
    </header>
  )
}
