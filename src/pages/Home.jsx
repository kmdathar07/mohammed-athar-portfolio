import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, Github, Linkedin, Instagram, Mail, ChevronDown, Sparkles } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { personal, stats } from '@/data/data'

// Floating geometric shapes
function FloatingShape({ size, color, top, left, delay, shape }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-2xl rotate-12' : 'rounded-[40%_60%_60%_40%/40%_40%_60%_60%]'}`}
      style={{ width: size, height: size, background: color, top, left, opacity: 0.12, filter: 'blur(1px)' }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8 + delay,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Animated stat card
function StatCard({ value, label, index }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800 + index * 150)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <div className="font-heading font-bold text-3xl md:text-4xl text-ink">{value}</div>
      <div className="font-mono text-xs text-slate uppercase tracking-widest mt-1">{label}</div>
    </motion.div>
  )
}

// Particle canvas
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = ['#E8654A', '#D4A847', '#4ECDC4', '#7C6AC4'][Math.floor(Math.random() * 4)]
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 120) * 0.08
            ctx.strokeStyle = '#E8654A'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            ctx.restore()
          }
        })
        p.update()
        p.draw()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export default function Home() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])
  const springX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const shapes = [
    { size: 80, color: '#E8654A', top: '15%', left: '8%', delay: 0, shape: 'circle' },
    { size: 120, color: '#4ECDC4', top: '70%', left: '5%', delay: 2, shape: 'blob' },
    { size: 60, color: '#7C6AC4', top: '20%', left: '88%', delay: 1, shape: 'square' },
    { size: 100, color: '#D4A847', top: '65%', left: '85%', delay: 3, shape: 'circle' },
    { size: 50, color: '#E8654A', top: '45%', left: '92%', delay: 1.5, shape: 'square' },
    { size: 70, color: '#4ECDC4', top: '85%', left: '45%', delay: 2.5, shape: 'circle' },
  ]

  const socials = [
    { icon: <Github size={18} />, href: personal.github, label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: personal.linkedin, label: 'LinkedIn' },
    { icon: <Instagram size={18} />, href: personal.instagram, label: 'Instagram' },
    { icon: <Mail size={18} />, href: `mailto:${personal.email}`, label: 'Email' },
  ]

  return (
    <PageTransition>
      <div
        className="page-full bg-home flex flex-col items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <ParticleCanvas />

        {/* PORTFOLIO watermark */}
        <div className="portfolio-watermark">PORTFOLIO</div>

        {/* Floating shapes */}
        {shapes.map((s, i) => <FloatingShape key={i} {...s} />)}

        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mint/15 rounded-full blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet/20 rounded-full blur-[80px] animate-blob pointer-events-none" style={{ animationDelay: '8s' }} />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24 pb-16">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full shadow-card mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-mono text-xs text-slate">Available for opportunities</span>
            <Sparkles size={12} className="text-gold" />
          </motion.div>

          {/* 3D Name */}
          <motion.div
            style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
            className="mb-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="font-heading font-extrabold leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(52px, 9vw, 110px)' }}
            >
              <span className="block text-ink">MOHAMMED</span>
              <span className="block text-gradient" style={{ fontSize: 'clamp(50px, 8.5vw, 105px)' }}>
                ATHAR K
              </span>
            </motion.h1>
          </motion.div>

          {/* Typing subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-clay" />
            <div className="font-mono text-base md:text-xl text-slate">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer', 2500,
                  'React Enthusiast', 2000,
                  'Python Programmer', 2000,
                  'Chess Strategist', 2000,
                  'BCA @ VIT 2027', 2000,
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor
              />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-clay" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-lg mx-auto text-slate text-base md:text-lg leading-relaxed mb-10"
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link to="/projects" className="btn-primary">
              View My Work
              <ArrowRight size={16} />
            </Link>
            <a href={personal.resumeUrl} download="Mohammed_Athar_K_Resume.pdf" className="btn-outline">
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center gap-3 mb-16"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 glass rounded-2xl flex items-center justify-center text-slate hover:text-accent hover:shadow-glow-accent transition-all hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="inline-flex glass rounded-3xl px-10 py-6 gap-10 md:gap-16 shadow-card"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Quick nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="relative z-10 flex flex-wrap justify-center gap-2 pb-8 px-6"
        >
          {[
            { label: 'About Me', to: '/about' },
            { label: 'Skills', to: '/skills' },
            { label: 'Projects', to: '/projects' },
            { label: 'Education', to: '/education' },
            { label: 'Contact', to: '/contact' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="chip hover:scale-105 transition-transform no-underline"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-clay" />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}