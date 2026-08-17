import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { MediaPlaceholder } from '../ui/MediaPlaceholder'
import TiltedCard from '../ui/TiltedCard'
import { CountUp } from '../ui/CountUp'

const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 } }

export function About() {
  const { about, owner, contact } = siteConfig
  const info = [
    { label: '当前身份', value: 'AI UI Designer' },
    { label: '擅长方向', value: 'AI / PC / Design System' },
    { label: '邮箱', value: contact.email, icon: Mail, href: `mailto:${contact.email}` },
    { label: '手机', value: contact.phone, icon: Phone, href: `tel:${contact.phone}` },
  ]

  return <section id="about" className="section-space relative overflow-hidden bg-black">
    <div className="site-shell relative"><div className="about-intro-grid grid gap-10 xl:grid-cols-[minmax(420px,.78fr)_minmax(0,1.22fr)] xl:gap-14">
      <motion.div {...reveal} className="about-portrait"><TiltedCard imageSrc={owner.avatar} altText="孙琦个人肖像" captionText="孙琦个人肖像" containerHeight="100%" containerWidth="100%" imageHeight="100%" imageWidth="100%" rotateAmplitude={12} scaleOnHover={1.06} showMobileWarning={false} showTooltip={true} displayOverlayContent={false} overlayContent={null} /></motion.div>
      <div className="about-intro-content pt-2"><motion.p {...reveal} className="eyebrow">{about.eyebrow}</motion.p><motion.h2 {...reveal} transition={{ delay: .06 }} className="about-title">{about.title}</motion.h2><motion.p {...reveal} transition={{ delay: .12 }} className="mt-6 max-w-4xl text-lg leading-8 text-white/60">{about.copy}</motion.p>
        <motion.div {...reveal} transition={{ delay: .18 }} className="about-info-grid mt-8">{info.map((item) => { const Icon = item.icon; const content = <><p>{item.label}</p><span>{item.value}{Icon && <Icon size={15} />}</span></>; return item.href ? <a href={item.href} key={item.label}>{content}</a> : <div key={item.label}>{content}</div> })}</motion.div>
        <motion.div {...reveal} transition={{ delay: .24 }} className="about-stat-grid">{about.stats.map(stat => <div key={stat.label}><strong><CountUp value={stat.value} /></strong><p>{stat.label}</p></div>)}</motion.div>
        <motion.div {...reveal} transition={{ delay: .3 }} className="about-focus"><span>NOW BUILDING</span><div>{about.focus.map(item => <b key={item}>{item}</b>)}</div></motion.div>
      </div>
    </div>
      <motion.div {...reveal} className="career-heading"><span>CAREER PATH</span><h3>工作经历</h3></motion.div>
      <div className="career-timeline">{about.experience.map((item, index) => <motion.article {...reveal} transition={{ delay: index * .08 }} key={item.company} className="career-item"><span className="career-node" /><p className="career-date">{item.date}</p><h4>{item.company}</h4><b>{item.role}</b><p className="career-summary">{item.summary}</p></motion.article>)}</div>
    </div>
  </section>
}
