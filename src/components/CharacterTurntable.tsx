import { useState } from 'react'

type Props = {
  frames: string[]
  onFrame?: (src: string) => void
  className?: string
}

/**
 * Spin bar — "shows product dimensionality". Maps slider position to
 * turntable frames. With fewer than 2 frames it renders disabled (thumb
 * parked at the end, as in Sam's mockup) rather than faking 3D by
 * spinning a flat PNG.
 */
export function CharacterTurntable({ frames, onFrame, className }: Props) {
  const enabled = frames.length > 1
  const [i, setI] = useState(enabled ? 0 : 100)
  return (
    <div className={className} title={enabled ? 'Drag to turn' : '360° turntable views coming soon'}>
      <label className="sr-only" htmlFor="spin">Rotate figure</label>
      <input
        id="spin"
        type="range"
        className="spin-slider"
        min={0}
        max={enabled ? frames.length - 1 : 100}
        step={1}
        value={i}
        disabled={!enabled}
        aria-describedby={enabled ? undefined : 'spin-hint'}
        onChange={(e) => {
          const v = Number(e.target.value)
          setI(v)
          onFrame?.(frames[v])
        }}
      />
      {!enabled && <span id="spin-hint" className="sr-only">Turntable views are not available yet.</span>}
    </div>
  )
}
