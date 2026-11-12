import { useEffect, useState } from 'react'
import { animate, useMotionValue, useScroll, useTransform } from 'motion/react'
import { CharacterGallery } from '../components/CharacterGallery'
import { WaveStage, MobileWaveBand } from '../components/WaveStage'
import { FloatingInstagram } from '../components/FloatingInstagram'
import { Footer } from '../components/Footer'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

/** Standalone gallery route: the wave sweeps in on arrival, then flows with scroll. */
export default function CharactersPage() {
  const reduced = usePrefersReducedMotion()
  const progress = useMotionValue(reduced ? 1 : 0)
  const { scrollY } = useScroll()
  const phase = useTransform(scrollY, (v) => (reduced ? 0 : v / 520))
  const [revealed, setRevealed] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const a = animate(progress, 1, { duration: 1.5, ease: [0.45, 0, 0.2, 1], delay: 0.15 })
    const t = setTimeout(() => setRevealed(true), 1150)
    return () => { a.stop(); clearTimeout(t) }
  }, [progress, reduced])

  return (
    <>
      <h1 className="sr-only">Characters</h1>
      <div className="relative">
        <WaveStage progress={progress} phase={phase} />
        <div className="h-24 md:hidden" />
        <MobileWaveBand />
        <CharacterGallery revealed={revealed} />
      </div>
      <FloatingInstagram />
      <Footer />
    </>
  )
}
