"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const isTouch = "ontouchstart" in window;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, isMobile ? 0.025 : 0.02);

    const camera = new THREE.PerspectiveCamera(isMobile ? 65 : 75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = isMobile ? 18 : 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x7b61ff, isMobile ? 1.5 : 2, 30);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ff9d, isMobile ? 1 : 1.5, 30);
    pointLight2.position.set(5, -3, 5);
    scene.add(pointLight2);

    const geometries: THREE.Mesh[] = [];
    const colors = [0x00e5ff, 0x7b61ff, 0x00ff9d];
    const count = isMobile ? 15 : 40;

    for (let i = 0; i < count; i++) {
      const type = Math.floor(Math.random() * 3);
      let geo: THREE.BufferGeometry;
      if (type === 0) geo = new THREE.IcosahedronGeometry(Math.random() * (isMobile ? 0.3 : 0.4) + 0.1, 0);
      else if (type === 1) geo = new THREE.OctahedronGeometry(Math.random() * (isMobile ? 0.3 : 0.4) + 0.1);
      else geo = new THREE.TorusKnotGeometry(Math.random() * 0.15 + 0.05, 0.04, 12, 4);

      const color = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: isMobile ? 0.2 : 0.15,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.3,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * (isMobile ? 20 : 30),
        (Math.random() - 0.5) * (isMobile ? 20 : 30),
        (Math.random() - 0.5) * 15 - 5
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

    const particleCount = isMobile ? 500 : 2000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * (isMobile ? 40 : 60);
      positions[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 30 : 40);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 10;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: isMobile ? 0.08 : 0.05,
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

    const handlePointer = (x: number, y: number) => {
      mouseX = (x / window.innerWidth) * 2 - 1;
      mouseY = -(y / window.innerHeight) * 2 + 1;
    };

    const handleMouse = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) handlePointer(t.clientX, t.clientY);
    };

    const handleScroll = () => {
      scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    if (!isTouch) window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });
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

      targetX += (mouseX - targetX) * (isTouch ? 0.02 : 0.05);
      targetY += (mouseY - targetY) * (isTouch ? 0.02 : 0.05);

      camera.position.x = targetX * 2;
      camera.position.y = -targetY * 1.5 + scrollY * 3;
      camera.lookAt(0, scrollY * 2, 0);

      geometries.forEach((mesh) => {
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
      if (!isTouch) window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
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
