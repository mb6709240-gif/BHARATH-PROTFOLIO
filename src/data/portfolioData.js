import cert1 from '../assets/cert1.png'
import cert2 from '../assets/cert2.png'
import cert3 from '../assets/cert3.jpeg'
import cert4 from '../assets/cert4.jpeg'

export const skillsData = [
  { name: 'Java', icon: '☕', pct: 85 },
  { name: 'Python', icon: '🐍', pct: 80 },
  { name: 'HTML', icon: '🌐', pct: 95 },
  { name: 'CSS', icon: '🎨', pct: 92 },
  { name: 'JavaScript', icon: '⚡', pct: 88 },
  { name: 'React', icon: '⚛️', pct: 78 },
]

export const projectsData = [
  {
    id: 1,
    title: 'HOBBY WEBSITE',
    desc: 'A personal website built to showcase my hobbies and interests.',
    tech: ['React', 'Tailwind', 'Framer'],
    icon: '🎬',
    github: 'https://github.com/mb6709240-gif',
    demo: 'https://github.com/mb6709240-gif',
  },
  {
    id: 2,
    title: 'MY PORTFOLIO',
    desc: 'A personal portfolio website to showcase my skills and projects.',
    tech: ['JS', 'REACT', 'CSS'],
    icon: '💻',
    github: 'https://github.com/mb6709240-gif',
    demo: 'https://github.com/mb6709240-gif',
  },
  {
    id: 3,
    title: 'ATTENDANCE MANAGEMENT SYSTEM',
    desc: 'A web application to manage and track attendance for students and employees.',
    tech: ['React', 'Node', 'CSS'],
    icon: '📊',
    github: 'https://github.com/mb6709240-gif',
    demo: 'https://mb6709240-gif.github.io/WEBSAMPLE01/',
  },
]

export const certsData = [
  {
    id: 1,
    title: 'LEGACY RESPONSIVE WEB DESIGN V8',
    desc: 'An older freeCodeCamp certification course that teaches core HTML and CSS skills like media queries and flexbox through hands-on projects.',
    img: cert1,
  },
  {
    id: 2,
    title: 'Responsive Web Design',
    desc: 'A web approach that makes pages change size and shape to fit any screen.',
    img: cert2,
  },
  {
    id: 3,
    title: 'INFOSYS JAVA PROGRAMMING FUNDAMENTALS',
    desc: 'Structured training module designed to teach core Java programming basics and object-oriented programming concepts to aspiring software developers.',
    img: cert3,
  },
  {
    id: 4,
    title: 'INFOSYS PYTHON PROGRAMMING FUNDAMENTALS',
    desc: 'Structured training module designed to teach core Python programming basics and object-oriented programming concepts to aspiring software developers.',
    img: cert4,
  },
]
