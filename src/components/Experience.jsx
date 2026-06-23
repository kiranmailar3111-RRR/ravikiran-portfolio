import { useRef, useState, useEffect } from 'react'
import { FaLaravel, FaWordpress } from 'react-icons/fa'
import { MdLocationOn, MdCalendarToday, MdBusinessCenter } from 'react-icons/md'

const jobs = [
  {
    RoleIcon: FaLaravel,
    role:'Full Stack Developer — Laravel & Livewire',
    company:'Angika Technologies Pvt Ltd',
    location:'Bengaluru, Karnataka',
    period:'Feb 2024 — Present',
    color:'#3b82f6',
    bullets:[
      'Engineered School Management ERP using Laravel Livewire — attendance, fees, marks cards for 500+ students.',
      'Architected role-based access (Super Admin, Teacher, Student) with Spatie Permissions.',
      'Built automated attendance tracking saving ~3 hrs/week of manual admin work.',
      'Developed PDF report card generation using Laravel DomPDF — one-click for teachers.',
      'Enhanced MySQL performance with Livewire lazy loading and query indexing.',
    ],
    tags:['Laravel','Livewire','PHP','MySQL','Spatie','DomPDF'],
  },
  {
    RoleIcon: FaWordpress,
    role:'WordPress Developer — Client Websites',
    company:'Angika Technologies Pvt Ltd',
    location:'Bengaluru, Karnataka',
    period:'Feb 2024 — Present',
    color:'#8b5cf6',
    bullets:[
      'Produced and launched 25+ WordPress websites — community portals, e-commerce, business sites.',
      'Crafted responsive mobile-first layouts using Elementor, WPBakery, and custom Gutenberg blocks.',
      'Managed Hostinger and cPanel deployments — SSL, domain setup, security hardening.',
      'Executed on-page SEO — meta tags, XML sitemaps, schema markup, Core Web Vitals optimization.',
    ],
    tags:['WordPress','Elementor','WooCommerce','Hostinger','cPanel','Yoast SEO'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} style={{
      padding:'120px 60px',maxWidth:'1280px',margin:'0 auto',
      position:'relative',zIndex:1,
    }}>
      <div style={{
        opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(30px)',
        transition:'all 0.7s ease',marginBottom:'64px',
      }}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',color:'#60a5fa',textTransform:'uppercase',marginBottom:'12px'}}>Work Experience</div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(32px,4vw,48px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Where I've <span style={{background:'linear-gradient(135deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>worked</span>
        </h2>
        <div style={{width:'60px',height:'3px',background:'linear-gradient(90deg,#3b82f6,#8b5cf6)',borderRadius:'2px'}}/>
      </div>

      <div style={{position:'relative',paddingLeft:'40px'}}>
        {/* Timeline line */}
        <div style={{
          position:'absolute',left:0,top:'12px',bottom:0,width:'1px',
          background:'linear-gradient(to bottom,#3b82f6,#8b5cf6,transparent)',
        }}/>

        {jobs.map((j, i) => (
          <div key={i} style={{
            position:'relative',marginBottom:'40px',
            opacity:visible?1:0,
            transform:visible?'translateX(0)':'translateX(-30px)',
            transition:`all 0.7s ease ${i*0.2}s`,
          }}>
            {/* Dot */}
            <div style={{
              position:'absolute',left:'-46px',top:'20px',
              width:'14px',height:'14px',borderRadius:'50%',
              background:j.color,border:'2px solid #020817',
              boxShadow:`0 0 0 4px ${j.color}30, 0 0 20px ${j.color}60`,
            }}/>

            <div style={{
              padding:'36px',borderRadius:'20px',
              background:'rgba(255,255,255,0.03)',
              border:`1px solid rgba(255,255,255,0.07)`,
              backdropFilter:'blur(10px)',
              transition:'all 0.3s',
            }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=j.color+'44'
                e.currentTarget.style.background=`${j.color}08`
                e.currentTarget.style.boxShadow=`0 20px 60px ${j.color}15`
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'
                e.currentTarget.style.background='rgba(255,255,255,0.03)'
                e.currentTarget.style.boxShadow='none'
              }}
            >
              <div style={{display:'flex',gap:'16px',marginBottom:'20px'}}>
                {/* Role logo */}
                <div style={{
                  width:'52px',height:'52px',borderRadius:'14px',flexShrink:0,
                  background:`${j.color}15`,border:`1px solid ${j.color}30`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                }}>
                  <j.RoleIcon size={24} color={j.color} />
                </div>

                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px',flexWrap:'wrap',gap:'12px'}}>
                    <div style={{fontSize:'19px',fontWeight:700,color:'#f1f5f9'}}>{j.role}</div>
                    <div style={{
                      display:'flex',alignItems:'center',gap:'6px',
                      padding:'6px 16px',borderRadius:'100px',fontSize:'12px',fontWeight:600,
                      background:`${j.color}18`,border:`1px solid ${j.color}35`,color:j.color,
                      whiteSpace:'nowrap',
                    }}>
                      <MdCalendarToday size={13} />
                      {j.period}
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'14px',fontSize:'14px',fontWeight:600,color:j.color,flexWrap:'wrap'}}>
                    <span style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      <MdBusinessCenter size={15} />
                      {j.company}
                    </span>
                    <span style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      <MdLocationOn size={15} />
                      {j.location}
                    </span>
                  </div>
                </div>
              </div>

              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
                {j.bullets.map((b, bi) => (
                  <li key={bi} style={{
                    fontSize:'14px',color:'#94a3b8',paddingLeft:'20px',
                    position:'relative',lineHeight:1.65,
                  }}>
                    <span style={{position:'absolute',left:0,color:j.color,fontWeight:700}}>▹</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {j.tags.map((t,ti) => (
                  <span key={ti} style={{
                    padding:'4px 12px',borderRadius:'6px',fontSize:'11px',fontWeight:500,
                    background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
                    color:'#64748b',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
