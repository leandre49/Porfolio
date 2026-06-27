import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function Skills() {
  const { skills } = usePortfolio()
  return (
    <section id="skills" className="py-20 bg-gray-50/50 dark:bg-surface-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-xl bg-white dark:bg-surface-card border border-gray-200 dark:border-border hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-text-primary mb-5 pb-3 border-b border-gray-200 dark:border-border">
                {category}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {items.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-light transition-colors group cursor-default"
                    >
                      {Icon ? (
                        <Icon
                          className="text-2xl transition-transform group-hover:scale-110"
                          style={{ color: skill.color }}
                        />
                      ) : (
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: skill.color }}
                        />
                      )}
                      <span className="text-xs font-medium text-gray-600 dark:text-text-secondary text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
