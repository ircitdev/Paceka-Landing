import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CloudData {
  position: [number, number, number]
  speed: number
}

export const Clouds = ({ count = 3 }: { count?: number }) => {
  const clouds = useMemo<CloudData[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        position: [
          -15 + i * 15,
          5 + Math.random() * 2,
          -10 + Math.random() * 5,
        ] as [number, number, number],
        speed: 0.005 + Math.random() * 0.005,
      })),
    [count]
  )

  return (
    <group>
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
    </group>
  )
}

const Cloud = ({ position, speed }: CloudData) => {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    ref.current.position.x += speed

    // Respawn on other side
    if (ref.current.position.x > 20) {
      ref.current.position.x = -20
    }
  })

  return (
    <group ref={ref} position={position}>
      {/* Cloud made of spheres */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
      </mesh>
      <mesh position={[1, 0.2, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
