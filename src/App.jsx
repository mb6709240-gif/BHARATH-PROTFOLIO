import { useEffect } from 'react'
import Loader from './components/Loader'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  useEffect(() => {
    // Magnetic buttons effect
    const magneticBtns = document.querySelectorAll('.btn-magnetic')
    const handlers = []

    magneticBtns.forEach((btn) => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        btn.style.transform = `translate(${x * 8}px, ${y * 8}px)`
        btn.style.transition = 'transform 0.1s ease'
      }
      const onLeave = () => {
        btn.style.transform = 'translate(0, 0)'
        btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      handlers.push({ btn, onMove, onLeave })
    })

    // Keyboard shortcut: 'S' for scroll to top
    const onKey = (e) => {
      if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      handlers.forEach(({ btn, onMove, onLeave }) => {
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      })
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <>
      <Loader />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  )
}
