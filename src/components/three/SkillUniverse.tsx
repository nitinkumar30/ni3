"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface SkillNode {
  name: string
  x: number
  y: number
  z: number
  color: string
  size: number
}

export function SkillUniverse() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const nodes: SkillNode[] = [
      { name: "Python", x: 0, y: 0, z: 0, color: "#00E5FF", size: 0.6 },
      { name: "Automation", x: 2.5, y: 1, z: 0.5, color: "#7B61FF", size: 0.5 },
      { name: "Selenium", x: 2, y: -1.5, z: -0.5, color: "#00FF9D", size: 0.4 },
      { name: "AI", x: -2.5, y: 1.5, z: -0.3, color: "#FF6B6B", size: 0.5 },
      { name: "Web Dev", x: -2, y: -1.8, z: 0.3, color: "#FFD93D", size: 0.4 },
      { name: "Data Science", x: -0.5, y: 2.5, z: 0.8, color: "#6BCB77", size: 0.4 },
      { name: "Cyber Security", x: -0.3, y: -2.5, z: -0.8, color: "#FF4D4D", size: 0.4 },
      { name: "Docker", x: 3.5, y: 0, z: -1, color: "#0DB7ED", size: 0.3 },
      { name: "APIs", x: 1, y: 2, z: -1.2, color: "#A66CFF", size: 0.3 },
      { name: "Git", x: -3, y: -0.5, z: 1, color: "#F05032", size: 0.3 },
      { name: "Linux", x: -3.5, y: 0.8, z: -0.5, color: "#FCC624", size: 0.3 },
      { name: "Next.js", x: 0.5, y: -2.2, z: 1.2, color: "#FFFFFF", size: 0.3 },
      { name: "React", x: 3, y: -1, z: 1, color: "#61DAFB", size: 0.3 },
      { name: "CI/CD", x: -1.5, y: -0.5, z: 2, color: "#00FF9D", size: 0.25 },
    ]

    const sphereGeometries: THREE.Mesh[] = []
    const connections: THREE.Line[] = []
    const labels: THREE.Sprite[] = []

    // Create spheres
    nodes.forEach((node) => {
      const geo = new THREE.SphereGeometry(node.size, 16, 16)
      const mat = new THREE.MeshPhysicalMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(node.x, node.y, node.z)
      mesh.userData = { floatOffset: Math.random() * Math.PI * 2 }
      scene.add(mesh)
      sphereGeometries.push(mesh)

      // Label sprite
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 64
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, 256, 64)
      ctx.font = "bold 24px Arial"
      ctx.textAlign = "center"
      ctx.fillStyle = node.color
      ctx.fillText(node.name, 128, 40)

      const texture = new THREE.CanvasTexture(canvas)
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.position.set(node.x, node.y - node.size - 0.3, node.z)
      sprite.scale.set(2, 0.5, 1)
      scene.add(sprite)
      labels.push(sprite)
    })

    // Create connections from center
    const center = nodes[0]
    nodes.slice(1).forEach((node) => {
      const points = [
        new THREE.Vector3(center.x, center.y, center.z),
        new THREE.Vector3(node.x, node.y, node.z),
      ]
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.2,
      })
      const line = new THREE.Line(geo, mat)
      scene.add(line)
      connections.push(line)
    })

    // Resize
    const handleResize = () => {
      camera.aspect = container!.clientWidth / container!.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container!.clientWidth, container!.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      nodes.forEach((node, i) => {
        const mesh = sphereGeometries[i]
        if (mesh) {
          mesh.position.y += Math.sin(time * 0.5 + mesh.userData.floatOffset) * 0.003
          mesh.rotation.x += 0.005
          mesh.rotation.y += 0.01
        }
        const label = labels[i]
        if (label) {
          label.position.y = mesh?.position.y ?? node.y - node.size - 0.3
        }
      })

      scene.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] rounded-xl overflow-hidden border border-white/5"
    />
  )
}
