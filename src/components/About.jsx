import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'

const CERTS = [
  { label: 'Flight Instructor – Airplane Single Engine (CFI)' },
  { label: 'Flight Instructor – Instrument Airplane (CFII)' },
  {
    label: 'Commercial Pilot',
    sub: ['Airplane Single Engine Land', 'Instrument Airplane'],
  },
  { label: 'Ground Instructor – Advanced' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="section-padding bg-white">
      <div className="container-max">
        <p className="text-sky-primary font-semibold text-base uppercase tracking-widest mb-3">
          About Me
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-sky-dark mb-12">
          Your Instructor, Julia Sutter
        </h2>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-sky-light">
              <img
                src="/julia.jpg"
                alt="Julia Sutter, Certified Flight Instructor, in the cockpit"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-sky-light -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* Bio + Certs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <p className="text-sky-dark/80 text-lg leading-relaxed mb-5">
              Raised on Bainbridge Island, Washington, my path to the flight deck was actually
              sparked in Thailand during middle school. While participating in a Thai Airways youth
              program, I had the opportunity to land a full-motion Boeing 747 simulator; that
              experience, and the mentorship from the captains I met there, solidified my dream of
              becoming a pilot.
            </p>
            <p className="text-sky-dark/80 text-lg leading-relaxed mb-8">
              I began my formal flight training in Washington during high school before moving to
              San Jose State University. My time at SJSU was defined by leadership and service; as
              President of Women in Aviation (WAI), I led a $10,000 fundraising campaign to sponsor
              18 students for the 2025 International Conference and established two scholarships for
              aspiring high school aviators. Now that I've graduated, I'm instructing full-time and
              staying active in organizations like PAPA and WAI to help mentor the next generation
              of first-generation aviators.
            </p>

            {/* Certificates */}
            <div>
              <p className="font-heading font-semibold text-sky-dark text-base uppercase tracking-widest mb-4">
                Certificates &amp; Ratings
              </p>
              <ul className="space-y-2">
                {CERTS.map((cert) => (
                  <li key={cert.label}>
                    <div className="flex items-start gap-2 text-sky-dark/80 text-base">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-primary flex-shrink-0" aria-hidden="true" />
                      {cert.label}
                    </div>
                    {cert.sub && (
                      <ul className="mt-1.5 ml-6 space-y-1">
                        {cert.sub.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sky-dark/60 text-base">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-primary flex-shrink-0" aria-hidden="true" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
