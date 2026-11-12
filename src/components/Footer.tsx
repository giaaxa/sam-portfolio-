import { Link } from 'react-router-dom'
import { brand } from '../data/assets'
import { InstagramIcon } from './Icons'

export function Footer() {
  return (
    <footer className="relative z-20 flex min-h-[300px] flex-col justify-between bg-ink-deep px-5 pb-5 pt-16 text-white md:h-[35vh] md:min-h-[300px] md:px-[1.4vw] md:pb-[2.4vh] md:pt-[15vh]">
      <Link to="/" className="wordmark mx-auto text-[clamp(26px,3.4vw,58px)]" aria-label="WAYNSTEAD — home">
        WAYNSTEAD
      </Link>
      <div className="mt-12 flex items-end justify-between">
        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="WAYNSTEAD on Instagram"
          className="transition-opacity hover:opacity-70"
        >
          <InstagramIcon className="h-10 w-10 md:h-[58px] md:w-[58px]" />
        </a>
        <Link
          to="/terms"
          className="font-display text-[11px] font-extrabold uppercase tracking-wide transition-opacity hover:opacity-70 md:text-[15px]"
        >
          Terms and Policies
        </Link>
      </div>
    </footer>
  )
}
