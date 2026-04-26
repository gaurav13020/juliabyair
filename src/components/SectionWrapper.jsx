import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Reusable scroll-triggered fade-up wrapper for sections
export default function SectionWrapper({ children, className = '', id }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
