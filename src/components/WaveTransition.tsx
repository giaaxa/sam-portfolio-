import { motion, useTransform, type MotionValue } from 'motion/react'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Organic offset for a boundary at height y (0..1). Tuned to Sam's mockup: ~27% top, bulge ~36%, pinch ~31%, ~37% bottom. */
const wobble = (y: number, ph: number) =>
  2.5 * Math.sin(y * Math.PI * 2 * 0.95 - 2.2 + ph) + 2 * Math.sin(y * Math.PI * 2 * 1.9 + 2.7 + ph * 1.35)

/** Catmull-Rom → cubic Bézier through points. */
function smooth(pts: [number, number][], move: boolean) {
  let d = move ? `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}` : `L${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`
  }
  return d
}

/**
 * Builds the blue shape for progress p (0 = off-screen right, 1 = docked left).
 * The leading (left) edge sweeps across first and exits; the trailing (right)
 * edge settles at ~33% as the final curving boundary.
 */
export function wavePath(p: number, ph: number, finalX = 32) {
  const eL = easeOut(clamp01(p * 1.05))
  const eR = easeInOut(clamp01(p))
  const N = 14
  const ys = Array.from({ length: N + 1 }, (_, i) => -4 + (108 * i) / N)
  const left: [number, number][] = ys.map((y): [number, number] => [lerp(118, -30, eL) + wobble(y / 100, ph + 1.7) * 1.6 * (1 - eL), y])
  const right: [number, number][] = ys.map((y): [number, number] => [lerp(124, finalX, eR) + wobble(y / 100, ph) * (0.55 + 0.45 * eR), y]).reverse()
  return `${smooth(left, true)} ${smooth(right, false)} Z`
}

type Props = { progress: MotionValue<number>; phase: MotionValue<number>; className?: string }

/** Periwinkle wave. A paler layer leads ("lighter blue comes first"), the periwinkle settles behind it. */
export function WaveTransition({ progress, phase, className }: Props) {
  const lead = useTransform([progress, phase], ([p, ph]: number[]) => wavePath(Math.min(1, p * 1.18), ph))
  const main = useTransform([progress, phase], ([p, ph]: number[]) => wavePath(p, ph))
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d={lead} fill="var(--color-peri-light)" />
      <motion.path d={main} fill="var(--color-peri)" />
    </svg>
  )
}
