import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-up background reveal
      gsap.fromTo(
        bgRef.current,
        { scale: 1.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Content reveals
      gsap.from('.contact-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      })

      // Form field underline animation
      const inputs = sectionRef.current.querySelectorAll('.form-field')
      inputs.forEach((input) => {
        const underline = input.querySelector('.field-underline')
        input.querySelector('input, textarea')?.addEventListener('focus', () => {
          gsap.to(underline, { scaleX: 1, duration: 0.4, ease: 'power2.out' })
        })
        input.querySelector('input, textarea')?.addEventListener('blur', () => {
          gsap.to(underline, { scaleX: 0, duration: 0.4, ease: 'power2.out' })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0,
        }}
      >
        <img
          src="/images/pool-amenity.png"
          alt="Aurélian Hotel — Contact"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(10,10,10,0.82)',
          backdropFilter: 'blur(4px)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="section-padding"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
      >
        {/* Left — CTA */}
        <div>
          <p className="label-text contact-reveal" style={{ marginBottom: '1.5rem' }}>Begin Your Journey</p>
          <div className="gold-line contact-reveal" style={{ marginBottom: '2rem' }} />
          <h2 className="heading-lg contact-reveal" style={{ marginBottom: '1.5rem' }}>
            Your <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Extraordinary</span><br />
            Stay Awaits
          </h2>
          <p className="body-text contact-reveal" style={{ marginBottom: '2rem', maxWidth: '450px' }}>
            Let our dedicated reservations team craft your perfect stay. Whether it's a romantic
            getaway, a milestone celebration, or a moment of personal indulgence — we'll ensure
            every detail exceeds your expectations.
          </p>

          {/* Contact Info */}
          <div className="contact-reveal" style={{ marginBottom: '2rem' }}>
            {[
              { label: 'Reservations', value: '+33 1 23 45 67 89' },
              { label: 'Email', value: 'reservations@aurelian.com' },
              { label: 'Address', value: '42 Avenue des Champs-Élysées, Paris' },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--color-cream)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div
          className="glass-card contact-reveal"
          style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}
        >
          <h3 className="heading-sm" style={{ marginBottom: '2rem', color: 'var(--color-cream)' }}>
            Reserve Your Experience
          </h3>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 234 567 890' },
              { name: 'date', label: 'Preferred Date', type: 'text', placeholder: 'DD / MM / YYYY' },
            ].map((field) => (
              <div key={field.name} className="form-field" style={{ position: 'relative' }}>
                <label
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    color: 'var(--color-cream)',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(201,169,110,0.2)',
                    outline: 'none',
                  }}
                />
                <div
                  className="field-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: 'var(--color-gold)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </div>
            ))}

            {/* Message */}
            <div className="form-field" style={{ position: 'relative' }}>
              <label
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Special Requests
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your ideal stay..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-cream)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(201,169,110,0.2)',
                  outline: 'none',
                  resize: 'none',
                }}
              />
              <div
                className="field-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: 'var(--color-gold)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
            </div>

            <button className="btn-luxury" type="submit" style={{ marginTop: '0.5rem' }}>
              <span>Request Reservation</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
