import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hotspots = [
  {
    id: "pool",
    label: "Infinity Pool",
    subtitle: "Rooftop Oasis",
    description: "A stunning rooftop infinity pool with panoramic views",
    route: "/pool",
    image: "/images/pool-amenity.png",
    top: "12%",
    left: "72%",
  },
  {
    id: "suites",
    label: "Luxury Suites",
    subtitle: "4 Exclusive Collections",
    description: "Presidential, Deluxe, Royal & Classic suites",
    route: "/suites",
    image: "/images/suite-presidential.png",
    top: "35%",
    left: "35%",
  },
  {
    id: "gym",
    label: "Fitness Center",
    subtitle: "State of the Art",
    description: "World-class gym with personal trainers",
    route: "/gym",
    image: "/images/gym-fitness.png",
    top: "50%",
    left: "12%",
  },
  {
    id: "restaurant",
    label: "Le Jardin Doré",
    subtitle: "Michelin Starred",
    description: "Fine dining with a French-global fusion menu",
    route: "/restaurant",
    image: "/images/restaurant-dining.png",
    top: "68%",
    left: "65%",
  },
  {
    id: "room-service",
    label: "Room Service",
    subtitle: "Available 24/7",
    description: "Gourmet dining delivered to your suite",
    route: "/room-service",
    image: "/images/room-service.png",
    top: "72%",
    left: "40%",
  },
  {
    id: "spa",
    label: "Elysian Spa",
    subtitle: "Wellness Sanctuary",
    description: "Ancient and modern treatments for body & soul",
    route: "/spa",
    image: "/images/spa-wellness.png",
    top: "58%",
    left: "85%",
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const titleCharsRef = useRef([]);
  const subtitleRef = useRef(null);
  const hotspotsRef = useRef([]);
  const instructionRef = useRef(null);
  const maskRectsRef = useRef([]);
  const navigate = useNavigate();

  const title = "Aurélian";
  const NUM_BLINDS = 8;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleCharsRef.current.filter(Boolean),
        { y: "110%", opacity: 0, rotateX: -90 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: "power4.out",
          delay: 3.2,
        },
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 4 },
      );

      gsap.fromTo(
        instructionRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.7, y: 0, duration: 0.8, ease: "power3.out", delay: 4.8 },
      );

      gsap.fromTo(
        hotspotsRef.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(2)",
          delay: 4.3,
        },
      );

      maskRectsRef.current.forEach((rect, i) => {
        if (!rect) return;
        gsap.fromTo(
          rect,
          { attr: { height: 0, y: (100 / NUM_BLINDS) * i } },
          {
            attr: { height: 100 / NUM_BLINDS },
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      });

      gsap.to(".hero-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "15% top",
          end: "50% top",
          scrub: true,
        },
      });

      gsap.to(".hotspots-container", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "10% top",
          end: "40% top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      {/* SCOPED CSS FOR MOBILE RESPONSIVENESS */}
      <style>{`
        .desktop-hotspots { display: block; }
        .mobile-hotspots { display: none; }
        
        @media (max-width: 768px) {
          .desktop-hotspots { display: none; }
          .mobile-hotspots {
            display: flex;
            position: absolute;
            bottom: 4vh;
            left: 0;
            width: 100%;
            overflow-x: auto;
            padding: 1rem 5vw;
            gap: 1rem;
            z-index: 20;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .mobile-hotspots::-webkit-scrollbar { display: none; }
          
          .mobile-hotspot-card {
            scroll-snap-align: center;
            min-width: 80vw;
            background: rgba(10,10,10,0.75);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(201,169,110,0.2);
            border-radius: 12px;
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
          }
          .mobile-hotspot-img {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            flex-shrink: 0;
          }
          /* Hide instruction text on mobile since we have cards */
          .hero-instruction { display: none !important; }
        }
      `}</style>

      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: 0,
          width: "100%",
          height: "120%",
          zIndex: 1,
        }}
      >
        <img
          className="hero-image"
          src="/images/hotel-exterior.png"
          alt="Aurélian Hotel"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0.7) 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.5) 100%)",
          zIndex: 2,
        }}
      />

      {/* SVG Mask */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 15,
          pointerEvents: "none",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: NUM_BLINDS }).map((_, i) => (
          <rect
            key={i}
            ref={(el) => (maskRectsRef.current[i] = el)}
            x="0"
            y={`${(100 / NUM_BLINDS) * i}`}
            width="100"
            height="0"
            fill="#0a0a0a"
          />
        ))}
      </svg>

      {/* DESKTOP HOTSPOTS */}
      <div
        className="hotspots-container desktop-hotspots"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        {hotspots.map((spot, i) => (
          <div
            key={spot.id}
            ref={(el) => (hotspotsRef.current[i] = el)}
            className="hotspot"
            onClick={() => navigate(spot.route)}
            style={{ top: spot.top, left: spot.left, opacity: 0 }}
          >
            <div className="hotspot-dot">
              <div className="hotspot-pulse" />
              <div className="hotspot-pulse hotspot-pulse-2" />
            </div>
            <div className="hotspot-line" />
            <div className="hotspot-label">
              <div className="hotspot-label-title">{spot.label}</div>
              <div className="hotspot-label-subtitle">{spot.subtitle}</div>
            </div>
            <div className="hotspot-preview">
              <img src={spot.image} alt={spot.label} />
              <div className="hotspot-preview-info">
                <div className="hotspot-preview-title">{spot.label}</div>
                <div className="hotspot-preview-desc">{spot.description}</div>
                <div className="hotspot-preview-cta">
                  Explore{" "}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE HOTSPOTS (Scrollable Row) */}
      <div className="mobile-hotspots">
        {hotspots.map((spot) => (
          <div
            key={`mobile-${spot.id}`}
            className="mobile-hotspot-card"
            onClick={() => navigate(spot.route)}
          >
            <img
              className="mobile-hotspot-img"
              src={spot.image}
              alt={spot.label}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6rem",
                  color: "var(--color-gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.2rem",
                }}
              >
                {spot.subtitle}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  color: "var(--color-cream)",
                }}
              >
                {spot.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 5vw",
          pointerEvents: "none",
        }}
      >
        <p
          className="label-text"
          style={{ marginBottom: "1rem", opacity: 0.8 }}
        >
          ★ ★ ★ ★ ★ &nbsp; Luxury Experience
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "var(--color-cream)",
            marginBottom: "1rem",
            perspective: "600px",
          }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (titleCharsRef.current[i] = el)}
              style={{ display: "inline-block", transformStyle: "preserve-3d" }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)",
            fontStyle: "italic",
            color: "var(--color-gold-light)",
            letterSpacing: "0.05em",
            opacity: 0,
            marginBottom: "1.5rem",
          }}
        >
          Where Time Surrenders to Elegance
        </p>
        <p
          ref={instructionRef}
          className="hero-instruction"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>{" "}
          Click glowing points to explore
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "15vh",
          background: "linear-gradient(to top, var(--color-dark), transparent)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
