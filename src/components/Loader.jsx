import { useEffect, useState } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 8 + 2
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setHidden(true), 400)
          return 100
        }
        return next
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-ring"></div>
      <div className="loader-text">
        Bharath Portfolio <span id="loaderPercent">{Math.min(Math.floor(progress), 100)}</span>%
      </div>
      <div className="loader-bar">
        <div
          id="loaderFill"
          style={{ width: Math.min(progress, 100) + '%' }}
        ></div>
      </div>
    </div>
  )
}
