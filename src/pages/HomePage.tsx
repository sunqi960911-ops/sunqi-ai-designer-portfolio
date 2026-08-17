import { motion } from 'framer-motion'
import { About } from '../components/sections/About'
import { Footer } from '../components/sections/Footer'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'

export function HomePage() {
  return <motion.main id="top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}><Hero /><About /><Projects /><Skills /><Footer /></motion.main>
}
