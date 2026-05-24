import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Victoria Ashford',
    title: 'Art Collector, London',
    quote: 'Aurélian isn\'t just a hotel — it\'s a masterpiece you inhabit. Every corner reveals new beauty, every moment feels curated by artists.',
    rating: 5,
  },
  {
    name: 'Maximilian Roth',
    title: 'CEO, Roth Capital',
    quote: 'After two decades of luxury travel, Aurélian redefined what I thought was possible. The presidential suite is simply otherworldly.',
    rating: 5,
  },
  {
    name: 'Isabella Chen',
    title: 'Fashion Designer, Milan',
    quote: 'The attention to detail is staggering — from the hand-stitched linens to the bespoke fragrances. Pure, unadulterated luxury.',
    rating: 5,
  },
  {
    name: 'James Whitfield',
    title: 'Travel Editor, Condé Nast',
    quote: 'In an age of homogenized luxury, Aurélian stands apart. It possesses the rare quality of making the extraordinary feel effortless.',
    rating: 5,
  },
  {
    name: 'Sophia Laurent',
    title: 'Michelin Inspector',
    quote: 'Le Jardin Doré alone is worth the journey. But combined with the hotel\'s impeccable service, it becomes a transcendent experience.',
    rating: 5,
  },
  {
    name: 'Alexander Volkov',
    title: 'Film Director, Moscow',
    quote: 'I\'ve shot in hundreds of locations worldwide. Aurélian has a cinematic quality that no set designer could replicate.',
    rating: 5,
  },
]

// Double the array for seamless infinite scroll
const doubledTestimonials = [...testimonials, ...testimonials]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-heading', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <div className="testimonials-heading" style={{ textAlign: 'center', padding: '0 5vw', marginBottom: '4rem' }}>
        <p className="label-text" style={{ marginBottom: '1rem' }}>Guest Voices</p>
        <div className="gold-line-center" style={{ marginBottom: '2rem' }} />
        <h2 className="heading-lg">
          Stories of <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Enchantment</span>
        </h2>
      </div>

      {/* Marquee Row 1 */}
      <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div className="marquee-track">
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Reverse direction */}
      <div style={{ overflow: 'hidden' }}>
        <div
          className="marquee-track"
          style={{ animationDirection: 'reverse', animationDuration: '50s' }}
        >
          {[...doubledTestimonials].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="glass-card"
      style={{
        minWidth: '380px',
        maxWidth: '380px',
        padding: '2rem',
        marginRight: '1.5rem',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: 'var(--color-cream)',
          lineHeight: 1.6,
          opacity: 0.9,
          flex: 1,
        }}
      >
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)', paddingTop: '1rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--color-cream)',
          }}
        >
          {testimonial.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.05em',
          }}
        >
          {testimonial.title}
        </p>
      </div>
    </div>
  )
}
