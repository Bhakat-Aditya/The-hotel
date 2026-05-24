import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const rooms = [
  {
    name: 'Presidential Suite',
    description: 'A 200m² sanctuary featuring panoramic skyline views, private terrace, and bespoke furnishings by Italian artisans.',
    image: '/images/suite-presidential.png',
    price: '€2,400',
    features: ['Panoramic Views', 'Private Terrace', 'Butler Service'],
  },
  {
    name: 'Deluxe Ocean Suite',
    description: 'Wake to the sound of waves in this 120m² oceanfront retreat with floor-to-ceiling windows and private balcony.',
    image: '/images/suite-deluxe.png',
    price: '€1,200',
    features: ['Ocean View', 'Private Balcony', 'Rain Shower'],
  },
  {
    name: 'Grand Lobby Experience',
    description: 'Our signature common spaces feature soaring ceilings, crystal chandeliers, and curated art from local masters.',
    image: '/images/hotel-lobby.png',
    price: '€800',
    features: ['Heritage Design', 'Art Collection', '24/7 Concierge'],
  },
]

export default function Rooms() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.rooms-heading', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Card stagger reveal
      gsap.from('.room-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.rooms-grid',
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="section-padding"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="rooms-heading" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <p className="label-text" style={{ marginBottom: '1rem' }}>Accommodations</p>
        <div className="gold-line-center" style={{ marginBottom: '2rem' }} />
        <h2 className="heading-lg">
          Curated <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Suites</span>
        </h2>
      </div>

      {/* Grid */}
      <div
        className="rooms-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '2rem',
        }}
      >
        {rooms.map((room, i) => (
          <motion.div
            key={room.name}
            className="room-card glass-card img-hover-zoom"
            whileHover={{ y: -10, transition: { duration: 0.4 } }}
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src={room.image}
                alt={`${room.name} — Aurélian Hotel`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Price tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(10,10,10,0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.1em',
                }}
              >
                From {room.price} / night
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '1.5rem' }}>
              <h3 className="heading-sm" style={{ marginBottom: '0.75rem', color: 'var(--color-cream)' }}>
                {room.name}
              </h3>
              <p className="body-text" style={{ fontSize: '0.85rem', marginBottom: '1.25rem', opacity: 0.7 }}>
                {room.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {room.features.map((feature) => (
                  <span
                    key={feature}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      padding: '0.35rem 0.75rem',
                      border: '1px solid rgba(201,169,110,0.2)',
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
