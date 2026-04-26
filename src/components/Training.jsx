import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Plane,
  CloudFog,
  TrendingUp,
  RefreshCw,
  Compass,
  GraduationCap,
} from 'lucide-react'
import SectionWrapper from './SectionWrapper'

const SERVICES = [
  {
    icon: GraduationCap,
    title: 'Private Pilot License (PPL)',
    description:
      'Start your aviation journey. Learn fundamental maneuvers, navigation, and emergency procedures.',
    color: 'text-sky-primary',
    bg: 'bg-sky-50',
  },
  {
    icon: CloudFog,
    title: 'Instrument Rating (IR)',
    description:
      'Fly safely in low-visibility conditions using only your instruments. Essential for serious pilots and required for commercial flying.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    icon: TrendingUp,
    title: 'Commercial Pilot Training',
    description:
      'Advance your skills to professional standards. Complex aircraft operations, cross-country precision, and aeronautical decision making.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: RefreshCw,
    title: 'Flight Review (BFR) & IPC',
    description:
      'Stay current with an FAA-required Biennial Flight Review or restore instrument currency with an Instrument Proficiency Check. Relaxed, focused, and individualized.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Compass,
    title: 'Checkride Prep',
    description:
      'Targeted preparation for oral and practical exams. Mock checkrides, ACS oral review, and confidence-building practice flights.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Plane,
    title: 'Discovery Flight',
    description:
      'Take the controls for the first time! A 60-minute introductory flight over the Bay Area — the perfect gift or first step.',
    color: 'text-sky-secondary',
    bg: 'bg-sky-50',
  },
]

function ServiceCard({ icon: Icon, title, description, color, bg, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(14,165,233,0.12)' }}
      className="group bg-white rounded-2xl p-6 border border-sky-100 shadow-sm cursor-pointer transition-shadow duration-300"
    >
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
        <Icon size={22} className={color} />
      </div>
      <h3 className="font-heading font-semibold text-sky-dark text-lg mb-2">{title}</h3>
      <p className="text-sky-dark/70 text-base leading-relaxed">{description}</p>

    </motion.div>
  )
}

export default function Training() {
  return (
    <SectionWrapper id="training" className="section-padding bg-sky-light">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-sky-primary font-semibold text-base uppercase tracking-widest mb-3">
            Training Programs
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-sky-dark mb-4">
            Training Provided
          </h2>
          <p className="text-sky-dark/70 max-w-xl mx-auto text-lg leading-relaxed">
            Structured, FAA-compliant training programs for every stage of your aviation career.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-primary text-white font-semibold text-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer shadow-md"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
