import { Component, lazy, Suspense, type ReactNode } from 'react'
import { avatarAsset } from '../data/assets'
import { useUI } from '../context/UIContext'

const AvatarModel = lazy(() => import('./AvatarModel'))

class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function Still() {
  return (
    <img
      src={avatarAsset.image}
      alt=""
      draggable={false}
      className="avatar-sway h-full w-full object-contain select-none"
    />
  )
}

/**
 * Top-right purple head. Real 3D (Three.js) when avatarAsset.model is set,
 * otherwise a still-image fallback with a slow sway. Both pause on hover.
 * Clicking toggles the navigation overlay.
 */
export function RotatingAvatar() {
  const { menuOpen, toggleMenu } = useUI()
  return (
    <button
      type="button"
      onClick={toggleMenu}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      aria-controls="site-menu"
      className="avatar-hover group relative block h-[70px] w-[46px] md:h-[118px] md:w-[78px] cursor-pointer"
    >
      {avatarAsset.model ? (
        <ModelBoundary fallback={<Still />}>
          <Suspense fallback={<Still />}>
            <AvatarModel url={avatarAsset.model} />
          </Suspense>
        </ModelBoundary>
      ) : (
        <Still />
      )}
    </button>
  )
}
