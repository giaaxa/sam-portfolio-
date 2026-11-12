import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { heroAsset } from '../data/assets'
import { Tagline } from './Tagline'
import { featuredProduct } from '../data/products'
import { formatPrice } from '../lib/format'
import { CharacterTurntable } from './CharacterTurntable'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const } },
})

/** First screen — composition matched to Sam's 1600×900 clean mockup. */
export function HeroCharacter() {
  const [src, setSrc] = useState(heroAsset.turntableFrames[0] ?? heroAsset.image)
  return (
    <section className="relative z-10 h-svh min-h-[620px] md:min-h-[600px]" aria-label="Featured">
      {/* Mobile-only tagline (desktop tagline lives in the fixed stage) */}
      <motion.div {...rise(0.15)} className="absolute left-5 top-[15vh] md:hidden">
        <Tagline className="text-[20px]" />
      </motion.div>

      <div className="absolute left-1/2 top-[27vh] flex h-[56vh] -translate-x-[38%] flex-col items-center md:top-[9.4vh] md:h-[75vh] md:translate-x-[-40%]">
        <motion.div {...rise(0.05)} className="h-full">
          <Link to={`/shop/${featuredProduct.slug}`} aria-label={`View ${featuredProduct.name} — ${featuredProduct.subtitle}`} className="group block h-full">
            <motion.img
              data-clash
              src={src}
              alt="Featured WAYNSTEAD character — lilac-haired figure in a star tee with a lilac tail"
              width={heroAsset.width}
              height={heroAsset.height}
              draggable={false}
              className="h-full w-auto select-none object-contain"
              whileHover={{ y: -6, rotate: -0.6 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            />
          </Link>
        </motion.div>
      </div>

      <motion.div {...rise(0.35)} className="absolute left-1/2 top-[85vh] w-[min(68vw,360px)] -translate-x-1/2 md:top-[84.2vh] md:w-[22.5vw] md:min-w-[260px]">
        <CharacterTurntable frames={heroAsset.turntableFrames} onFrame={setSrc} />
      </motion.div>
      <motion.p {...rise(0.45)} className="wordmark absolute left-1/2 top-[90vh] -translate-x-1/2 text-[clamp(30px,2.9vw,50px)] md:top-[88.4vh]">
        <Link to={`/shop/${featuredProduct.slug}`}>{formatPrice(featuredProduct.price)}</Link>
      </motion.p>
    </section>
  )
}
