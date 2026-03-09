import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Instagram, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { personal } from '@/data/data'

const contactCards = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'kmdathar07@gmail.com',
    href: `mailto:${personal.email}`,
    color: '#E8654A',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'Mohammed Athar K',
    href: '#',
    color: '#0A66C2',
    bg: 'bg-blue-50',
    border: 'border-blue-200/50',
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'kmdathar07',
    href: personal.github,
    color: '#1A1A2E',
    bg: 'bg-ink/5',
    border: 'border-ink/10',
  },
  {
    icon: <Instagram size={20} />,
    label: 'Instagram',
    value: '@mr.athar07',
    href: personal.instagram,
    color: '#E1306C',
    bg: 'bg-pink-50',
    border: 'border-pink-200/50',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: personal.phone,
    href: `tel:${personal.phone?.replace(/\s/g, '')}`,
    color: '#4ECDC4',
    bg: 'bg-mint/10',
    border: 'border-mint/20',
  },
]

function ContactCard({ card, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.a
      ref={ref}
      href={card.href}
      target={card.label !== 'Email' && card.label !== 'Phone' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`card p-5 flex items-center gap-4 group no-underline ${card.bg} ${card.border} border`}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ background: card.color + '20', color: card.color }}
      >
        {card.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-xs text-slate uppercase tracking-widest mb-0.5">{card.label}</div>
        <div className="font-body font-medium text-ink text-sm truncate">{card.value}</div>
      </div>
      <div className="text-slate/40 group-hover:text-accent group-hover:translate-x-1 transition-all text-lg">→</div>
    </motion.a>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const { ref, inView } = useInView({ triggerOnce: true })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      setStatus('idle')
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="card p-8"
    >
      <div className="font-mono text-xs text-slate uppercase tracking-widest mb-6 flex items-center gap-2">
        <Send size={12} className="text-accent" />
        Send a Message
      </div>

      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h4 className="font-heading font-bold text-ink text-xl mb-2">Message Sent!</h4>
          <p className="text-slate">I'll get back to you soon. Thanks for reaching out!</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-slate uppercase tracking-widest mb-2">Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Your full name" />
            </div>
            <div>
              <label className="block font-mono text-xs text-slate uppercase tracking-widest mb-2">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-slate uppercase tracking-widest mb-2">Subject</label>
            <input type="text" name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="What's this about?" />
          </div>

          <div>
            <label className="block font-mono text-xs text-slate uppercase tracking-widest mb-2">Message *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required className="input-field" placeholder="Tell me about your project, opportunity, or just say hi..." />
          </div>

          <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>

          <p className="text-center font-mono text-xs text-slate/60">
            Or email me directly at{' '}
            <a href={`mailto:${personal.email}`} className="text-accent hover:underline">
              {personal.email}
            </a>
          </p>
        </form>
      )}
    </motion.div>
  )
}

export default function Contact() {
  return (
    <PageTransition>
      <div className="page-full bg-contact overflow-y-auto">

        <div className="absolute top-40 left-0 w-80 h-80 bg-violet/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-mint/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="section-number mb-4">05 — Contact</div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-heading font-extrabold text-ink leading-tight" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
                Let's <span className="text-gradient">Connect</span>
              </h2>

              <p className="text-slate text-base max-w-xs mb-2">
                Open to internships, collaborations, and interesting projects. Feel free to reach out.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">

            <div>
              <div className="space-y-3 mb-8">

                {contactCards.map((card, i) => {
                  if (card.label === 'LinkedIn') {
                    return (
                      <div
                        key={card.label}
                        onClick={(e) => {
                          e.preventDefault()
                          alert('LinkedIn profile not created yet. Coming soon!')
                        }}
                      >
                        <ContactCard card={card} index={i} />
                      </div>
                    )
                  }

                  return <ContactCard key={card.label} card={card} index={i} />
                })}

              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-3xl p-5 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #E8654A12, #D4A84712)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-ink text-sm">Currently Available</div>
                    <div className="font-mono text-xs text-slate mt-0.5">
                      Open to internships, part-time roles & collaborations
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <ContactForm />

          </div>
        </div>
      </div>
    </PageTransition>
  )
}