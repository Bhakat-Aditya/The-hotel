import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NUM_SLICES = 6;

export default function PageTransition() {
  const overlayRef = useRef(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // ❌ REMOVED: window.scrollTo(0, 0) - SmoothScroll.jsx handles this now!

    // Refresh ScrollTrigger after a tiny delay so new DOM is parsed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const slices = overlayRef.current?.querySelectorAll(
      ".page-transition-slice",
    );
    if (!slices) return;

    const tl = gsap.timeline();

    // Slices come down (close)
    tl.set(slices, { transformOrigin: "top" });
    tl.fromTo(
      slices,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.inOut",
      },
    )
      // Then slices go up (open to reveal new page)
      .set(slices, { transformOrigin: "bottom" })
      .to(slices, {
        scaleY: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.inOut",
        delay: 0.1,
      });
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay"
      style={{ pointerEvents: "none" }}
    >
      {Array.from({ length: NUM_SLICES }).map((_, i) => (
        <div key={i} className="page-transition-slice" />
      ))}
    </div>
  );
}
