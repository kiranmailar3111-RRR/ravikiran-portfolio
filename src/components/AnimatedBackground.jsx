import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId

    const particleCount = 130
    const beamCount = 8

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // MOUSE / RIPPLES
    const mouse = { x: W / 2, y: H / 2 }
    const ripples = []
    const handleMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const handleClick = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.5 })
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('click', handleClick)

    // PARTICLES
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '59,130,246' : '139,92,246'
    }))

    // LASER BEAMS
    const beams = Array.from({ length: beamCount }, (_, i) => ({
      x: (W / beamCount) * i + W / (beamCount * 2),
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
      width: Math.random() * 1.5 + 0.5,
      color: i % 3 === 0 ? '6,182,212' : i % 2 === 0 ? '59,130,246' : '139,92,246'
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

    // SHOOTING STARS
    const shootingStars = []
    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * W * 0.6 + W * 0.2,
        y: Math.random() * H * 0.3,
        vx: (Math.random() * 0.5 + 0.6) * (Math.random() > 0.5 ? 1 : -1) * 6,
        vy: Math.random() * 3 + 4,
        life: 1,
        len: Math.random() * 60 + 60,
      })
    }
    let starTimer = 0

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
      for (let w = 0; w < 6; w++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(59,130,246,${0.04 + w * 0.012})`
        ctx.lineWidth = 1
        for (let x = 0; x <= W; x += 4) {
          const y = H * 0.5 + Math.sin(x * 0.008 + waveOffset + w * 0.5) * (60 + w * 20)
                  + Math.sin(x * 0.015 + waveOffset * 1.3 + w) * 30
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // LASER BEAMS
      beams.forEach((b) => {
        b.offset += b.speed * 0.01
        const yTop = H * 0.2 + Math.sin(b.offset) * H * 0.15
        const yBot = H * 0.8 + Math.cos(b.offset * 0.7) * H * 0.1
        const grad = ctx.createLinearGradient(b.x, yTop, b.x + 100, yBot)
        grad.addColorStop(0, `rgba(${b.color},0)`)
        grad.addColorStop(0.3, `rgba(${b.color},0.18)`)
        grad.addColorStop(0.7, `rgba(${b.color},0.18)`)
        grad.addColorStop(1, `rgba(${b.color},0)`)
        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = b.width
        ctx.moveTo(b.x + Math.sin(b.offset * 0.5) * 40, yTop)
        ctx.lineTo(b.x + Math.cos(b.offset * 0.5) * 40, yBot)
        ctx.stroke()
      })

      // SHOOTING STARS
      starTimer++
      if (starTimer > 90 + Math.random() * 120) {
        spawnShootingStar()
        starTimer = 0
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        const tailX = s.x - s.vx * (s.len / 10)
        const tailY = s.y - s.vy * (s.len / 10)
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`)
        grad.addColorStop(0.4, `rgba(165,180,255,${s.life * 0.5})`)
        grad.addColorStop(1, 'rgba(139,92,246,0)')
        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.8
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        s.x += s.vx; s.y += s.vy
        s.life -= 0.012
        if (s.life <= 0 || s.y > H) shootingStars.splice(i, 1)
      }

      // PARTICLES + CONNECTIONS (pulsing halos)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        p.pulse += 0.03
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const pulseR = Math.max(0.3, p.r + Math.sin(p.pulse) * 0.6)
        // halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulseR * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.06})`
        ctx.fill()
        // core
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
      })
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59,130,246,${0.09 * (1 - dist / 140)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // PARTICLES NEAR MOUSE — connect to cursor
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 160) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 160)})`
          ctx.lineWidth = 0.6
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      })

      // CLICK RIPPLES
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(96,165,250,${r.alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        r.r += 3.5
        r.alpha -= 0.012
        if (r.alpha <= 0) ripples.splice(i, 1)
      }

      // MATRIX
      drops.forEach((d, i) => {
        d.timer++
        if (d.timer % 8 === 0) d.char = String.fromCharCode(0x30A0 + Math.random() * 96)
        ctx.font = '12px JetBrains Mono, monospace'
        ctx.fillStyle = `rgba(59,130,246,${d.alpha})`
        ctx.fillText(d.char, i * 20, d.y)
        d.y += d.speed
        if (d.y > H) { d.y = Math.random() * -200; d.speed = Math.random() * 1 + 0.3 }
      })

      // FLOATING ORBS (with subtle pulsing)
      const t = Date.now() * 0.001
      const orbs = [
        { x: W * 0.15, y: H * 0.3, r: 200, c: '59,130,246', a: 0.06 },
        { x: W * 0.85, y: H * 0.7, r: 250, c: '139,92,246', a: 0.05 },
        { x: W * 0.5, y: H * 0.5, r: 180, c: '6,182,212', a: 0.04 },
        { x: W * 0.25, y: H * 0.8, r: 160, c: '236,72,153', a: 0.035 },
      ]
      orbs.forEach((o, i) => {
        const px = o.x + Math.sin(t * 0.5 + i) * 40
        const py = o.y + Math.cos(t * 0.4 + i) * 30
        const pulse = 0.85 + Math.sin(t * 0.6 + i) * 0.15
        const g = ctx.createRadialGradient(px, py, 0, px, py, o.r * pulse)
        g.addColorStop(0, `rgba(${o.c},${o.a})`)
        g.addColorStop(1, `rgba(${o.c},0)`)
        ctx.beginPath()
        ctx.arc(px, py, o.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('click', handleClick)
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
