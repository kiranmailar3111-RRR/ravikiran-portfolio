import { useRef, useState, useEffect } from 'react'
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPhp, FaLaravel, FaNodeJs,
  FaWordpress, FaShopify, FaJoomla, FaGitAlt, FaGithub, FaFigma, FaCode,
} from 'react-icons/fa'
import {
  SiTailwindcss, SiBootstrap, SiVite, SiMysql, SiPhpmyadmin,
  SiWoocommerce, SiElementor, SiPostman, SiCanva,
  SiGooglesheets,
} from 'react-icons/si'

// Maps a skill name to its real brand icon + color. Skills not listed here
// (no clean brand logo available) render as plain text pills.
const skillIcons = {
  'HTML5': { Icon: FaHtml5, color: '#E34F26' },
  'CSS3': { Icon: FaCss3Alt, color: '#1572B6' },
  'JavaScript ES6+': { Icon: FaJsSquare, color: '#F7DF1E' },
  'React.js': { Icon: FaReact, color: '#61DAFB' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Bootstrap': { Icon: SiBootstrap, color: '#7952B3' },
  'Vite': { Icon: SiVite, color: '#646CFF' },
  'PHP': { Icon: FaPhp, color: '#777BB4' },
  'Laravel': { Icon: FaLaravel, color: '#FF2D20' },
  'Livewire': { Icon: FaLaravel, color: '#FB70A9' },
  'Node.js': { Icon: FaNodeJs, color: '#3C873A' },
  'MySQL': { Icon: SiMysql, color: '#4479A1' },
  'phpMyAdmin': { Icon: SiPhpmyadmin, color: '#6C78AF' },
  'WordPress': { Icon: FaWordpress, color: '#21759B' },
  'WooCommerce': { Icon: SiWoocommerce, color: '#96588A' },
  'Shopify': { Icon: FaShopify, color: '#7AB55C' },
  'Joomla': { Icon: FaJoomla, color: '#5091CD' },
  'Elementor': { Icon: SiElementor, color: '#92003B' },
  'Git & GitHub': { Icon: FaGitAlt, color: '#F05032' },
  'Postman': { Icon: SiPostman, color: '#FF6C37' },
  'VS Code': { Icon: FaCode, color: '#007ACC' },
  'Canva': { Icon: SiCanva, color: '#00C4CC' },
  'Figma': { Icon: FaFigma, color: '#F24E1E' },
  'MS Excel': { Icon: SiGooglesheets, color: '#21A366' },
}

const skillGroups = [
  { label:'Frontend', color:'#3b82f6', skills:['HTML5','CSS3','JavaScript ES6+','React.js','Tailwind CSS','Bootstrap','Vite','Recharts','jsPDF'] },
  { label:'Backend', color:'#8b5cf6', skills:['PHP','Laravel','Livewire','Node.js','Express.js','REST API','Sanctum','JWT','Laravel Breeze'] },
  { label:'Database', color:'#06b6d4', skills:['MySQL','Eloquent ORM','Query Builder','phpMyAdmin','Database Design','Migrations'] },
  { label:'CMS & E-Commerce', color:'#10b981', skills:['WordPress','WooCommerce','Shopify','Joomla','Elementor','WPBakery'] },
  { label:'Tools & DevOps', color:'#f59e0b', skills:['Git & GitHub','cPanel','Hostinger','Postman','VS Code','Canva','MS Excel'] },
  { label:'AI & Integrations', color:'#ef4444', skills:['Groq API','LLaMA 3 (8B)','Google Analytics','Spatie Permission','SortableJS','DomPDF','WhatsApp API'] },
]

export default function Skills() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} style={{
      padding:'120px 60px',position:'relative',zIndex:1,
      background:'linear-gradient(180deg,transparent,rgba(10,15,30,0.4),transparent)',
    }}>
      <div style={{maxWidth:'1280px',margin:'0 auto'}}>
        <div style={{marginBottom:'64px',
          opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(30px)',
          transition:'all 0.7s ease',
        }}>
          <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',color:'#60a5fa',textTransform:'uppercase',marginBottom:'12px'}}>Technical Skills</div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(32px,4vw,48px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:'16px'}}>
            My tech <span style={{background:'linear-gradient(135deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>arsenal</span>
          </h2>
          <div style={{width:'60px',height:'3px',background:'linear-gradient(90deg,#3b82f6,#8b5cf6)',borderRadius:'2px'}}/>
        </div>

        <div className="skills-grid-cols" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}}>
          {skillGroups.map((g, gi) => (
            <div key={gi}
              style={{
                padding:'28px',borderRadius:'20px',
                background: hovered===gi ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${hovered===gi ? g.color+'44' : 'rgba(255,255,255,0.07)'}`,
                backdropFilter:'blur(10px)',
                transition:'all 0.35s ease',cursor:'default',
                opacity:visible?1:0,
                transform:visible?'translateY(0)':'translateY(30px)',
                transitionDelay:`${gi*0.08}s`,
                boxShadow: hovered===gi ? `0 20px 60px ${g.color}15` : 'none',
              }}
              onMouseEnter={()=>setHovered(gi)}
              onMouseLeave={()=>setHovered(null)}
            >
              <div style={{
                fontSize:'11px',fontWeight:700,letterSpacing:'0.15em',
                color:g.color,textTransform:'uppercase',marginBottom:'20px',
                display:'flex',alignItems:'center',gap:'10px',
              }}>
                <div style={{width:'24px',height:'2px',background:g.color,borderRadius:'1px'}}/>
                {g.label}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {g.skills.map((s,si) => {
                  const iconData = skillIcons[s]
                  return (
                    <span key={si} style={{
                      display:'flex',alignItems:'center',gap:'7px',
                      padding:'6px 14px',borderRadius:'100px',fontSize:'12px',fontWeight:500,
                      background:`${g.color}12`,
                      border:`1px solid ${g.color}25`,
                      color:'#94a3b8',
                      transition:'all 0.2s',cursor:'default',
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.color='#f1f5f9';e.currentTarget.style.background=g.color+'22';e.currentTarget.style.borderColor=g.color+'55'}}
                      onMouseLeave={e=>{e.currentTarget.style.color='#94a3b8';e.currentTarget.style.background=g.color+'12';e.currentTarget.style.borderColor=g.color+'25'}}
                    >
                      {iconData && <iconData.Icon size={20} color={iconData.color} />}
                      {s}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
