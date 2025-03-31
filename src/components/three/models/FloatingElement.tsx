
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
  shape?: 'sphere' | 'box' | 'torus' | 'octahedron' | 'tetrahedron';
  floatIntensity?: number;
}

const FloatingElement = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  speed = 1,
  color = '#ffffff',
  shape = 'sphere',
  floatIntensity = 1
}: FloatingElementProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const startPosition = useRef<[number, number, number]>([...position]);
  const time = useRef<number>(Math.random() * 100);

  useFrame((state) => {
    if (mesh.current) {
      // Rotation
      mesh.current.rotation.x += 0.01 * speed;
      mesh.current.rotation.y += 0.005 * speed;
      
      // Floating motion
      time.current += 0.01;
      mesh.current.position.y = startPosition.current[1] + Math.sin(time.current) * 0.2 * floatIntensity;
      
      // Subtle movement on other axes
      mesh.current.position.x = startPosition.current[0] + Math.sin(time.current * 0.6) * 0.05 * floatIntensity;
      mesh.current.position.z = startPosition.current[2] + Math.cos(time.current * 0.8) * 0.05 * floatIntensity;
    }
  });

  let geometry;
  switch (shape) {
    case 'box':
      geometry = <boxGeometry args={[1, 1, 1]} />;
      break;
    case 'torus':
      geometry = <torusGeometry args={[0.7, 0.3, 16, 32]} />;
      break;
    case 'octahedron':
      geometry = <octahedronGeometry args={[1]} />;
      break;
    case 'tetrahedron':
      geometry = <tetrahedronGeometry args={[1]} />;
      break;
    case 'sphere':
    default:
      geometry = <sphereGeometry args={[1, 32, 32]} />;
      break;
  }

  return (
    <mesh 
      ref={mesh} 
      position={position} 
      rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={scale}
    >
      {geometry}
      <meshStandardMaterial 
        color={color} 
        roughness={0.5} 
        metalness={0.2} 
      />
    </mesh>
  );
};

export default FloatingElement;
