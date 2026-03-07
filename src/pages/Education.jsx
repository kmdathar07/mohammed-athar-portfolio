import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, MapPin, Clock, BookOpen, Award, Target } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { education, personal } from '@/data/data'

function CourseTag({ name, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 300 }}
      className="inline-flex items-center gap-1.5 font-mono text-xs bg-white/5 text-[#E6E6E6]/70 border border-sand px-3 py-1.5 rounded-full"
    >
      <BookOpen size={10} className="text-accent" />
      {name}
    </motion.span>
  )
}

function AchievementRow({ text, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-start gap-3"
    >
      <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Award size={10} className="text-accent" />
      </div>
      <span className="text-[#E6E6E6]/70 text-sm leading-relaxed">{text}</span>
    </motion.div>
  )
}

export default function Education() {
  const edu = education[0]

  return (
    <PageTransition>
      <div className="page-full bg-education overflow-y-auto">
        <div className="absolute top-32 right-10 w-80 h-80 bg-sage/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <div className="section-number mb-4">04 — Education</div>
            <h2 className="font-heading font-extrabold text-ink leading-tight" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
              My <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="lg:col-span-2 card p-8 relative overflow-hidden"
            >
              {/* Decorative VIT text */}
              <div className="absolute -right-4 -top-4 font-heading font-extrabold text-8xl text-sand/40 pointer-events-none select-none leading-none">
                VIT
              </div>

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/30 border border-green-700/40 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-green-400 font-semibold">{edu.status}</span>
              </div>

              <h3 className="font-heading font-bold text-ink text-2xl md:text-3xl mb-2 leading-tight">
                {edu.degree}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate mb-6">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-accent" />
                  {edu.institution}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-mint" />
                  {edu.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-violet" />
                  {edu.period}
                </span>
              </div>

              <p className="text-[#E6E6E6]/70 leading-relaxed mb-8">{edu.description}</p>

              {/* Courses */}
              <div className="mb-6">
                <div className="font-mono text-xs text-slate uppercase tracking-widest mb-3">Core Courses</div>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((c, i) => <CourseTag key={c} name={c} index={i} />)}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="font-mono text-xs text-slate uppercase tracking-widest mb-3">Highlights</div>
                <div className="space-y-2.5">
                  {edu.achievements.map((a, i) => <AchievementRow key={i} text={a} index={i} />)}
                </div>
              </div>
            </motion.div>

            {/* Side cards */}
            <div className="flex flex-col gap-5">
              {/* Graduation countdown */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="card p-6 text-center"
              >
                <div className="font-mono text-xs text-slate uppercase tracking-widest mb-2">Graduating</div>
                <div className="font-heading font-extrabold text-6xl text-gradient mb-1">
                  {personal.graduationYear}
                </div>
                <div className="font-mono text-xs text-slate">{edu.grade} · VIT</div>
              </motion.div>

              {/* Goal */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1A1A2E, #2D2D4E)' }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-accent" />
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">Career Goal</span>
                </div>
                <p className="font-heading font-bold text-cream text-lg leading-snug">
                  Become a strong software developer and build real-world web applications.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="card p-6"
              >
                <div className="font-mono text-xs text-slate uppercase tracking-widest mb-4">At a Glance</div>
                <div className="space-y-3">
                  {[
                    { label: 'Degree Type', value: 'Bachelor\'s (BCA)' },
                    { label: 'Duration', value: '3 Years (2024–27)' },
                    { label: 'Mode', value: 'Full-time, On-campus' },
                    { label: 'Specialization', value: 'Computer Applications' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-slate">{item.label}</span>
                      <span className="font-medium text-ink">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
