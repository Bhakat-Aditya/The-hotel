import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null)
  const textRef = useRef(null)
  const barFillRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: onComplete,
        })
      },
    })

    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
      .to(barFillRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      }, '-=0.2')
      .to(counterRef.current, {
        innerText: 100,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power2.inOut',
      }, '<')
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
      })
      .to([barFillRef.current?.parentElement, counterRef.current], {
        opacity: 0,
        duration: 0.3,
      }, '<')
  }, [onComplete])

  return (
    <div ref={preloaderRef} className="preloader">
      <h2 ref={textRef} className="preloader-text">Aurélian</h2>
      <div className="preloader-bar">
        <div ref={barFillRef} className="preloader-bar-fill" />
      </div>
      <span
        ref={counterRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          color: 'var(--color-gold)',
          opacity: 0.6,
        }}
      >
        0
      </span>
    </div>
  )
}
