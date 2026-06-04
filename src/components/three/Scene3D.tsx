"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createFloatingMesh(typeIndex: number): THREE.Mesh {
  const geos = [
    () => new THREE.TorusKnotGeometry(0.12, 0.05, 32, 16),
    () => new THREE.OctahedronGeometry(0.1),
    () => new THREE.DodecahedronGeometry(0.09),
    () => new THREE.TetrahedronGeometry(0.12),
    () => new THREE.IcosahedronGeometry(0.1, 0),
    () => new THREE.TorusGeometry(0.12, 0.03, 12, 24),
  ]
  const geo = geos[typeIndex % geos.length]()
  const hue = 0.45 + Math.random() * 0.3
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color().setHSL(hue, 0.6, 0.5),
    metalness: 0.3 + Math.random() * 0.4,
    roughness: 0.2 + Math.random() * 0.3,
    emissive: new THREE.Color().setHSL(hue, 0.8, 0.2),
    emissiveIntensity: randomBetween(0.1, 0.3),
    transparent: true,
    opacity: randomBetween(0.4, 0.8),
  })
  return new THREE.Mesh(geo, mat)
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050816, isMobile ? 0.025 : 0.018)

    const camera = new THREE.PerspectiveCamera(isMobile ? 60 : 70, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 16)

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

    const ambientLight = new THREE.AmbientLight(0x222244, 0.4)
    scene.add(ambientLight)

    const colorShiftLight = new THREE.PointLight(0x00e5ff, 1.5, 30)
    colorShiftLight.position.set(3, 4, 5)
    scene.add(colorShiftLight)

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.0)
    dirLight.position.set(5, 10, 5)
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight(0x7b61ff, 0.7)
    rimLight.position.set(-5, -2, 5)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0x00ff9d, 0.3)
    fillLight.position.set(0, -5, -5)
    scene.add(fillLight)

    const avatarGroup = new THREE.Group()
    avatarGroup.position.y = 0.5

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

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.03, 16, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.3,
        transparent: true, opacity: 0.5, metalness: 0.6, roughness: 0.2,
      })
    )
    ring.rotation.x = Math.PI / 3
    ring.position.y = 1.2
    avatarGroup.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.02, 12, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x7b61ff, emissive: 0x7b61ff, emissiveIntensity: 0.2,
        transparent: true, opacity: 0.3, wireframe: true,
      })
    )
    ring2.rotation.x = Math.PI / 2 + Math.PI / 4
    ring2.position.y = 1.2
    avatarGroup.add(ring2)

    scene.add(avatarGroup)

    // Floating tech objects
    const floatingMeshes: THREE.Mesh[] = []
    const floatCount = isMobile ? 10 : 30
    for (let i = 0; i < floatCount; i++) {
      const mesh = createFloatingMesh(i)
      const radius = 4 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 10,
        radius * Math.sin(phi) * Math.sin(theta) - 5
      )
      mesh.userData = {
        rotSpeed: { x: randomBetween(-0.5, 0.5), y: randomBetween(-0.5, 0.5), z: randomBetween(-0.3, 0.3) },
        floatSpeed: 0.2 + Math.random() * 0.4,
        floatAmp: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        basePos: mesh.position.clone(),
      }
      scene.add(mesh)
      floatingMeshes.push(mesh)
    }

    // Enhanced particles
    const particleCount = isMobile ? 800 : 3000
    const particleGeo = new THREE.BufferGeometry()
    const pos = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 18
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 6
      sizes[i] = 0.01 + Math.random() * 0.05
      velocities[i] = 0.1 + Math.random() * 0.3
      const c = new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.6, 0.3 + Math.random() * 0.3)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Orbiting geometries
    const orbitingMeshes: THREE.Mesh[] = []
    const orbitCount = isMobile ? 8 : 20
    for (let i = 0; i < orbitCount; i++) {
      const geo = new THREE.IcosahedronGeometry(0.06 + Math.random() * 0.12, 0)
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
        angle, radius,
        speed: 0.2 + Math.random() * 0.3,
        yOffset: mesh.position.y,
        ySpeed: 0.3 + Math.random() * 0.5,
      }
      scene.add(mesh)
      orbitingMeshes.push(mesh)
    }

    // Mouse + scroll tracking
    let mouseX = 0
    let mouseY = 0
    let scrollY = 0

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

    const handleScroll = () => {
      scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

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
      time += 0.008

      const cx = mouseX * 2.5
      const cy = -mouseY * 1.8
      const cz = scrollY * 3
      camera.position.x += (cx - camera.position.x) * 0.025
      camera.position.y += (cy - camera.position.y) * 0.025
      camera.position.z += (16 - cz - camera.position.z) * 0.02
      camera.lookAt(0, 0.5, 0)

      // Color-shift light
      const hue = (time * 0.02) % 1
      colorShiftLight.color.setHSL(hue, 0.7, 0.5)
      colorShiftLight.intensity = 1.0 + Math.sin(time * 0.5) * 0.5

      // Volumetric fog pulse
      const fogDensity = (isMobile ? 0.025 : 0.018) + Math.sin(time * 0.3) * 0.003
      scene.fog = new THREE.FogExp2(0x050816, fogDensity)

      // Avatar
      avatarGroup.position.y = 0.5 + Math.sin(time * 0.5) * 0.15
      avatarGroup.rotation.y = time * 0.15
      head.position.y = 1.8 + Math.sin(time * 0.7 + 0.5) * 0.08
      ring.rotation.z = time * 0.3
      ring2.rotation.x = Math.PI / 2 + Math.sin(time * 0.4) * 0.2
      ring2.rotation.y = time * 0.2

      const pulse = 0.1 + Math.sin(time * 2) * 0.05
      headMat.emissiveIntensity = pulse
      torsoMat.emissiveIntensity = pulse * 0.6

      // Float meshes
      floatingMeshes.forEach((mesh) => {
        const d = mesh.userData
        mesh.rotation.x += d.rotSpeed.x * 0.01
        mesh.rotation.y += d.rotSpeed.y * 0.01
        mesh.rotation.z += d.rotSpeed.z * 0.01
        mesh.position.y = d.basePos.y + Math.sin(time * d.floatSpeed + d.phase) * d.floatAmp
      })

      // Orbit
      orbitingMeshes.forEach((mesh) => {
        const d = mesh.userData
        d.angle += 0.01 * d.speed
        mesh.position.x = Math.cos(d.angle) * d.radius
        mesh.position.z = Math.sin(d.angle) * d.radius
        mesh.position.y = d.yOffset + Math.sin(time * d.ySpeed + d.angle) * 0.3
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.03
      })

      // Particles
      particles.rotation.y += 0.0003
      particles.rotation.x += 0.0001

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("touchmove", handleMouse)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
