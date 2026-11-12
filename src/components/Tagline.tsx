import { brand } from '../data/assets'

export function Tagline({ className = '' }: { className?: string }) {
  return (
    <p className={`font-wide font-light leading-[1.22] tracking-[-0.045em] text-ink ${className}`}>
      {brand.tagline.map((l) => <span key={l} className="block">{l}</span>)}
    </p>
  )
}
