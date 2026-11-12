import type { MotionValue } from 'motion/react'
import { WaveTransition } from './WaveTransition'
import { Tagline } from './Tagline'

/**
 * Sticky backdrop (desktop) holding the wave and the tagline. Wrapped
 * around hero + gallery so the tagline stays put while the wave sweeps
 * in behind it, exactly like the hero → gallery mockup pair.
 */
export function WaveStage({ progress, phase }: { progress: MotionValue<number>; phase: MotionValue<number> }) {
  return (
    <div className="pointer-events-none sticky top-0 z-0 -mb-[100svh] hidden h-svh overflow-hidden md:block" aria-hidden="false">
      <WaveTransition progress={progress} phase={phase} className="absolute inset-0 h-full w-full" />
      <Tagline className="absolute left-[1.15vw] top-[37.6vh] text-[clamp(22px,2.14vw,38px)]" />
    </div>
  )
}

/** Mobile: a static wavy periwinkle band introduces the gallery instead of the scroll-driven sweep. */
export function MobileWaveBand() {
  return (
    <div className="relative -mb-10 h-44 md:hidden" aria-hidden="true">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,0 H100 V18 C82,30 66,8 48,20 C32,31 16,14 0,26 Z" fill="var(--color-peri-light)" />
        <path d="M0,0 H100 V12 C80,24 64,2 46,14 C30,25 14,8 0,20 Z" fill="var(--color-peri)" />
      </svg>
    </div>
  )
}
