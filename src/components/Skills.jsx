import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { skillsData } from '../data/portfolioData'

export default function Skills() {
  const headerReveal = useReveal()

  return (
    <section className="skills section-padding" id="skills">
      <div className="container">
        <div className={'section-header reveal' + (headerReveal.visible ? ' visible' : '')} ref={headerReveal.ref}>
          <span className="section-label">Expertise</span>
          <h2>My <span className="gradient-text">Skills</span></h2>
          <p className="section-sub">Technologies I work with — each one a tool in my creative arsenal.</p>
        </div>

        <div className="skills-grid" id="skillsGrid">
          {skillsData.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={(i % 4) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, delay }) {
  const { ref, visible } = useReveal()
  const [barWidth, setBarWidth] = useState(0)
  const innerRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    const rect = innerRef.current.getBoundingClientRect()
    if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
      setBarWidth(skill.pct)
    }
  }, [visible, skill.pct])

  return (
    <div className={'skill-card reveal delay-' + delay + (visible ? ' visible' : '')} ref={ref}>
      <span className="icon">{skill.icon}</span>
      <h4>{skill.name}</h4>
      <div className="skill-bar" ref={innerRef}>
        <div className="fill" style={{ width: barWidth + '%' }}></div>
      </div>
      <span className="pct">{skill.pct}%</span>
    </div>
  )
}
