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
    scene.background = new THREE.Color(0x050816)

    const fogColor = 0x0a0a2e
    scene.fog = new THREE.FogExp2(fogColor, isMobile ? 0.035 : 0.025)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 80)
    camera.position.set(0, 1, 18)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    container.appendChild(renderer.domElement)

    // Ethereal lighting
    const ambient = new THREE.AmbientLight(0x222244, 0.6)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0x4488ff, 0.8)
    keyLight.position.set(2, 5, 8)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x8844ff, 0.5)
    rimLight.position.set(-4, -1, 6)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0x00ffaa, 0.2)
    fillLight.position.set(0, -3, -4)
    scene.add(fillLight)

    const glowLight = new THREE.PointLight(0x4488ff, 1.5, 25)
    glowLight.position.set(2, 3, 4)
    scene.add(glowLight)

    // Cloud-like particle layers
    function createCloudLayer(count: number, spread: number, yRange: number, zOffset: number, size: number, color: THREE.Color, opacity: number) {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      const sizes = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * yRange
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 1.5 + zOffset
        sizes[i] = size * (0.5 + Math.random() * 1)
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
      const mat = new THREE.PointsMaterial({
        color,
        size: size,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false,
      })
      return new THREE.Points(geo, mat)
    }

    const cloudLayers = [
      createCloudLayer(isMobile ? 80 : 250, 30, 10, -10, 0.25, new THREE.Color(0x4488ff), 0.08),
      createCloudLayer(isMobile ? 60 : 200, 25, 8, -5, 0.35, new THREE.Color(0x8844ff), 0.06),
      createCloudLayer(isMobile ? 100 : 300, 35, 12, -15, 0.2, new THREE.Color(0x00ffaa), 0.05),
      createCloudLayer(isMobile ? 40 : 150, 20, 5, 0, 0.4, new THREE.Color(0x6688ff), 0.07),
    ]
    cloudLayers.forEach((l) => scene.add(l))

    // Core glow sphere (center)
    const coreGeo = new THREE.SphereGeometry(1.2, 24, 24)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4488ff,
      emissive: 0x4488ff,
      emissiveIntensity: 0.3,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
      clearcoat: 0.5,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.y = 0.5
    scene.add(core)

    // Outer glow rings
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x4488ff,
      emissive: 0x4488ff,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      wireframe: true,
    })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.04, 16, 48), ringMat)
    ring1.position.y = 0.5
    ring1.rotation.x = Math.PI / 3
    scene.add(ring1)

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.03, 12, 48), ringMat.clone())
    ring2.material.color.setHex(0x8844ff)
    ring2.material.emissive.setHex(0x8844ff)
    ring2.position.y = 0.5
    ring2.rotation.x = Math.PI / 2
    ring2.rotation.z = Math.PI / 4
    scene.add(ring2)

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.02, 12, 48), ringMat.clone())
    ring3.material.color.setHex(0x00ffaa)
    ring3.material.emissive.setHex(0x00ffaa)
    ring3.material.opacity = 0.1
    ring3.position.y = 0.5
    ring3.rotation.x = Math.PI / 4
    ring3.rotation.z = Math.PI / 3
    scene.add(ring3)

    // Floating tech artifacts (like atmos has floating objects in the clouds)
    const artifacts: THREE.Mesh[] = []
    const artifactCount = isMobile ? 6 : 18
    const geoTypes = [
      () => new THREE.IcosahedronGeometry(0.12, 0),
      () => new THREE.OctahedronGeometry(0.1),
      () => new THREE.TetrahedronGeometry(0.15),
      () => new THREE.DodecahedronGeometry(0.08),
    ]
    for (let i = 0; i < artifactCount; i++) {
      const geo = geoTypes[i % geoTypes.length]()
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.5, 0.4),
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.6, 0.15),
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.5 + Math.random() * 0.3,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const angle = Math.random() * Math.PI * 2
      const dist = 2 + Math.random() * 3
      mesh.position.set(
        Math.cos(angle) * dist,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * dist
      )
      mesh.userData = {
        angle, dist,
        speed: 0.1 + Math.random() * 0.2,
        yBase: mesh.position.y,
        ySpeed: 0.2 + Math.random() * 0.4,
        yAmp: 0.1 + Math.random() * 0.2,
        rotSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
      }
      scene.add(mesh)
      artifacts.push(mesh)
    }

    // Distant floating objects (like atmos clouds / far objects)
    const distantObjects: THREE.Mesh[] = []
    const distCount = isMobile ? 4 : 12
    for (let i = 0; i < distCount; i++) {
      const geo = new THREE.SphereGeometry(0.3 + Math.random() * 0.6, 8, 8)
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.04 + Math.random() * 0.04,
        emissive: 0x4488ff,
        emissiveIntensity: 0.05,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const side = Math.random() > 0.5 ? 1 : -1
      mesh.position.set(
        side * (6 + Math.random() * 8),
        (Math.random() - 0.5) * 6,
        -8 - Math.random() * 10
      )
      mesh.userData = {
        floatSpeed: 0.1 + Math.random() * 0.2,
        floatAmp: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      }
      scene.add(mesh)
      distantObjects.push(mesh)
    }

    // Mouse tracking
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

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.006

      const cx = mouseX * 2
      const cy = -mouseY * 1.2
      camera.position.x += (cx - camera.position.x) * 0.02
      camera.position.y += (cy - camera.position.y) * 0.02
      camera.lookAt(0, 0.5, 0)

      // Scroll parallax
      cloudLayers.forEach((layer, i) => {
        layer.position.y = -scrollY * (2 + i * 0.5)
        layer.rotation.y += 0.0002 * (1 + i * 0.3)
      })

      // Fog density shifts with scroll
      const baseFog = isMobile ? 0.035 : 0.025
      scene.fog = new THREE.FogExp2(fogColor, baseFog + scrollY * 0.015)

      // Core pulse
      const pulse = 0.2 + Math.sin(time * 1.2) * 0.15
      coreMat.emissiveIntensity = pulse
      core.scale.setScalar(1 + Math.sin(time * 0.8) * 0.05)

      // Ring rotations
      ring1.rotation.z = time * 0.15
      ring1.rotation.x = Math.PI / 3 + Math.sin(time * 0.2) * 0.05
      ring2.rotation.y = time * 0.1
      ring2.rotation.x = Math.PI / 2 + Math.sin(time * 0.15) * 0.08
      ring3.rotation.z = -time * 0.08
      ring3.rotation.x = Math.PI / 4 + Math.sin(time * 0.12) * 0.06

      // Artifacts float and orbit
      artifacts.forEach((m) => {
        const d = m.userData
        d.angle += 0.005 * d.speed
        m.position.x = Math.cos(d.angle) * d.dist
        m.position.z = Math.sin(d.angle) * d.dist
        m.position.y = d.yBase + Math.sin(time * d.ySpeed + d.angle) * d.yAmp
        m.rotation.x += d.rotSpeed.x
        m.rotation.y += d.rotSpeed.y
      })

      // Distant objects drift
      distantObjects.forEach((m) => {
        const d = m.userData
        m.position.y = d.baseY + Math.sin(time * d.floatSpeed + d.phase) * d.floatAmp
      })

      // Glow light color shift
      const hue = (time * 0.01) % 1
      glowLight.color.setHSL(hue * 0.15 + 0.55, 0.6, 0.5)
      glowLight.intensity = 1.2 + Math.sin(time * 0.5) * 0.4

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
