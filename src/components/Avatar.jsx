import { usePortfolio } from '../context/PortfolioContext'

export default function Avatar({ className = '', size = 'default' }) {
  const { personalInfo } = usePortfolio()
  const src = personalInfo.profileImage
  const name = personalInfo.name || '?'
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const sizeClasses =
    size === 'lg'
      ? 'w-64 h-64 sm:w-80 sm:h-80 text-5xl sm:text-6xl'
      : 'w-64 h-64 sm:w-80 sm:h-80 text-5xl sm:text-6xl'

  if (!src) {
    return (
      <div
        className={`${sizeClasses} ${className} rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white font-bold shadow-2xl`}
      >
        {initials}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses} ${className} rounded-2xl overflow-hidden shadow-2xl`}>
      <img src={src} alt={name} className="w-full h-full object-cover" />
    </div>
  )
}
