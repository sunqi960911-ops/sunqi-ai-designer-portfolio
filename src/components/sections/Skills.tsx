import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { siteConfig } from '../../config/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<typeof siteConfig.skills[number] | null>(null)
  const pointerX = useMotionValue(-400)
  const pointerY = useMotionValue(-400)
  const previewX = useSpring(pointerX, { stiffness: 280, damping: 28, mass: .35 })
  const previewY = useSpring(pointerY, { stiffness: 280, damping: 28, mass: .35 })

  const movePreview = (event: MouseEvent<HTMLElement>) => {
    const previewSize = Math.min(Math.max(window.innerWidth * .2, 220), 320)
    pointerX.set(Math.min(event.clientX + 28, window.innerWidth - previewSize - 18))
    pointerY.set(Math.min(event.clientY + 28, window.innerHeight - previewSize - 18))
  }

  return <><section id="skills" className="section-space relative"><div className="ambient-orb bottom-[-22%] right-[2%]" /><div className="site-shell"><SectionHeading eyebrow="EXPERTISE / 03" title="SERVICE" />
    <div className="skill-list mt-16" onMouseLeave={() => setActiveSkill(null)}>{siteConfig.skills.map((skill, index) => <motion.article key={skill.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1, duration: .6 }} className="skill-list-item" onMouseEnter={event => { setActiveSkill(skill); movePreview(event) }} onMouseMove={movePreview}><span className="skill-list-number">/{skill.number}</span><h3>{skill.title}</h3><p>{skill.copy}</p></motion.article>)}</div>
  </div></section>
  <motion.div className="skill-float-preview" aria-hidden="true" style={{ x: previewX, y: previewY }} animate={{ opacity: activeSkill ? 1 : 0, scale: activeSkill ? 1 : .94 }} transition={{ opacity: { duration: .18 }, scale: { duration: .18 } }}>
    {activeSkill && <img src={activeSkill.image} alt="" />}
  </motion.div>
  </>
}
