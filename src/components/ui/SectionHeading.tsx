import { motion } from 'framer-motion'

interface SectionHeadingProps { eyebrow: string; title: string; align?: 'left' | 'center' }

export function SectionHeading({ eyebrow, title, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      className={align === 'center' ? 'text-center' : ''}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.65 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title whitespace-pre-line">{title}</h2>
    </motion.div>
  )
}
