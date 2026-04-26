import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Send, CheckCircle, Instagram } from 'lucide-react'
import SectionWrapper from './SectionWrapper'

// Formspree endpoint for juliasutter19@gmail.com
const FORMSPREE_URL = 'https://formspree.io/f/xwvazwkn'

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-sky-200 bg-white text-sky-dark placeholder-sky-dark/40 text-base focus:outline-none focus:ring-2 focus:ring-sky-primary focus:border-transparent transition-all duration-200'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contact" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-sky-primary font-semibold text-base uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-sky-dark mb-4">
            Contact Me
          </h2>
          <p className="text-sky-dark/70 max-w-xl mx-auto text-lg leading-relaxed">
            Ready to start flying? Have questions? Send me a message and I'll get back to you
            within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-52 bg-sky-light relative shadow-sm border border-sky-100">
              <img
                src="/cockpit.jpeg"
                alt="Cockpit view"
                className="w-full h-full object-cover opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-2">
                  <MapPin size={18} className="text-sky-primary" />
                  <span className="font-medium text-sky-dark text-base">
                    Reid Hillview Airport (RHV)
                  </span>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-light flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-sky-primary" />
                </div>
                <div>
                  <p className="font-medium text-sky-dark text-base">Location</p>
                  <p className="text-sky-dark/70 text-base">San Jose, CA 95110</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-light flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-sky-primary" />
                </div>
                <div>
                  <p className="font-medium text-sky-dark text-base">Email</p>
                  <a
                    href="mailto:juliasutter19@gmail.com"
                    className="text-sky-primary text-base hover:underline"
                  >
                    juliasutter19@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-light flex items-center justify-center flex-shrink-0">
                  <Instagram size={18} className="text-sky-primary" />
                </div>
                <div>
                  <p className="font-medium text-sky-dark text-base">Instagram</p>
                  <a
                    href="https://www.instagram.com/juliabyair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-primary text-base hover:underline"
                  >
                    @juliabyair
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              >
                <CheckCircle size={52} className="text-emerald-500" />
                <h3 className="font-heading text-xl font-bold text-sky-dark">Message Sent!</h3>
                <p className="text-sky-dark/70 text-base max-w-xs">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sky-primary text-sm font-medium hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-sky-dark mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={INPUT_CLASS}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-rose-500 text-sm">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-sky-dark mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={INPUT_CLASS}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-rose-500 text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-base font-medium text-sky-dark mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your goals, current experience level, or any questions you have..."
                    className={`${INPUT_CLASS} resize-none`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-rose-500 text-sm">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-rose-500 text-sm">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-cta text-white font-semibold text-lg hover:bg-orange-500 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
