import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin } from 'react-icons/fi'
import { usePortfolio } from '../context/PortfolioContext'

export default function Experience() {
  const { experience } = usePortfolio()
  return (
    <section id="experience" className="py-20 bg-gray-50/50 dark:bg-surface-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-surface -translate-x-1/2 mt-1.5 z-10" />
                <div className="flex-1 pl-10 md:pl-0">
                  <div className="p-6 rounded-xl bg-white dark:bg-surface-card border border-gray-200 dark:border-border hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-text-primary">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 mb-3 text-sm text-gray-500 dark:text-text-secondary">
                      <span className="flex items-center gap-1">
                        <FiBriefcase size={14} />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 dark:text-text-secondary flex gap-2"
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
