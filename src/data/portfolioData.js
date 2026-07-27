export const ADMIN_PASSWORD = 'admin123'

import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaFigma, FaGitAlt, FaGithub,
} from 'react-icons/fa'
import {
  SiTypescript, SiJavascript, SiTailwindcss, SiPostgresql, SiMongodb,
  SiRedis, SiGraphql, SiNextdotjs, SiExpress, SiPrisma, SiFirebase,
  SiStorybook, SiCypress, SiJest,
} from 'react-icons/si'
import leandreImg from '../assets/leandre.jpeg'

export const personalInfo = {
  name: 'Kwizera Bakunda Leandre',
  title: 'Full-Stack Developer',
  email: 'kwizeraleandre65@gmail.com',
  phone: '+250 793 286 713',
  location: 'Kigali, Rwanda',
  bio: [
    'I build modern, scalable web applications with clean code and great user experiences. With expertise across the full stack, I specialize in React ecosystems and cloud-native architectures.',
    'I\'m passionate about open source, developer tooling, and turning complex problems into elegant solutions. When I\'m not coding, you\'ll find me exploring new tech, writing technical articles, or contributing to community projects.',
  ],
  profileImage: leandreImg,
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/leandre49',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    instagram: 'https://instagram.com/l.e.a.n.d.r.e.1',
  },
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const skills = {
  Frontend: [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  ],
  Backend: [
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
  ],
  Database: [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  ],
  'DevOps & Tools': [
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'AWS', icon: FaAws, color: '#FF9900' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
  ],
  Testing: [
    { name: 'Jest', icon: SiJest, color: '#C21325' },
    { name: 'Cypress', icon: SiCypress, color: '#17202C' },
    { name: 'Storybook', icon: SiStorybook, color: '#FF4785' },
  ],
  Design: [
    { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  ],
}

export const projects = [
  {
    id: 1,
    title: 'Delivery Website',
    description: 'A modern food delivery web application with real-time order tracking, restaurant browsing, and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=400&fit=crop',
    techStack: ['React', 'JavaScript', 'Node.js'],
    liveUrl: '',
    githubUrl: 'https://github.com/leandre49/Delivery-website',
  },
  {
    id: 2,
    title: 'HRMS',
    description: 'A comprehensive Human Resource Management System with employee management, payroll, attendance tracking, and reporting dashboards.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '',
    githubUrl: 'https://github.com/leandre49/HRMS',
  },
  {
    id: 3,
    title: 'Cargo Ltd',
    description: 'A cargo and logistics management platform with shipment tracking, inventory management, and reporting features.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    techStack: ['PHP', 'MySQL', 'JavaScript'],
    liveUrl: '',
    githubUrl: 'https://github.com/leandre49/cargo-ltd',
  },
  {
    id: 4,
    title: 'VRS',
    description: 'A Vehicle Rental System with booking management, vehicle availability tracking, and customer management features.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '',
    githubUrl: 'https://github.com/leandre49/VRS',
  },
  {
    id: 5,
    title: 'BWS',
    description: 'A full-stack web application with dynamic frontend and robust backend for efficient data management and user interactions.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '',
    githubUrl: 'https://github.com/leandre49/BWS',
  },
]

export const experience = [
  {
    id: 1,
    role: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    location: 'Kigali, Rwanda',
    period: 'Jan 2023 — Present',
    highlights: [
      'Led development of a microservices platform serving 2M+ users, reducing API latency by 40%',
      'Architected and implemented a real-time data pipeline processing 500K events/day',
      'Mentored 4 junior developers and established code review best practices',
    ],
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'StartupX',
    location: 'Remote',
    period: 'Mar 2021 — Dec 2022',
    highlights: [
      'Built the core product from MVP to production, achieving 50K users in 6 months',
      'Designed and implemented RESTful APIs and GraphQL endpoints for the platform',
      'Reduced bundle size by 60% and improved Lighthouse score from 45 to 92',
    ],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'WebAgency Co.',
    location: 'Los Angeles, CA',
    period: 'Jun 2019 — Feb 2021',
    highlights: [
      'Developed 15+ client-facing web applications using React and TypeScript',
      'Built a reusable component library adopted across 3 teams',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
    ],
  },
]

export const education = [
  {
    id: 1,
    degree: 'High School Diploma',
    school: 'ESSA NYARUGUNGA',
    period: '2023 — 2026',
    details: '',
  },
]

export const highlights = [
  { value: '5+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Delivered' },
  { value: '50+', label: 'Open Source Contributions' },
  { value: '15+', label: 'Happy Clients' },
]
