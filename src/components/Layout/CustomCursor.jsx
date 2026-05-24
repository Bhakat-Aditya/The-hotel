import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const moveCursor = (e) => {
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power2.out',
      })
      gsap.to(ring, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => ring.classList.add('hover')
    const handleMouseLeave = () => ring.classList.remove('hover')

    window.addEventListener('mousemove', moveCursor)

    const interactiveElements = document.querySelectorAll('a, button, .img-hover-zoom')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
