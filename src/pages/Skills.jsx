import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '@/components/layout/PageTransition'
import { skillGroups, techStack } from '@/data/data'

function SkillBar({ name, level, years, color, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const colors = {
    accent: { bar: 'from-accent to-gold', text: 'text-accent' },
    mint: { bar: 'from-mint to-violet', text: 'text-mint' },
    violet: { bar: 'from-violet to-accent', text: 'text-violet' },
    gold: { bar: 'from-gold to-accent', text: 'text-gold' },
  }
  const c = colors[color] || colors.accent

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="font-body font-medium text-ink text-sm">{name}</span>
          <span className="font-mono text-xs text-slate bg-white/8 px-2 py-0.5 rounded-full">{years}</span>
        </div>
        <span className={`font-mono text-xs font-bold ${c.text}`}>{level}%</span>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${c.bar}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay: index * 0.08 + 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="h-full shimmer" />
        </motion.div>
      </div>
    </motion.div>
  )
}

function GroupCard({ group, isActive, onClick, globalIndex }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const colorMap = {
    accent: { bg: 'bg-accent/10', border: 'border-accent/25', icon: 'text-accent', activeBg: 'bg-accent' },
    mint: { bg: 'bg-mint/10', border: 'border-mint/25', icon: 'text-mint', activeBg: 'bg-mint' },
    violet: { bg: 'bg-violet/10', border: 'border-violet/25', icon: 'text-violet', activeBg: 'bg-violet' },
    gold: { bg: 'bg-gold/10', border: 'border-gold/25', icon: 'text-gold', activeBg: 'bg-gold' },
  }
  const c = colorMap[group.color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: globalIndex * 0.1, duration: 0.6 }}
    >
      <button
        onClick={onClick}
        className={`w-full text-left rounded-3xl p-6 border transition-all duration-300 ${
          isActive
            ? `${c.bg} ${c.border} shadow-card-hover`
            : 'bg-white/5 border-white/80 shadow-card hover:shadow-card-hover'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono text-lg ${isActive ? c.bg : 'bg-white/8'} ${isActive ? c.icon : 'text-slate'}`}>
              {group.icon}
            </div>
            <div>
              <div className="font-heading font-bold text-ink">{group.label}</div>
              <div className="font-mono text-xs text-slate">{group.skills.length} skills</div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${isActive ? c.activeBg + ' text-white' : 'bg-white/8 text-slate'}`}
          >
            +
          </motion.div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/40 space-y-4">
                {group.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} color={group.color} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isActive && (
          <div className="flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <span key={s.name} className="font-mono text-xs text-slate bg-white/5 px-2.5 py-1 rounded-full">
                {s.name}
              </span>
            ))}
          </div>
        )}
      </button>
    </motion.div>
  )
}

function TechPill({ name, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const colors = ['chip', 'chip chip-mint', 'chip chip-violet', 'chip chip-gold']
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.06, duration: 0.4, type: 'spring' }}
      whileHover={{ scale: 1.1, y: -2 }}
      className={colors[index % 4]}
    >
      {name}
    </motion.span>
  )
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState('web')

  return (
    <PageTransition>
      <div className="page-full bg-skills overflow-y-auto">
        <div className="absolute top-32 left-0 w-80 h-80 bg-violet/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-mint/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-number mb-4">02 — Skills</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <h2 className="font-heading font-extrabold text-ink leading-tight" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
                Tech <span className="text-gradient-cool">Stack</span>
              </h2>
              <p className="text-slate text-base max-w-sm mb-2">
                Technologies I work with, organized by domain.
              </p>
            </div>
          </motion.div>

          {/* Tech pills marquee */}
          <div className="overflow-hidden mb-12 -mx-6 px-6">
            <div className="flex flex-wrap gap-2 mb-12">
              {techStack.map((t, i) => <TechPill key={t} name={t} index={i} />)}
            </div>
          </div>

          {/* Skill groups */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillGroups.map((group, i) => (
              <GroupCard
                key={group.id}
                group={group}
                isActive={activeGroup === group.id}
                onClick={() => setActiveGroup(activeGroup === group.id ? null : group.id)}
                globalIndex={i}
              />
            ))}
          </div>

          {/* All expanded view on larger screens */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            {skillGroups.map((group) => (
              <div key={group.id + '-full'} className="card p-6 hidden lg:block">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xl">{group.icon}</span>
                  <span className="font-heading font-bold text-ink">{group.label}</span>
                </div>
                <div className="space-y-4">
                  {group.skills.map((skill, i) => (
                    <SkillBar key={skill.name + '-full'} {...skill} color={group.color} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
