import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image (aviation skyline) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-sky-dark/75 via-sky-dark/60 to-sky-dark/80"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-base font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-sky-secondary animate-pulse" aria-hidden="true" />
          San Jose, CA · FAA Certified
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
        >
          Certified Flight Instructor
          <br />
          <span className="text-sky-secondary">in San Jose</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Helping you become a safe, confident pilot — from your first discovery
          flight to your commercial certificate and beyond.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl bg-cta text-white font-semibold text-lg shadow-lg hover:bg-orange-500 transition-colors duration-200 cursor-pointer"
          >
            Book a Lesson
          </motion.a>
          <motion.a
            href="#training"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg hover:bg-white/25 transition-colors duration-200 cursor-pointer"
          >
            View Training
          </motion.a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  )
}
