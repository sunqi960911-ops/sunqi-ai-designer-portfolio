import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { siteConfig } from '../../config/site'

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORKS', href: '#works' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
]

export function Navigation() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (value) => setIsScrolled(value > 36))

  return (
    <header className="nav-fixed">
      <div className="site-shell py-5">
        <motion.div layout className={`nav-pill${isScrolled ? ' nav-pill-scrolled' : ''}`} transition={{ duration: .28, ease: 'easeOut' }}>
          <Link to="/" className="nav-brand group" aria-label="回到首页">
            <span>SQ / STUDIO</span>
          </Link>
          <nav className="hidden items-center justify-center gap-10 md:flex" aria-label="主导航">
            {navItems.map((item) => <a key={item.label} href={item.href} className="nav-link">{item.label}</a>)}
          </nav>
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} href={`mailto:${siteConfig.contact.email}`} className="nav-contact hidden lg:inline-flex">
            联系我 <ArrowUpRight size={15} />
          </motion.a>
          <button className="nav-menu md:hidden" type="button" aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(value => !value)}><Menu size={19} /></button>
        </motion.div>
        <AnimatePresence>{isMenuOpen && <motion.nav id="mobile-navigation" className="nav-mobile-menu md:hidden" aria-label="移动端主导航" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .2 }}>
          {navItems.map(item => <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</a>)}
        </motion.nav>}</AnimatePresence>
      </div>
    </header>
  )
}
