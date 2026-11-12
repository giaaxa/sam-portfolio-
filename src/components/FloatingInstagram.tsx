import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { brand } from '../data/assets'
import { InstagramIcon } from './Icons'

/** Bottom-left Instagram mark from the hero/gallery mockups; hides when the footer (which has its own) arrives. */
export function FloatingInstagram() {
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    let io: IntersectionObserver | undefined
    const t = setTimeout(() => {
      const footer = document.querySelector('footer')
      if (!footer) return
      io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0 })
      io.observe(footer)
    }, 50)
    return () => { clearTimeout(t); io?.disconnect() }
  }, [pathname])

  return (
    <a
      href={brand.instagramUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="WAYNSTEAD on Instagram"
      tabIndex={hidden ? -1 : 0}
      className="fixed bottom-4 left-4 z-30 text-ink transition-all duration-500 hover:-translate-y-0.5 md:bottom-[2.4vh] md:left-[1.4vw]"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <InstagramIcon className="h-10 w-10 md:h-[58px] md:w-[58px]" />
    </a>
  )
}
