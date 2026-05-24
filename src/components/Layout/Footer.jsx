import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '4rem 5vw 2rem',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        background: 'var(--color-dark)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}
      >
        {/* Brand */}
        <div className="footer-reveal">
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
            }}
          >
            Aurélian
          </h3>
          <p className="body-text" style={{ maxWidth: '280px', fontSize: '0.85rem' }}>
            Where timeless elegance meets modern sophistication. Every moment, crafted to perfection.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-reveal">
          <h4 className="label-text" style={{ marginBottom: '1.5rem' }}>Explore</h4>
          {['Experience', 'Suites', 'Dining', 'Wellness', 'Gallery'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--color-white-soft)',
                textDecoration: 'none',
                marginBottom: '0.75rem',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-white-soft)'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="footer-reveal">
          <h4 className="label-text" style={{ marginBottom: '1.5rem' }}>Contact</h4>
          <p className="body-text" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            42 Avenue des Champs-Élysées
          </p>
          <p className="body-text" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            75008 Paris, France
          </p>
          <p className="body-text" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            +33 1 23 45 67 89
          </p>
          <p className="body-text" style={{ fontSize: '0.85rem' }}>
            reservations@aurelian.com
          </p>
        </div>

        {/* Social */}
        <div className="footer-reveal">
          <h4 className="label-text" style={{ marginBottom: '1.5rem' }}>Follow Us</h4>
          {['Instagram', 'Facebook', 'Twitter / X', 'LinkedIn'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--color-white-soft)',
                textDecoration: 'none',
                marginBottom: '0.75rem',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-white-soft)'}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="footer-reveal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(201,169,110,0.08)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          © 2026 Aurélian Hotel. All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          Crafted with elegance
        </p>
      </div>
    </footer>
  )
}
