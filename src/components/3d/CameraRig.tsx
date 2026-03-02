import { useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '@/store/scrollStore'
import { cameraKeyframes, interpolateKeyframes } from '@/config/camera-keyframes'

export const CameraRig = () => {
  const { camera } = useThree()
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  useFrame(() => {
    const { position, lookAt } = interpolateKeyframes(cameraKeyframes, scrollProgress)

    // Smooth camera movement
    camera.position.lerp(position, 0.1)
    camera.lookAt(lookAt)
  })

  return null
}
