import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { characters, getCharacter } from '../data/characters'
import { getProduct } from '../data/products'
import { formatPrice } from '../lib/format'
import { Footer } from '../components/Footer'
import NotFoundPage from './NotFoundPage'

/** "Pushes to a plain page with the drawing and the header." */
export default function CharacterDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const ch = getCharacter(slug)
  const i = ch ? characters.indexOf(ch) : -1
  const prev = characters[(i - 1 + characters.length) % characters.length]
  const next = characters[(i + 1) % characters.length]

  useEffect(() => {
    if (!ch) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input,textarea')) return
      if (e.key === 'ArrowLeft') navigate(`/characters/${prev.slug}`)
      if (e.key === 'ArrowRight') navigate(`/characters/${next.slug}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ch, prev, next, navigate])

  if (!ch) return <NotFoundPage />
  const product = ch.productSlug ? getProduct(ch.productSlug) : undefined

  return (
    <>
      <article className="relative min-h-svh px-5 pb-16 pt-28 md:grid md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-[3vw] md:px-[2.4vw] md:pb-[6vh] md:pt-[16vh]">
        <motion.div
          key={`meta-${ch.slug}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.7 } }}
          className="order-1 mb-8 md:mb-0"
        >
          <Link to="/characters" className="mb-10 inline-flex items-center gap-2 font-wide text-xs font-light uppercase tracking-[0.25em] transition hover:-translate-x-1">
            <ArrowLeft className="h-3.5 w-3.5" /> all characters
          </Link>
          <p className="font-wide text-sm font-light tracking-[0.3em]">No.</p>
          <h1 className="wordmark text-[clamp(84px,11vw,190px)] leading-[0.85]">{ch.number}</h1>
          <p className="mt-3 font-wide text-[clamp(16px,1.4vw,22px)] font-extralight">{ch.title}</p>
          {ch.description && <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/80">{ch.description}</p>}
        </motion.div>

        <motion.figure
          key={`fig-${ch.slug}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } }}
          className="order-2 flex h-[62vh] justify-center md:h-[76vh]"
        >
          <img
            src={ch.image}
            alt={ch.title}
            width={ch.width}
            height={ch.height}
            data-clash
            className="h-full w-auto max-w-full object-contain object-bottom"
          />
        </motion.figure>

        <motion.nav
          key={`nav-${ch.slug}`}
          aria-label="Character navigation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.7 } }}
          className="order-3 mt-10 flex flex-col items-start gap-6 md:mt-0 md:items-end"
        >
          {product && (
            <Link to={`/shop/${product.slug}`} className="group md:text-right">
              <span className="block font-wide text-[11px] font-light uppercase tracking-[0.3em]">available</span>
              <span className="wordmark text-2xl transition group-hover:text-lilac">{formatPrice(product.price)} →</span>
            </Link>
          )}
          <div className="flex gap-3">
            <Link to={`/characters/${prev.slug}`} aria-label={`Previous: ${prev.title}`} className="flex items-center gap-3 rounded-full border border-ink px-4 py-3 transition hover:bg-ink hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <img src={prev.image} alt="" className="h-10 w-auto" />
            </Link>
            <Link to={`/characters/${next.slug}`} aria-label={`Next: ${next.title}`} className="flex items-center gap-3 rounded-full border border-ink px-4 py-3 transition hover:bg-ink hover:text-white">
              <img src={next.image} alt="" className="h-10 w-auto" />
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="font-wide text-[11px] font-light tracking-[0.25em]">{ch.number} / {String(characters.length).padStart(2, '0')}</p>
        </motion.nav>
      </article>

      {ch.artworks && ch.artworks.length > 0 && (
        <section aria-label="More artworks" className="px-5 pb-24 md:px-[2.4vw]">
          <ul className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {ch.artworks.map((a) => (
              <li key={a.src}><img src={a.src} alt={a.alt} width={a.width} height={a.height} loading="lazy" className="w-full object-contain" /></li>
            ))}
          </ul>
        </section>
      )}
      <Footer />
    </>
  )
}
