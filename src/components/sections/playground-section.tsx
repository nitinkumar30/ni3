"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Play, X, RotateCcw, MousePointerClick, Lightbulb } from "lucide-react"
import * as THREE from "three"

const TECH_FACTS = [
  { fact: "Python was created by Guido van Rossum in 1991", color: "#00E5FF", label: "Python" },
  { fact: "The first AI program was written in 1951", color: "#7B61FF", label: "AI" },
  { fact: "GitHub was launched in 2008", color: "#00FF9D", label: "GitHub" },
  { fact: "The first computer virus was created in 1983", color: "#FF4D4D", label: "Cyber Security" },
  { fact: "Selenium was created by Jason Huggins in 2004", color: "#FFB347", label: "Automation" },
  { fact: "The term 'bug' was first used in 1947", color: "#FF6B9D", label: "Debugging" },
  { fact: "The first website went live in 1991", color: "#45E6FF", label: "Web" },
  { fact: "Python is named after Monty Python", color: "#00E5FF", label: "Python" },
  { fact: "The first 1GB hard drive weighed 500 lbs in 1980", color: "#A78BFA", label: "Hardware" },
] as const

interface ClickableObj {
  mesh: THREE.Mesh
  data: { fact: string; color: string; label: string }
  originalScale: THREE.Vector3
  originalColor: string
}

