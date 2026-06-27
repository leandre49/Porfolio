import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { usePortfolio } from '../context/PortfolioContext'

const formspreeUrl = 'https://formspree.io/f/yourFormID'
const emailjsServiceId = 'service_id'
const emailjsTemplateId = 'template_id'
const emailjsPublicKey = 'public_key'

export default function Contact() {
  const { personalInfo } = usePortfolio()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', text: '' })

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus({ type: 'success', text: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', text: 'Something went wrong. Please try again later.' })
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FiMapPin, label: 'Location', value: personalInfo.location },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50/50 dark:bg-surface-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
          <p className="text-gray-500 dark:text-text-secondary mt-4 max-w-lg mx-auto">
            Have a project in mind? Let&apos;s work together to build something great.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-card border border-gray-200 dark:border-border hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-text-secondary uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-text-primary">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 p-6 rounded-xl bg-white dark:bg-surface-card border border-gray-200 dark:border-border"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-surface-light text-gray-900 dark:text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-surface-light text-gray-900 dark:text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-surface-light text-gray-900 dark:text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="Project Collaboration"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-surface-light text-gray-900 dark:text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              {loading ? 'Sending...' : 'Send Message'}
              <FiSend size={16} />
            </button>
            {status.text && (
              <p className={`mt-3 text-sm text-center ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {status.text}
              </p>
            )}
            <p className="mt-4 text-xs text-gray-400 dark:text-text-secondary text-center">
              Also configured for{' '}
              <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                EmailJS
              </a>
              {' '}&mdash; replace the form action in the code to switch.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
