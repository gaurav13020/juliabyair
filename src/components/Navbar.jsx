import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plane } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Training', href: '#training' },
  { label: 'Aircraft', href: '#aircraft' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group" aria-label="JuliaByAir home">
          <div className="w-10 h-10 rounded-full bg-sky-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Plane size={18} className="text-white -rotate-45" />
          </div>
          <span className="font-heading font-bold text-sky-dark text-xl tracking-tight">
            Julia<span className="text-sky-primary">ByAir</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-semibold text-gray-900 hover:text-sky-primary transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/juliabyair"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-gray-900 hover:text-sky-primary transition-colors duration-200 cursor-pointer"
          >
            @juliabyair
          </a>
          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 rounded-lg bg-cta text-white text-lg font-semibold hover:bg-orange-500 transition-colors duration-200 cursor-pointer shadow-sm"
          >
            Book a Lesson
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-sky-dark hover:bg-sky-light transition-colors duration-200 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-sky-100 overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="py-3 px-2 text-sm font-medium text-sky-dark hover:text-sky-primary hover:bg-sky-light rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleNavClick}
                className="mt-2 py-3 text-center rounded-lg bg-cta text-white text-sm font-semibold hover:bg-orange-500 transition-colors duration-200 cursor-pointer"
              >
                Book a Lesson
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
