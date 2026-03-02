import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LeafData {
  position: [number, number, number]
  speed: number
  rotationSpeed: number
  drift: number
  leafType: number
  color: string
  scale: number
}

// Функция для создания формы листа с зубчатыми краями
const createLeafShape = () => {
  const shape = new THREE.Shape()

  // Основа листа (овальная форма с заострением)
  shape.moveTo(0, 0) // Начало у черенка

  // Левая сторона с зубчиками
  shape.bezierCurveTo(
    -0.05, 0.1,  // контрольная точка 1
    -0.15, 0.15, // контрольная точка 2
    -0.2, 0.25   // конечная точка
  )
  shape.lineTo(-0.22, 0.3)
  shape.lineTo(-0.2, 0.35)
  shape.lineTo(-0.23, 0.4)
  shape.lineTo(-0.2, 0.45)
  shape.bezierCurveTo(
    -0.15, 0.55,
    -0.05, 0.6,
    0, 0.65      // кончик листа
  )

  // Правая сторона с зубчиками (зеркально)
  shape.bezierCurveTo(
    0.05, 0.6,
    0.15, 0.55,
    0.2, 0.45
  )
  shape.lineTo(0.23, 0.4)
  shape.lineTo(0.2, 0.35)
  shape.lineTo(0.22, 0.3)
  shape.lineTo(0.2, 0.25)
  shape.bezierCurveTo(
    0.15, 0.15,
    0.05, 0.1,
    0, 0         // обратно к началу
  )

  return shape
}

export const FloatingLeaves = ({ count = 12 }: { count?: number }) => {
  const leaves = useMemo<LeafData[]>(
    () =>
      Array.from({ length: count }, () => {
        // Разные оттенки зеленого и осенних цветов
        const colors = [
          '#2E7D32', // Темно-зеленый
          '#43A047', // Средне-зеленый
          '#66BB6A', // Светло-зеленый
          '#81C784', // Очень светло-зеленый
          '#C8E6C9', // Бледно-зеленый
          '#FFA726', // Оранжевый (осень)
          '#FF7043', // Красно-оранжевый
          '#FFCA28', // Желтый
        ]

        return {
          position: [
            (Math.random() - 0.5) * 15,
            Math.random() * 10 + 5,
            (Math.random() - 0.5) * 15,
          ] as [number, number, number],
          speed: 0.3 + Math.random() * 0.4,
          rotationSpeed: Math.random() * 2 - 1,
          drift: Math.random() * Math.PI * 2,
          leafType: Math.floor(Math.random() * 3), // 3 типа листьев
          color: colors[Math.floor(Math.random() * colors.length)] || '#43A047',
          scale: 0.8 + Math.random() * 0.6, // Разные размеры
        }
      }),
    [count]
  )

  return (
    <group>
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
    </group>
  )
}

const Leaf = ({
  position,
  speed,
  rotationSpeed,
  drift,
  color,
  scale,
}: LeafData) => {
  const groupRef = useRef<THREE.Group>(null!)
  const leafShape = useMemo(() => createLeafShape(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Falling motion (медленнее, более реалистично)
    groupRef.current.position.y -= speed * 0.008

    // Drift side to side (плавное покачивание)
    groupRef.current.position.x += Math.sin(t * 0.5 + drift) * 0.003
    groupRef.current.position.z += Math.cos(t * 0.3 + drift) * 0.003

    // Rotation для естественного падения листа
    groupRef.current.rotation.x += rotationSpeed * 0.008
    groupRef.current.rotation.y += rotationSpeed * 0.012
    groupRef.current.rotation.z += rotationSpeed * 0.006

    // Легкое покачивание (как на ветру)
    const wobble = Math.sin(t * 2 + drift) * 0.1
    groupRef.current.rotation.z += wobble * 0.01

    // Respawn at top when too low
    if (groupRef.current.position.y < -5) {
      groupRef.current.position.y = 15
      groupRef.current.position.x = position[0] + (Math.random() - 0.5) * 5
      groupRef.current.position.z = position[2] + (Math.random() - 0.5) * 5
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Основной лист */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[leafShape]} />
        <meshStandardMaterial
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Центральная прожилка */}
      <mesh position={[0, 0.001, 0.325]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.015, 0.65, 0.005]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.7)} // Темнее основного цвета
          roughness={0.9}
        />
      </mesh>

      {/* Боковые прожилки (слева) */}
      <mesh
        position={[-0.08, 0.001, 0.4]}
        rotation={[Math.PI / 2, 0, -0.5]}
      >
        <boxGeometry args={[0.01, 0.15, 0.003]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.7)}
          roughness={0.9}
        />
      </mesh>

      <mesh
        position={[-0.1, 0.001, 0.3]}
        rotation={[Math.PI / 2, 0, -0.6]}
      >
        <boxGeometry args={[0.01, 0.18, 0.003]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.7)}
          roughness={0.9}
        />
      </mesh>

      {/* Боковые прожилки (справа) */}
      <mesh
        position={[0.08, 0.001, 0.4]}
        rotation={[Math.PI / 2, 0, 0.5]}
      >
        <boxGeometry args={[0.01, 0.15, 0.003]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.7)}
          roughness={0.9}
        />
      </mesh>

      <mesh
        position={[0.1, 0.001, 0.3]}
        rotation={[Math.PI / 2, 0, 0.6]}
      >
        <boxGeometry args={[0.01, 0.18, 0.003]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.7)}
          roughness={0.9}
        />
      </mesh>

      {/* Черенок (стебелек) */}
      <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.012, 0.1, 6]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}
