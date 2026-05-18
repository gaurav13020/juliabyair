import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionWrapper from './SectionWrapper'

const SERVICES = [
  {
    image: '/selfie.jpg',
    title: 'Private Pilot License (PPL)',
    description:
      'Start your aviation journey. Learn fundamental maneuvers, navigation, and emergency procedures.',
  },
  {
    image: '/cloudHole.png',
    title: 'Instrument Rating (IR)',
    description:
      'Fly safely in low-visibility conditions using only your instruments. Essential for serious pilots and required for commercial flying.',
  },
  {
    image: '/airplanesOnRamp.jpg',
    title: 'Commercial Pilot Training',
    description:
      'Advance your skills to professional standards. Complex aircraft operations, cross-country precision, and aeronautical decision making.',
  },
  {
    image: '/cockpit.jpg',
    title: 'Flight Review (BFR) & IPC',
    description:
      'Stay current with an FAA-required Biennial Flight Review or restore instrument currency with an Instrument Proficiency Check. Relaxed, focused, and individualized.',
  },
  {
    image: '/map.jpg',
    title: 'Checkride Prep',
    description:
      'Targeted preparation for oral and practical exams. Mock checkrides, ACS oral review, and confidence-building practice flights.',
  },
  {
    image: '/discovery.jpg',
    title: 'Discovery Flight',
    description:
      'Take the controls for the first time! An introductory flight over the Bay Area — the perfect gift or first step.',
  },
]

// Three copies so we have room to scroll forward and backward without hitting a DOM edge
const EXTENDED = [...SERVICES, ...SERVICES, ...SERVICES]
const TOTAL = SERVICES.length
const GAP = 24
const SPEED = 80 // px / second

export default function Training() {
  const trackRef = useRef(null)
  const cardWidthRef = useRef(0)
  const isPaused = useRef(false)
  const resumeTimer = useRef(null)
  const animCtrl = useRef(null)

  const [cardWidth, setCardWidth] = useState(0)
  const [ready, setReady] = useState(false)

  const xMotion = useMotionValue(0)

  // --- dimensions ---
  const updateDimensions = useCallback(() => {
    if (!trackRef.current) return
    const w = trackRef.current.offsetWidth
    const v = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
    const cw = (w - GAP * (v - 1)) / v
    cardWidthRef.current = cw
    setCardWidth(cw)
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  // Start in the middle copy so arrows have room in both directions
  useEffect(() => {
    if (cardWidth > 0 && !ready) {
      xMotion.set(-(TOTAL * (cardWidth + GAP)))
      setReady(true)
    }
  }, [cardWidth, ready, xMotion])

  // Continuous scroll driven by rAF
  useAnimationFrame((_, delta) => {
    if (isPaused.current || cardWidthRef.current === 0) return
    const step = cardWidthRef.current + GAP
    const totalWidth = TOTAL * step
    let next = xMotion.get() - (SPEED * delta) / 1000
    // Keep x inside the middle copy range [-2*totalWidth, -totalWidth]
    if (next <= -(2 * totalWidth)) next += totalWidth
    if (next >= -totalWidth) next -= totalWidth
    xMotion.set(next)
  })

  // Re-wrap after a manual animate completes to stay in the middle copy
  const normalise = useCallback(() => {
    const step = cardWidthRef.current + GAP
    const totalWidth = TOTAL * step
    const cur = xMotion.get()
    if (cur <= -(2 * totalWidth)) xMotion.set(cur + totalWidth)
    else if (cur >= -totalWidth) xMotion.set(cur - totalWidth)
  }, [xMotion])

  const scheduleResume = useCallback(() => {
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      isPaused.current = false
    }, 1800)
  }, [])

  const handleMouseEnter = () => {
    clearTimeout(resumeTimer.current)
    isPaused.current = true
  }
  const handleMouseLeave = () => {
    isPaused.current = false
  }

  const handleNext = () => {
    clearTimeout(resumeTimer.current)
    isPaused.current = true
    if (animCtrl.current) animCtrl.current.stop()
    const target = xMotion.get() - (cardWidthRef.current + GAP)
    animCtrl.current = animate(xMotion, target, {
      duration: 0.55,
      ease: 'easeInOut',
      onComplete: () => { normalise(); scheduleResume() },
    })
  }

  const handlePrev = () => {
    clearTimeout(resumeTimer.current)
    isPaused.current = true
    if (animCtrl.current) animCtrl.current.stop()
    const target = xMotion.get() + (cardWidthRef.current + GAP)
    animCtrl.current = animate(xMotion, target, {
      duration: 0.55,
      ease: 'easeInOut',
      onComplete: () => { normalise(); scheduleResume() },
    })
  }

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

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full bg-white shadow-md border border-sky-100 flex items-center justify-center hover:bg-sky-light transition-colors duration-200 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-sky-dark" />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="overflow-hidden"
            style={{ opacity: ready ? 1 : 0 }}
          >
            <motion.div className="flex" style={{ x: xMotion, gap: GAP }}>
              {EXTENDED.map((service, i) => (
                <motion.div
                  key={`${service.title}-${i}`}
                  style={{ width: cardWidth, flexShrink: 0 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(14,165,233,0.12)' }}
                  className="group bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-sky-light">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-sky-dark/30 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-sky-dark text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sky-dark/70 text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full bg-white shadow-md border border-sky-100 flex items-center justify-center hover:bg-sky-light transition-colors duration-200 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-sky-dark" />
          </button>
        </div>

        {/* CTA */}
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
