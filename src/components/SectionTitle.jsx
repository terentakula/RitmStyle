import { motion } from 'motion/react'

export default function SectionTitle({ eyebrow, children, align = 'center' }) {
  return (
    <motion.div
      className={`section-heading section-heading--${align}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
    </motion.div>
  )
}
