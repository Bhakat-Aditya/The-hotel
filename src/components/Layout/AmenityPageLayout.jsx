import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmenityPageLayout({
  title,
  subtitle,
  description,
  heroImage,
  heroAlt,
  features,
  details,
  galleryImages,
  ctaText,
  metaDescription,
}) {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.to(heroImageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".amenity-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".amenity-hero-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".feature-grid", start: "top 80%" },
      });
      gsap.from(".info-row", {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".info-section", start: "top 80%" },
      });
      gsap.from(".gallery-item", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".amenity-gallery", start: "top 80%" },
      });
      gsap.from(".section-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".section-reveal", start: "top 85%" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>{title} — Aurélian Hotel</title>
        <meta name="description" content={metaDescription || description} />
      </Helmet>

      {/* SCOPED CSS FOR GALLERY GRID RESPONSIVENESS */}
      <style>{`
        .amenity-gallery-item {
          aspect-ratio: 4/3;
          border-radius: 8px;
          overflow: hidden;
          grid-column: auto;
        }
        @media (min-width: 768px) {
          .amenity-gallery-item:first-child {
            aspect-ratio: 16/10;
            grid-column: span 2;
          }
        }
      `}</style>

      {/* Hero Banner */}
      <section className="amenity-hero">
        <img
          ref={heroImageRef}
          className="amenity-hero-image"
          src={heroImage}
          alt={heroAlt}
        />
        <div className="amenity-hero-overlay" />
        <div className="amenity-hero-content">
          <button onClick={() => navigate("/")} className="back-button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Hotel
          </button>
          <p
            className="label-text"
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
          >
            {subtitle}
          </p>
          <div className="gold-line" style={{ marginBottom: "1.5rem" }} />
          <h1 className="heading-xl" style={{ marginBottom: "1rem" }}>
            {title}
          </h1>
          <p
            className="body-text"
            style={{ maxWidth: "600px", fontSize: "1rem" }}
          >
            {description}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      {features && features.length > 0 && (
        <section className="section-padding">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              className="label-text section-reveal"
              style={{ marginBottom: "1rem" }}
            >
              What Awaits You
            </p>
            <div
              className="gold-line-center section-reveal"
              style={{ marginBottom: "2rem" }}
            />
            <h2 className="heading-lg section-reveal">
              Our{" "}
              <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
                Offerings
              </span>
            </h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-title">{feature.title}</div>
                <div className="feature-desc">{feature.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Details Section */}
      {details && details.length > 0 && (
        <section
          className="section-padding info-section"
          style={{ background: "var(--color-dark-light)" }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="label-text" style={{ marginBottom: "1rem" }}>
                Essential Details
              </p>
              <div
                className="gold-line-center"
                style={{ marginBottom: "2rem" }}
              />
              <h2 className="heading-md">
                Everything You Need to{" "}
                <span
                  style={{ color: "var(--color-gold)", fontStyle: "italic" }}
                >
                  Know
                </span>
              </h2>
            </div>
            {details.map((detail, i) => (
              <div key={i} className="info-row">
                <div className="info-row-icon">{detail.icon}</div>
                <div className="info-row-content">
                  <h4>{detail.title}</h4>
                  <p>{detail.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="section-padding amenity-gallery">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="label-text" style={{ marginBottom: "1rem" }}>
              Gallery
            </p>
            <div
              className="gold-line-center"
              style={{ marginBottom: "2rem" }}
            />
            <h2 className="heading-md">
              Visual{" "}
              <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
                Moments
              </span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item img-hover-zoom amenity-gallery-item"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="section-padding"
        style={{
          textAlign: "center",
          background:
            "linear-gradient(to bottom, var(--color-dark), var(--color-dark-light))",
        }}
      >
        <div className="gold-line-center" style={{ marginBottom: "2rem" }} />
        <h2 className="heading-md" style={{ marginBottom: "1rem" }}>
          Ready to{" "}
          <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
            Experience
          </span>{" "}
          This?
        </h2>
        <p
          className="body-text"
          style={{
            marginBottom: "2.5rem",
            maxWidth: "500px",
            margin: "0 auto 2.5rem",
          }}
        >
          {ctaText || "Let our team craft the perfect experience for you."}
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-luxury" onClick={() => navigate("/#contact")}>
            <span>Book Now</span>
          </button>
          <button className="btn-outline" onClick={() => navigate("/")}>
            <span>Explore More</span>
          </button>
        </div>
      </section>
    </div>
  );
}
