import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from './Environment'
import { HiveModel } from './HiveModel'
import { Bees } from './Bees'
import { FloatingLeaves } from './FloatingLeaves'
import { Clouds } from './Clouds'
import { CameraRig } from './CameraRig'
import { use3DOptimization } from '@/hooks/use3DOptimization'

export const Scene = () => {
  const optimization = use3DOptimization()

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [7, 2, 8], fov: 50 }}
        dpr={optimization.dpr}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #FFFFFF 100%)',
        }}
      >
        <Suspense fallback={null}>
          <Environment />
          {/* Улей максимально прижат к правому краю на десктопе */}
          <group position={[7, 0, 0]}>
            <HiveModel />
            <Bees count={optimization.beeCount} />
          </group>
          <FloatingLeaves count={optimization.leafCount} />
          <Clouds count={optimization.cloudCount} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
