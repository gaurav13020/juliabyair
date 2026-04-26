import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import SectionWrapper from './SectionWrapper'

const REVIEWS = [
  {
    name: 'Alex M.',
    role: 'Private Pilot Graduate',
    quote:
      'Julia is an incredible instructor. Her patience and methodical approach made the difference for me. I went from zero experience to passing my checkride in under a year. Highly recommend!',
    rating: 5,
    avatar: 'AM',
  },
  {
    name: 'Sarah K.',
    role: 'Instrument Rating Student',
    quote:
      'Working on my IR with Julia has been amazing. She explains complicated concepts clearly and always keeps safety front of mind. The training is challenging but she knows exactly how to push you in the right direction.',
    rating: 5,
    avatar: 'SK',
  },
  {
    name: 'David L.',
    role: 'Discovery Flight Student',
    quote:
      "I took a discovery flight as a birthday gift to myself and it was the best decision I ever made. Julia made me feel completely at ease, and now I'm enrolled in her PPL course!",
    rating: 5,
    avatar: 'DL',
  },
  {
    name: 'Rachel T.',
    role: 'Commercial Pilot Candidate',
    quote:
      "Julia's checkride prep sessions are worth every penny. She ran me through the oral exam multiple times and caught gaps I didn't even know I had. Passed first try!",
    rating: 5,
    avatar: 'RT',
  },
  {
    name: 'Marcus J.',
    role: 'BFR Student',
    quote:
      'Needed a flight review after a few years off. Julia was professional, thorough, and reminded me why I fell in love with flying. Already booked follow-up lessons.',
    rating: 5,
    avatar: 'MJ',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  )
}

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const total = REVIEWS.length
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  return (
    <SectionWrapper id="reviews" className="section-padding bg-sky-light">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-sky-primary font-semibold text-base uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-sky-dark mb-4">
            Student Reviews
          </h2>
          <p className="text-sky-dark/70 max-w-xl mx-auto text-lg">
            Hear from pilots who've trained with Julia.
          </p>
        </div>

        {/* Cards grid (desktop) */}
        <div
          ref={ref}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REVIEWS.slice(0, 3).map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 flex flex-col gap-4"
            >
              <StarRating count={review.rating} />
              <p className="text-sky-dark/80 text-base leading-relaxed italic flex-1">
                "{review.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sky-dark text-base">{review.name}</p>
                  <p className="text-sky-dark/60 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Carousel (mobile) */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 flex flex-col gap-4"
              >
                <StarRating count={REVIEWS[current].rating} />
                <p className="text-sky-dark/80 text-base leading-relaxed italic">
                  "{REVIEWS[current].quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-primary flex items-center justify-center text-white text-sm font-bold">
                    {REVIEWS[current].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sky-dark text-base">{REVIEWS[current].name}</p>
                    <p className="text-sky-dark/60 text-sm">{REVIEWS[current].role}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center hover:bg-sky-light transition-colors duration-200 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} className="text-sky-dark" />
            </button>
            <div className="flex gap-2" aria-label={`Review ${current + 1} of ${total}`}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    i === current ? 'bg-sky-primary w-5' : 'bg-sky-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center hover:bg-sky-light transition-colors duration-200 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={18} className="text-sky-dark" />
            </button>
          </div>
        </div>

        {/* Additional 2 reviews (desktop only) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mt-6">
          {REVIEWS.slice(3).map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 flex flex-col gap-4"
            >
              <StarRating count={review.rating} />
              <p className="text-sky-dark/80 text-base leading-relaxed italic flex-1">
                "{review.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-primary flex items-center justify-center text-white text-sm font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sky-dark text-base">{review.name}</p>
                  <p className="text-sky-dark/60 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
