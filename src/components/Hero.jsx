import { useEffect, useRef, useState } from 'react'

const roles = [
  'Full Stack Developer',
  'Laravel & Livewire Expert',
  'WordPress Developer',
  'React.js Developer',
  'SaaS Builder & AI Explorer',
]

const stats = [
  { num: 25, suffix: '+', label: 'Websites Delivered' },
  { num: 3, suffix: '', label: 'SaaS Products Built' },
  { num: 2, suffix: '.3', label: 'Years Experience' },
  { num: 500, suffix: '+', label: 'Students Managed' },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [counted, setCounted] = useState(false)
  const heroRef = useRef(null)

  // Typewriter
  useEffect(() => {
    const current = roles[roleIdx]
    let timeout
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setDeleting(false)
        setRoleIdx((roleIdx + 1) % roles.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  // Counter
  useEffect(() => {
    if (counted) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setCounted(true)
        stats.forEach((s, i) => {
          let start = 0
          const end = s.num
          const dur = 2000
          const step = end / (dur / 16)
          const timer = setInterval(() => {
            start = Math.min(start + step, end)
            setCounts(prev => {
              const n = [...prev]; n[i] = Math.floor(start); return n
            })
            if (start >= end) clearInterval(timer)
          }, 16)
        })
      }
    }, { threshold: 0.3 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [counted])

  return (
    <section id="hero" ref={heroRef} style={{
      minHeight:'100vh',display:'flex',alignItems:'center',
      justifyContent:'center',padding:'120px 60px 80px',
      position:'relative',zIndex:1,
    }}>
      <div style={{maxWidth:'960px',textAlign:'center',width:'100%'}}>

        {/* Badge */}
        <div style={{
          display:'inline-flex',alignItems:'center',gap:'8px',
          padding:'8px 20px',borderRadius:'100px',
          background:'rgba(59,130,246,0.08)',
          border:'1px solid rgba(59,130,246,0.2)',
          fontSize:'13px',fontWeight:500,color:'#60a5fa',
          marginBottom:'36px',
          animation:'fadeInDown 0.8s ease forwards',
        }}>
          <span style={{
            width:'6px',height:'6px',borderRadius:'50%',
            background:'#3b82f6',
            boxShadow:'0 0 8px #3b82f6',
            animation:'pulse2 2s ease-in-out infinite',
          }}/>
          Open to new opportunities · Bengaluru, India
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:'clamp(52px,8vw,92px)',fontWeight:800,
          lineHeight:1.05,letterSpacing:'-0.03em',marginBottom:'12px',
          background:'linear-gradient(135deg,#ffffff 0%,#93c5fd 50%,#a78bfa 100%)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
          backgroundClip:'text',
          animation:'fadeInUp 0.8s ease 0.2s both',
        }}>Ravikiran G Mailar</h1>

        {/* Typed role */}
        <div style={{
          fontSize:'clamp(18px,3vw,26px)',color:'#94a3b8',
          height:'44px',marginBottom:'28px',
          animation:'fadeInUp 0.8s ease 0.4s both',
        }}>
          <span style={{color:'#60a5fa',fontWeight:600}}>{displayed}</span>
          <span style={{
            display:'inline-block',width:'2px',height:'1.1em',
            background:'#60a5fa',verticalAlign:'text-bottom',
            animation:'cursorBlink 1s step-end infinite',
            boxShadow:'0 0 8px #60a5fa',
          }}/>
        </div>

        {/* Description */}
        <p style={{
          fontSize:'16px',color:'#94a3b8',maxWidth:'560px',
          margin:'0 auto 52px',lineHeight:1.8,
          animation:'fadeInUp 0.8s ease 0.5s both',
        }}>
          Building scalable web applications, SaaS products & AI-powered experiences.
          Passionate about clean code, great UX, and solving real-world problems.
        </p>

        {/* Buttons */}
        <div className="hero-btns-row" style={{
          display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',
          animation:'fadeInUp 0.8s ease 0.6s both',marginBottom:'72px',
        }}>
          <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}}
            style={{
              padding:'16px 40px',borderRadius:'12px',fontSize:'15px',fontWeight:600,
              background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'#fff',
              textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px',
              boxShadow:'0 8px 30px rgba(59,130,246,0.35)',
              transition:'all 0.3s',border:'none',cursor:'pointer',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
          >
            🚀 View Projects
          </a>
          <a href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}
            style={{
              padding:'16px 40px',borderRadius:'12px',fontSize:'15px',fontWeight:600,
              background:'rgba(255,255,255,0.04)',color:'#f1f5f9',
              border:'1px solid rgba(59,130,246,0.3)',textDecoration:'none',
              display:'inline-flex',alignItems:'center',gap:'8px',
              backdropFilter:'blur(10px)',transition:'all 0.3s',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
          >
            📬 Get In Touch
          </a>
          <a href="/resume.pdf" download
            style={{
              padding:'16px 40px',borderRadius:'12px',fontSize:'15px',fontWeight:600,
              background:'rgba(255,255,255,0.04)',color:'#f1f5f9',
              border:'1px solid rgba(255,255,255,0.1)',textDecoration:'none',
              display:'inline-flex',alignItems:'center',gap:'8px',
              backdropFilter:'blur(10px)',transition:'all 0.3s',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
          >
            📄 Download CV
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats-row" style={{
          display:'flex',gap:'48px',justifyContent:'center',flexWrap:'wrap',
          animation:'fadeInUp 0.8s ease 0.8s both',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{textAlign:'center'}}>
              <div style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:'clamp(28px,4vw,40px)',fontWeight:800,
                background:'linear-gradient(135deg,#fff,#60a5fa)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
                backgroundClip:'text',
              }}>
                {counts[i]}{s.suffix}
              </div>
              <div style={{fontSize:'13px',color:'#64748b',marginTop:'4px',fontWeight:500}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop:'64px',display:'flex',flexDirection:'column',
          alignItems:'center',gap:'8px',color:'#475569',fontSize:'11px',
          letterSpacing:'0.1em',textTransform:'uppercase',
          animation:'fadeIn 1s ease 1.5s both',
        }}>
          <span>scroll</span>
          <div style={{
            width:'1px',height:'48px',
            background:'linear-gradient(to bottom,#3b82f6,transparent)',
            animation:'scrollLine 2s ease-in-out infinite',
          }}/>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse2{0%,100%{opacity:1;box-shadow:0 0 8px #3b82f6}50%{opacity:0.4;box-shadow:0 0 2px #3b82f6}}
        @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(0);transform-origin:bottom}}
      `}</style>
    </section>
  )
}
