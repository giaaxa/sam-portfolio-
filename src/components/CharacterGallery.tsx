import { characters } from '../data/characters'
import { CharacterCard } from './CharacterCard'

/** Four-column cut-out gallery sitting to the right of the wave on desktop. */
export function CharacterGallery({ revealed }: { revealed: boolean }) {
  return (
    <section
      id="characters"
      aria-label="Characters"
      className="relative z-10 px-5 pb-[18vh] pt-8 [--row-h:clamp(210px,34vh,340px)] max-md:[--row-h:clamp(200px,52vw,300px)] md:pl-[38vw] md:pr-[2.4vw] md:pt-[21vh]"
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-[2vw] md:gap-y-[6vh]">
        {characters.map((c, i) => (
          <li key={c.slug}>
            <CharacterCard character={c} index={i} revealed={revealed} />
          </li>
        ))}
      </ul>
    </section>
  )
}
