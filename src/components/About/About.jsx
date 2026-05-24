import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 1892, label: 'Established' },
  { value: 147, label: 'Luxury Suites' },
  { value: 12, label: 'Restaurants' },
  { value: 98, label: 'Guest Satisfaction %' },
]

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const imageWrapperRef = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      gsap.fromTo(
        imageWrapperRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveals
      gsap.from('.about-text-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Counter animations
      counterRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: stats[i].value,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
      >
        {/* Image */}
        <div
          ref={imageWrapperRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '3/4',
            maxHeight: '70vh',
          }}
        >
          <img
            ref={imageRef}
            src="/images/hotel-lobby.png"
            alt="Aurélian Hotel — Grand lobby interior"
            style={{
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          {/* Gold border accent */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              right: '1rem',
              bottom: '1rem',
              border: '1px solid rgba(201,169,110,0.2)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Text Content */}
        <div>
          <p className="label-text about-text-reveal" style={{ marginBottom: '1.5rem' }}>
            The Experience
          </p>
          <div className="gold-line about-text-reveal" style={{ marginBottom: '2rem' }} />
          <h2 className="heading-lg about-text-reveal" style={{ marginBottom: '2rem' }}>
            A Legacy of <br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Timeless</span> Luxury
          </h2>
          <p className="body-text about-text-reveal" style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
            Since 1892, Aurélian has been the epitome of refined hospitality. Nestled in the heart
            of Paris, our hotel blends centuries of tradition with contemporary elegance, offering
            an experience that transcends the ordinary.
          </p>
          <p className="body-text about-text-reveal" style={{ marginBottom: '3rem', maxWidth: '500px' }}>
            Every detail — from the hand-selected linens to the bespoke fragrances that linger
            in our corridors — is curated to awaken the senses and create memories that last
            a lifetime.
          </p>

          {/* Stats */}
          <div
            className="about-text-reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              borderTop: '1px solid rgba(201,169,110,0.15)',
              paddingTop: '2rem',
            }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <span
                  ref={(el) => (counterRefs.current[i] = el)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: 'var(--color-gold)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  0
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-white-soft)',
                    opacity: 0.6,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
