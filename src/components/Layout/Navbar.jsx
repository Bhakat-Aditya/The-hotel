import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Experience', href: '/#about' },
  { label: 'Suites', href: '/suites' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Dining', href: '/restaurant' },
  { label: 'Wellness', href: '/spa' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)

    if (href.startsWith('/#')) {
      // Hash link — go to home then scroll to section
      const hash = href.replace('/', '')
      if (isHome) {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        // Wait for navigation then scroll
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 800)
      }
    } else {
      // Regular route
      navigate(href)
    }
  }

  const menuVariants = {
    closed: { clipPath: 'circle(0% at calc(100% - 3rem) 2rem)' },
    open: { clipPath: 'circle(150% at calc(100% - 3rem) 2rem)' },
  }

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: isScrolled ? '1rem 5vw' : '1.5rem 5vw',
          background: isScrolled || !isHome ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: isScrolled || !isHome ? 'blur(20px)' : 'none',
          borderBottom: isScrolled || !isHome ? '1px solid rgba(201,169,110,0.1)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
            color: 'var(--color-gold)',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          Aurélian
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-white-soft)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-white-soft)'}
            >
              {link.label}
            </button>
          ))}
          <button
            className="btn-outline"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}
            onClick={() => handleNavClick('/#contact')}
          >
            <span>Book Now</span>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 1002,
            padding: '0.5rem',
          }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{ width: 24, height: 1.5, background: 'var(--color-gold)', display: 'block', transformOrigin: 'center' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            style={{ width: 24, height: 1.5, background: 'var(--color-gold)', display: 'block' }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{ width: 24, height: 1.5, background: 'var(--color-gold)', display: 'block', transformOrigin: 'center' }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'var(--color-dark)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                custom={i}
                variants={linkVariants}
                initial="closed"
                animate="open"
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                  color: 'var(--color-cream)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
