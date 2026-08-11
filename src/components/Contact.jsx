import useReveal from '../hooks/useReveal'

const socials = [
  { href: 'https://github.com/mb6709240-gif', icon: 'fab fa-github', tooltip: 'GitHub' },
  { href: 'https://www.linkedin.com/in/bharath-m-073232386/', icon: 'fab fa-linkedin-in', tooltip: 'LinkedIn' },
  { href: 'mailto:mb6709240@gmail.com', icon: 'fas fa-envelope', tooltip: 'Email' },
  { href: 'https://x.com/M753705M', icon: 'fab fa-twitter', tooltip: 'Twitter' },
]

export default function Contact() {
  const headerReveal = useReveal()
  const wrapperReveal = useReveal()

  return (
    <section className="contact section-padding bg-surface" id="contact">
      <div className="container">
        <div className={'section-header reveal' + (headerReveal.visible ? ' visible' : '')} ref={headerReveal.ref}>
          <span className="section-label">Connect</span>
          <h2>Let's <span className="gradient-text">Talk</span></h2>
          <p className="section-sub">I'm always open to new ideas, collaborations, or just a friendly hello.</p>
        </div>

        <div className={'contact-wrapper reveal' + (wrapperReveal.visible ? ' visible' : '')} ref={wrapperReveal.ref}>
          <p>
            Whether it's a project, a question, or a cup of coffee —<br />
            I'd love to hear from you.
          </p>
          <div className="social-links">
            {socials.map((s) => (
              <a
                key={s.tooltip}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                data-tooltip={s.tooltip}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
