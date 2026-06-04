"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Compass, Layers } from "lucide-react"
import * as THREE from "three"

export function ExploreSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [layer, setLayer] = useState(0)
  const layers = ["Core", "Clouds", "Stars"]

  useEffect(() => {
    if (!active || !containerRef.current) return
    const container = containerRef.current
    const isMobile = window.innerWidth < 768
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050816)

    const w = container.clientWidth
    const h = container.clientHeight
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 50)
    camera.position.set(0, 1.5, 6)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0x222244, 0.5)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(3, 5, 5)
    scene.add(dir)
    const rim = new THREE.DirectionalLight(0x8844ff, 0.6)
    rim.position.set(-3, -1, 4)
    scene.add(rim)

    // Ground plane with grid
    const grid = new THREE.GridHelper(8, 16, 0x00e5ff, 0x7b61ff)
    grid.position.y = -0.8
    grid.material.transparent = true
    grid.material.opacity = 0.2
    scene.add(grid)

    // Central island/platform
    const platGeo = new THREE.CylinderGeometry(1.2, 1.5, 0.3, 24)
    const platMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a3e,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x222255,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8,
    })
    const platform = new THREE.Mesh(platGeo, platMat)
    platform.position.y = -0.65
    scene.add(platform)

    // Core crystal on platform
    const crystalGeo = new THREE.OctahedronGeometry(0.4, 0)
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      metalness: 0.3,
      roughness: 0.1,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
      clearcoat: 1,
    })
    const crystal = new THREE.Mesh(crystalGeo, crystalMat)
    crystal.position.y = -0.3
    scene.add(crystal)

    // Inner ring around crystal
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.02, 8, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x7b61ff,
        emissive: 0x7b61ff,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.5,
      })
    )
    innerRing.position.y = -0.2
    innerRing.rotation.x = Math.PI / 3
    scene.add(innerRing)

    // Floating around the platform
    const orbiters: THREE.Mesh[] = []
    const orbCount = isMobile ? 6 : 14
    const orbGeoTypes = [
      () => new THREE.TetrahedronGeometry(0.08),
      () => new THREE.IcosahedronGeometry(0.07, 0),
      () => new THREE.OctahedronGeometry(0.07),
      () => new THREE.DodecahedronGeometry(0.06),
    ]
    for (let i = 0; i < orbCount; i++) {
      const geo = orbGeoTypes[i % orbGeoTypes.length]()
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.5 + Math.random() * 0.3, 0.6, 0.5),
        emissive: new THREE.Color().setHSL(0.5 + Math.random() * 0.3, 0.7, 0.2),
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.3,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const angle = (i / orbCount) * Math.PI * 2
      const dist = 1.0 + Math.random() * 0.5
      mesh.position.set(
        Math.cos(angle) * dist,
        -0.3 + Math.random() * 0.8,
        Math.sin(angle) * dist
      )
      mesh.userData = {
        angle, dist,
        speed: 0.3 + Math.random() * 0.3,
        yBase: mesh.position.y,
        ySpeed: 0.4 + Math.random() * 0.4,
        yAmp: 0.05 + Math.random() * 0.1,
        rotX: (Math.random() - 0.5) * 0.03,
        rotY: (Math.random() - 0.5) * 0.03,
      }
      scene.add(mesh)
      orbiters.push(mesh)
    }

    // Scattered terrain objects (small spikes around)
    const terrain: THREE.Mesh[] = []
    for (let i = 0; i < 30; i++) {
      const geo = new THREE.ConeGeometry(0.03 + Math.random() * 0.06, 0.05 + Math.random() * 0.15, 4)
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x334466,
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0.4,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const angle = Math.random() * Math.PI * 2
      const dist = 1.6 + Math.random() * 1.2
      mesh.position.set(
        Math.cos(angle) * dist,
        -0.7,
        Math.sin(angle) * dist
      )
      mesh.rotation.set(Math.random() * 0.2, Math.random() * Math.PI * 2, Math.random() * 0.2)
      scene.add(mesh)
      terrain.push(mesh)
    }

    // Layer 2: Cloud particles (above)
    const cloudParticles = new THREE.BufferGeometry()
    const cpCount = isMobile ? 40 : 120
    const cpPos = new Float32Array(cpCount * 3)
    for (let i = 0; i < cpCount; i++) {
      cpPos[i * 3] = (Math.random() - 0.5) * 6
      cpPos[i * 3 + 1] = 0.3 + Math.random() * 1.5
      cpPos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    cloudParticles.setAttribute("position", new THREE.BufferAttribute(cpPos, 3))
    const cpMat = new THREE.PointsMaterial({
      color: 0x8888ff,
      size: 0.04,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    })
    const cpMesh = new THREE.Points(cloudParticles, cpMat)
    scene.add(cpMesh)

    // Layer 3: Stars (distant)
    const stars = new THREE.BufferGeometry()
    const starCount = isMobile ? 50 : 200
    const sPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 20
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 10 + 2
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    stars.setAttribute("position", new THREE.BufferAttribute(sPos, 3))
    const sMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })
    const starMesh = new THREE.Points(stars, sMat)
    scene.add(starMesh)

    // Mouse
    let mx = 0, my = 0
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        const r = container.getBoundingClientRect()
        mx = ((e.touches[0].clientX - r.left) / r.width) * 2 - 1
        my = -((e.touches[0].clientY - r.top) / r.height) * 2 + 1
      } else {
        const r = container.getBoundingClientRect()
        mx = ((e.clientX - r.left) / r.width) * 2 - 1
        my = -((e.clientY - r.top) / r.height) * 2 + 1
      }
    }
    renderer.domElement.addEventListener("mousemove", handleMove)
    renderer.domElement.addEventListener("touchmove", handleMove, { passive: true })

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      const tx = mx * 1.5
      const ty = my * 0.8
      camera.position.x += (tx - camera.position.x) * 0.04
      camera.position.y += (1.5 + ty - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      crystal.rotation.y = time * 0.3
      crystal.rotation.x = Math.sin(time * 0.2) * 0.1
      crystalMat.emissiveIntensity = 0.2 + Math.sin(time * 1.5) * 0.15

      innerRing.rotation.z = time * 0.2
      innerRing.rotation.y = time * 0.1

      orbiters.forEach((m) => {
        const d = m.userData
        d.angle += 0.01 * d.speed
        m.position.x = Math.cos(d.angle) * d.dist
        m.position.z = Math.sin(d.angle) * d.dist
        m.position.y = d.yBase + Math.sin(time * d.ySpeed + d.angle) * d.yAmp
        m.rotation.x += d.rotX
        m.rotation.y += d.rotY
      })

      cpMesh.rotation.y += 0.001
      starMesh.rotation.y += 0.0003

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      renderer.domElement.removeEventListener("mousemove", handleMove)
      renderer.domElement.removeEventListener("touchmove", handleMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [active])

  return (
    <section id="explore" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <Badge variant="premium" className="mb-4">
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              3D Explorer
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Mini Universe</span>
            </h2>
            <p className="mt-4 text-white/50 text-sm max-w-lg mx-auto">
              A tiny 3D world to explore. Move your mouse or finger to look around.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {!active ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <Compass className="w-10 h-10 text-white/20" />
              <p className="text-white/30 text-sm">Click to enter the mini universe</p>
              <button
                onClick={() => setActive(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
              >
                <Layers className="w-4 h-4" />
                Explore
              </button>
            </div>
          ) : (
            <div className="relative rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div ref={containerRef} className="w-full h-[400px] sm:h-[500px]" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                {layers.map((name, i) => (
                  <button
                    key={name}
                    onClick={() => setLayer(i)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono border transition-all duration-300 ${
                      layer === i
                        ? "border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]"
                        : "border-white/10 bg-white/[0.03] text-white/30"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActive(false)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 text-xs transition-all duration-300"
              >
                Exit
              </button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
