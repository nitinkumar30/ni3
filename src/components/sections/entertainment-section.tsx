"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Play, RotateCcw, MousePointer2 } from "lucide-react"
import * as THREE from "three"

function createToyGeometry(index: number): THREE.Mesh {
  const types = [
    () => new THREE.BoxGeometry(0.3, 0.3, 0.3),
    () => new THREE.SphereGeometry(0.2, 12, 12),
    () => new THREE.ConeGeometry(0.2, 0.4, 8),
    () => new THREE.TorusGeometry(0.2, 0.06, 8, 16),
    () => new THREE.TetrahedronGeometry(0.25),
    () => new THREE.OctahedronGeometry(0.22),
    () => new THREE.DodecahedronGeometry(0.18),
    () => new THREE.TorusKnotGeometry(0.18, 0.06, 24, 8),
    () => new THREE.CylinderGeometry(0.15, 0.25, 0.3, 8),
    () => new THREE.IcosahedronGeometry(0.2, 0),
  ]
  const geo = types[index % types.length]()
  const hue = Math.random()
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color().setHSL(hue, 0.7, 0.5),
    metalness: 0.4,
    roughness: 0.3,
    emissive: new THREE.Color().setHSL(hue, 0.8, 0.2),
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.9,
  })
  return new THREE.Mesh(geo, mat)
}

export function EntertainmentSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [interaction, setInteraction] = useState("")

  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return

    const canvas = canvasRef.current
    const isMobile = window.innerWidth < 768
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050816)

    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 50)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    const ambientLight = new THREE.AmbientLight(0x444466, 0.6)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
    dirLight.position.set(3, 5, 5)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0x00e5ff, 1, 15)
    pointLight.position.set(0, 2, 3)
    scene.add(pointLight)

    // Grid floor
    const gridHelper = new THREE.GridHelper(8, 20, 0x00e5ff, 0x7b61ff)
    gridHelper.position.y = -1.5
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.3
    scene.add(gridHelper)

    // Toys
    const toys: THREE.Mesh[] = []
    const toyCount = isMobile ? 8 : 18
    for (let i = 0; i < toyCount; i++) {
      const mesh = createToyGeometry(i)
      const radius = 1 + Math.random() * 2.5
      const angle = (i / toyCount) * Math.PI * 2
      mesh.position.set(
        Math.cos(angle + Math.random() * 0.5) * radius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle + Math.random() * 0.5) * radius - 0.5,
      )
      mesh.userData = {
        rotX: 0.01 + Math.random() * 0.03,
        rotY: 0.01 + Math.random() * 0.03,
        rotZ: 0.005 + Math.random() * 0.02,
        floatAmp: 0.1 + Math.random() * 0.2,
        floatSpeed: 0.5 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      }
      scene.add(mesh)
      toys.push(mesh)
    }

    // Mouse
    let mouseX = 0
    let mouseY = 0
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        const rect = canvas.getBoundingClientRect()
        mouseX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1
        mouseY = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1
      } else {
        const rect = canvas.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }
    }
    canvas.addEventListener("mousemove", handleMove)
    canvas.addEventListener("touchmove", handleMove, { passive: true })

    const handleResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    let time = 0
    let clickImpulse = 0
    const handleClick = () => { clickImpulse = 1 }
    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("touchstart", handleClick, { passive: true })

    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.02

      const targetX = mouseX * 0.8
      const targetY = -mouseY * 0.5
      camera.position.x += (targetX - camera.position.x) * 0.05
      camera.position.y += (targetY - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      toys.forEach((toy) => {
        const d = toy.userData
        toy.rotation.x += d.rotX
        toy.rotation.y += d.rotY
        toy.rotation.z += d.rotZ
        toy.position.y = d.baseY + Math.sin(time * d.floatSpeed + d.phase) * d.floatAmp
        const bounce = clickImpulse > 0 ? Math.sin(time * 20) * 0.2 : 0
        toy.position.y += bounce * (1 - Math.abs(toy.position.x) / 3)
      })

      if (clickImpulse > 0) clickImpulse *= 0.95
      if (clickImpulse < 0.01) clickImpulse = 0

      pointLight.intensity = 1 + Math.sin(time * 0.5) * 0.3
      pointLight.color.setHSL((time * 0.02) % 1, 0.7, 0.5)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMove)
      canvas.removeEventListener("touchmove", handleMove)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("touchstart", handleClick)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [isPlaying])

  return (
    <section id="entertainment" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <Badge variant="premium" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              3D Playground
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Interactive Sandbox</span>
            </h2>
            <p className="mt-4 text-white/50 text-sm max-w-lg mx-auto">
              Click around and watch the shapes bounce — a tiny 3D playground inside the portfolio.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {!isPlaying ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <MousePointer2 className="w-8 h-8 text-white/20" />
                <p className="text-white/30 text-sm">Click to activate the 3D playground</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  Launch Sandbox
                </button>
              </div>
            ) : (
              <div className="relative">
                <canvas ref={canvasRef} className="w-full h-[400px] sm:h-[500px]" />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                {interaction && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-3 left-3 text-xs text-white/20 font-mono"
                  >
                    {interaction}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
