import { useState, useEffect } from 'react'

const links = ['About','Skills','Experience','Projects','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    const onResize = () => setIsMobile(window.innerWidth <= 860)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        padding: isMobile ? '0 20px' : '0 60px',
        height:'70px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        background: scrolled ? 'rgba(2,8,23,0.92)' : 'rgba(2,8,23,0.6)',
        backdropFilter:'blur(24px)',
        borderBottom:`1px solid ${scrolled ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)'}`,
        transition:'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily:"'Space Grotesk',sans-serif",fontSize:'22px',fontWeight:800,
          background:'linear-gradient(135deg,#fff 0%,#60a5fa 60%,#a78bfa 100%)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
          backgroundClip:'text',letterSpacing:'-0.02em',cursor:'pointer',
          zIndex:1001,
        }} onClick={() => { window.scrollTo({top:0,behavior:'smooth'}); setMenuOpen(false) }}>RK.</div>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{display:'flex',gap:'36px',alignItems:'center'}}>
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{
                  background:'none',border:'none',cursor:'pointer',
                  color: active===l ? '#60a5fa' : '#94a3b8',
                  fontSize:'14px',fontWeight:500,padding:'4px 0',
                  position:'relative',transition:'color 0.2s',
                  fontFamily:'Inter,sans-serif',
                }}
                onMouseEnter={e => e.target.style.color='#f1f5f9'}
                onMouseLeave={e => e.target.style.color = active===l ? '#60a5fa' : '#94a3b8'}
              >{l}</button>
            ))}
            <a href="mailto:kiranmailar3111@gmail.com" style={{
              padding:'10px 24px',borderRadius:'10px',fontSize:'13px',fontWeight:600,
              background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'#fff',
              border:'none',cursor:'pointer',textDecoration:'none',
              boxShadow:'0 4px 20px rgba(59,130,246,0.3)',
              transition:'all 0.2s',display:'inline-block',
            }}
              onMouseEnter={e => e.target.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform='translateY(0)'}
            >Hire Me</a>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width:'40px',height:'40px',background:'none',border:'none',
              cursor:'pointer',display:'flex',flexDirection:'column',
              justifyContent:'center',alignItems:'center',gap:'5px',
              zIndex:1001,
            }}
          >
            <span style={{
              width:'22px',height:'2px',background:'#f1f5f9',borderRadius:'2px',
              transition:'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none',
            }}/>
            <span style={{
              width:'22px',height:'2px',background:'#f1f5f9',borderRadius:'2px',
              transition:'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }}/>
            <span style={{
              width:'22px',height:'2px',background:'#f1f5f9',borderRadius:'2px',
              transition:'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
            }}/>
          </button>
        )}
      </nav>

      {/* Mobile fullscreen menu */}
      {isMobile && (
        <div style={{
          position:'fixed',inset:0,zIndex:999,
          background:'rgba(2,8,23,0.98)',
          backdropFilter:'blur(20px)',
          display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',gap:'32px',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
          transition:'all 0.35s ease',
        }}>
          {links.map((l,i) => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{
                background:'none',border:'none',cursor:'pointer',
                color: active===l ? '#60a5fa' : '#f1f5f9',
                fontSize:'24px',fontWeight:600,
                fontFamily:"'Space Grotesk',sans-serif",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
                transition:`all 0.4s ease ${i*0.06}s`,
              }}
            >{l}</button>
          ))}
          <a href="mailto:kiranmailar3111@gmail.com"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop:'16px',
              padding:'14px 36px',borderRadius:'12px',fontSize:'15px',fontWeight:600,
              background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'#fff',
              textDecoration:'none',
              boxShadow:'0 4px 20px rgba(59,130,246,0.3)',
              opacity: menuOpen ? 1 : 0,
              transition:'all 0.4s ease 0.3s',
            }}
          >Hire Me</a>
        </div>
      )}
    </>
  )
}
