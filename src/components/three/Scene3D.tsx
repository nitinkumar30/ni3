"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050816, isMobile ? 0.022 : 0.016)

    const camera = new THREE.PerspectiveCamera(isMobile ? 60 : 70, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 16

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222244, 0.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.2)
    dirLight.position.set(5, 10, 5)
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight(0x7b61ff, 0.8)
    rimLight.position.set(-5, -2, 5)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0x00ff9d, 0.4)
    fillLight.position.set(0, -5, -5)
    scene.add(fillLight)

    const pointLight = new THREE.PointLight(0x00e5ff, 2, 20)
    pointLight.position.set(0, 3, 4)
    scene.add(pointLight)

    // Avatar body — floating central figure
    const avatarGroup = new THREE.Group()
    avatarGroup.position.y = 0.5

    // Core sphere (head)
    const headGeo = new THREE.IcosahedronGeometry(0.8, 1)
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      metalness: 0.4,
      roughness: 0.2,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.85,
    })
    const head = new THREE.Mesh(headGeo, headMat)
    head.position.y = 1.8
    avatarGroup.add(head)

    // Torso
    const torsoMat = new THREE.MeshPhysicalMaterial({
      color: 0x7b61ff,
      metalness: 0.3,
      roughness: 0.3,
      emissive: 0x7b61ff,
      emissiveIntensity: 0.1,
      clearcoat: 0.5,
      transparent: true,
      opacity: 0.7,
    })
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.0, 1.8, 8), torsoMat)
    torso.position.y = 0.5
    avatarGroup.add(torso)

    // Ring around the avatar — wireframe orbit
    const ringGeo = new THREE.TorusGeometry(1.6, 0.03, 16, 48)
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.5,
      metalness: 0.6,
      roughness: 0.2,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3
    ring.position.y = 1.2
    avatarGroup.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.02, 12, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x7b61ff,
        emissive: 0x7b61ff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      })
    )
    ring2.rotation.x = Math.PI / 2
    ring2.rotation.z = Math.PI / 4
    ring2.position.y = 1.2
    avatarGroup.add(ring2)

    scene.add(avatarGroup)

    // Floating particles — improved with size variation
    const particleCount = isMobile ? 600 : 2000
    const particleGeo = new THREE.BufferGeometry()
    const pos = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 5

      sizes[i] = 0.02 + Math.random() * 0.06

      const c = new THREE.Color().setHSL(0.52 + Math.random() * 0.15, 0.7, 0.4 + Math.random() * 0.3)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Orbiting geometries
    const orbitingMeshes: THREE.Mesh[] = []
    const orbitCount = isMobile ? 8 : 20
    for (let i = 0; i < orbitCount; i++) {
      const geo = new THREE.IcosahedronGeometry(0.08 + Math.random() * 0.15, 0)
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.7, 0.5),
        metalness: 0.5,
        roughness: 0.3,
        emissive: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.3),
        emissiveIntensity: 0.2,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const angle = (i / orbitCount) * Math.PI * 2
      const radius = 2.5 + Math.random() * 1.5
      mesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius)
      mesh.userData = {
        angle,
        radius,
        speed: 0.2 + Math.random() * 0.3,
        yOffset: mesh.position.y,
        ySpeed: 0.3 + Math.random() * 0.5,
      }
      scene.add(mesh)
      orbitingMeshes.push(mesh)
    }

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    const targetX = 0
    const targetY = 0

    const handleMouse = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
      } else {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("touchmove", handleMouse, { passive: true })

    // Resize
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Smooth camera follow
      const cx = mouseX * 2.5
      const cy = -mouseY * 1.8
      camera.position.x += (cx - camera.position.x) * 0.03
      camera.position.y += (cy - camera.position.y) * 0.03
      camera.lookAt(0, 0.5, 0)

      // Avatar floating and rotation
      avatarGroup.position.y = 0.5 + Math.sin(time * 0.5) * 0.15
      avatarGroup.rotation.y = time * 0.15
      head.position.y = 1.8 + Math.sin(time * 0.7 + 0.5) * 0.08
      ring.rotation.z = time * 0.3
      ring2.rotation.x = Math.PI / 2 + Math.sin(time * 0.4) * 0.2
      ring2.rotation.y = time * 0.2

      // Pulse emissive
      const pulse = 0.1 + Math.sin(time * 2) * 0.05
      headMat.emissiveIntensity = pulse
      torsoMat.emissiveIntensity = pulse * 0.6

      // Orbit meshes
      orbitingMeshes.forEach((mesh) => {
        const data = mesh.userData
        data.angle += 0.01 * data.speed
        mesh.position.x = Math.cos(data.angle) * data.radius
        mesh.position.z = Math.sin(data.angle) * data.radius
        mesh.position.y = data.yOffset + Math.sin(time * data.ySpeed + data.angle) * 0.3
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.03
      })

      // Slow particle rotation
      particles.rotation.y += 0.0005
      particles.rotation.x += 0.0002

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("touchmove", handleMouse)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
