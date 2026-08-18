import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { siteConfig } from '../../config/site'

export function Hero() {
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 900], [0, 70])
  const { owner } = siteConfig
  const eyesRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const eyes = eyesRef.current
    const portrait = portraitRef.current
    if (!eyes || !portrait || !window.matchMedia('(pointer: fine)').matches) return

    let frameId = 0
    const movePupils = (event: PointerEvent) => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        const bounds = eyes.getBoundingClientRect()
        const centerX = bounds.left + bounds.width / 2
        const centerY = bounds.top + bounds.height / 2
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY) || 1
        const offset = Math.min(14, distance / 28)
        const x = ((event.clientX - centerX) / distance) * offset
        const y = ((event.clientY - centerY) / distance) * offset

        eyes.style.setProperty('--pupil-x', `${x}px`)
        eyes.style.setProperty('--pupil-y', `${y}px`)
        portrait.style.setProperty('--portrait-x', `${((event.clientX / window.innerWidth) - .5) * 16}px`)
        portrait.style.setProperty('--portrait-y', `${((event.clientY / window.innerHeight) - .5) * 10}px`)
        portrait.style.setProperty('--portrait-rotate', `${((event.clientX / window.innerWidth) - .5) * .8}deg`)
      })
    }
    const resetPupils = () => {
      eyes.style.setProperty('--pupil-x', '0px')
      eyes.style.setProperty('--pupil-y', '0px')
      portrait.style.setProperty('--portrait-x', '0px')
      portrait.style.setProperty('--portrait-y', '0px')
      portrait.style.setProperty('--portrait-rotate', '0deg')
    }

    window.addEventListener('pointermove', movePupils, { passive: true })
    window.addEventListener('blur', resetPupils)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', movePupils)
      window.removeEventListener('blur', resetPupils)
    }
  }, [])

  return <section className="hero-portfolio" id="top">
    <motion.div ref={portraitRef} className="hero-sam-portrait" initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
      <img src="assets/images/hero-sunqi-visual-designer-2026.webp" alt={`${owner.name} 设计师肖像`} />
    </motion.div>
    <div className="hero-sam-copy">
      <motion.div ref={eyesRef} className="hero-sam-eyes" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22, duration: .55 }} aria-hidden="true"><i /><i /></motion.div>
      <motion.h1 className="hero-sam-title" style={{ y: titleY }} initial={{ opacity: 0, y: 58 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
        <span>SQ<b>.</b></span><em>STUDIO</em>
      </motion.h1>
      <motion.div className="hero-sam-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .75, duration: .7 }}>
        <p>以极简构建秩序，以前卫打破边界。</p><p>{owner.intro}</p>
      </motion.div>
    </div>
    <motion.div className="hero-sam-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85, duration: .7 }}>BASE · BEIJING<br />EST. · 2026</motion.div>
    <motion.a href="#works" className="hero-work-link" whileHover={{ scale: 1.08, rotate: 7 }} whileTap={{ scale: .96 }} aria-label="查看作品"><ArrowDownRight size={21} /></motion.a>
  </section>
}
