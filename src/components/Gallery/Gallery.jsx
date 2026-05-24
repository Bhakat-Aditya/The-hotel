import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/hotel-exterior.png', alt: 'Hotel Exterior', title: 'The Arrival' },
  { src: '/images/hotel-lobby.png', alt: 'Grand Lobby', title: 'Grand Lobby' },
  { src: '/images/suite-presidential.png', alt: 'Presidential Suite', title: 'Presidential Suite' },
  { src: '/images/suite-deluxe.png', alt: 'Deluxe Suite', title: 'Ocean Retreat' },
  { src: '/images/restaurant-dining.png', alt: 'Fine Dining', title: 'Culinary Arts' },
  { src: '/images/pool-amenity.png', alt: 'Infinity Pool', title: 'Azure Waters' },
  { src: '/images/spa-wellness.png', alt: 'Spa & Wellness', title: 'Inner Peace' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading reveal
      gsap.from('.gallery-heading', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // 2. Native GSAP Pinning
      // We pin the 100vh stage, and tell GSAP to scroll for N screens
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: `+=${galleryImages.length * 100}%`, // Pins and scrubs over this distance
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        }
      })

      const NUM_COLS = 6

      // 3. Sequence the layers onto the timeline
      galleryImages.forEach((_, layerIndex) => {
        if (layerIndex === 0) return 

        tl.fromTo(
          `.mask-rect-${layerIndex}`, 
          { attr: { width: 0 } },
          {
            attr: { width: 100 / NUM_COLS + 0.5 },
            ease: 'none', 
            stagger: 0.05, 
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert() 
  }, [])

  const NUM_COLS = 6

  return (
    <section ref={sectionRef} id="gallery" style={{ position: 'relative' }}>
      {/* Header */}
      <div
        className="gallery-heading section-padding"
        style={{
          textAlign: 'center',
          paddingBottom: '4rem',
        }}
      >
        <p className="label-text" style={{ marginBottom: '1rem' }}>Visual Journey</p>
        <div className="gold-line-center" style={{ marginBottom: '2rem' }} />
        <h2 className="heading-lg">
          A Glimpse of <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Paradise</span>
        </h2>
      </div>

      {/* SVG Mask Gallery Stage */}
      <div
        ref={stageRef}
        style={{
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {galleryImages.map((img, layerIndex) => (
          <svg
            key={img.src}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: layerIndex + 1,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {layerIndex > 0 && (
              <defs>
                <mask id={`gallery-mask-${layerIndex}`}>
                  {Array.from({ length: NUM_COLS }).map((_, colIndex) => (
                    <rect
                      key={colIndex}
                      className={`mask-rect-${layerIndex}`} 
                      x={`${(100 / NUM_COLS) * colIndex}`}
                      y="0"
                      width="0"
                      height="100"
                      fill="white"
                    />
                  ))}
                </mask>
              </defs>
            )}
            <image
              href={img.src}
              x="0"
              y="0"
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid slice"
              mask={layerIndex > 0 ? `url(#gallery-mask-${layerIndex})` : undefined}
            />
          </svg>
        ))}

        {/* Title overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '5vw',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <p
            className="label-text"
            style={{
              marginBottom: '0.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Gallery
          </p>
          <h3
            className="heading-md"
            style={{
              color: 'var(--color-cream)',
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}
          >
            Scroll Through Our World
          </h3>
        </div>

        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.3) 100%)',
            zIndex: 99,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}