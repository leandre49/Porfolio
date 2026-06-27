import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FiEdit3, FiTerminal } from 'react-icons/fi'
import { ThemeProvider } from './context/ThemeContext'
import { PortfolioProvider } from './context/PortfolioContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import LockScreen, { checkAuth } from './components/LockScreen'
import Terminal from './components/Terminal'

function App() {
  const [adminOpen, setAdminOpen] = useState(false)
  const [showLock, setShowLock] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
      if (e.key === 'k' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleEditClick = useCallback(() => {
    if (checkAuth()) {
      setAdminOpen(true)
    } else {
      setShowLock(true)
    }
  }, [])

  const handleAuthSuccess = useCallback(() => {
    setShowLock(false)
    setAdminOpen(true)
  }, [])

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-white dark:bg-surface text-gray-900 dark:text-text-primary transition-colors">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </main>
          <Footer />

          <button
            onClick={handleEditClick}
            className="fixed bottom-6 right-6 z-50 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
            title="Edit Portfolio"
          >
            <FiEdit3 size={18} />
          </button>

          <button
            onClick={() => setTerminalOpen(true)}
            className="fixed bottom-6 left-6 z-50 p-3 bg-gray-800 hover:bg-gray-700 text-green-400 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
            title="Open CLI (Ctrl+Shift+K or `)"
          >
            <FiTerminal size={18} />
          </button>

          <AnimatePresence>
            {showLock && (
              <LockScreen
                onSuccess={handleAuthSuccess}
                onClose={() => setShowLock(false)}
              />
            )}
            {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
            {terminalOpen && (
              <Terminal
                onClose={() => setTerminalOpen(false)}
                onEdit={() => {
                  setTerminalOpen(false)
                  handleEditClick()
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  )
}

export default App
