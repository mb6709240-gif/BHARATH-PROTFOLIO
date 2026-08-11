import { useEffect, useState } from 'react'

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      let current = 'hero'
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 120) current = section.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setActive(href.slice(1))
    }
    setOpen(false)
  }

  return (
    <nav className={'navbar' + (scrolled ? ' scrolled' : '')} id="navbar">
      <div className="container nav-inner">
        <a href="#hero" className="logo" onClick={(e) => handleNavClick(e, '#hero')}>BK</a>
        <ul className={'nav-links' + (open ? ' open' : '')} id="navLinks">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={active === item.href.slice(1) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={'hamburger' + (open ? ' active' : '')}
          id="hamburger"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
