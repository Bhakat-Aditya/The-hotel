import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Dining() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveals
      gsap.from('.dining-reveal', {
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

      // Menu items stagger
      gsap.from('.menu-item', {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.menu-list',
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const menuHighlights = [
    { name: 'Truffle Risotto', desc: 'Black winter truffle, aged parmesan, saffron', price: '€68' },
    { name: 'Wagyu Tenderloin', desc: 'A5 grade, smoked bone marrow, seasonal roots', price: '€145' },
    { name: 'Dover Sole Meunière', desc: 'Brown butter, capers, heirloom potatoes', price: '€92' },
    { name: 'Grand Dessert', desc: 'Five-course pastry experience, seasonal fruits', price: '€55' },
  ]

  return (
    <section
      ref={sectionRef}
      id="dining"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Full-bleed Background */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '120%',
          zIndex: 1,
        }}
      >
        <img
          ref={imageRef}
          src="/images/restaurant-dining.png"
          alt="Aurélian Hotel — Fine dining restaurant"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.3) 100%)',
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
          maxWidth: '700px',
        }}
      >
        <p className="label-text dining-reveal" style={{ marginBottom: '1.5rem' }}>Culinary Arts</p>
        <div className="gold-line dining-reveal" style={{ marginBottom: '2rem' }} />
        <h2 className="heading-lg dining-reveal" style={{ marginBottom: '1.5rem' }}>
          A Feast for <br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Every Sense</span>
        </h2>
        <p className="body-text dining-reveal" style={{ marginBottom: '3rem', maxWidth: '500px' }}>
          Our Michelin-starred restaurant, <em>Le Jardin Doré</em>, presents an evolving menu
          that celebrates French haute cuisine with modern global influences. Each dish is a
          masterpiece, crafted from the finest seasonal ingredients.
        </p>

        {/* Menu Highlights */}
        <div className="menu-list" style={{ marginBottom: '2.5rem' }}>
          {menuHighlights.map((item) => (
            <div
              key={item.name}
              className="menu-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(201,169,110,0.1)',
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: 'var(--color-cream)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.name}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    color: 'var(--color-white-soft)',
                    opacity: 0.5,
                    fontStyle: 'italic',
                  }}
                >
                  {item.desc}
                </p>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  color: 'var(--color-gold)',
                  whiteSpace: 'nowrap',
                  marginLeft: '1rem',
                }}
              >
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <button className="btn-luxury dining-reveal">
          <span>Reserve a Table</span>
        </button>
      </div>
    </section>
  )
}
