import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId
    const isMobile = window.innerWidth <= 860
    const particleCount = isMobile ? 30 : 80
    const beamCount = isMobile ? 3 : 6
    const matrixOn = !isMobile

    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    })

    // PARTICLES
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '59,130,246' : '139,92,246'
    }))

    // LASER BEAMS
    const beams = Array.from({ length: beamCount }, (_, i) => ({
      x: (W / beamCount) * i + W / (beamCount * 2),
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
      width: Math.random() * 1.5 + 0.5,
      color: i % 2 === 0 ? '59,130,246' : '139,92,246'
    }))

    // MATRIX DROPS
    const cols = Math.floor(W / 20)
    const drops = Array.from({ length: cols }, () => ({
      y: Math.random() * -H,
      speed: Math.random() * 1 + 0.3,
      char: String.fromCharCode(0x30A0 + Math.random() * 96),
      alpha: Math.random() * 0.08 + 0.02,
      timer: 0
    }))

    // WAVES
    let waveOffset = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Grid
      ctx.strokeStyle = 'rgba(59,130,246,0.03)'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // WAVE LINES
      waveOffset += 0.008
      for (let w = 0; w < 5; w++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(59,130,246,${0.04 + w * 0.01})`
        ctx.lineWidth = 1
        for (let x = 0; x <= W; x += 4) {
          const y = H * 0.5 + Math.sin(x * 0.008 + waveOffset + w * 0.5) * (60 + w * 20)
                  + Math.sin(x * 0.015 + waveOffset * 1.3 + w) * 30
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // LASER BEAMS
      beams.forEach((b, i) => {
        b.offset += b.speed * 0.01
        const yTop = H * 0.2 + Math.sin(b.offset) * H * 0.15
        const yBot = H * 0.8 + Math.cos(b.offset * 0.7) * H * 0.1
        const grad = ctx.createLinearGradient(b.x, yTop, b.x + 100, yBot)
        grad.addColorStop(0, `rgba(${b.color},0)`)
        grad.addColorStop(0.3, `rgba(${b.color},0.15)`)
        grad.addColorStop(0.7, `rgba(${b.color},0.15)`)
        grad.addColorStop(1, `rgba(${b.color},0)`)
        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = b.width
        ctx.moveTo(b.x + Math.sin(b.offset * 0.5) * 40, yTop)
        ctx.lineTo(b.x + Math.cos(b.offset * 0.5) * 40, yBot)
        ctx.stroke()
      })

      // PARTICLES + CONNECTIONS
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
      })
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // MATRIX
      if (matrixOn) drops.forEach((d, i) => {
        d.timer++
        if (d.timer % 8 === 0) d.char = String.fromCharCode(0x30A0 + Math.random() * 96)
        ctx.font = '12px JetBrains Mono, monospace'
        ctx.fillStyle = `rgba(59,130,246,${d.alpha})`
        ctx.fillText(d.char, i * 20, d.y)
        d.y += d.speed
        if (d.y > H) { d.y = Math.random() * -200; d.speed = Math.random() * 1 + 0.3 }
      })

      // FLOATING ORBS
      const t = Date.now() * 0.001
      const orbs = [
        { x: W * 0.15, y: H * 0.3, r: 200, c: '59,130,246', a: 0.06 },
        { x: W * 0.85, y: H * 0.7, r: 250, c: '139,92,246', a: 0.05 },
        { x: W * 0.5, y: H * 0.5, r: 180, c: '6,182,212', a: 0.04 },
      ]
      orbs.forEach((o, i) => {
        const px = o.x + Math.sin(t * 0.5 + i) * 40
        const py = o.y + Math.cos(t * 0.4 + i) * 30
        const g = ctx.createRadialGradient(px, py, 0, px, py, o.r)
        g.addColorStop(0, `rgba(${o.c},${o.a})`)
        g.addColorStop(1, `rgba(${o.c},0)`)
        ctx.beginPath()
        ctx.arc(px, py, o.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', () => {})
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none'
      }}
    />
  )
}
