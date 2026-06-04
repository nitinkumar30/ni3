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
    scene.fog = new THREE.FogExp2(0x050816, isMobile ? 0.025 : 0.018)

    const camera = new THREE.PerspectiveCamera(isMobile ? 65 : 75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = isMobile ? 20 : 18

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222244, 0.4)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 0.8)
    dirLight.position.set(5, 10, 5)
    scene.add(dirLight)

    const pointLight1 = new THREE.PointLight(0x7b61ff, isMobile ? 1 : 1.5, 30)
    pointLight1.position.set(-5, 3, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x00ff9d, isMobile ? 0.8 : 1.2, 30)
    pointLight2.position.set(5, -3, 5)
    scene.add(pointLight2)

    // Geometries
    const geometries: THREE.Mesh[] = []
    const count = isMobile ? 20 : 50
    for (let i = 0; i < count; i++) {
      const size = 0.1 + Math.random() * 0.4
      const s = size
      const shapeFactories = [
        () => new THREE.BoxGeometry(s, s, s),
        () => new THREE.SphereGeometry(s / 2, 8, 8),
        () => new THREE.TorusGeometry(s / 2, s * 0.3, 8, 12),
        () => new THREE.IcosahedronGeometry(s / 2, 0),
        () => new THREE.OctahedronGeometry(s / 2, 0),
        () => new THREE.DodecahedronGeometry(s / 2, 0),
        () => new THREE.TorusKnotGeometry(s / 2, s * 0.25, 32, 8),
        () => new THREE.ConeGeometry(s / 2, s, 8),
      ]
      const geometry = shapeFactories[Math.floor(Math.random() * shapeFactories.length)]()
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.6 + 0.5, 0.6, 0.5),
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.4,
        wireframe: Math.random() > 0.5,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 5
      )
      mesh.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.5,
      }
      scene.add(mesh)
      geometries.push(mesh)
    }

    // Particles
    const particleCount = isMobile ? 800 : 3000
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      const color = new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.8, 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.03 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
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

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      geometries.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeed.x
        mesh.rotation.y += mesh.userData.rotSpeed.y
        mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.002
      })

      particleSystem.rotation.y += 0.0003

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("touchmove", handleMouse)
      window.removeEventListener("resize", handleResize)
      geometries.forEach((m) => {
        m.geometry.dispose()
        ;(m.material as THREE.Material).dispose()
      })
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
