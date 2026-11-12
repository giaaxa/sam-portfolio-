import { useEffect, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { HeroCharacter } from '../components/HeroCharacter'
import { CharacterGallery } from '../components/CharacterGallery'
import { WaveStage, MobileWaveBand } from '../components/WaveStage'
import { FloatingInstagram } from '../components/FloatingInstagram'
import { Footer } from '../components/Footer'
import { useIsDesktop, usePrefersReducedMotion } from '../lib/useReducedMotion'

export default function HomePage() {
  const reduced = usePrefersReducedMotion()
  const desktop = useIsDesktop()
  const { scrollY } = useScroll()

  // Wave completes over the first ~85% of a viewport of scroll.
  const scrolled = useTransform(scrollY, (v) => Math.min(1, Math.max(0, v / (window.innerHeight * 0.85))))
  // Phase is zero when the gallery is docked (scrollY = 1 viewport), matching the mockup shape exactly.
  const flow = useTransform(scrollY, (v) => (v - window.innerHeight) / 520)
  const still = useMotionValue(1)
  const zero = useMotionValue(0)
  const progress = reduced ? still : scrolled
  const phase = reduced ? zero : flow

  // "Lighter blue comes first, display page of characters comes second."
  const [revealed, setRevealed] = useState(reduced || !desktop)
  useEffect(() => { if (reduced || !desktop) setRevealed(true) }, [reduced, desktop])
  useMotionValueEvent(progress, 'change', (v) => { if (v > 0.82) setRevealed(true) })

  return (
    <>
      <div className="relative">
        <WaveStage progress={progress} phase={phase} />
        <HeroCharacter />
        <MobileWaveBand />
        <CharacterGallery revealed={revealed} />
      </div>
      <FloatingInstagram />
      <Footer />
    </>
  )
}
