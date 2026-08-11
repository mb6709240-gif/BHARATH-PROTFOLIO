import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/bharath.jpg'

const texts = ['Frontend Developer', 'React Developer', 'Creative UI Engineer']

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    let timeout
    const typeLoop = () => {
      const current = texts[indexRef.current]
      if (deletingRef.current) {
        charRef.current--
        setTypedText(current.substring(0, charRef.current))
        if (charRef.current === 0) {
          deletingRef.current = false
          indexRef.current = (indexRef.current + 1) % texts.length
          timeout = setTimeout(typeLoop, 600)
          return
        }
        timeout = setTimeout(typeLoop, 35)
      } else {
        charRef.current++
        setTypedText(current.substring(0, charRef.current))
        if (charRef.current === current.length) {
          deletingRef.current = true
          timeout = setTimeout(typeLoop, 2000)
          return
        }
        timeout = setTimeout(typeLoop, 55)
      }
    }
    timeout = setTimeout(typeLoop, 500)
    return () => clearTimeout(timeout)
  }, [])

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = (e) => {
    e.preventDefault()
    const content =
      'Bharath Kumar — Resume\n\nComputer Science Engineering Student\nSkills: Java, Python, HTML, CSS, JS, React\nEducation: Anna University (2024–2028)\n\nPassionate about building elegant digital experiences.'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Bharath_Kumar_Resume.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="hero" id="hero">
      <ParticleCanvas />
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="profile-wrapper" data-tilt>
          <div className="glow-pulse"></div>
          <div className="glow-ring"></div>
          <div className="profile-img">
            <img src={profileImg} alt="Bharath Kumar" />
          </div>
        </div>

        <div className="hero-badge">✦ Open to Opportunities</div>

        <h1>
          Hi, I'm <span className="gradient-text">Bharath Kumar</span>
        </h1>

        <div className="typing-wrapper">
          <span className="typed-text">{typedText}</span>
          <span className="cursor">|</span>
        </div>

        <p className="tagline">
          <strong>Computer Science Student</strong> · Future Full Stack Developer<br />
          Crafting digital experiences with purpose, precision, and passion.
        </p>

        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary btn-magnetic" onClick={scrollToProjects}>
            <i className="fas fa-rocket"></i> View Projects
            <span className="btn-glow"></span>
          </a>
          <a href="#" className="btn btn-outline btn-magnetic" onClick={downloadResume}>
            <i className="fas fa-download"></i> Resume
          </a>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <span className="mouse"><span className="wheel"></span></span>
        </div>
      </div>
    </section>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width, height
    let particles = []
    const mouse = { x: null, y: null }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = canvas.width = rect.width || window.innerWidth
      height = canvas.height = rect.height || window.innerHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (mouse.x !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const force = (150 - dist) / 150
            this.x -= dx * force * 0.02
            this.y -= dy * force * 0.02
          }
        }
        if (this.x < 0 || this.x > width) this.speedX *= -1
        if (this.y < 0 || this.y > height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    function createParticles() {
      const count = Math.min(Math.floor((width * height) / 8000), 200)
      particles = []
      for (let i = 0; i < count; i++) particles.push(new Particle())
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      drawConnections()
      requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }
    const onResize = () => {
      resize()
      createParticles()
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="particleCanvas" ref={canvasRef}></canvas>
}
