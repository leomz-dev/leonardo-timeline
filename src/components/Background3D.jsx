import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background: #050505;
`;

/* Shared scroll velocity for the 3D scene */
const scrollState = { velocity: 0 };

function TunnelParticles() {
  const ref = useRef();

  /* Two layers: distant stars + closer dust */
  const starPositions = useMemo(() => {
    const arr = new Float32Array(12000); // 4000 stars
    for (let i = 0; i < 12000; i += 3) {
      // Distribute in a cylinder shape for tunnel feel
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 3;
      arr[i] = Math.cos(angle) * radius;
      arr[i + 1] = Math.sin(angle) * radius;
      arr[i + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const dustPositions = useMemo(() => {
    const arr = new Float32Array(3000); // 1000 dust particles
    for (let i = 0; i < 3000; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      arr[i] = Math.cos(angle) * radius;
      arr[i + 1] = Math.sin(angle) * radius;
      arr[i + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Base slow rotation + scroll-driven speed boost
    const speed = 1 + Math.abs(scrollState.velocity) * 8;
    ref.current.rotation.z += delta * 0.03 * speed;
    ref.current.position.z += delta * 0.1 * scrollState.velocity;

    // Loop the position to create infinite tunnel
    if (ref.current.position.z > 5) ref.current.position.z = -5;
    if (ref.current.position.z < -5) ref.current.position.z = 5;
  });

  return (
    <group ref={ref}>
      <Points positions={starPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.012}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
      <Points positions={dustPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#aaccff"
          size={0.006}
          sizeAttenuation
          depthWrite={false}
          opacity={0.25}
        />
      </Points>
    </group>
  );
}

const Background3D = () => {
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          scrollState.velocity = (currentScroll - lastScroll) * 0.001;
          lastScroll = currentScroll;
          ticking = false;
        });
      }
    };

    // Dampen velocity over time
    const dampInterval = setInterval(() => {
      scrollState.velocity *= 0.92;
    }, 16);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(dampInterval);
    };
  }, []);

  return (
    <CanvasWrapper id="bg-canvas">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />
        <TunnelParticles />
      </Canvas>
    </CanvasWrapper>
  );
};

export default Background3D;
