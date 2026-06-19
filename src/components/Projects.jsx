import { useRef, useState, useEffect } from 'react'

const projects = [
  {
    icon:'💰', badge:'Featured SaaS Project', featured:true,
    title:'BillStack — GST Inventory Billing SaaS',
    desc:'Full-stack SaaS for businesses to manage products, customers, GST invoices, stock, and analytics. Features atomic invoice engine — GST calculation, stock deduction, and PDF export in one DB transaction.',
    tech:['React.js','Laravel REST API','Sanctum Auth','MySQL','Tailwind CSS','Recharts','jsPDF','Vite'],
    github:'https://github.com/kiranmailar3111-RRR',
    color:'#3b82f6',
    highlights:['Role-based dashboards','GST Invoice Engine','PDF Export','Stock Management','Live Analytics'],
  },
  {
    icon:'🌐', badge:'Laravel · Livewire',
    title:'Multi-Website Dynamic CMS Builder',
    desc:'Multi-tenant platform to create and manage multiple websites with drag-and-drop sections, SEO settings, and role-based access from one admin panel.',
    tech:['Laravel','Livewire','PHP','MySQL','SortableJS','Spatie Permission','Tailwind CSS'],
    github:'https://github.com/kiranmailar3111-RRR',
    color:'#8b5cf6',
    highlights:['Multi-tenant','Drag & Drop','SEO Management','Role-based Access'],
  },
  {
    icon:'🤖', badge:'Learning Project · AI',
    title:'BotPilot — AI Chatbot Builder',
    desc:'Personal learning project — AI chatbot platform integrating LLaMA 3 via Groq API. Create, customize, and embed chatbots on any website with JS widget.',
    tech:['Node.js','Express.js','React.js','MySQL','Groq AI','LLaMA 3','JWT','REST API'],
    github:'https://github.com/kiranmailar3111-RRR',
    color:'#06b6d4',
    highlights:['Groq AI / LLaMA 3','Embeddable Widget','JWT Auth','Analytics'],
  },
  {
    icon:'🌍', badge:'Client Work · Production',
    title:'25+ WordPress Websites',
    desc:'Delivered 25+ production WordPress websites for community portals, professional associations, e-commerce stores, and businesses with full SEO and cPanel deployment.',
    tech:['WordPress','Elementor','WooCommerce','Hostinger','cPanel','Yoast SEO','PHP'],
    color:'#10b981',
    highlights:['Community Portals','E-Commerce','SEO Optimized','Mobile-First'],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} style={{
      padding:'120px 60px',position:'relative',zIndex:1,
      background:'linear-gradient(180deg,transparent,rgba(10,15,30,0.3),transparent)',
    }}>
      <div style={{maxWidth:'1280px',margin:'0 auto'}}>
        <div style={{
          marginBottom:'64px',
          opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(30px)',
          transition:'all 0.7s ease',
        }}>
          <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',color:'#60a5fa',textTransform:'uppercase',marginBottom:'12px'}}>Projects</div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(32px,4vw,48px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:'16px'}}>
            Things I've <span style={{background:'linear-gradient(135deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>built</span>
          </h2>
          <div style={{width:'60px',height:'3px',background:'linear-gradient(90deg,#3b82f6,#8b5cf6)',borderRadius:'2px'}}/>
        </div>

        <div className="projects-grid-cols" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'24px'}}>
          {projects.map((p, i) => (
            <div key={i}
              style={{
                padding:'32px',borderRadius:'24px',
                background: hovered===i
                  ? `linear-gradient(135deg,${p.color}10,${p.color}05)`
                  : 'rgba(255,255,255,0.03)',
                border:`1px solid ${hovered===i ? p.color+'44' : 'rgba(255,255,255,0.07)'}`,
                backdropFilter:'blur(12px)',
                transition:'all 0.4s ease',cursor:'default',
                opacity:visible?1:0,
                transform:visible?'translateY(0)':'translateY(30px)',
                transitionDelay:`${i*0.1}s`,
                boxShadow: hovered===i ? `0 30px 80px ${p.color}18` : 'none',
                position:'relative',overflow:'hidden',
              }}
              onMouseEnter={()=>setHovered(i)}
              onMouseLeave={()=>setHovered(null)}
            >
              {/* Glow top border */}
              {hovered===i && (
                <div style={{
                  position:'absolute',top:0,left:'15%',right:'15%',height:'1px',
                  background:`linear-gradient(90deg,transparent,${p.color},transparent)`,
                }}/>
              )}

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
                <div style={{
                  width:'56px',height:'56px',borderRadius:'16px',fontSize:'26px',
                  background:`${p.color}15`,border:`1px solid ${p.color}30`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  boxShadow: hovered===i ? `0 0 20px ${p.color}40` : 'none',
                  transition:'all 0.3s',
                }}>{p.icon}</div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{
                      width:'38px',height:'38px',borderRadius:'10px',
                      background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      color:'#94a3b8',textDecoration:'none',fontSize:'16px',
                      transition:'all 0.2s',
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}20`;e.currentTarget.style.borderColor=p.color+'44';e.currentTarget.style.color=p.color}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.color='#94a3b8'}}
                  >↗</a>
                )}
              </div>

              <div style={{
                display:'inline-block',padding:'4px 12px',borderRadius:'100px',
                fontSize:'11px',fontWeight:600,letterSpacing:'0.06em',
                background:`${p.color}18`,color:p.color,textTransform:'uppercase',
                marginBottom:'12px',
              }}>{p.badge}</div>

              <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px',color:'#f1f5f9',lineHeight:1.3}}>
                {p.title}
              </h3>
              <p style={{fontSize:'13px',color:'#64748b',lineHeight:1.75,marginBottom:'20px'}}>
                {p.desc}
              </p>

              {/* Highlights */}
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'20px'}}>
                {p.highlights.map((h,hi) => (
                  <span key={hi} style={{
                    padding:'3px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:500,
                    background:`${p.color}10`,border:`1px solid ${p.color}20`,color:p.color,
                  }}>{h}</span>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px',paddingTop:'16px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                {p.tech.map((t,ti) => (
                  <span key={ti} style={{
                    padding:'4px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:500,
                    background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',
                    color:'#475569',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{textAlign:'center',marginTop:'48px',
          opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(20px)',
          transition:'all 0.7s ease 0.5s',
        }}>
          <a href="https://github.com/kiranmailar3111-RRR" target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex',alignItems:'center',gap:'10px',
              padding:'14px 32px',borderRadius:'12px',fontSize:'14px',fontWeight:600,
              background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',
              color:'#94a3b8',textDecoration:'none',transition:'all 0.3s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(59,130,246,0.4)';e.currentTarget.style.color='#f1f5f9';e.currentTarget.style.background='rgba(59,130,246,0.08)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='#94a3b8';e.currentTarget.style.background='rgba(255,255,255,0.04)'}}
          >
            View More on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
