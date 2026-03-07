import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ring, setRing] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveHandler = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      // Ring follows with slight lag via CSS transition
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 60)
    }
    const downHandler = () => setClicking(true)
    const upHandler = () => setClicking(false)

    const hoverElements = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovering(true))
        el.addEventListener('mouseleave', () => setHovering(false))
      })
    }

    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('mousedown', downHandler)
    window.addEventListener('mouseup', upHandler)
    hoverElements()

    return () => {
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mousedown', downHandler)
      window.removeEventListener('mouseup', upHandler)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <motion.div
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: clicking ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Ring */}
      <motion.div
        animate={{
          x: ring.x - 18,
          y: ring.y - 18,
          scale: hovering ? 1.6 : clicking ? 0.7 : 1,
          opacity: hovering ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="fixed top-0 left-0 w-9 h-9 border-2 border-accent rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ mixBlendMode: 'multiply' }}
      />
    </>
  )
}
