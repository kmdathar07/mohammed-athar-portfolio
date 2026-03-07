import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { projects } from '@/data/data'

function ProjectCard({ project, index, onClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const isFeatured = project.featured

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
      className={`card cursor-pointer overflow-hidden group relative ${isFeatured ? 'lg:col-span-1' : ''}`}
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 w-full transition-all duration-500 group-hover:h-2"
        style={{ background: project.accent }}
      />

      <div className="p-7">
        {/* Number & Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-4xl font-bold text-sand group-hover:text-clay/50 transition-colors leading-none">
            {project.number}
          </span>
          <span
            className="font-mono text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: project.accent + '18', color: project.accent, border: `1px solid ${project.accent}30` }}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-ink text-xl mb-2 group-hover:text-accent transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-xs bg-white/5 text-slate px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-sand/60">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-slate hover:text-accent transition-colors text-sm font-body"
            >
              <Github size={14} />
              Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-slate hover:text-accent transition-colors text-sm font-body"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
          <button className="ml-auto flex items-center gap-1 text-xs font-mono text-slate/60 group-hover:text-accent transition-colors">
            Details <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Project detail modal
function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="relative bg-cream rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent bar */}
          <div className="h-2 w-full" style={{ background: project.accent }} />

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-mono text-5xl font-bold text-sand/60 leading-none mb-2">
                  {project.number}
                </div>
                <h3 className="font-heading font-bold text-ink text-2xl leading-snug">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-2xl bg-white/5 flex items-center justify-center text-slate hover:text-accent hover:bg-white/8 transition-all flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[#E6E6E6]/70 leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center">
                  <Github size={14} />
                  View Source
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <PageTransition>
      <div className="page-full bg-projects overflow-y-auto">
        <div className="absolute top-40 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gold/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="section-number mb-4">03 — Projects</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-heading font-extrabold text-ink leading-tight" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
                What I've <span className="text-gradient">Built</span>
              </h2>
              <p className="text-slate text-base max-w-xs mb-2">
                Click any card for full details. Real projects, real code.
              </p>
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={setSelected}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <a
              href="https://github.com/mohammed-athar-k"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Github size={16} />
              More on GitHub
            </a>
          </motion.div>
        </div>

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </PageTransition>
  )
}
