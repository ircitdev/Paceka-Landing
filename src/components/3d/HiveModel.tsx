import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Цвета дерева
const WOOD_LIGHT = '#D4A76A'
const WOOD_MEDIUM = '#C99A5F'
const WOOD_DARKER = '#8B6F47'
const ROOF_COLOR = '#A0826D'

export const HiveModel = () => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    // Very gentle swaying animation (очень минимальное покачивание)
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.005
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.01
  })

  // Функция для создания яруса с досками
  const createTier = (posY: number, color: string, hasEntrance: boolean = false) => {
    const tierHeight = 0.5
    const tierWidth = 1.4
    const tierDepth = 1.2
    const boardThickness = 0.05

    return (
      <group position={[0, posY, 0]}>
        {/* Основной корпус */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[tierWidth, tierHeight, tierDepth]} />
          <meshStandardMaterial
            color={color}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Горизонтальные доски (текстура) */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={`board-${i}`}
            position={[0, -tierHeight / 2 + i * (tierHeight / 3), tierDepth / 2 + 0.01]}
            castShadow
          >
            <boxGeometry args={[tierWidth + 0.02, 0.04, boardThickness]} />
            <meshStandardMaterial
              color={new THREE.Color(color).multiplyScalar(0.95)}
              roughness={0.95}
            />
          </mesh>
        ))}

        {/* Угловые стойки */}
        {[
          [-tierWidth / 2, 0, -tierDepth / 2],
          [tierWidth / 2, 0, -tierDepth / 2],
          [-tierWidth / 2, 0, tierDepth / 2],
          [tierWidth / 2, 0, tierDepth / 2],
        ].map((pos, i) => (
          <mesh key={`corner-${i}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.08, tierHeight + 0.02, 0.08]} />
            <meshStandardMaterial
              color={WOOD_DARKER}
              roughness={0.9}
            />
          </mesh>
        ))}

        {/* Леток (вход) */}
        {hasEntrance && (
          <>
            <mesh position={[0, 0, tierDepth / 2 + 0.02]} castShadow>
              <boxGeometry args={[0.35, 0.12, 0.05]} />
              <meshStandardMaterial color="#1A0F0A" />
            </mesh>
            {/* Посадочная дощечка под летком */}
            <mesh position={[0, -0.12, tierDepth / 2 + 0.08]} castShadow>
              <boxGeometry args={[0.5, 0.02, 0.15]} />
              <meshStandardMaterial color={WOOD_DARKER} roughness={0.85} />
            </mesh>
          </>
        )}
      </group>
    )
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Подставка (дно) */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.1, 1.4]} />
        <meshStandardMaterial color={WOOD_DARKER} roughness={0.9} />
      </mesh>

      {/* 4 яруса улья */}
      {createTier(0.35, WOOD_LIGHT, true)} {/* Нижний ярус с летком */}
      {createTier(0.9, WOOD_MEDIUM, true)} {/* Второй ярус с летком */}
      {createTier(1.45, WOOD_LIGHT, false)} {/* Третий ярус */}
      {createTier(2.0, WOOD_MEDIUM, false)} {/* Верхний ярус */}

      {/* Скатная крыша */}
      <group position={[0, 2.55, 0]}>
        {/* Основание крыши */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.7, 0.08, 1.5]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.85} />
        </mesh>

        {/* Передний скат */}
        <mesh
          position={[0, 0.25, -0.4]}
          rotation={[Math.PI * 0.2, 0, 0]}
          castShadow
        >
          <boxGeometry args={[1.7, 0.05, 0.8]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.85} />
        </mesh>

        {/* Задний скат */}
        <mesh
          position={[0, 0.25, 0.4]}
          rotation={[-Math.PI * 0.2, 0, 0]}
          castShadow
        >
          <boxGeometry args={[1.7, 0.05, 0.8]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.85} />
        </mesh>

        {/* Конек крыши */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[1.75, 0.08, 0.12]} />
          <meshStandardMaterial
            color={new THREE.Color(ROOF_COLOR).multiplyScalar(0.9)}
            roughness={0.9}
          />
        </mesh>

        {/* Доски на крыше (текстура) */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
          <mesh
            key={`roof-board-${i}`}
            position={[x, 0.26, 0]}
            rotation={[0, 0, 0]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.03, 1.65]} />
            <meshStandardMaterial
              color={new THREE.Color(ROOF_COLOR).multiplyScalar(i % 2 === 0 ? 1 : 0.95)}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Ручки по бокам (для переноски) */}
      {[-0.75, 0.75].map((x, i) => (
        <mesh
          key={`handle-${i}`}
          position={[x, 1.2, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <torusGeometry args={[0.12, 0.03, 8, 16, Math.PI]} />
          <meshStandardMaterial color={WOOD_DARKER} roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}
