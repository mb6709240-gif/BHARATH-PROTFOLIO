import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={'scroll-top' + (visible ? ' visible' : '')}
      id="scrollTop"
      onClick={scrollToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}
