export const Environment = () => {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.5} />

      {/* Directional light for shadows and depth */}
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

      {/* Point light for accent */}
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#FFC300" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#87CEEB', 8, 20]} />
    </>
  )
}
