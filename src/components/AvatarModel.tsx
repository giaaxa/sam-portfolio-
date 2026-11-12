import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import type { Group } from 'three'

function Head({ url, paused }: { url: string; paused: boolean }) {
  const { scene } = useGLTF(url)
  const ref = useRef<Group>(null)
  useFrame((_, dt) => {
    if (ref.current && !paused) ref.current.rotation.y += dt * 0.6
  })
  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

/** Genuine 3D head — only loaded once a .glb is configured in data/assets.ts. */
export default function AvatarModel({ url }: { url: string }) {
  const [paused, setPaused] = useState(false)
  return (
    <div className="h-full w-full" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <Canvas camera={{ position: [0, 0, 3], fov: 35 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 4]} intensity={1.6} />
        <directionalLight position={[-3, 1, -2]} intensity={0.6} color="#a98bd6" />
        <Head url={url} paused={paused} />
      </Canvas>
    </div>
  )
}
