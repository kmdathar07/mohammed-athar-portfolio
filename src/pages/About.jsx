import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, GraduationCap, Calendar, Heart } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { personal, interests } from '@/data/data'

function RevealDiv({ children, delay = 0, direction = 'up', className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const initial = {
    up: { opacity: 0, y: 50 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
    scale: { opacity: 0, scale: 0.85 },
  }[direction]

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function TerminalCard() {
  const lines = [
    { key: 'const', label: 'const', name: ' developer', eq: ' =', brace: ' {' },
  ]
  const fields = [
    { key: 'name', value: `"${personal.name}"` },
    { key: 'role', value: '"Full-Stack Web Developer"' },
    { key: 'degree', value: '"BCA"' },
    { key: 'university', value: '"VIT"' },
    { key: 'location', value: '"Vellore, TN"' },
    { key: 'status', value: '"Actively Learning 🚀"' },
    { key: 'openToWork', value: 'true' },
  ]

  return (
    <div className="rounded-3xl overflow-hidden shadow-card-hover border border-white/80 bg-ink text-left">
      <div className="flex items-center gap-2 px-5 py-3.5 bg-white/5 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-3 font-mono text-xs text-white/30">~/about.js</span>
      </div>

      <div className="p-6 font-mono text-sm leading-7">
        <div>
          <span className="text-violet">const</span>
          <span className="text-cream"> developer</span>
          <span className="text-slate"> = </span>
          <span className="text-cream">{'{'}</span>
        </div>

        {fields.map((f, i) => (
          <motion.div
            key={f.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="pl-6"
          >
            <span className="text-mint">{f.key}</span>
            <span className="text-white/40">: </span>
            <span className="text-gold">{f.value}</span>
            <span className="text-white/30">,</span>
          </motion.div>
        ))}

        <div className="text-cream">{'}'}</div>
      </div>
    </div>
  )
}

function InterestCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="card p-6 text-center group cursor-default"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md"
        style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}30` }}
      >
        {item.icon}
      </div>

      <h4 className="font-heading font-bold text-ink mb-1">{item.label}</h4>
      <p className="text-slate text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  )
}

export default function About() {
  const quickFacts = [
    { icon: <GraduationCap size={16} className="text-accent" />, label: 'Degree', value: 'BCA' },
    { icon: <MapPin size={16} className="text-mint" />, label: 'University', value: 'VIT' },
    { icon: <Calendar size={16} className="text-violet" />, label: 'Graduating', value: '2027' },
    { icon: <Heart size={16} className="text-gold" />, label: 'Focus', value: 'Full Stack' },
  ]

  return (
    <PageTransition>
      <div className="page-full bg-about overflow-y-auto">

        <div className="absolute top-40 right-0 w-72 h-72 bg-mint/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">

          <RevealDiv>
            <div className="section-number mb-4">01 — About Me</div>

            <h2 className="font-heading font-extrabold text-ink leading-tight mb-4" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
              Who I <span className="text-gradient">Am</span>
            </h2>

            <p className="text-slate text-lg max-w-xl mb-16">
              A BCA student at VIT who enjoys learning by building real projects.
            </p>
          </RevealDiv>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <div className="space-y-8">

              <RevealDiv delay={0.1} direction="left">
                <div className="card p-8 space-y-5">

                  <p className="text-[#E6E6E6]/80 text-base leading-relaxed">
                    {personal.bio}
                  </p>

                  <p className="text-[#E6E6E6]/70 text-base leading-relaxed">
                    I enjoy building simple and useful web applications and improving them step by step.
                    I'm currently focusing on React for the frontend and FastAPI for the backend while
                    learning better ways to structure and write clean code.
                  </p>

                </div>
              </RevealDiv>

              <RevealDiv delay={0.25} direction="left">
                <div className="grid grid-cols-2 gap-3">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="card p-4 flex items-center gap-3 group hover:border-accent/30"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                        {fact.icon}
                      </div>
                      <div>
                        <div className="font-mono text-xs text-slate uppercase tracking-wider">{fact.label}</div>
                        <div className="font-heading font-bold text-ink text-sm">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealDiv>

              <RevealDiv delay={0.35} direction="left">
                <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8654A15, #D4A84715)' }}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
                  <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">My Goal</div>
                  <p className="font-heading font-bold text-ink text-xl leading-snug">
                    Become a strong software developer and build real-world web applications that make a difference.
                  </p>
                </div>
              </RevealDiv>

            </div>

            <div className="space-y-8">

              <RevealDiv delay={0.15} direction="right">
                <TerminalCard />
              </RevealDiv>

              <RevealDiv delay={0.3}>
                <div className="font-mono text-xs text-slate uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Heart size={12} className="text-accent" /> Beyond Code
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {interests.map((item, i) => (
                    <InterestCard key={item.label} item={item} index={i} />
                  ))}
                </div>
              </RevealDiv>

            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  )
}