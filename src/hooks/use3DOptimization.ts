import { useMediaQuery } from './useMediaQuery'

interface OptimizationSettings {
  beeCount: number
  leafCount: number
  cloudCount: number
  dpr: [number, number]
  enablePostProcessing: boolean
  enableShadows: boolean
  geometryDetail: 'low' | 'medium' | 'high'
}

export const use3DOptimization = (): OptimizationSettings => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isLowEnd = useMediaQuery('(max-width: 480px)')

  if (isLowEnd) {
    return {
      beeCount: 3,
      leafCount: 3,
      cloudCount: 1,
      dpr: [0.5, 1],
      enablePostProcessing: false,
      enableShadows: false,
      geometryDetail: 'low',
    }
  }

  if (isMobile) {
    return {
      beeCount: 5,
      leafCount: 8,
      cloudCount: 2,
      dpr: [1, 1.5],
      enablePostProcessing: false,
      enableShadows: false,
      geometryDetail: 'medium',
    }
  }

  // Desktop - уменьшено количество пчел, больше листиков
  return {
    beeCount: 8,
    leafCount: 25,
    cloudCount: 3,
    dpr: [1, 2],
    enablePostProcessing: true,
    enableShadows: true,
    geometryDetail: 'high',
  }
}
