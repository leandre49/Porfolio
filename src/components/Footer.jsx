import { navLinks } from '../data/portfolioData'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiHeart } from 'react-icons/fi'
import { usePortfolio } from '../context/PortfolioContext'

export default function Footer() {
  const { personalInfo } = usePortfolio()
  const socialIcons = {
    github: FiGithub,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    instagram: FiInstagram,
  }

  return (
    <footer className="bg-white dark:bg-surface-card border-t border-gray-200 dark:border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
              {`<${personalInfo.name.split(' ')[0]} />`}
            </h3>
            <p className="text-sm text-gray-500 dark:text-text-secondary leading-relaxed">
              Building modern web applications with clean code and great user experiences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-text-primary mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-text-secondary hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-text-primary mb-3">Connect</h4>
            <div className="flex gap-3">
              {Object.entries(personalInfo.social).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                if (!Icon) return null
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-gray-300 dark:border-border text-gray-500 dark:text-text-secondary hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all hover:shadow-lg hover:-translate-y-0.5"
                    aria-label={platform}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-border text-center">
          <p className="text-sm text-gray-400 dark:text-text-secondary flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Made with
            <FiHeart className="text-red-500" size={14} />
            using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
