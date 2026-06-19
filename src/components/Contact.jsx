import { useRef, useState, useEffect } from 'react'

const links = [
  { icon:'📧', label:'Email', value:'kiranmailar3111@gmail.com', href:'mailto:kiranmailar3111@gmail.com', color:'#3b82f6' },
  { icon:'💼', label:'LinkedIn', value:'ravi-kiran-1a7010247', href:'https://linkedin.com/in/ravi-kiran-1a7010247', color:'#0077b5' },
  { icon:'🐙', label:'GitHub', value:'kiranmailar3111-RRR', href:'https://github.com/kiranmailar3111-RRR', color:'#6e7681' },
  { icon:'📱', label:'Phone', value:'+91 9743330294', href:'tel:+919743330294', color:'#10b981' },
]

export default function Contact() {
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
    <section id="contact" ref={ref} style={{
      padding:'120px 60px',maxWidth:'900px',margin:'0 auto',
      position:'relative',zIndex:1,textAlign:'center',
    }}>
      <div style={{
        padding:'72px 60px',borderRadius:'28px',
        background:'rgba(255,255,255,0.025)',
        border:'1px solid rgba(255,255,255,0.07)',
        backdropFilter:'blur(24px)',
        position:'relative',overflow:'hidden',
        opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(40px)',
        transition:'all 0.8s ease',
      }}>
        {/* Top glow */}
        <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:'1px',background:'linear-gradient(90deg,transparent,#3b82f6,#8b5cf6,transparent)'}}/>
        {/* Corner orbs */}
        <div style={{position:'absolute',top:'-60px',right:'-60px',width:'200px',height:'200px',borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.08),transparent)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'-60px',left:'-60px',width:'200px',height:'200px',borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.08),transparent)',pointerEvents:'none'}}/>

        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',color:'#60a5fa',textTransform:'uppercase',marginBottom:'16px'}}>
          Get In Touch
        </div>
        <h2 style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:'clamp(28px,5vw,52px)',fontWeight:700,
          marginBottom:'20px',letterSpacing:'-0.02em',lineHeight:1.1,
        }}>
          Let's work{' '}
          <span style={{background:'linear-gradient(135deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>together</span>
        </h2>
        <p style={{fontSize:'16px',color:'#94a3b8',marginBottom:'56px',lineHeight:1.8,maxWidth:'520px',margin:'0 auto 56px'}}>
          I'm currently open to new opportunities. Whether you have a project, a role to discuss, or just want to connect — my inbox is always open.
        </p>

        <div className="contact-links-grid" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px',maxWidth:'600px',margin:'0 auto 40px'}}>
          {links.map((l,i) => (
            <a key={i} href={l.href} target={l.href.startsWith('http')?'_blank':undefined}
              rel="noopener noreferrer"
              style={{
                display:'flex',alignItems:'center',gap:'14px',
                padding:'18px 22px',borderRadius:'14px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                color:'#94a3b8',textDecoration:'none',
                transition:'all 0.3s',textAlign:'left',
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=l.color+'55'
                e.currentTarget.style.background=l.color+'10'
                e.currentTarget.style.color='#f1f5f9'
                e.currentTarget.style.transform='translateY(-3px)'
                e.currentTarget.style.boxShadow=`0 12px 40px ${l.color}20`
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'
                e.currentTarget.style.background='rgba(255,255,255,0.03)'
                e.currentTarget.style.color='#94a3b8'
                e.currentTarget.style.transform='translateY(0)'
                e.currentTarget.style.boxShadow='none'
              }}
            >
              <span style={{fontSize:'24px'}}>{l.icon}</span>
              <div>
                <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'0.08em',color:'#475569',textTransform:'uppercase',marginBottom:'2px'}}>{l.label}</div>
                <div style={{fontSize:'13px',fontWeight:500}}>{l.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{
          display:'inline-flex',alignItems:'center',gap:'8px',
          padding:'6px 16px',borderRadius:'100px',
          background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',
          fontSize:'12px',color:'#34d399',fontWeight:500,
        }}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10b981',boxShadow:'0 0 6px #10b981',animation:'pulse2 2s infinite'}}/>
          Available for new opportunities · Bengaluru, India
        </div>
      </div>
      <style>{`@keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  )
}
