import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-home flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="font-heading font-extrabold text-8xl text-gradient mb-4 leading-none">404</div>
        <h2 className="font-heading font-bold text-ink text-2xl mb-3">Page Not Found</h2>
        <p className="text-slate mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. Let's get you back home.
        </p>
        <Link to="/" className="btn-primary">
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
