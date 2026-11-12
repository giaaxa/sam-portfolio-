import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, Center, useAnimations, useGLTF } from '@react-three/drei'
import { Box3, Vector3, type Group } from 'three'

/**
 * Speed of Sam's built-in 360° spin (the .glb's own animation is a 2s loop).
 * 1 = original speed; lower = slower.
 */
const SPIN_SPEED = 0.35

const box = new Box3()
const centre = new Vector3()

function Head({ url, paused }: { url: string; paused: boolean }) {
  const group = useRef<Group>(null)
  const pivot = useRef<Group>(null)
  const { scene, animations } = useGLTF(url)
  const { actions, mixer } = useAnimations(animations, group)
  const hasClip = animations.length > 0

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().play())
  }, [actions])

  useEffect(() => {
    mixer.timeScale = paused ? 0 : SPIN_SPEED
  }, [paused, mixer])

  // Fallback rotation if a future model ships without its own spin.
  useFrame((_, dt) => {
    if (!hasClip && group.current && !paused) group.current.rotation.y += dt * 0.6
    // Sam's spin pivots around the scene origin, not the head, so the head
    // would orbit. Re-centre it every frame so it turns on the spot.
    if (pivot.current) {
      box.setFromObject(scene)
      box.getCenter(centre)
      pivot.current.position.x -= centre.x
      pivot.current.position.z -= centre.z
    }
  })

  return (
    <group ref={pivot}>
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

/** Sam's 3D head — loaded only when a .glb is configured in data/assets.ts. */
export default function AvatarModel({ url }: { url: string }) {
  const [paused, setPaused] = useState(false)
  return (
    <div className="h-full w-full" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <Canvas camera={{ position: [0, 0, 6], fov: 30 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        {/* Pink / violet rig echoing Sam's still render of the head */}
        <ambientLight intensity={0.75} />
        <directionalLight position={[2, 3, 4]} intensity={1.5} />
        <directionalLight position={[-4, 1, 2]} intensity={1.6} color="#e05bd0" />
        <directionalLight position={[3, 2, -3]} intensity={1.2} color="#6b5bff" />
        <Bounds fit clip margin={1.05}>
          <Center>
            <Head url={url} paused={paused} />
          </Center>
        </Bounds>
      </Canvas>
    </div>
  )
}
