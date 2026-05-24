import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "/images/hotel-exterior.png",
    alt: "Hotel Exterior",
    title: "The Arrival",
  },
  { src: "/images/hotel-lobby.png", alt: "Grand Lobby", title: "Grand Lobby" },
  {
    src: "/images/suite-presidential.png",
    alt: "Presidential Suite",
    title: "Presidential Suite",
  },
  {
    src: "/images/suite-deluxe.png",
    alt: "Deluxe Suite",
    title: "Ocean Retreat",
  },
  {
    src: "/images/restaurant-dining.png",
    alt: "Fine Dining",
    title: "Culinary Arts",
  },
  {
    src: "/images/pool-amenity.png",
    alt: "Infinity Pool",
    title: "Azure Waters",
  },
  {
    src: "/images/spa-wellness.png",
    alt: "Spa & Wellness",
    title: "Inner Peace",
  },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null); // 1. ADD THIS NEW REF
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const panels = gsap.utils.toArray(".gallery-panel");
      const images = gsap.utils.toArray(".gallery-parallax-img");

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // Horizontal Track Tween
      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current, // 2. TARGET THE INNER WRAPPER
          pin: true,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Internal Image Parallax
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -20 },
          {
            xPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentNode,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // Text Reveal Animation
      panels.forEach((panel) => {
        const text = panel.querySelector(".gallery-title");
        const number = panel.querySelector(".gallery-number");

        gsap.from([number, text], {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 70%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      {/* 3. ATTACH pinRef TO THIS SAFE INNER WRAPPER */}
      <div
        ref={pinRef}
        style={{ overflow: "hidden", height: "100vh", width: "100%" }}
      >
        {/* The Horizontal Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100vh",
            width: "max-content",
            alignItems: "center",
            padding: "0 10vw",
            gap: "10vw",
            willChange: "transform",
          }}
        >
          {/* Intro Text Panel */}
          <div style={{ minWidth: "30vw", paddingRight: "5vw", flexShrink: 0 }}>
            <p
              className="label-text"
              style={{ marginBottom: "1rem", color: "var(--color-gold)" }}
            >
              Visual Journey
            </p>
            <div className="gold-line" style={{ marginBottom: "2rem" }} />
            <h2
              className="heading-lg"
              style={{
                color: "var(--color-cream)",
                fontSize: "clamp(3rem, 5vw, 6rem)",
              }}
            >
              A Glimpse of <br />
              <span style={{ fontStyle: "italic" }}>Paradise</span>
            </h2>
          </div>

          {/* Image Panels */}
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className="gallery-panel"
              style={{
                position: "relative",
                width: "min(60vw, 800px)",
                height: "70vh",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                className="gallery-parallax-img"
                src={img.src}
                alt={img.alt}
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-20%",
                  width: "140%",
                  height: "100%",
                  objectFit: "cover",
                  willChange: "transform",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "3rem",
                  left: "3rem",
                  zIndex: 10,
                  overflow: "hidden",
                }}
              >
                <p
                  className="gallery-number label-text"
                  style={{ color: "var(--color-gold)", marginBottom: "0.5rem" }}
                >
                  0{i + 1}
                </p>
                <h3
                  className="gallery-title heading-md"
                  style={{ color: "var(--color-cream)" }}
                >
                  {img.title}
                </h3>
              </div>
            </div>
          ))}

          <div style={{ minWidth: "10vw", flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}
