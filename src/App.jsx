import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Training from './components/Training'
import Aircraft from './components/Aircraft'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Training />
        <Aircraft />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
