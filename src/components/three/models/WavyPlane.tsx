
import { useRef } from 'react';
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
}

const WavyPlane = ({ 
  position, 
  rotation = [0, 0, 0], 
  color = "#8B5CF6",
  wireframe = false,
  segments = 20,
  size = 10,
  waveSpeed = 1,
  waveIntensity = 0.3
}: WavyPlaneProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useRef<THREE.PlaneGeometry>(null);
  const clock = useRef<{elapsed: number}>({elapsed: 0});

  useFrame((state, delta) => {
    if (geometry.current && mesh.current) {
      clock.current.elapsed += delta * waveSpeed;
      
      const positions = geometry.current.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Calculate wave effect
        const xOffset = Math.sin(x * 2 + clock.current.elapsed) * waveIntensity;
        const yOffset = Math.cos(y * 2 + clock.current.elapsed) * waveIntensity;
        
        positions.setZ(i, xOffset + yOffset);
      }
      
      positions.needsUpdate = true;
      geometry.current.computeVertexNormals();
      
      // Subtle rotation
      mesh.current.rotation.z += 0.0005;
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
        flatShading
      />
    </mesh>
  );
};

export default WavyPlane;
