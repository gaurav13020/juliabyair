import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from './SectionWrapper'

const AIRCRAFT = [
  {
    name: 'Cessna 172 Skyhawk',
    type: 'Single-Engine Piston',
    description:
      "The world's most popular training aircraft. Stable, forgiving, and perfectly suited for PPL and instrument rating training.",
    image: '/cessna.jpg',
    tags: ['PPL', 'IFR', 'BFR'],
  },
  {
    name: 'Piper Archer',
    type: 'Single-Engine Piston',
    description:
      'A versatile low-wing trainer with excellent cross-country capability. Great for building hours and mastering different handling characteristics.',
    image: '/piper.jpg',
    tags: ['PPL', 'Cross-Country'],
  },
  {
    name: 'Cessna 310',
    type: 'Twin-Engine Piston',
    description:
      'A classic twin-engine aircraft perfect for multi-engine rating training. Builds confidence managing two powerplants and complex systems.',
    image: '/cessna310.jpg',
    tags: ['Multi-Engine', 'Complex'],
  },
  {
    name: 'Cessna 152',
    type: 'Single-Engine Piston',
    description:
      'A lightweight two-seat trainer ideal for beginners. Low operating costs and simple systems make it a great first aircraft.',
    image: '/cessna152.jpg',
    tags: ['PPL', 'Solo', 'Beginner'],
  },
  {
    name: 'Beechcraft Debonair C33A',
    type: 'Single-Engine Piston',
    description:
      'A high-performance retractable-gear aircraft. Excellent for complex endorsements and building cross-country proficiency.',
    image: '/debonair.jpg',
    tags: ['Complex', 'High-Performance', 'Retractable'],
  },
]

function AircraftCard({ name, type, description, image, tags, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sky-100 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-sky-light">
        <motion.img
          src={image}
          alt={`${name} aircraft`}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-dark/50 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-3 left-4">
          <span className="text-white/80 text-sm font-medium bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading font-semibold text-sky-dark text-xl mb-2">{name}</h3>
        <p className="text-sky-dark/70 text-base leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-sky-light text-sky-primary text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Aircraft() {
  return (
    <SectionWrapper id="aircraft" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-sky-primary font-semibold text-base uppercase tracking-widest mb-3">
            Fleet
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-sky-dark mb-4">
            Aircraft Flown
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {AIRCRAFT.map((aircraft, i) => (
            <AircraftCard key={aircraft.name} {...aircraft} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
