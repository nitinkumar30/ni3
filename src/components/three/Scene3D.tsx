"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function createAuroraRibbon(
  color: THREE.Color,
  offsetX: number,
  offsetZ: number,
  amplitude: number,
  frequency: number
): THREE.Mesh {
  const points: THREE.Vector3[] = []
  const segments = 40
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const x = offsetX + Math.sin(t * Math.PI * frequency) * amplitude * 1.5
    const y = Math.sin(t * Math.PI * 2) * amplitude + Math.sin(t * Math.PI * 6) * amplitude * 0.3
    const z = (t - 0.5) * 8 + offsetZ
    points.push(new THREE.Vector3(x, y, z))
  }
  const curve = new THREE.CatmullRomCurve3(points)
  const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.06, 6, false)
  const tubeMat = new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    roughness: 0.4,
    metalness: 0.1,
  })
  const mesh = new THREE.Mesh(tubeGeo, tubeMat)
  mesh.userData = {
    auroraOffsetX: offsetX,
    auroraOffsetZ: offsetZ,
    auroraAmplitude: amplitude,
    auroraFrequency: frequency,
    auroraPhase: Math.random() * Math.PI * 2,
  }
  return mesh
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050816)

    const fogColor = new THREE.Color(0x0a0a2e)
    const baseFogDensity = isMobile ? 0.035 : 0.025
    scene.fog = new THREE.FogExp2(fogColor, baseFogDensity)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
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

    // Ambient + directional lights
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

    // ---- Cloud particle layers ----
    function createCloudLayer(
      count: number,
      spread: number,
      yRange: number,
      zOffset: number,
      size: number,
      color: THREE.Color,
      opacity: number
    ): THREE.Points {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * yRange
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 1.5 + zOffset
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false,
      })
      return new THREE.Points(geo, mat)
    }

    const cloudCount = (n: number) => Math.round(n * (isMobile ? 1 / 3 : 1))
    const cloudLayers: THREE.Points[] = [
      createCloudLayer(cloudCount(300), 35, 12, -15, 0.22, new THREE.Color(0x4488ff), 0.06),
      createCloudLayer(cloudCount(250), 30, 10, -10, 0.28, new THREE.Color(0x66ccff), 0.07),
      createCloudLayer(cloudCount(200), 25, 8, -5, 0.35, new THREE.Color(0x8844ff), 0.05),
      createCloudLayer(cloudCount(350), 40, 14, -20, 0.18, new THREE.Color(0x44ffaa), 0.04),
      createCloudLayer(cloudCount(150), 20, 5, 0, 0.4, new THREE.Color(0xaaaaff), 0.06),
    ]
    cloudLayers.forEach((l) => scene.add(l))

    // ---- Floating dust particles ----
    const dustCount = cloudCount(600)
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    const dustData: { speed: number; phase: number; angle: number; radius: number }[] = []
    for (let i = 0; i < dustCount; i++) {
      const radius = 4 + Math.random() * 12
      const angle = Math.random() * Math.PI * 2
      dustPos[i * 3] = Math.cos(angle) * radius
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8
      dustPos[i * 3 + 2] = Math.sin(angle) * radius - 5
      dustData.push({
        speed: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        angle,
        radius,
      })
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: isMobile ? 0.04 : 0.06,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const dustParticles = new THREE.Points(dustGeo, dustMat)
    dustParticles.userData = { dustData }
    scene.add(dustParticles)

    // ---- Aurora light ribbons ----
    const auroraRibbons: THREE.Mesh[] = []
    const auroraConfigs = [
      { color: new THREE.Color(0x4488ff), offsetX: -0.5, offsetZ: -3, amplitude: 0.8, frequency: 1.5 },
      { color: new THREE.Color(0xaa44ff), offsetX: 0.8, offsetZ: -1, amplitude: 0.6, frequency: 2.0 },
      { color: new THREE.Color(0x44ffaa), offsetX: -0.3, offsetZ: -5, amplitude: 1.0, frequency: 1.2 },
    ]
    auroraConfigs.forEach((cfg) => {
      const ribbon = createAuroraRibbon(cfg.color, cfg.offsetX, cfg.offsetZ, cfg.amplitude, cfg.frequency)
      scene.add(ribbon)
      auroraRibbons.push(ribbon)
    })

    // ---- Glowing core ----
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4488ff,
      emissive: 0x4488ff,
      emissiveIntensity: 0.4,
      metalness: 0.7,
      roughness: 0.15,
      transparent: true,
      opacity: 0.5,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.y = 0.5
    scene.add(core)

    // ---- Torus rings (wireframe) ----
    function createTorusRing(radius: number, tube: number, color: number, opacity: number): THREE.Mesh {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 48)
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        wireframe: true,
        roughness: 0.3,
        metalness: 0.2,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.y = 0.5
      return mesh
    }

    const ring1 = createTorusRing(2.0, 0.04, 0x4488ff, 0.2)
    ring1.rotation.x = Math.PI / 3
    scene.add(ring1)

    const ring2 = createTorusRing(2.8, 0.04, 0xaa44ff, 0.18)
    ring2.rotation.x = Math.PI / 2
    ring2.rotation.z = Math.PI / 4
    scene.add(ring2)

    const ring3 = createTorusRing(3.6, 0.03, 0x44ffaa, 0.14)
    ring3.rotation.x = Math.PI / 4
    ring3.rotation.z = Math.PI / 3
    scene.add(ring3)

    // ---- Floating tech artifacts (from original) ----
    const artifacts: THREE.Mesh[] = []
    const artifactCount = isMobile ? 6 : 18
    const geoTypes: (() => THREE.BufferGeometry)[] = [
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
        angle,
        dist,
        speed: 0.1 + Math.random() * 0.2,
        yBase: mesh.position.y,
        ySpeed: 0.2 + Math.random() * 0.4,
        yAmp: 0.1 + Math.random() * 0.2,
        rotSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
      }
      scene.add(mesh)
      artifacts.push(mesh)
    }

    // ---- Mouse tracking ----
    let mouseX = 0
    let mouseY = 0
    let scrollY = 0
    let targetScrollY = 0

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
      targetScrollY =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
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

    // ---- Color palette sections ----
    const paletteSections: { color: THREE.Color; emissive: THREE.Color; name: string }[] = [
      { color: new THREE.Color(0x4488ff), emissive: new THREE.Color(0x4488ff), name: "cyan" },
      { color: new THREE.Color(0xaa44ff), emissive: new THREE.Color(0xaa44ff), name: "purple" },
      { color: new THREE.Color(0x44ffaa), emissive: new THREE.Color(0x44ffaa), name: "green" },
    ]

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.006

      // Smooth scroll
      scrollY += (targetScrollY - scrollY) * 0.05

      // ---- Mouse parallax ----
      const targetCamX = mouseX * 2
      const targetCamY = -mouseY * 1.2
      camera.position.x += (targetCamX - camera.position.x) * 0.02
      camera.position.y += (targetCamY - camera.position.y) * 0.02
      camera.lookAt(0, 0.5, 0)

      // ---- Section-based color palette ----
      const sectionCount = paletteSections.length
      const rawPos = scrollY * sectionCount
      const idxA = Math.floor(rawPos) % sectionCount
      const idxB = (idxA + 1) % sectionCount
      const mix = rawPos - Math.floor(rawPos)

      const currentColor = paletteSections[idxA].color.clone().lerp(paletteSections[idxB].color, mix)
      const currentEmissive = paletteSections[idxA].emissive.clone().lerp(paletteSections[idxB].emissive, mix)

      // Shift core colors
      coreMat.color.copy(currentColor)
      coreMat.emissive.copy(currentEmissive)

      // Shift ring colors
      const r1m = ring1.material as THREE.MeshPhysicalMaterial
      const r2m = ring2.material as THREE.MeshPhysicalMaterial
      const r3m = ring3.material as THREE.MeshPhysicalMaterial
      r1m.color.copy(currentColor)
      r1m.emissive.copy(currentEmissive)
      r2m.color.copy(paletteSections[(idxA + 1) % sectionCount].emissive.clone().lerp(
        paletteSections[(idxB + 1) % sectionCount].emissive, mix
      ))
      r2m.emissive.copy(r2m.color)
      r3m.color.copy(paletteSections[(idxA + 2) % sectionCount].emissive.clone().lerp(
        paletteSections[(idxB + 2) % sectionCount].emissive, mix
      ))
      r3m.emissive.copy(r3m.color)

      // Shift cloud layer colors slightly
      cloudLayers.forEach((layer, i) => {
        const layerColor = currentColor.clone().lerp(
          new THREE.Color(0x4488ff).lerp(new THREE.Color(0x44ffaa), i / (cloudLayers.length - 1)),
          0.3
        )
        ;(layer.material as THREE.PointsMaterial).color.copy(layerColor)
      })

      // Shift aurora colors
      auroraRibbons.forEach((ribbon, i) => {
        const mixColor = currentColor.clone().lerp(auroraConfigs[i].color, 0.4)
        ;(ribbon.material as THREE.MeshPhysicalMaterial).color.copy(mixColor)
        ;(ribbon.material as THREE.MeshPhysicalMaterial).emissive.copy(mixColor)
      })

      // Shift glow light
      glowLight.color.copy(currentColor)

      // ---- Scroll influence on layers ----
      cloudLayers.forEach((layer, i) => {
        layer.position.y = -scrollY * (2 + i * 0.5)
        layer.rotation.y += 0.0002 * (1 + i * 0.3)
      })

      // Dust horizontal drift with scroll
      const dustDataArr = dustParticles.userData.dustData as {
        speed: number
        phase: number
        angle: number
        radius: number
      }[]
      const dustPosAttr = dustParticles.geometry.attributes.position
      const dustPosArray = dustPosAttr.array as Float32Array
      for (let i = 0; i < dustCount; i++) {
        const d = dustDataArr[i]
        const a = d.angle + time * d.speed + scrollY * 0.1
        dustPosArray[i * 3] = Math.cos(a) * d.radius
        dustPosArray[i * 3 + 2] = Math.sin(a) * d.radius - 5 + scrollY * 3
      }
      dustPosAttr.needsUpdate = true

      // ---- Volumetric fog pulsing density ----
      const fogPulse = Math.sin(time * 0.3) * 0.008
      ;(scene.fog as THREE.FogExp2).density = baseFogDensity + scrollY * 0.02 + fogPulse

      // ---- Core pulsing ----
      const corePulse = 0.2 + Math.sin(time * 1.2) * 0.2
      coreMat.emissiveIntensity = corePulse
      core.scale.setScalar(1 + Math.sin(time * 0.8) * 0.05)
      core.rotation.x += 0.003
      core.rotation.y += 0.005

      // ---- Ring rotations ----
      ring1.rotation.z = time * 0.15
      ring1.rotation.x = Math.PI / 3 + Math.sin(time * 0.2) * 0.05
      ring2.rotation.y = time * 0.1
      ring2.rotation.x = Math.PI / 2 + Math.sin(time * 0.15) * 0.08
      ring3.rotation.z = -time * 0.08
      ring3.rotation.x = Math.PI / 4 + Math.sin(time * 0.12) * 0.06

      // ---- Aurora ribbon undulation ----
      auroraRibbons.forEach((ribbon, index) => {
        const phase = ribbon.userData.auroraPhase as number
        const mat = ribbon.material as THREE.MeshPhysicalMaterial
        mat.opacity = 0.2 + Math.sin(time * 0.5 + phase) * 0.1
        mat.emissiveIntensity = 0.4 + Math.sin(time * 0.7 + phase) * 0.3
        ribbon.rotation.x = Math.sin(time * 0.1 + phase) * 0.1
        ribbon.rotation.z = Math.sin(time * 0.15 + phase + index) * 0.08
        ribbon.position.y = Math.sin(time * 0.2 + phase) * 0.3
      })

      // ---- Artifacts float and orbit ----
      artifacts.forEach((m) => {
        const d = m.userData as {
          angle: number
          dist: number
          speed: number
          yBase: number
          ySpeed: number
          yAmp: number
          rotSpeed: { x: number; y: number }
        }
        d.angle += 0.005 * d.speed
        m.position.x = Math.cos(d.angle) * d.dist
        m.position.z = Math.sin(d.angle) * d.dist
        m.position.y = d.yBase + Math.sin(time * d.ySpeed + d.angle) * d.yAmp
        m.rotation.x += d.rotSpeed.x
        m.rotation.y += d.rotSpeed.y
      })

      // ---- Glow light intensity oscillation ----
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