export function PlaygroundSection() {
  const [isActive, setIsActive] = useState(false)
  const [tooltip, setTooltip] = useState<{ fact: string; color: string; label: string; x: number; y: number } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const mobile = isMobile
    const el = containerRef.current
    const w = el.clientWidth
    const h = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(mobile ? 5 : 7, mobile ? 2 : 2.5, mobile ? 5 : 7)
    camera.lookAt(0, 0, 0)

    const pivot = new THREE.Group()
    scene.add(pivot)

    const ambient = new THREE.AmbientLight(0x222244, 0.5)
    scene.add(ambient)
    const dirLight = new THREE.DirectionalLight(0x00e5ff, 2)
    dirLight.position.set(5, 10, 5); dirLight.castShadow = true; dirLight.shadow.mapSize.set(1024, 1024)
    scene.add(dirLight)
    const fill = new THREE.DirectionalLight(0x7b61ff, 0.8); fill.position.set(-5, 3, -5); scene.add(fill)
    const rim = new THREE.DirectionalLight(0x00ff9d, 0.5); rim.position.set(0, -3, 8); scene.add(rim)

    const grid = new THREE.GridHelper(14, 20, 0x00e5ff, 0x7b61ff)
    grid.position.y = -1.5; (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.3
    pivot.add(grid)

    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, transparent: true, opacity: 0.6, roughness: 0.8, metalness: 0.2 })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), floorMat)
    floor.rotation.x = -Math.PI / 2; floor.position.y = -1.5; floor.receiveShadow = true
    pivot.add(floor)

    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.1, side: THREE.DoubleSide })
    const ring = new THREE.Mesh(new THREE.RingGeometry(3, 3.5, 64), ringMat)
    ring.rotation.x = -Math.PI / 2; ring.position.y = -1.45
    pivot.add(ring)

    const bDefs = [
      { label: "Python", color: "#00E5FF", x: -2.5, z: -1.5, w: 1.2, h: 1.8, d: 1.2 },
      { label: "AI", color: "#7B61FF", x: 2.5, z: -1.5, w: 1.4, h: 2.4, d: 1.4 },
      { label: "GitHub", color: "#00FF9D", x: -2, z: 2, w: 1.3, h: 1.8, d: 1.3 },
      { label: "Cyber Security", color: "#FF4D4D", x: 2, z: 2, w: 1.1, h: 2.2, d: 1.1 },
      { label: "Automation", color: "#FFB347", x: 0, z: -2.8, w: 1.5, h: 1.6, d: 1.5 },
    ]
    const objects: ClickableObj[] = []

    bDefs.forEach((def, idx) => {
      const geo = new THREE.BoxGeometry(def.w, def.h, def.d)
      const mat = new THREE.MeshStandardMaterial({ color: def.color, emissive: def.color, emissiveIntensity: 0.15, roughness: 0.3, metalness: 0.4, transparent: true, opacity: 0.9 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(def.x, -1.5 + def.h / 2, def.z)
      mesh.castShadow = true; mesh.receiveShadow = true
      pivot.add(mesh)

      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.3 }))
      wire.position.copy(mesh.position)
      pivot.add(wire)

      if (!mobile) {
        const roof = new THREE.Mesh(new THREE.ConeGeometry(def.w * 0.6, 0.4, 4), new THREE.MeshStandardMaterial({ color: def.color, emissive: def.color, emissiveIntensity: 0.2, transparent: true, opacity: 0.6 }))
        roof.position.set(def.x, -1.5 + def.h + 0.2, def.z)
        pivot.add(roof)
      }

      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6), new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.5 }))
      pillar.position.set(def.x, -1.5 + def.h + 0.6, def.z)
      pivot.add(pillar)
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: def.color }))
      orb.position.set(def.x, -1.5 + def.h + 0.8, def.z)
      pivot.add(orb)

      objects.push({ mesh, data: { fact: TECH_FACTS[idx % TECH_FACTS.length].fact, color: def.color, label: def.label }, originalScale: new THREE.Vector3(1, 1, 1), originalColor: def.color })
    })

    const cMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.4, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.85 })
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), cMat)
    crystal.position.set(0, 0.5, 0); crystal.castShadow = true
    pivot.add(crystal)

    const glowMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.15, wireframe: true })
    const glow = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 0), glowMat)
    glow.position.set(0, 0.5, 0)
    pivot.add(glow)

    const nPos = [
      { x: -4, y: 1, z: -3 }, { x: 3.5, y: 2, z: -3.5 }, { x: -3.5, y: 1.5, z: 3.5 },
      { x: 4, y: 1.8, z: 3 }, { x: 0, y: 3.5, z: 0 }, { x: -3, y: 2.5, z: -1 }, { x: 3, y: 2.2, z: 1 },
    ]
    const nCols = [0x00e5ff, 0x7b61ff, 0x00ff9d, 0xff4d4d, 0xffb347, 0xff6b9d, 0x45e6ff]
    const nodes: { mesh: THREE.Mesh; baseY: number }[] = []

    nPos.forEach((pos, i) => {
      const nodeMat = new THREE.MeshStandardMaterial({ color: nCols[i], emissive: nCols[i], emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.1 })
      const node = new THREE.Mesh(new THREE.SphereGeometry(mobile ? 0.1 : 0.14, 12, 12), nodeMat)
      node.position.set(pos.x, pos.y, pos.z)
      pivot.add(node)
      nodes.push({ mesh: node, baseY: pos.y })

      const halo = new THREE.Mesh(new THREE.SphereGeometry((mobile ? 0.1 : 0.14) * 1.8, 8, 8), new THREE.MeshBasicMaterial({ color: nCols[i], transparent: true, opacity: 0.1 }))
      halo.position.copy(node.position)
      pivot.add(halo)
    })

    const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.08 })
    for (let i = 0; i < nPos.length - 1; i += 2) {
      const pts = [new THREE.Vector3(nPos[i].x, nPos[i].y, nPos[i].z), new THREE.Vector3(nPos[i + 1].x, nPos[i + 1].y, nPos[i + 1].z)]
      pivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat))
    }

    const pCount = mobile ? 200 : 500
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pCol = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20; pPos[i * 3 + 1] = (Math.random() - 0.5) * 12 + 2; pPos[i * 3 + 2] = (Math.random() - 0.5) * 20
      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.25, 0.8, 0.5)
      pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3))

    const pCanvas = document.createElement("canvas"); pCanvas.width = 32; pCanvas.height = 32
    const pCtx = pCanvas.getContext("2d")!
    const pg = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
    pg.addColorStop(0, "rgba(255,255,255,1)"); pg.addColorStop(0.3, "rgba(255,255,255,0.6)"); pg.addColorStop(1, "rgba(255,255,255,0)")
    pCtx.fillStyle = pg; pCtx.fillRect(0, 0, 32, 32)
    const particleTex = new THREE.CanvasTexture(pCanvas)
    const pMat = new THREE.PointsMaterial({ size: 0.08, map: particleTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6, vertexColors: true })
    const particles = new THREE.Points(pGeo, pMat)
    pivot.add(particles)

    // Character sprite
    let charSprite: THREE.Sprite | null = null
    new THREE.TextureLoader().load("/images/20260603_220709-IMG_STYLE.jpg", (tex) => {
      const c = document.createElement("canvas")
      const cx = c.getContext("2d")!
      c.width = tex.image.width
      c.height = tex.image.height
      cx.drawImage(tex.image, 0, 0)
      const id = cx.getImageData(0, 0, c.width, c.height)
      const d = id.data
      const sr = d[0], sg = d[1], sb = d[2]
      const threshold = 45
      for (let i = 0; i < d.length; i += 4) {
        const dr = d[i] - sr, dg = d[i + 1] - sg, db = d[i + 2] - sb
        if (Math.sqrt(dr * dr + dg * dg + db * db) < threshold) d[i + 3] = 0
      }
      cx.putImageData(id, 0, 0)
      const ct = new THREE.CanvasTexture(c)
      const mat = new THREE.SpriteMaterial({ map: ct, transparent: true, depthTest: true, depthWrite: false })
      charSprite = new THREE.Sprite(mat)
      charSprite.position.set(3.5, -0.5, 2.5)
      const aspect = c.width / c.height
      charSprite.scale.set(1.8 * aspect, 1.8, 1)
      pivot.add(charSprite)
    })

    // animation state
    const rot = { current: 0, target: 0 }
    let animTime = 0
    let animId = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      animTime += 0.02

      rot.current += (rot.target - rot.current) * 0.06
      pivot.rotation.y = rot.current

      const pulse = 1 + Math.sin(animTime * 1.5) * 0.08
      crystal.scale.set(pulse, pulse, pulse)
      crystal.rotation.x += 0.005; crystal.rotation.y += 0.01
      glow.rotation.x = crystal.rotation.x; glow.rotation.y = crystal.rotation.y
      glow.scale.set(pulse * 1.1, pulse * 1.1, pulse * 1.1)
      cMat.emissiveIntensity = 0.3 + Math.sin(animTime * 1.5) * 0.15

      nodes.forEach((nd, i) => {
        nd.mesh.position.y = nd.baseY + Math.sin(animTime * 0.8 + i * 1.2) * 0.3
        nd.mesh.rotation.x += 0.01; nd.mesh.rotation.y += 0.02
      })

      objects.forEach((obj) => {
        if (obj.mesh.scale.x > 1.01) { obj.mesh.scale.lerp(obj.originalScale, 0.06) }
        else { obj.mesh.scale.copy(obj.originalScale) }
        const m = obj.mesh.material as THREE.MeshStandardMaterial
        if (m.emissiveIntensity > 0.15) m.emissiveIntensity += (0.15 - m.emissiveIntensity) * 0.04
        const target = new THREE.Color(obj.originalColor)
        if (m.color.getHex() !== target.getHex()) m.color.lerp(target, 0.04)
      })

      const pa = pGeo.attributes.position as THREE.BufferAttribute
      const arr = pa.array as Float32Array
      for (let i = 0; i < pCount; i++) {
        arr[i * 3 + 1] += Math.sin(animTime + i) * 0.001
        arr[i * 3] += Math.cos(animTime * 0.5 + i * 0.5) * 0.001
      }
      pa.needsUpdate = true

      renderer.render(scene, camera)
    }
    animId = requestAnimationFrame(animate)

    // raycaster interaction
    let dragging = false
    let prevX = 0
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    const onDown = (e: PointerEvent) => { dragging = true; prevX = e.clientX }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      rot.target += (e.clientX - prevX) * 0.008
      prevX = e.clientX
    }
    const onUp = (e: PointerEvent) => {
      const wasDrag = Math.abs(e.clientX - prevX) > 3
      if (!wasDrag) {
        const rect = el.getBoundingClientRect()
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(pointer, camera)
        const hits = raycaster.intersectObjects(objects.map((o) => o.mesh))
        if (hits.length) {
          const hitMesh = hits[0].object as THREE.Mesh
          const obj = objects.find((o) => o.mesh === hitMesh)
          if (obj) {
            obj.mesh.scale.set(1.4, 1.4, 1.4)
            const m = obj.mesh.material as THREE.MeshStandardMaterial
            m.emissiveIntensity = 1.0; m.color.set("#ffffff")
            const rect2 = el.getBoundingClientRect()
            setTooltip({ ...obj.data, x: e.clientX - rect2.left, y: e.clientY - rect2.top - 20 })
            setTimeout(() => setTooltip(null), 3500)
          }
        }
      }
      dragging = false
    }

    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)

    return () => {
      cancelAnimationFrame(animId)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.LineSegments || child instanceof THREE.Points || child instanceof THREE.Sprite) {
          child.geometry?.dispose()
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose())
          else child.material?.dispose()
        }
      })
      if (charSprite) {
        pivot.remove(charSprite)
        charSprite.material?.dispose()
        if (charSprite.material && "map" in charSprite.material) {
          ;(charSprite.material as THREE.SpriteMaterial).map?.dispose()
        }
      }
    }
  }, [isActive, isMobile])

  if (!isActive) {
    return (
      <section id="playground" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge variant="premium" className="mb-4">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Digital Playground
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-gradient">Explore the Digital Realm</span>
              </h2>
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                An interactive 3D world — click objects to discover tech history
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsActive(true)}
                className="group relative px-8 py-4 rounded-xl font-semibold text-sm overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 via-[#7B61FF]/20 to-[#00FF9D]/20 border border-white/10 rounded-xl" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 via-transparent to-[#00FF9D]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <span className="relative flex items-center gap-3">
                  <Play className="w-5 h-5 text-[#00E5FF]" />
                  <span className="text-white/80">Enter Playground</span>
                </span>
              </motion.button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex justify-center gap-6 mt-8 flex-wrap">
              {["Python", "AI", "GitHub", "Cyber Security", "Automation"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ["#00E5FF", "#7B61FF", "#00FF9D", "#FF4D4D", "#FFB347"][i] }} />
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  return (
    <section id="playground" className="fixed inset-0 z-50 bg-[#05050A]">
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="premium" className="text-[10px]">
            <Sparkles className="w-3 h-3 mr-1" />
            Digital Playground
          </Badge>
          <span className="text-[10px] text-white/20 hidden sm:inline">Drag to rotate · Click to discover</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setTooltip(null); setIsActive(false) }}
          className="p-2 rounded-lg bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 text-white/60" />
        </motion.button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 text-[10px] text-white/15">
        <MousePointerClick className="w-3 h-3" />
        <span>Click objects to reveal tech facts</span>
        <RotateCcw className="w-3 h-3" />
        <span>Drag to rotate view</span>
      </div>

      <div ref={containerRef} className="absolute inset-0 z-10 touch-none" />

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute z-30 pointer-events-none"
            style={{ left: tooltip.x, top: Math.max(80, tooltip.y - 60), transform: "translateX(-50%)" }}
          >
            <div className="px-4 py-2.5 rounded-xl backdrop-blur-xl border shadow-2xl max-w-[240px]" style={{ backgroundColor: `${tooltip.color}15`, borderColor: `${tooltip.color}40` }}>
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-3 h-3" style={{ color: tooltip.color }} />
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: tooltip.color }}>{tooltip.label}</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">{tooltip.fact}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
