/**
 * CENTRAL ASSET CONFIGURATION
 * ---------------------------------------------------------------
 * Every image / model the site uses is referenced from here, so the
 * temporary cut-outs can be swapped for Sam's final files without
 * touching any component.
 *
 * TEMPORARY: everything in /public/assets/characters and
 * /public/assets/brand/avatar-head.png was cropped out of Sam's own
 * flattened mockups (see /references). They are low resolution and
 * should be replaced with the original high-res transparent PNGs.
 */

export const brand = {
  name: 'WAYNSTEAD',
  tagline: ['nothing can happen', 'until you', 'swing the bat'],
  /** TODO(Sam): replace with the real profile URL. */
  instagramUrl: 'https://www.instagram.com/',
}

export const avatarAsset = {
  /** Still-image fallback shown until the 3D model exists. */
  image: '/assets/brand/avatar-head.png',
  /**
   * TODO(Sam): export the purple-haired head as glTF binary and drop it at
   * /public/assets/models/waynstead-head.glb, then set this to that path.
   * When set, the header renders a real rotating Three.js model instead.
   */
  model: null as string | null,
}

export const heroAsset = {
  /** Featured hero figure (temporary crop of Sam's mockup). */
  image: '/assets/characters/hero-lilac.png',
  width: 741,
  height: 2001,
  /**
   * TODO(Sam): turntable frames for the spin slider, ordered around the
   * figure, e.g. /assets/turntable/hero-000.png … hero-035.png.
   * With fewer than 2 frames the slider renders in its disabled state.
   */
  turntableFrames: [] as string[],
}
