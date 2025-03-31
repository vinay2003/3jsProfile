
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WavyPlaneProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  wireframe?: boolean;
  segments?: number;
  size?: number;
  waveSpeed?: number;
  waveIntensity?: number;
  morphTargets?: boolean;
  noiseIntensity?: number;
  interactive?: boolean;
}

const WavyPlane = ({ 
  position, 
  rotation = [0, 0, 0], 
  color = "#8B5CF6",
  wireframe = false,
  segments = 32,
  size = 10,
  waveSpeed = 1,
  waveIntensity = 0.3,
  morphTargets = false,
  noiseIntensity = 0.05,
  interactive = true,
}: WavyPlaneProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useRef<THREE.PlaneGeometry>(null);
  const clock = useRef<{elapsed: number}>({elapsed: 0});
  
  // Create initial and target positions for morphing effect
  const initialPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    return Float32Array.from(geo.attributes.position.array);
  }, [size, segments]);
  
  // Generate simplex noise function
  const simplex = useMemo(() => {
    // Simple noise function for the demo
    return (x: number, y: number, z: number) => {
      return Math.sin(x * 0.1 + z) * Math.cos(y * 0.1);
    };
  }, []);
  
  useFrame((state, delta) => {
    if (geometry.current && mesh.current) {
      clock.current.elapsed += delta * waveSpeed;
      
      const positions = geometry.current.attributes.position;
      
      // Mouse interaction
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const idx = i * 3;
        const originalX = initialPositions[idx];
        const originalY = initialPositions[idx + 1];
        
        // Calculate wave effect
        const xOffset = Math.sin(x * 2 + clock.current.elapsed) * waveIntensity;
        const yOffset = Math.cos(y * 2 + clock.current.elapsed) * waveIntensity;
        
        // Add noise for more organic feel
        const noise = simplex(x + clock.current.elapsed * 0.1, y, clock.current.elapsed * 0.1) * noiseIntensity;
        
        // Add mouse interaction if enabled
        let mouseEffect = 0;
        if (interactive) {
          const distance = Math.sqrt(
            Math.pow(originalX - mouseX * size, 2) + 
            Math.pow(originalY - mouseY * size, 2)
          );
          const maxDistance = Math.sqrt(size * size * 2);
          mouseEffect = Math.max(0, 1 - distance / maxDistance) * waveIntensity * 3;
        }
        
        positions.setZ(i, xOffset + yOffset + noise + mouseEffect);
      }
      
      positions.needsUpdate = true;
      geometry.current.computeVertexNormals();
      
      // Subtle rotation
      mesh.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <mesh 
      ref={mesh} 
      position={position} 
      rotation={rotation}
    >
      <planeGeometry
        ref={geometry}
        args={[size, size, segments, segments]} 
      />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.2}
        flatShading
      />
    </mesh>
  );
};

export default WavyPlane;
