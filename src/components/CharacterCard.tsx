import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import type { Character } from '../data/characters'

type Props = { character: Character; index: number; revealed: boolean }

/** Standalone cut-out — no card, border or shadow. Lifts and tilts slightly on hover. */
export function CharacterCard({ character, index, revealed }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const show = revealed && inView
  const tilt = index % 2 ? 1.2 : -1.2

  return (
    <Link
      ref={ref}
      to={`/characters/${character.slug}`}
      aria-label={`${character.title} — view character`}
      className="group relative flex h-[var(--row-h)] w-full items-end justify-center"
    >
      <motion.img
        src={character.image}
        alt={character.title}
        width={character.width}
        height={character.height}
        loading="lazy"
        draggable={false}
        data-clash
        className="max-w-full select-none object-contain object-bottom"
        style={{ height: `calc(var(--row-h) * ${character.galleryScale})` }}
        initial={{ opacity: 0, y: 40 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: show ? (index % 4) * 0.09 + 0.05 : 0, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={{ y: -10, rotate: tilt, scale: 1.025, transition: { type: 'spring', stiffness: 220, damping: 16 } }}
      />
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-wide text-[11px] font-light tracking-[0.2em] text-ink opacity-0 transition duration-500 group-hover:-bottom-8 group-hover:opacity-100 group-focus-visible:opacity-100">
        No. {character.number}
      </span>
    </Link>
  )
}
