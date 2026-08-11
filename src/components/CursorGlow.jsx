import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const glow = glowRef.current
    const dot = dotRef.current

    const onMove = (e) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      glow.style.opacity = '1'
    }
    const onLeave = () => {
      dot.style.opacity = '0'
      glow.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    const interactiveSelectors = 'a, button, .btn, .skill-card, .project-card, .cert-card, .social-link'
    const elements = document.querySelectorAll(interactiveSelectors)
    const onHoverEnter = () => dot.classList.add('hover')
    const onHoverLeave = () => dot.classList.remove('hover')

    elements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverEnter)
      el.addEventListener('mouseleave', onHoverLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverEnter)
        el.removeEventListener('mouseleave', onHoverLeave)
      })
    }
  }, [])

  return (
    <>
      <div className="cursor-glow" id="cursorGlow" ref={glowRef}></div>
      <div className="cursor-dot" id="cursorDot" ref={dotRef}></div>
    </>
  )
}
