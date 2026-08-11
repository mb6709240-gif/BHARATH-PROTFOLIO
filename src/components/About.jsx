import useReveal from '../hooks/useReveal'

const aboutCards = [
  { icon: 'fas fa-graduation-cap', title: 'Education', text: 'B.E. Computer Science<br />Anna University, 2024–2028' },
  { icon: 'fas fa-code', title: 'Skills', text: 'Java · Python · JS · React<br />HTML · CSS · Tailwind' },
  { icon: 'fas fa-briefcase', title: 'Experience', text: 'Intern · Freelance<br />1+ year of building' },
  { icon: 'fas fa-heart', title: 'Interests', text: 'Web Dev · AI · UI/UX<br />Open Source · Design' },
]

export default function About() {
  const headerReveal = useReveal()
  const textReveal = useReveal()
  const cardsReveal = useReveal()

  return (
    <section className="about section-padding bg-surface" id="about">
      <div className="container">
        <div className={'section-header reveal' + (headerReveal.visible ? ' visible' : '')} ref={headerReveal.ref}>
          <span className="section-label">About</span>
          <h2>Know <span className="gradient-text">Me</span></h2>
          <p className="section-sub">A glimpse into my journey, values, and what drives me forward.</p>
        </div>

        <div className="about-grid">
          <div className={'about-text reveal' + (textReveal.visible ? ' visible' : '')} ref={textReveal.ref}>
            <p>
              I'm <strong>Bharath Kumar</strong> — a Computer Science student with an
              obsession for building <span className="accent-text">beautiful, functional</span>
              digital experiences. I believe that great design and clean code are not
              mutually exclusive; they're two sides of the same coin.
            </p>
            <p>
              Currently navigating the intersection of <strong>frontend craftsmanship</strong>
              and <strong>backend logic</strong>, I'm on a mission to become a
              <span className="accent-text"> Full Stack Developer</span> who doesn't just
              write code — but creates <strong>solutions</strong> that matter.
            </p>
            <p>
              When I'm not in front of a screen, I'm reading, contributing to open source,
              or exploring the latest in AI and design thinking.
            </p>
          </div>

          <div className="about-cards">
            {aboutCards.map((card, i) => (
              <AboutCard key={card.title} card={card} delay={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCard({ card, delay }) {
  const { ref, visible } = useReveal()
  return (
    <div
      className={'about-card glass-card reveal delay-' + (delay + 1) + (visible ? ' visible' : '')}
      ref={ref}
      data-tilt
    >
      <span className="icon"><i className={card.icon}></i></span>
      <h4>{card.title}</h4>
      <p dangerouslySetInnerHTML={{ __html: card.text }} />
    </div>
  )
}
