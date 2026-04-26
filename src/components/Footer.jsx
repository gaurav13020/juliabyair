import { Plane } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Training', href: '#training' },
  { label: 'Aircraft', href: '#aircraft' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-sky-dark text-white/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 group mb-3" aria-label="JuliaByAir home">
              <div className="w-8 h-8 rounded-full bg-sky-primary flex items-center justify-center">
                <Plane size={16} className="text-white -rotate-45" />
              </div>
              <span className="font-heading font-bold text-white text-lg">
                Julia<span className="text-sky-secondary">ByAir</span>
              </span>
            </a>
            <p className="text-white/60 text-base max-w-xs leading-relaxed">
              Certified Flight Instructor based in San Jose, CA. Helping you become a safe,
              confident pilot.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Julia Sutter · All rights reserved</p>
          <p>Reid Hillview Airport (RHV) · San Jose, CA</p>
        </div>
      </div>
    </footer>
  )
}
