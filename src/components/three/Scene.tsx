
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html, Stars, PerspectiveCamera } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import gsap from 'gsap';
import FloatingElement from './models/FloatingElement';
import WavyPlane from './models/WavyPlane';

interface SceneControllerProps {
  mousePosition: { x: number, y: number };
}

const SceneController = ({ mousePosition }: SceneControllerProps) => {
  const { camera } = useThree();
  
  useFrame(() => {
    if (mousePosition.x && mousePosition.y) {
      // Subtle camera movement based on mouse position
      gsap.to(camera.position, { 
        x: mousePosition.x * 0.2,
        y: mousePosition.y * 0.2,
        duration: 2,
        ease: "power2.out"
      });
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
};

// Import the useThree hook
import { useThree } from '@react-three/fiber';

const ShiftingLights = () => {
  const mainLight = useRef<THREE.DirectionalLight>(null);
  const accentLight = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (mainLight.current) {
      const t = clock.getElapsedTime();
      
      // Subtle movement of the main light
      mainLight.current.position.x = Math.sin(t * 0.2) * 3;
      mainLight.current.position.y = 7 + Math.sin(t * 0.15) * 1;
      mainLight.current.position.z = Math.cos(t * 0.25) * 3;
    }
    
    if (accentLight.current) {
      const t = clock.getElapsedTime() * 1.2;
      
      // Create a moving accent light for visual interest
      accentLight.current.position.x = Math.sin(t * 0.3) * 5;
      accentLight.current.position.y = Math.cos(t * 0.2) * 5;
      accentLight.current.position.z = Math.sin(t * 0.1) * 5;
      
      // Pulsating light intensity
      accentLight.current.intensity = 2 + Math.sin(t) * 0.5;
    }
  });

  return (
    <>
      <directionalLight 
        ref={mainLight}
        position={[5, 8, 5]} 
        intensity={1.5} 
        castShadow 
      />
      <pointLight
        ref={accentLight}
        position={[0, 3, 0]}
        intensity={2}
        color="#9b87f5"
      />
      <ambientLight intensity={0.4} />
    </>
  );
};

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [activePage, setActivePage] = useState('home');

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize mouse position
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    });
  };

  return (
    <div 
      className={`w-full h-full ${className}`} 
      onMouseMove={handleMouseMove}
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <SceneController mousePosition={mousePosition} />
        <ShiftingLights />
        
        {/* Background Elements */}
        <Stars radius={300} depth={100} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <WavyPlane 
          position={[0, -4, -5]} 
          rotation={[-Math.PI / 3, 0, 0]} 
          color="#8B5CF6" 
          wireframe={true}
          size={30}
          segments={30}
          waveSpeed={0.5}
          waveIntensity={0.5} 
        />
        
        {/* Interactive 3D Elements */}
        <group>
          <FloatingElement 
            position={[-4, 1, 0]} 
            shape="box"
            color="#8B5CF6"
            scale={1.2}
            floatIntensity={1.5}
            speed={0.8}
          />
          
          <FloatingElement 
            position={[4, 0.5, 1]} 
            shape="torus"
            color="#F97316"
            scale={1}
            floatIntensity={1}
            speed={1.2} 
          />
          
          <FloatingElement 
            position={[0, 2.5, -1]} 
            shape="sphere"
            color="#0EA5E9"
            scale={1.4}
            floatIntensity={0.8}
            speed={0.5} 
          />
          
          <FloatingElement 
            position={[-3, -1, -2]} 
            shape="octahedron"
            color="#10B981"
            scale={0.7}
            floatIntensity={1.2}
            speed={1.5} 
          />
          
          <FloatingElement 
            position={[3, -2, 0]} 
            shape="tetrahedron"
            color="#EC4899"
            scale={0.8}
            floatIntensity={1.7}
            speed={1} 
          />
        </group>
        
        {/* Hitbox Objects for Interactivity */}
        <group>
          <mesh 
            position={[-4, 1, 0]} 
            onPointerOver={() => setHoveredObject('box')}
            onPointerOut={() => setHoveredObject(null)}
            visible={false}
          >
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
          
          <mesh 
            position={[4, 0.5, 1]} 
            onPointerOver={() => setHoveredObject('torus')}
            onPointerOut={() => setHoveredObject(null)}
            visible={false}
          >
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
          
          <mesh 
            position={[0, 2.5, -1]} 
            onPointerOver={() => setHoveredObject('sphere')}
            onPointerOut={() => setHoveredObject(null)}
            visible={false}
          >
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          enableRotate={false}
          // Uncomment to enable rotation for debugging:
          // enableRotate={true}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
