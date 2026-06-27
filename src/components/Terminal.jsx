import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { usePortfolio } from '../context/PortfolioContext'
import { checkAuth } from './LockScreen'

const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact']

const allCommands = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'edit', desc: 'Open admin panel (requires auth)' },
  { cmd: 'theme', desc: 'Switch theme (dark|light|toggle)' },
  { cmd: 'goto', desc: 'Scroll to section (hero|about|skills|...)' },
  { cmd: 'reset', desc: 'Reset portfolio to defaults' },
  { cmd: 'export', desc: 'Download portfolio data as JSON' },
  { cmd: 'clear', desc: 'Clear terminal' },
  { cmd: 'close', desc: 'Close terminal' },
]

const commandNames = allCommands.map((c) => c.cmd)

function scrollToSection(name) {
  const el = document.getElementById(name)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    return `Scrolled to "${name}"`
  }
  return `Section "${name}" not found`
}

function getSuggestions(input) {
  if (!input.trim()) return []
  const lower = input.trim().toLowerCase()
  const parts = lower.split(/\s+/)

  if (parts.length === 1) {
    const term = parts[0]
    const cmdMatches = commandNames.filter((c) => c.startsWith(term) && c !== term).map((c) => c)
    const sectionMatches = sections.filter((s) => s.startsWith(term) && s !== term).map((s) => s)
    return [...cmdMatches, ...sectionMatches.map((s) => `goto ${s}`)]
  }

  if (parts[0] === 'goto' && parts.length === 2) {
    const term = parts[1]
    return sections.filter((s) => s.startsWith(term) && s !== term)
  }

  if (parts[0] === 'theme' && parts.length === 2) {
    const opts = ['dark', 'light', 'toggle']
    const term = parts[1]
    return opts.filter((o) => o.startsWith(term) && o !== term)
  }

  return []
}

export default function Terminal({ onClose, onEdit }) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState([
    { text: 'Portfolio CLI v1.0', type: 'system' },
    { text: 'Type "help" for available commands.', type: 'system' },
  ])
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [suggestionIdx, setSuggestionIdx] = useState(0)
  const inputRef = useRef(null)
  const endRef = useRef(null)
  const { isDark, toggleTheme } = useTheme()
  const portfolio = usePortfolio()

  const suggestions = useMemo(() => getSuggestions(input), [input])

  useEffect(() => {
    setSuggestionIdx(0)
  }, [suggestions.length])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const addLine = (text, type = 'output') => {
    setLines((prev) => [...prev, { text, type }])
  }

  const processCommand = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    setLines((prev) => [...prev, { text: `$ ${trimmed}`, type: 'input' }])
    setHistory((prev) => [...prev, trimmed])
    setHistoryIdx(-1)

    if (sections.includes(cmd)) {
      addLine(scrollToSection(cmd))
      return
    }

    switch (cmd) {
      case 'help':
        addLine('Available commands:')
        allCommands.forEach((c) => addLine(`  ${c.cmd.padEnd(22)} ${c.desc}`))
        addLine('Or just type a section name to jump to it.')
        break

      case 'edit':
        if (checkAuth()) {
          onEdit()
          addLine('Opening admin panel...')
        } else {
          addLine('Access denied. Use the edit button to authenticate first.', 'error')
        }
        break

      case 'theme': {
        const arg = args[0]?.toLowerCase()
        if (arg === 'dark') {
          if (!isDark) { toggleTheme(); addLine('Theme set to dark') }
          else addLine('Already on dark theme')
        } else if (arg === 'light') {
          if (isDark) { toggleTheme(); addLine('Theme set to light') }
          else addLine('Already on light theme')
        } else {
          toggleTheme()
          addLine(`Theme toggled to ${isDark ? 'light' : 'dark'}`)
        }
        break
      }

      case 'goto': {
        if (!args.length) {
          addLine('Usage: goto [section]', 'error')
          addLine(`Sections: ${sections.join(', ')}`)
        } else {
          addLine(scrollToSection(args.join('-').toLowerCase()))
        }
        break
      }

      case 'reset':
        portfolio.resetAll()
        addLine('Portfolio reset to defaults.')
        break

      case 'export': {
        const blob = new Blob([portfolio.exportData()], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'portfolio-backup.json'
        a.click()
        URL.revokeObjectURL(url)
        addLine('Exported portfolio-backup.json')
        break
      }

      case 'clear':
        setLines([])
        break

      case 'close':
      case 'exit':
        onClose()
        break

      default:
        addLine(`Unknown command: "${cmd}". Type "help" for available commands.`, 'error')
    }
  }

  const applySuggestion = (index) => {
    const sug = suggestions[index]
    if (!sug) return
    const parts = input.trim().split(/\s+/)
    if (parts[0] === 'goto' && parts.length > 1 && sug.startsWith('goto ')) {
      setInput(sug)
    } else if (sections.includes(sug)) {
      if (parts.length === 1) {
        setInput(sug)
      } else {
        setInput(`goto ${sug}`)
      }
    } else {
      setInput(sug)
    }
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        applySuggestion(suggestionIdx)
      }
    } else if (e.key === 'ArrowUp') {
      if (suggestions.length > 0) {
        e.preventDefault()
        setSuggestionIdx((prev) => Math.max(0, prev - 1))
        return
      }
      e.preventDefault()
      if (history.length === 0) return
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(newIdx)
      setInput(history[newIdx])
    } else if (e.key === 'ArrowDown') {
      if (suggestions.length > 0) {
        e.preventDefault()
        setSuggestionIdx((prev) => Math.min(suggestions.length - 1, prev + 1))
        return
      }
      e.preventDefault()
      if (historyIdx === -1) return
      const newIdx = historyIdx + 1
      if (newIdx >= history.length) {
        setHistoryIdx(-1)
        setInput('')
      } else {
        setHistoryIdx(newIdx)
        setInput(history[newIdx])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-gray-950 rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-mono text-sm"
      >
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-500">portfolio-cli</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors text-xs">
            Close
          </button>
        </div>

        <div
          className="h-80 overflow-y-auto p-4 space-y-1"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.type === 'input'
                  ? 'text-green-400'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'system'
                  ? 'text-gray-500'
                  : 'text-gray-300'
              } whitespace-pre-wrap`}
            >
              {line.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="relative px-4 py-2.5 bg-gray-900 border-t border-gray-800">
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-1 px-2 py-1 max-h-32 overflow-y-auto">
              {suggestions.map((s, i) => (
                <div
                  key={s}
                  onClick={() => { applySuggestion(i); inputRef.current?.focus() }}
                  className={`px-3 py-1 rounded text-xs cursor-pointer transition-colors ${
                    i === suggestionIdx
                      ? 'bg-primary/30 text-white'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-300 outline-none placeholder-gray-600"
              placeholder="type a command or section name..."
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
