import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import Avatar from './Avatar'

export default function About() {
  const { personalInfo, highlights } = usePortfolio()
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <Avatar />
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-primary -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-text-primary mb-4">
              Hi, I&apos;m {personalInfo.name}
            </h3>
            {(personalInfo.bio || []).map((paragraph, i) => (
              <p
                key={i}
                className="text-gray-500 dark:text-text-secondary mb-4 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {personalInfo.location}
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Open to Work
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
        >
          {(highlights || []).map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-xl bg-gray-50 dark:bg-surface-light border border-gray-200 dark:border-border"
            >
              <div className="text-3xl font-bold text-primary mb-1">{item.value}</div>
              <div className="text-sm text-gray-500 dark:text-text-secondary">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
