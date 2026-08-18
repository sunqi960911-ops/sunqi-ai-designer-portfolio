import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { assetPath, siteConfig } from '../../config/site'
import { MediaPlaceholder } from '../ui/MediaPlaceholder'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!activeProject) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveProject(null) }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeProject])

  return <><section id="works" className="section-space"><div className="site-shell"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="SELECTED WORK / 02" title="Design Portfolio" /></div>
    <div className="project-grid mt-14">{siteConfig.projects.map((project, index) => <ProjectCard project={project} key={project.id} index={index} onOpen={() => setActiveProject(project)} />)}</div>
  </div></section><AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence></>
}

type Project = typeof siteConfig.projects[number]
const xiaomiCaseImages = Array.from({ length: 26 }, (_, index) => assetPath(`assets/images/xiaomi-case-${index + 4}.webp`))
const dmCaseImages = Array.from({ length: 20 }, (_, index) => assetPath(`assets/images/dm-case-${index + 2}.webp`))
const davinciCaseImages = Array.from({ length: 11 }, (_, index) => assetPath(`assets/images/davinci-case-${index + 2}.webp`))

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const openWithKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return <motion.article initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .08, duration: .7 }} whileHover={{ y: -7 }} className="project-card group" role="button" tabIndex={0} aria-label={`查看${project.title}项目`} onClick={onOpen} onKeyDown={openWithKeyboard}>
    <div className="project-cover">
      <MediaPlaceholder image={project.image} label="PROJECT IMAGE / REPLACE IN CONFIG" className={`project-visual tone-${project.tone}`} />
      <div className="project-cover-meta"><span>{project.type}</span><span>{project.number} / {String(siteConfig.projects.length).padStart(2, '0')}</span></div>
    </div>
    <div className="project-copy">
      <p>{project.type}</p>
      <div className="project-title-row"><h3>{project.title}</h3><span>{project.year}</span></div>
      <div className="project-link"><span>查看项目</span><ArrowRight size={19} /></div>
    </div>
  </motion.article>
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const detailImages = project.id === 'mi-manager' ? xiaomiCaseImages : project.id === 'dm-system' ? dmCaseImages : project.id === 'davinci' ? davinciCaseImages : null

  return <motion.div className="project-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.section className="project-modal" role="dialog" aria-modal="true" aria-label={`${project.title} 项目详情`} initial={{ opacity: 0, y: 30, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .985 }} transition={{ duration: .34, ease: [.16, 1, .3, 1] }} onMouseDown={event => event.stopPropagation()}>
      <button className="project-modal-close" type="button" onClick={onClose} aria-label="关闭项目详情"><X size={20} /></button>
      <div className="project-modal-body">{detailImages ? detailImages.map((image, index) => <img key={image} className="project-modal-detail-image" src={image} alt={`${project.title} 项目图 ${index + 1}`} loading={index < 2 ? 'eager' : 'lazy'} />) : <><MediaPlaceholder image={project.image} label="PROJECT COVER" className={`project-modal-cover tone-${project.tone}`} />
        <div className="project-modal-image-slot"><span>PROJECT IMAGE SLOT / 01</span><strong>预留项目长图位置</strong><p>后续可在这里添加项目过程图、界面截图或成果展示图。</p></div>
        <div className="project-modal-image-slot project-modal-image-slot-wide"><span>PROJECT IMAGE SLOT / 02</span><strong>预留更多项目图片</strong></div></>}</div>
    </motion.section>
  </motion.div>
}
