import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const suites = [
  {
    name: 'Presidential Suite',
    tagline: 'The Pinnacle of Luxury',
    description: 'A 200m² sanctuary on the top floor featuring panoramic 360° skyline views, a private terrace with hot tub, bespoke Italian furnishings, a grand piano, and dedicated butler service.',
    image: '/images/suite-presidential.png',
    size: '200m²',
    price: 'From €2,400 / night',
    highlights: ['360° Panoramic Views', 'Private Terrace & Hot Tub', 'Grand Piano', 'Butler Service', 'Separate Living & Dining', 'Walk-in Dressing Room'],
  },
  {
    name: 'Deluxe Ocean Suite',
    tagline: 'Where Sea Meets Sky',
    description: 'A 120m² oceanfront retreat with floor-to-ceiling windows, private balcony overlooking the Mediterranean, rainfall shower, freestanding bathtub, and morning sunrise breakfast service.',
    image: '/images/suite-deluxe.png',
    size: '120m²',
    price: 'From €1,200 / night',
    highlights: ['Direct Ocean View', 'Private Balcony', 'Freestanding Bathtub', 'Rain Shower', 'King Bed', 'Nespresso Machine'],
  },
  {
    name: 'Royal Garden Suite',
    tagline: 'Nature\'s Embrace',
    description: 'A 150m² ground-floor suite with direct access to the private gardens. Features a sunken living area, outdoor dining terrace, and a private meditation corner surrounded by nature.',
    image: '/images/hotel-lobby.png',
    size: '150m²',
    price: 'From €1,800 / night',
    highlights: ['Private Garden Access', 'Sunken Living Area', 'Outdoor Dining Terrace', 'Meditation Corner', 'Fireplace', 'King Bed'],
  },
  {
    name: 'Classic Elegance',
    tagline: 'Timeless Sophistication',
    description: 'A 65m² room embodying Parisian elegance. Herringbone oak floors, curated art collection, marble bathroom with double vanity, and a cozy reading nook by the window.',
    image: '/images/hotel-exterior.png',
    size: '65m²',
    price: 'From €800 / night',
    highlights: ['City or Garden View', 'Marble Bathroom', 'Reading Nook', 'Art Collection', 'Queen Bed', 'Complimentary Mini-Bar'],
  },
]

export default function SuitesPage() {
  const pageRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero content reveal
      gsap.from('.suites-hero-content > *', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Suite cards stagger
      gsap.from('.suite-card', {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.suites-grid',
          start: 'top 80%',
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>Luxury Suites — Aurélian Hotel</title>
        <meta name="description" content="Discover 4 exclusive suite collections at Aurélian Hotel Paris. Presidential, Deluxe Ocean, Royal Garden, and Classic Elegance — each a masterpiece." />
      </Helmet>

      {/* Hero */}
      <section className="amenity-hero" style={{ height: '60vh' }}>
        <img
          className="amenity-hero-image"
          src="/images/suite-presidential.png"
          alt="Aurélian Hotel — Luxury suite collection"
        />
        <div className="amenity-hero-overlay" />
        <div className="amenity-hero-content suites-hero-content">
          <button onClick={() => navigate('/')} className="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Hotel
          </button>
          <p className="label-text" style={{ marginBottom: '1rem', marginTop: '1rem' }}>4 Exclusive Collections</p>
          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
          <h1 className="heading-xl">Our Suites</h1>
        </div>
      </section>

      {/* Suite Cards */}
      <section className="section-padding suites-grid">
        {suites.map((suite, i) => (
          <motion.div
            key={suite.name}
            className="suite-card"
            whileHover={{ scale: 1.01 }}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr',
              gap: '0',
              marginBottom: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(201,169,110,0.08)',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'default',
              minHeight: '400px',
            }}
          >
            {/* Image */}
            <div
              className="img-hover-zoom"
              style={{
                order: i % 2 === 0 ? 1 : 2,
                aspectRatio: '4/3',
                overflow: 'hidden',
              }}
            >
              <img
                src={suite.image}
                alt={`${suite.name} — Aurélian Hotel`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                padding: 'clamp(1.5rem, 3vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                order: i % 2 === 0 ? 2 : 1,
              }}
            >
              <p className="label-text" style={{ marginBottom: '0.75rem' }}>{suite.tagline}</p>
              <h2 className="heading-md" style={{ marginBottom: '0.75rem', color: 'var(--color-cream)' }}>
                {suite.name}
              </h2>
              <div className="gold-line" style={{ marginBottom: '1rem' }} />
              <p className="body-text" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {suite.description}
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {suite.highlights.map((h) => (
                  <span
                    key={h}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      padding: '0.3rem 0.6rem',
                      border: '1px solid rgba(201,169,110,0.15)',
                      borderRadius: '4px',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Price & Size */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-gold)' }}>
                    {suite.price}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-white-soft)', opacity: 0.5, marginLeft: '1rem' }}>
                    {suite.size}
                  </span>
                </div>
                <button className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.65rem' }} onClick={() => navigate('/#contact')}>
                  <span>Book This Suite</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section
        className="section-padding"
        style={{ textAlign: 'center', background: 'var(--color-dark-light)' }}
      >
        <div className="gold-line-center" style={{ marginBottom: '2rem' }} />
        <h2 className="heading-md" style={{ marginBottom: '1rem' }}>
          Can't <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Decide</span>?
        </h2>
        <p className="body-text" style={{ marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
          Our concierge will help you select the perfect suite based on your preferences, occasion, and desired experience.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-luxury" onClick={() => navigate('/#contact')}>
            <span>Contact Concierge</span>
          </button>
          <button className="btn-outline" onClick={() => navigate('/')}>
            <span>Back to Hotel</span>
          </button>
        </div>
      </section>
    </div>
  )
}
