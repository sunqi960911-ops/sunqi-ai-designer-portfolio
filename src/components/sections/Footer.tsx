import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../../config/site'

export function Footer() {
  const { contact, socialLinks, copyright } = siteConfig

  return <footer id="contact" className="contact-footer">
    <div className="site-shell contact-footer-shell">
      <div className="contact-layout">
        <motion.div
          className="contact-statement"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .3 }}
          transition={{ duration: .65 }}
        >
          <h2>LET’S BUILD<br />BETTER <span>V</span>ISUAL<br />SYSTEMS <ArrowDownRight aria-hidden="true" /></h2>
          <a className="contact-studio-link" href={`mailto:${contact.email}`}>SQ / STUDIO <ArrowUpRight size={15} /></a>
        </motion.div>

        <motion.aside
          className="contact-panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .3 }}
          transition={{ duration: .65, delay: .1 }}
        >
          <p className="contact-panel-title">CONTACT</p>
          <dl className="contact-details">
            <div><dt>手机</dt><dd><a href={`tel:${contact.phone}`}>{contact.phone}</a></dd></div>
            <div><dt>邮箱</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
            <div><dt>地区</dt><dd>{contact.city}</dd></div>
          </dl>
          <p className="contact-role">AI UI DESIGNER · VISUAL &amp; PRODUCT DESIGN</p>
          <div className="contact-links">
            {socialLinks.map(link => <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{link.label}<ArrowUpRight size={13} /></a>)}
          </div>
        </motion.aside>
      </div>

      <div className="contact-copyright"><span>{copyright}</span><a href="#top">BACK TO TOP ↑</a></div>
    </div>
  </footer>
}
