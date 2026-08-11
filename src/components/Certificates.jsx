import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { certsData } from '../data/portfolioData'

export default function Certificates() {
  const headerReveal = useReveal()
  const [modalCert, setModalCert] = useState(null)

  const openModal = (cert) => setModalCert(cert)
  const closeModal = () => setModalCert(null)

  const downloadCert = (cert) => {
    if (!cert) return
    fetch(cert.img)
      .then((res) => {
        if (!res.ok) throw new Error('Image not found')
        return res.blob()
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = cert.title.replace(/\s/g, '_') + '.jpg'
        a.click()
        URL.revokeObjectURL(url)
      })
      .catch(() => {
        const content = `Certificate: ${cert.title}\n${cert.desc}`
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = cert.title.replace(/\s/g, '_') + '.txt'
        a.click()
        URL.revokeObjectURL(url)
      })
  }

  return (
    <section className="certificates section-padding" id="certificates">
      <div className="container">
        <div className={'section-header reveal' + (headerReveal.visible ? ' visible' : '')} ref={headerReveal.ref}>
          <span className="section-label">Achievements</span>
          <h2>My <span className="gradient-text">Certificates</span></h2>
          <p className="section-sub">Credentials that validate my skills and commitment to learning.</p>
        </div>

        <div className="certs-grid" id="certsGrid">
          {certsData.map((c, i) => (
            <CertCard
              key={c.id}
              cert={c}
              delay={(i % 4) + 1}
              onView={() => openModal(c)}
              onDownload={() => downloadCert(c)}
            />
          ))}
        </div>
      </div>

      {modalCert && (
        <CertModal cert={modalCert} onClose={closeModal} onDownload={() => downloadCert(modalCert)} />
      )}
    </section>
  )
}

function CertCard({ cert, delay, onView, onDownload }) {
  const { ref, visible } = useReveal()
  return (
    <div className={'cert-card reveal delay-' + delay + (visible ? ' visible' : '')} ref={ref}>
      <div className="cert-img">
        <img src={cert.img} alt={cert.title} />
      </div>
      <div className="cert-body">
        <h4>{cert.title}</h4>
        <p>{cert.desc}</p>
        <div className="cert-actions">
          <button className="btn btn-primary btn-sm" onClick={onView}>
            <i className="fas fa-eye"></i> View
          </button>
          <button className="btn btn-outline btn-sm" onClick={onDownload}>
            <i className="fas fa-download"></i> Download
          </button>
        </div>
      </div>
    </div>
  )
}

function CertModal({ cert, onClose, onDownload }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-overlay active"
      id="certModal"
      onClick={handleOverlayClick}
    >
      <div className="modal-box">
        <button className="modal-close" id="modalClose" onClick={onClose}>&times;</button>
        <div className="preview-img" id="modalPreview">
          <img src={cert.img} alt={cert.title} />
        </div>
        <h3 id="modalTitle">{cert.title}</h3>
        <p id="modalDesc">{cert.desc}</p>
        <button className="btn btn-primary modal-download-btn" id="modalDownloadBtn" onClick={onDownload}>
          <i className="fas fa-download"></i> Download Certificate
        </button>
      </div>
    </div>
  )
}
