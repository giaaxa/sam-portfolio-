import type { SVGProps } from 'react'

/** Custom net-bag basket — echoes the netted bags in Sam's illustrations. Temporary until Sam's own icon. */
export function BasketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden="true" {...props}>
      <path d="M13 15c0-6 3-10 7-10s7 4 7 10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M8 16h24l4 27a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L8 16Z" fill="currentColor" />
      <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".9">
        <path d="M14 19l-3 22M20 19v22M26 19l3 22" />
        <path d="M9.5 26c6 2 15 2 21 0M8 34c7 2.4 17 2.4 24 0" />
      </g>
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3.4" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="42" height="42" rx="12" />
      <circle cx="24" cy="24" r="9.5" />
      <circle cx="35.5" cy="12.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
