"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { type ShaderMaterial } from "three";

const count = 4000;
const particleSize = 4.0;

// Vertex Shader: Handles particle position and mouse interaction
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  
  attribute vec3 initialPosition;
  attribute float aScale;
  attribute vec3 aColor; // Renamed to avoid reserved keyword 'color'
  
  varying vec3 vColor;
  
  void main() {
    vec3 pos = initialPosition;
    
    // Mouse repulsion logic
    // Convert current position to world space (roughly)
    // Since we are in a fullscreen plane, we can map mouse (normalized -1 to 1) to position
    
    float dx = pos.x - uMouse.x * 20.0; // Scale mouse to "world" content roughly
    float dy = pos.y - uMouse.y * 10.0;
    float dist = sqrt(dx * dx + dy * dy);
    
    // Force field radius
    float radius = 4.0;
    
    if (dist < radius && uHover > 0.0) {
      float force = (radius - dist) / radius;
      float angle = atan(dy, dx);
      float strength = 2.0 * force; // Push strength
      
      pos.x += cos(angle) * strength;
      pos.y += sin(angle) * strength;
    }
    
    // Gentle floating movement
    pos.x += sin(uTime * 0.5 + pos.y * 0.5) * 0.05;
    pos.y += cos(uTime * 0.3 + pos.x * 0.5) * 0.05;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * 4.0 * (1.0 / -mvPosition.z);
    vColor = aColor;
  }
`;

// Fragment Shader: Handles particle appearance
const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Circular particle
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

const Particles = () => {
    const mesh = useRef<THREE.Points>(null);
    const material = useRef<ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    const hoverStrength = useRef(0);

    const [positions, scales, colors, initialPositions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const initialPositions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const brandColors = [
            new THREE.Color("#6366f1"), // Indigo
            new THREE.Color("#a855f7"), // Purple
            new THREE.Color("#ffffff"), // White
            new THREE.Color("#ef4444"), // Red (Accent)
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles across a wide area (fullscreen)
            // Adjust based on viewport but keep it wide enough to cover resizes
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            initialPositions[i3] = x;
            initialPositions[i3 + 1] = y;
            initialPositions[i3 + 2] = z;

            scales[i] = Math.random();

            const color = brandColors[Math.floor(Math.random() * brandColors.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return [positions, scales, colors, initialPositions];
    }, []);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uHover: { value: 0 },
        }),
        []
    );

    // Track mouse globally since canvas has pointer-events-none
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize to -1 to 1
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouseRef.current = { x, y };
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!material.current) return;

        material.current.uniforms.uTime.value = state.clock.getElapsedTime();

        // Smooth mouse transition
        material.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
            material.current.uniforms.uMouse.value.x,
            mouseRef.current.x,
            0.1
        );
        material.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
            material.current.uniforms.uMouse.value.y,
            mouseRef.current.y,
            0.1
        );

        material.current.uniforms.uHover.value = 1.0;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-initialPosition"
                    count={initialPositions.length / 3}
                    array={initialPositions}
                    itemSize={3}
                />
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-aScale"
                    count={scales.length}
                    array={scales}
                    itemSize={1}
                />
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-aColor"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={material}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </points>
    );
};

// Asteroids: Floating rocks in the background
const Asteroids = () => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const count = 50;

    const [dummy] = useMemo(() => [new THREE.Object3D()], []);

    // Initial random positions and rotations
    const asteroids = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30 - 10 // Push back in Z
            ),
            rotation: new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ),
            scale: Math.random() * 0.5 + 0.2,
            speed: (Math.random() * 0.2 + 0.1) * 0.1,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            }
        }));
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        asteroids.forEach((asteroid, i) => {
            // Rotate
            asteroid.rotation.x += asteroid.rotationSpeed.x;
            asteroid.rotation.y += asteroid.rotationSpeed.y;

            // Gentle drift
            asteroid.position.x += Math.sin(state.clock.elapsedTime * asteroid.speed + i) * 0.002;
            asteroid.position.y += Math.cos(state.clock.elapsedTime * asteroid.speed + i) * 0.002;

            dummy.position.copy(asteroid.position);
            dummy.rotation.copy(asteroid.rotation);
            dummy.scale.setScalar(asteroid.scale);
            dummy.updateMatrix();

            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#333" roughness={0.8} />
        </instancedMesh>
    );
};

// Comets: Occasional shooting stars
const Comets = () => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const count = 3;
    const [dummy] = useMemo(() => [new THREE.Object3D()], []);

    const comets = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 20 - 20
            ),
            velocity: new THREE.Vector3(
                (Math.random() + 0.5) * (Math.random() > 0.5 ? 1 : -1),
                (Math.random() + 0.5) * (Math.random() > 0.5 ? 1 : -1),
                0
            ).normalize().multiplyScalar(Math.random() * 0.5 + 0.5)
        }));
    }, []);

    useFrame(() => {
        if (!mesh.current) return;

        comets.forEach((comet, i) => {
            comet.position.add(comet.velocity);

            // Reset if out of bounds
            if (Math.abs(comet.position.x) > 60 || Math.abs(comet.position.y) > 40) {
                comet.position.set(
                    (Math.random() - 0.5) * 100, // Random enter point
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 20 - 20
                );
                // Bias velocity towards center slightly to ensure they cross screen
                const target = new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, -20);
                comet.velocity.subVectors(target, comet.position).normalize().multiplyScalar(0.4);
            }

            dummy.position.copy(comet.position);
            // Orient towards velocity
            // dummy.lookAt(comet.position.clone().add(comet.velocity));
            // Scale X to simulate tail speed blur
            dummy.scale.set(4, 0.1, 0.1);
            dummy.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), comet.velocity.clone().normalize());

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </instancedMesh>
    );
};

export function AntigravityParticles() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Asteroids />
                <Comets />
                <Particles />
            </Canvas>
        </div>
    );
}
