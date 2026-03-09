// ================================================================
// data.js — Edit ALL your portfolio content from this single file
// ================================================================

export const personal = {
  name: 'Mohammed Athar K',
  firstName: 'Mohammed',
  lastName: 'Athar K',
  initials: 'MAK',
  title: 'Full Stack Developer',
  degree: 'Bachelor of Computer Application',
  university: 'Vellore Institute of Technology',
  location: 'Vellore, Tamil Nadu',
  graduationYear: 2027,
  bio: "I'm a BCA student at VIT who believes in learning by building. I write clean, purposeful code — from React frontends to FastAPI backends. When I'm not coding, I'm thinking three moves ahead on the chessboard or humming a melody.",
  tagline: 'Building real-world web applications that matter.',
  email: 'kmdathar07@gmail.com',
  phone: '+91 90251 51825',
  linkedin: '',
  github: 'https://github.com/kmdathar07',
  instagram: 'https://instagram.com/mr.athar07',
  resumeUrl: '/resume.pdf',
  availableForWork: true,
}

export const stats = [
  { value: '4+', label: 'Projects Built' },
  { value: '7+', label: 'Technologies' },
  { value: '2027', label: 'Graduating' },
  { value: '100%', label: 'Passion' },
]

export const skillGroups = [
  {
    id: 'programming',
    label: 'Programming',
    icon: '⟨/⟩',
    color: 'accent',
    skills: [
      { name: 'Python', level: 85, years: '2y' },
      { name: 'Java', level: 78, years: '1.5y' },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: '◈',
    color: 'mint',
    skills: [
      { name: 'React', level: 82, years: '1y' },
      { name: 'JavaScript', level: 80, years: '1.5y' },
      { name: 'HTML & CSS', level: 90, years: '2y' },
      { name: 'FastAPI', level: 72, years: '0.5y' },
    ],
  },
  {
    id: 'database',
    label: 'Databases',
    icon: '⬡',
    color: 'violet',
    skills: [
      { name: 'SQL', level: 78, years: '1.5y' },
      { name: 'JDBC', level: 68, years: '1y' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    icon: '⌘',
    color: 'gold',
    skills: [
      { name: 'Git & GitHub', level: 82, years: '1.5y' },
      { name: 'Vite', level: 75, years: '0.5y' },
      { name: 'VS Code', level: 92, years: '2y' },
    ],
  },
]

export const techStack = [
  'React', 'Python', 'Java', 'FastAPI', 'JavaScript',
  'SQL', 'HTML', 'CSS', 'Git', 'JDBC', 'Vite', 'Tailwind',
]

export const projects = [
  {
    id: 1,
    number: '01',
    title: 'Re-Po-Generator',
    shortDesc: 'Resume and portfolio generation tool.',
    description: 'An intelligent platform that auto-generates professional resumes and portfolio websites from user-provided information.',
    tech: ['React', 'FastAPI', 'Python', 'AI/ML', 'Tailwind'],
    github: 'https://github.com/kmdathar07/re-po-generator',
    demo: 'https://re-po-generator.vercel.app/',
    featured: true,
    status: 'Live',
    accent: '#E8654A',
  },
  {
    id: 2,
    number: '02',
    title: 'Class Voting System',
    shortDesc: 'Real-time classroom voting & polling application.',
    description: 'A live polling platform enabling students and instructors to conduct instant votes, gather class feedback, and visualize results in real-time with animated charts.',
    tech: ['React', 'JavaScript', 'CSS3', 'Local Storage'],
    github: 'https://github.com/kmdathar07/classVoting',
    demo: 'https://classvote-delta.vercel.app/',
    featured: true,
    status: 'Complete',
    accent: '#4ECDC4',
  },
  {
    id: 3,
    number: '03',
    title: 'JDBC + Java Projects',
    shortDesc: 'Database-driven Java applications with full CRUD.',
    description: 'Production-style Java applications demonstrating full CRUD operations, stored procedures, connection pooling, and relational database management using JDBC.',
    tech: ['Java', 'JDBC', 'SQL', 'MySQL', 'OOP'],
    github: 'https://github.com/kmdathar07/event-registration-system',
    demo: '',
    featured: false,
    status: 'Complete',
    accent: '#D4A847',
  },
  {
  id: 4,
  number: '04',
  title: 'Portfolio',
  shortDesc: 'Personal developer portfolio website.',
  description: 'A modern animated developer portfolio showcasing projects, skills, education, and contact functionality. Built with React, Vite, Tailwind CSS, and Framer Motion with a FastAPI backend for the contact form.',
  tech: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'FastAPI'],
  github: 'https://github.com/kmdathar07/mohammed-athar-portfolio',
  demo: 'https://mohammed-athar-portfolio.vercel.app/',
  featured: false,
  status: 'Live',
  accent: '#7C6AC4',
}
]

export const education = [
  {
    id: 1,
    degree: 'Bachelor of Computer Application (BCA)',
    institution: 'Vellore Institute of Technology',
    shortName: 'VIT',
    location: 'Vellore, Tamil Nadu',
    period: '2024 — 2027',
    status: 'Currently Enrolled',
    grade: 'Second Year',
    description: 'Comprehensive program covering software development fundamentals, data structures, web development, database management, and software engineering practices.',
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Web Development',
      'Database Management Systems',
      'Software Engineering',
      'Computer Networks',
    ],
    achievements: [
      'Active project builder bridging theory with real-world apps',
      'Passionate contributor to class lab exercises',
      'Self-learning React & FastAPI beyond curriculum',
    ],
  },
]

export const interests = [
  {
    icon: '⌨',
    label: 'Coding',
    description: 'Building projects, solving problems, and learning new frameworks.',
    color: '#E8654A',
  },
  {
    icon: '♟',
    label: 'Chess',
    description: 'Strategic thinking, pattern recognition, patience under pressure.',
    color: '#7C6AC4',
  },
  {
    icon: '♪',
    label: 'Singing',
    description: 'Expressing creativity and emotions through music.',
    color: '#4ECDC4',
  },
]

export const navigation = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'skills', label: 'Skills', path: '/skills' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'education', label: 'Education', path: '/education' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]