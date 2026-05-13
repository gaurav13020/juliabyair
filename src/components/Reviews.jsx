import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import SectionWrapper from './SectionWrapper'

const REVIEWS = [
  {
    name: 'Odilia Pablo',
    avatar: 'OP',
    rating: 5,
    quote:
      'I highly recommend Julia because she is very knowledgeable, patient, and professional. I\'m a slower learner sometimes, but she always takes the time to explain things clearly and works at my pace until I fully understand the lesson. She knows how to break things down in a simple way that makes learning much easier and less stressful. One thing I really appreciate is how she helps connect the information from the books to actual flight training. Going over lessons with her gives me a much better understanding and helps build my confidence. She is responsible, supportive, and truly cares about helping her students succeed. Training with her has been a great experience.',
  },
  {
    name: 'Amanda Chen',
    avatar: 'AC',
    rating: 5,
    quote:
      "Julia is the sweetest CFI I could ever ask for! I love the way she teaches and I learned so much from her. She's always the most patient with me!",
  },
  {
    name: 'Viral Jani',
    avatar: 'VJ',
    rating: 5,
    quote:
      'After taking sessions with other instructors, I met Julia and I have started taking my private pilot flying lessons from her. She is one of a kind instructor. Very smart, knowledgeable and her techniques make my flying sessions easy and on point. I highly recommend Julia for PPL, IFR or CPL.',
  },
  {
    name: 'Esau Rauda',
    avatar: 'ER',
    rating: 5,
    quote:
      "When I first started with flight training I was lost and confused, when I met Julia at SJCA WIA, she showed me different perspectives. She helped me out overcome my fears and doubts, her kind and patients makes every lesson an improvement. Thanks to her style of teaching I was able to get my solo down and moving on cross phase.",
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

function ReviewCard({ review, delay = 0, inView }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
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
        <p className="font-semibold text-sky-dark text-base">{review.name}</p>
      </div>
    </motion.article>
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

        {/* Cards grid (desktop) — 2 columns for 4 reviews */}
        <div
          ref={ref}
          className="hidden md:grid md:grid-cols-2 gap-6"
        >
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} delay={i * 0.1} inView={inView} />
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
                  <p className="font-semibold text-sky-dark text-base">{REVIEWS[current].name}</p>
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
      </div>
    </SectionWrapper>
  )
}
