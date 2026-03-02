import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BeeData {
  position: [number, number, number]
  speed: number
  radius: number
  offset: number
  phase: number
}

export const Bees = ({ count = 8 }: { count?: number }) => {
  const bees = useMemo<BeeData[]>(
    () =>
      Array.from({ length: count }, () => ({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 5,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        speed: 0.5 + Math.random() * 0.5,
        radius: 3 + Math.random() * 2,
        offset: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
      })),
    [count]
  )

  return (
    <group>
      {bees.map((bee, i) => (
        <Bee key={i} {...bee} />
      ))}
    </group>
  )
}

const Bee = ({ speed, radius, offset, phase }: BeeData) => {
  const groupRef = useRef<THREE.Group>(null!)
  const leftWingRef = useRef<THREE.Mesh>(null!)
  const rightWingRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset

    // Circular flight path around the hive (center at [0, 0, 0] relative to parent group)
    groupRef.current.position.x = Math.cos(t) * radius
    groupRef.current.position.z = Math.sin(t) * radius
    groupRef.current.position.y = 1.5 + Math.sin(t * 2) * 0.5

    // Rotation to face direction of movement
    groupRef.current.rotation.y = t + Math.PI / 2

    // Wing flapping animation (very fast)
    const wingFlap = Math.sin(state.clock.elapsedTime * 40 + phase)
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = wingFlap * 0.5
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = -wingFlap * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* Head (dark) */}
      <mesh position={[0.15, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Thorax (middle, fuzzy golden) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#D4A76A" roughness={0.9} />
      </mesh>

      {/* Abdomen - Striped (3 segments) */}
      {/* Yellow segment */}
      <mesh position={[-0.12, 0, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Black stripe */}
      <mesh position={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Yellow segment */}
      <mesh position={[-0.27, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Wings - Left */}
      <mesh
        ref={leftWingRef}
        position={[0, 0.05, 0.08]}
        rotation={[0, 0.3, 0]}
      >
        <planeGeometry args={[0.25, 0.15]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Wings - Right */}
      <mesh
        ref={rightWingRef}
        position={[0, 0.05, -0.08]}
        rotation={[0, -0.3, 0]}
      >
        <planeGeometry args={[0.25, 0.15]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Legs (6 thin lines) */}
      {/* Front legs */}
      <mesh position={[0.08, -0.08, 0.05]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>
      <mesh position={[0.08, -0.08, -0.05]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Middle legs */}
      <mesh position={[0, -0.1, 0.06]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>
      <mesh position={[0, -0.1, -0.06]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Back legs */}
      <mesh position={[-0.12, -0.09, 0.05]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.005, 0.005, 0.11]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>
      <mesh position={[-0.12, -0.09, -0.05]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.005, 0.005, 0.11]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Antennae */}
      <mesh position={[0.2, 0.05, 0.03]} rotation={[0, 0.3, 0.3]}>
        <cylinderGeometry args={[0.003, 0.003, 0.08]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>
      <mesh position={[0.2, 0.05, -0.03]} rotation={[0, -0.3, -0.3]}>
        <cylinderGeometry args={[0.003, 0.003, 0.08]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>
    </group>
  )
}
