import * as THREE from 'three'

export interface CameraKeyframe {
  progress: number
  position: THREE.Vector3
  lookAt: THREE.Vector3
  fov?: number
}

export const cameraKeyframes: CameraKeyframe[] = [
  {
    progress: 0, // Hero section - улей максимально справа
    position: new THREE.Vector3(7, 2, 8),
    lookAt: new THREE.Vector3(7, 1.2, 0),
    fov: 50,
  },
  {
    progress: 0.2, // Features section - справа сверху
    position: new THREE.Vector3(9, 3, 6),
    lookAt: new THREE.Vector3(7, 1.5, 0),
    fov: 45,
  },
  {
    progress: 0.4, // HowItWorks - сбоку слева
    position: new THREE.Vector3(4, 2.5, 7),
    lookAt: new THREE.Vector3(7, 1.5, 0),
    fov: 50,
  },
  {
    progress: 0.6, // Pricing - справа близко
    position: new THREE.Vector3(10, 3.5, 4),
    lookAt: new THREE.Vector3(7, 1, 0),
    fov: 48,
  },
  {
    progress: 0.8, // OrderForm - сверху
    position: new THREE.Vector3(7, 5, 5),
    lookAt: new THREE.Vector3(7, 1, 0),
    fov: 55,
  },
  {
    progress: 1, // Footer - отдаление
    position: new THREE.Vector3(5, 3, 10),
    lookAt: new THREE.Vector3(7, 1.5, 0),
    fov: 50,
  },
]

/**
 * Interpolate between camera keyframes based on scroll progress
 */
export const interpolateKeyframes = (
  keyframes: CameraKeyframe[],
  progress: number
): { position: THREE.Vector3; lookAt: THREE.Vector3; fov: number } => {
  // Find the two keyframes to interpolate between
  const nextIndex = keyframes.findIndex((k) => k.progress > progress)

  if (nextIndex === -1) {
    // Past the last keyframe
    const last = keyframes[keyframes.length - 1]!
    return {
      position: last.position.clone(),
      lookAt: last.lookAt.clone(),
      fov: last.fov ?? 50,
    }
  }

  if (nextIndex === 0) {
    // Before the first keyframe
    const first = keyframes[0]!
    return {
      position: first.position.clone(),
      lookAt: first.lookAt.clone(),
      fov: first.fov ?? 50,
    }
  }

  const prev = keyframes[nextIndex - 1]!
  const next = keyframes[nextIndex]!

  // Calculate local progress between the two keyframes
  const localProgress =
    (progress - prev.progress) / (next.progress - prev.progress)

  // Use easing for smoother transitions
  const easedProgress = easeInOutCubic(localProgress)

  // Interpolate position
  const position = new THREE.Vector3().lerpVectors(
    prev.position,
    next.position,
    easedProgress
  )

  // Interpolate lookAt
  const lookAt = new THREE.Vector3().lerpVectors(
    prev.lookAt,
    next.lookAt,
    easedProgress
  )

  // Interpolate FOV
  const prevFov = prev.fov ?? 50
  const nextFov = next.fov ?? 50
  const fov = THREE.MathUtils.lerp(prevFov, nextFov, easedProgress)

  return { position, lookAt, fov }
}

/**
 * Easing function for smooth transitions
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
