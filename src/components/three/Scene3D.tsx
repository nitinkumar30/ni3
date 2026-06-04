"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x7b61ff, 2, 30);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ff9d, 1.5, 30);
    pointLight2.position.set(5, -3, 5);
    scene.add(pointLight2);

    const geometries: THREE.Mesh[] = [];
    const colors = [0x00e5ff, 0x7b61ff, 0x00ff9d];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const type = Math.floor(Math.random() * 3);
      let geo: THREE.BufferGeometry;
      if (type === 0) geo = new THREE.IcosahedronGeometry(Math.random() * 0.4 + 0.1, 0);
      else if (type === 1) geo = new THREE.OctahedronGeometry(Math.random() * 0.4 + 0.1);
      else geo = new THREE.TorusKnotGeometry(Math.random() * 0.2 + 0.05, 0.05, 20, 5);

      const color = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.15,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        speed: Math.random() * 0.5 + 0.2,
        rotSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
        floatOffset: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      geometries.push(mesh);
    }

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 2;
      camera.position.y = -targetY * 1.5 + scrollY * 3;
      camera.lookAt(0, scrollY * 2, 0);

      geometries.forEach((mesh, i) => {
        mesh.rotation.x += mesh.userData.rotSpeed.x;
        mesh.rotation.y += mesh.userData.rotSpeed.y;
        mesh.position.y += Math.sin(time * mesh.userData.speed + mesh.userData.floatOffset) * 0.003;
      });

      particles.rotation.y = time * 0.01;
      particles.rotation.x = Math.sin(time * 0.005) * 0.05;

      pointLight.position.x = Math.sin(time * 0.5) * 8;
      pointLight.position.y = Math.cos(time * 0.3) * 5;
      pointLight2.position.x = Math.cos(time * 0.4) * 7;
      pointLight2.position.y = Math.sin(time * 0.6) * 4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometries.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
}
