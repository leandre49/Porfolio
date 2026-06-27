import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import { usePortfolio } from '../context/PortfolioContext'

export default function Education() {
  const { education } = usePortfolio()
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="p-6 rounded-xl bg-white dark:bg-surface-card border border-gray-200 dark:border-border hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <FiBookOpen size={22} />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-2">
                    {edu.period}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-text-primary">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-text-secondary mt-1">
                    {edu.school}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-text-secondary mt-2">
                    {edu.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
