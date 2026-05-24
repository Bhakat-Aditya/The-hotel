import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    icon: "🏊",
    title: "Infinity Pool",
    description:
      "A breathtaking rooftop infinity pool overlooking the city, open year-round with heated waters and private cabanas.",
    image: "/images/pool-amenity.png",
  },
  {
    icon: "🧖",
    title: "Elysian Spa",
    description:
      "A 2,000m² sanctuary offering ancient and modern treatments. Hot stone therapy, aromatherapy, and hydrotherapy circuits.",
    image: "/images/spa-wellness.png",
  },
  {
    icon: "🍷",
    title: "Wine Cellar",
    description:
      "Over 3,000 curated vintages from the finest vineyards. Private tastings and sommelier-guided experiences.",
    image: "/images/restaurant-dining.png",
  },
  {
    icon: "🎵",
    title: "Jazz Lounge",
    description:
      "Intimate live performances every evening. Award-winning cocktails in a velvet-draped art deco setting.",
    image: "/images/hotel-lobby.png",
  },
];

export default function Amenities() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null); // 1. ADD THIS NEW REF
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".amenities-heading", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Horizontal scroll
      const track = trackRef.current;
      if (!track) return;

      const cards = track.querySelectorAll(".amenity-card");
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current, // 2. PIN THE INNER REF INSTEAD OF SECTIONREF
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Card reveal stagger
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          rotateY: 15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.("horizontal-scroll"),
            start: "left 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // This cleanup will now work perfectly
  }, []);

  return (
    <section ref={sectionRef} id="amenities" style={{ position: "relative" }}>
      {/* 3. ATTACH pinRef TO THIS INNER WRAPPER */}
      <div
        ref={pinRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden", // Moved overflow here to protect the pin-spacer
        }}
      >
        {/* Label */}
        <div
          className="amenities-heading"
          style={{ padding: "0 5vw", marginBottom: "3rem" }}
        >
          <p className="label-text" style={{ marginBottom: "1rem" }}>
            Wellness & Leisure
          </p>
          <div className="gold-line" style={{ marginBottom: "2rem" }} />
          <h2 className="heading-lg" style={{ marginBottom: "1rem" }}>
            Indulge Your{" "}
            <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
              Senses
            </span>
          </h2>
          <p className="body-text" style={{ maxWidth: "500px" }}>
            A world of refined pleasures awaits. From rejuvenating spa rituals
            to rooftop sunsets, every amenity is designed to elevate your stay.
          </p>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "2rem",
            paddingLeft: "5vw",
            paddingRight: "5vw",
            width: "fit-content",
          }}
        >
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.title}
              className="amenity-card glass-card"
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              style={{
                minWidth: "min(400px, 80vw)",
                cursor: "pointer",
                overflow: "hidden",
                perspective: "1000px",
              }}
            >
              {/* Image */}
              <div
                className="img-hover-zoom"
                style={{ aspectRatio: "16/10", overflow: "hidden" }}
              >
                <img
                  src={amenity.image}
                  alt={`${amenity.title} — Aurélian Hotel`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{amenity.icon}</span>
                  <h3
                    className="heading-sm"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {amenity.title}
                  </h3>
                </div>
                <p
                  className="body-text"
                  style={{ fontSize: "0.85rem", opacity: 0.7 }}
                >
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Spacer at end */}
          <div style={{ minWidth: "5vw", flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}
