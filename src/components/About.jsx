import { useRef, useState, useEffect } from 'react'
import myPhoto from '../assets/ravikiran-photo.jpg'
import {
  FaLaravel, FaReact, FaWordpress, FaNodeJs, FaPhp, FaRocket, FaGlobe, FaRobot,
} from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';

const stack = [
  { name: 'Laravel',   Icon: FaLaravel,   color: '#FF2D20' },
  { name: 'React.js',  Icon: FaReact,     color: '#61DAFB' },
  { name: 'WordPress', Icon: FaWordpress, color: '#21759B' },
  { name: 'Node.js',   Icon: FaNodeJs,    color: '#3C873A' },
  { name: 'MySQL',     Icon: SiMysql,     color: '#4479A1' },
  { name: 'PHP',       Icon: FaPhp,       color: '#777BB4' },
];

export default function About() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const cards = [
    { Icon: FaRocket, color:'#60a5fa', title:'Full Stack Developer', desc:'End-to-end product development — from database schema to polished React.js frontend with Laravel backends.' },
    { Icon: FaGlobe,  color:'#34d399', title:'WordPress & CMS Expert', desc:'25+ production websites for community portals, e-commerce, and businesses with full SEO and cPanel deployment.' },
    { Icon: FaRobot,  color:'#a78bfa', title:'AI Integration', desc:'Explored AI development by integrating Groq\'s LLaMA 3 model into BotPilot — a real-time chatbot builder platform.' },
  ]

  return (
    <section id="about" ref={ref} style={{
      padding:'120px 60px',maxWidth:'1280px',margin:'0 auto',
      position:'relative',zIndex:1,
    }}>
      <div style={{
        display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',
        alignItems:'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition:'all 0.8s ease',
      }}>

        {/* LEFT — Text */}
        <div>
          <div style={{
            fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',
            color:'#60a5fa',textTransform:'uppercase',marginBottom:'12px',
          }}>About Me</div>
          <h2 style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:'clamp(32px,4vw,52px)',fontWeight:700,
            lineHeight:1.1,marginBottom:'20px',letterSpacing:'-0.02em',
          }}>
            Crafting digital<br/>
            <span style={{
              background:'linear-gradient(135deg,#60a5fa,#a78bfa)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
              backgroundClip:'text',
            }}>experiences</span> with<br/>purpose
          </h2>
          <div style={{
            width:'60px',height:'3px',
            background:'linear-gradient(90deg,#3b82f6,#8b5cf6)',
            borderRadius:'2px',marginBottom:'36px',
          }}/>

          <p style={{color:'#94a3b8',fontSize:'15px',lineHeight:1.85,marginBottom:'20px'}}>
            I'm <strong style={{color:'#f1f5f9'}}>Ravikiran G Mailar</strong>, a Full Stack Developer with{' '}
            <strong style={{color:'#60a5fa'}}>2.5 years</strong> of experience building production-grade
            web applications, SaaS platforms, and client websites at{' '}
            <strong style={{color:'#f1f5f9'}}>Angika Technologies, Bengaluru</strong>.
          </p>
          <p style={{color:'#94a3b8',fontSize:'15px',lineHeight:1.85,marginBottom:'20px'}}>
            I've delivered a <strong style={{color:'#f1f5f9'}}>School Management ERP</strong> for 500+ students,
            <strong style={{color:'#f1f5f9'}}> 25+ WordPress websites</strong>, and independently
            built <strong style={{color:'#60a5fa'}}>BillStack</strong> (GST Billing SaaS),{' '}
            <strong style={{color:'#60a5fa'}}>Multi-Website CMS Builder</strong>, and{' '}
            <strong style={{color:'#60a5fa'}}>BotPilot</strong> (AI chatbot platform).
          </p>
          <p style={{color:'#94a3b8',fontSize:'15px',lineHeight:1.85}}>
            I don't wait to be taught — <strong style={{color:'#f1f5f9'}}>I build things to learn.</strong>
          </p>

          <div style={{display:'flex',gap:'16px',marginTop:'36px',flexWrap:'wrap'}}>
            {stack.map(({ name, Icon, color }) => (
              <span key={name} style={{
                display:'flex',alignItems:'center',gap:'8px',
                padding:'8px 18px',borderRadius:'100px',fontSize:'13px',fontWeight:500,
                background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.2)',
                color:'#93c5fd',
              }}>
                <Icon size={20} color={color} />
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Photo + Cards */}
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

          {/* Photo placeholder */}
          <div style={{
            position:'relative',marginBottom:'8px',
            display:'flex',justifyContent:'center',
          }}>
            {/* Pulsing outer glow */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',
              width:'340px',height:'340px',borderRadius:'50%',
              transform:'translate(-50%,-50%)',
              background:'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)',
              animation:'glowPulse 3s ease-in-out infinite',
              pointerEvents:'none',
            }}/>

            {/* Outer sweeping arc */}
            <svg width="310" height="310" style={{
              position:'absolute',top:'50%',left:'50%',
              transform:'translate(-50%,-50%)',
              animation:'ringRotate 4s linear infinite',
              pointerEvents:'none',
            }}>
              <defs>
                <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <circle cx="155" cy="155" r="147" fill="none"
                stroke="url(#ringGrad1)" strokeWidth="2.5"
                strokeDasharray="220 700" strokeLinecap="round"/>
            </svg>

            {/* Middle counter-rotating arc */}
            <svg width="285" height="285" style={{
              position:'absolute',top:'50%',left:'50%',
              transform:'translate(-50%,-50%)',
              animation:'ringRotateReverse 6s linear infinite',
              pointerEvents:'none',
            }}>
              <defs>
                <linearGradient id="ringGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <circle cx="142.5" cy="142.5" r="135" fill="none"
                stroke="url(#ringGrad2)" strokeWidth="1.5"
                strokeDasharray="160 540" strokeLinecap="round"/>
            </svg>

            {/* Inner thin dotted ring, slow rotate */}
            <svg width="265" height="265" style={{
              position:'absolute',top:'50%',left:'50%',
              transform:'translate(-50%,-50%)',
              animation:'ringRotate 14s linear infinite',
              pointerEvents:'none',
            }}>
              <circle cx="132.5" cy="132.5" r="124" fill="none"
                stroke="#06b6d4" strokeOpacity="0.4" strokeWidth="1.5"
                strokeDasharray="2 10" strokeLinecap="round"/>
            </svg>

            {/* Orbiting dot 1 — fast, outer */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',
              width:'310px',height:'310px',
              transform:'translate(-50%,-50%)',
              animation:'ringRotate 4s linear infinite',
              pointerEvents:'none',
            }}>
              <div style={{
                position:'absolute',top:'2px',left:'50%',
                width:'9px',height:'9px',borderRadius:'50%',
                background:'#60a5fa',transform:'translateX(-50%)',
                boxShadow:'0 0 14px 4px #60a5fa',
              }}/>
            </div>

            {/* Orbiting dot 2 — medium, opposite direction */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',
              width:'285px',height:'285px',
              transform:'translate(-50%,-50%)',
              animation:'ringRotateReverse 6s linear infinite',
              pointerEvents:'none',
            }}>
              <div style={{
                position:'absolute',bottom:'4px',left:'50%',
                width:'7px',height:'7px',borderRadius:'50%',
                background:'#a78bfa',transform:'translateX(-50%)',
                boxShadow:'0 0 12px 3px #a78bfa',
              }}/>
            </div>

            {/* Orbiting dot 3 — slow, inner */}
            <div style={{
              position:'absolute',top:'50%',left:'50%',
              width:'265px',height:'265px',
              transform:'translate(-50%,-50%)',
              animation:'ringRotate 8s linear infinite',
              pointerEvents:'none',
            }}>
              <div style={{
                position:'absolute',top:'50%',right:'-3px',
                width:'6px',height:'6px',borderRadius:'50%',
                background:'#06b6d4',transform:'translateY(-50%)',
                boxShadow:'0 0 10px 3px #06b6d4',
              }}/>
            </div>

            <div style={{
              width:'260px',height:'260px',borderRadius:'30px',
              position:'relative',padding:'3px',
              background:'linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)',
              backgroundSize:'300% 300%',
              animation:'gradientSpin 4s linear infinite',
              boxShadow:'0 30px 80px rgba(59,130,246,0.25)',
            }}>
              <div style={{
                width:'100%',height:'100%',borderRadius:'27px',
                overflow:'hidden',position:'relative',
                background:'#020817',
              }}>
                <img
                  src={myPhoto}
                  alt="Ravikiran G Mailar"
                  style={{
                    width:'100%',height:'100%',
                    objectFit:'cover',display:'block',
                  }}
                />
                {/* subtle scan line overlay for tech feel */}
                <div style={{
                  position:'absolute',inset:0,
                  background:'linear-gradient(180deg,rgba(59,130,246,0.08),transparent 40%,transparent 60%,rgba(59,130,246,0.08))',
                  pointerEvents:'none',
                }}/>
              </div>
              <div style={{
                position:'absolute',bottom:'14px',left:'50%',transform:'translateX(-50%)',
                padding:'5px 14px',borderRadius:'100px',
                background:'rgba(2,8,23,0.85)',border:'1px solid rgba(16,185,129,0.4)',
                fontSize:'11px',color:'#34d399',fontWeight:600,
                display:'flex',alignItems:'center',gap:'6px',
                backdropFilter:'blur(8px)',whiteSpace:'nowrap',
              }}>
                <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10b981',
                  boxShadow:'0 0 6px #10b981',animation:'pulse2 2s infinite'}}/>
                Available for hire
              </div>
            </div>
          </div>

          {/* Feature cards */}
          {cards.map((c, i) => (
            <div key={i} style={{
              padding:'20px 24px',borderRadius:'16px',
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              backdropFilter:'blur(10px)',
              display:'flex',gap:'16px',alignItems:'flex-start',
              transition:'all 0.3s',cursor:'default',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transitionDelay: `${0.2 + i * 0.15}s`,
            }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor='rgba(59,130,246,0.3)'
                e.currentTarget.style.background='rgba(59,130,246,0.05)'
                e.currentTarget.style.transform='translateX(-4px)'
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'
                e.currentTarget.style.background='rgba(255,255,255,0.03)'
                e.currentTarget.style.transform='translateX(0)'
              }}
            >
              <div style={{
                width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,
                background:`${c.color}15`,border:`1px solid ${c.color}30`,
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>
                <c.Icon size={19} color={c.color} />
              </div>
              <div>
                <div style={{fontSize:'14px',fontWeight:600,marginBottom:'4px',color:'#f1f5f9'}}>{c.title}</div>
                <div style={{fontSize:'13px',color:'#64748b',lineHeight:1.6}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes gradientSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes ringRotate{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes ringRotateReverse{from{transform:translate(-50%,-50%) rotate(360deg)}to{transform:translate(-50%,-50%) rotate(0deg)}}
        @keyframes glowPulse{0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
      `}</style>
    </section>
  )
}
