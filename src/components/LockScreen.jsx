import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiX } from 'react-icons/fi'
import { ADMIN_PASSWORD } from '../data/portfolioData'

const AUTH_KEY = 'portfolio_auth'

export function checkAuth() {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export default function LockScreen({ onSuccess, onClose }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white dark:bg-surface rounded-2xl p-8 shadow-2xl w-full max-w-sm mx-4 border border-gray-200 dark:border-border"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-text-primary transition-colors"
        >
          <FiX size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <FiLock className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-text-primary">Admin Access</h3>
          <p className="text-sm text-gray-500 dark:text-text-secondary mt-1">Enter password to edit portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Password"
            autoFocus
            className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-surface-light text-gray-900 dark:text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
              error ? 'border-red-500 ring-2 ring-red-500/30' : 'border-gray-300 dark:border-border'
            }`}
          />
          {error && <p className="text-xs text-red-500 text-center">Incorrect password</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all hover:shadow-lg active:scale-[0.98] text-sm"
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}
