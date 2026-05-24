import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 1. ALL links are now Hash Links pointing to HomePage sections
const navLinks = [
  { label: "Experience", href: "/#about" },
  { label: "Suites", href: "/#rooms" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Wellness", href: "/#amenities" },
  { label: "Dining", href: "/#dining" },
  { label: "Reviews", href: "/#reviews" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const hash = href.replace("/", ""); // Extracts '#about', '#rooms', etc.

    if (isHome) {
      // If already on Home, update the URL (without jumping) and scroll smoothly
      window.history.pushState(null, "", hash);
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on a sub-page (like /pool), route back to Home first
      navigate(href);

      // Wait for the page transition to finish painting, then scroll
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 800);
    }
  };

  const menuVariants = {
    closed: { clipPath: "circle(0% at calc(100% - 3rem) 2rem)" },
    open: { clipPath: "circle(150% at calc(100% - 3rem) 2rem)" },
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <>
      {/* Scoped CSS for responsive design without Tailwind */}
      <style>{`
        .nav-center-links, .nav-right-btn { display: none !important; }
        .nav-hamburger { display: flex !important; }
        
        @media (min-width: 900px) {
          .nav-center-links, .nav-right-btn { display: flex !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>

      <nav
        ref={navRef}
        id="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: isScrolled ? "1rem 5vw" : "1.5rem 5vw",
          background:
            isScrolled || !isHome ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: isScrolled || !isHome ? "blur(20px)" : "none",
          borderBottom:
            isScrolled || !isHome ? "1px solid rgba(201,169,110,0.1)" : "none",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
              color: "var(--color-gold)",
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            Aurélian
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div
          className="nav-center-links"
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          {navLinks.map((link) => {
            // Check if the current URL hash matches the link to highlight it
            const isActive =
              isHome && location.hash === link.href.replace("/", "");

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive
                    ? "var(--color-gold)"
                    : "var(--color-white-soft)",
                  textDecoration: "none",
                  position: "relative",
                  transition: "color 0.3s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-gold)")
                }
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.target.style.color = "var(--color-white-soft)";
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: Book Now & Hamburger */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            className="btn-outline nav-right-btn"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.7rem" }}
            onClick={() => handleNavClick("/#contact")}
          >
            <span>Book Now</span>
          </button>

          {/* Hamburger (Mobile Only) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              flexDirection: "column",
              gap: "5px",
              zIndex: 1002,
              padding: "0.5rem",
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{
                width: 24,
                height: 1.5,
                background: "var(--color-gold)",
                display: "block",
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              style={{
                width: 24,
                height: 1.5,
                background: "var(--color-gold)",
                display: "block",
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{
                width: 24,
                height: 1.5,
                background: "var(--color-gold)",
                display: "block",
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "var(--color-dark)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {navLinks.map((link, i) => {
              const isActive =
                isHome && location.hash === link.href.replace("/", "");

              return (
                <motion.button
                  key={link.label}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    color: isActive
                      ? "var(--color-gold)"
                      : "var(--color-cream)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
