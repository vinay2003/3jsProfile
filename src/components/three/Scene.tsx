
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

interface BoxProps {
  position: [number, number, number];
  color?: string;
  hovering?: boolean;
}

const Box = ({ position, color = '#8B5CF6', hovering = false }: BoxProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (hovering && mesh.current) {
      gsap.to(mesh.current.rotation, {
        y: mesh.current.rotation.y + Math.PI * 2,
        duration: 1.5,
        ease: "power2.inOut"
      });
      gsap.to(mesh.current.position, {
        y: mesh.current.position.y + 0.5,
        duration: 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
  }, [hovering]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface TorusProps {
  position: [number, number, number];
  color?: string;
  hovering?: boolean;
}

const Torus = ({ position, color = '#F97316', hovering = false }: TorusProps) => {
  const mesh = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (hovering && mesh.current) {
      gsap.to(mesh.current.rotation, {
        z: mesh.current.rotation.z + Math.PI,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }
  }, [hovering]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.2 + 0.2;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface SphereProps {
  position: [number, number, number];
  color?: string;
  hovering?: boolean;
}

const Sphere = ({ position, color = '#0EA5E9', hovering = false }: SphereProps) => {
  const mesh = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (hovering && mesh.current) {
      gsap.to(mesh.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 1
      });
    }
  }, [hovering]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.2;
      mesh.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface SceneControllerProps {
  mousePosition: { x: number, y: number };
}

const SceneController = ({ mousePosition }: SceneControllerProps) => {
  const { camera } = useThree();
  
  useFrame(() => {
    if (mousePosition.x && mousePosition.y) {
      // Subtle camera movement based on mouse position
      gsap.to(camera.position, { 
        x: (mousePosition.x * 0.1),
        y: (mousePosition.y * 0.1),
        duration: 1
      });
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
};

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <SceneController mousePosition={mousePosition} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        
        <Box 
          position={[-2, 0, 0]} 
          hovering={hoveredObject === 'box'} 
        />
        <Torus 
          position={[2, 0, 0]} 
          hovering={hoveredObject === 'torus'} 
        />
        <Sphere 
          position={[0, 1.5, 0]} 
          hovering={hoveredObject === 'sphere'} 
        />
        
        {/* Interaction planes for hover detection */}
        <mesh 
          position={[-2, 0, 0]} 
          onPointerOver={() => setHoveredObject('box')}
          onPointerOut={() => setHoveredObject(null)}
          visible={false}
        >
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        
        <mesh 
          position={[2, 0, 0]} 
          onPointerOver={() => setHoveredObject('torus')}
          onPointerOut={() => setHoveredObject(null)}
          visible={false}
        >
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        
        <mesh 
          position={[0, 1.5, 0]}
          onPointerOver={() => setHoveredObject('sphere')}
          onPointerOut={() => setHoveredObject(null)}
          visible={false}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
