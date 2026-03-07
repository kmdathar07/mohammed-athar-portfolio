import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Skills from '@/pages/Skills'
import Projects from '@/pages/Projects'
import Education from '@/pages/Education'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#E6E6E6',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  )
}