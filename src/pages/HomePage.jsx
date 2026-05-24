import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Rooms from '../components/Rooms/Rooms'
import Gallery from '../components/Gallery/Gallery'
import Amenities from '../components/Amenities/Amenities'
import Dining from '../components/Dining/Dining'
import Testimonials from '../components/Testimonials/Testimonials'
import Contact from '../components/Contact/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <Gallery />
      <Amenities />
      <Dining />
      <Testimonials />
      <Contact />
    </>
  )
}
