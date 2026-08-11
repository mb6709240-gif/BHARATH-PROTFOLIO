import useReveal from '../hooks/useReveal'
import { projectsData } from '../data/portfolioData'

export default function Projects() {
  const headerReveal = useReveal()

  return (
    <section className="projects section-padding bg-surface" id="projects">
      <div className="container">
        <div className={'section-header reveal' + (headerReveal.visible ? ' visible' : '')} ref={headerReveal.ref}>
          <span className="section-label">Portfolio</span>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-sub">Each project is a story — of problems solved and lessons learned.</p>
        </div>

        <div className="projects-grid" id="projectsGrid">
          {projectsData.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }) {
  const { ref, visible } = useReveal()

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform =
      `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-12px)`
  }

  const handleMouseLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)'
  }

  return (
    <div
      className={'project-card reveal delay-' + delay + (visible ? ' visible' : '')}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-img">
        {project.icon}
        <div className="overlay">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            <i className="fab fa-github"></i> Code
          </a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            <i className="fas fa-external-link-alt"></i> Live
          </a>
        </div>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <div className="tech-stack">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <p>{project.desc}</p>
      </div>
    </div>
  )
}
