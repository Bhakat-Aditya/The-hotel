import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import SmoothScroll from './components/Layout/SmoothScroll'
import CustomCursor from './components/Layout/CustomCursor'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import PageTransition from './components/Layout/PageTransition'

import HomePage from './pages/HomePage'
import PoolPage from './pages/PoolPage'
import GymPage from './pages/GymPage'
import RestaurantPage from './pages/RestaurantPage'
import RoomServicePage from './pages/RoomServicePage'
import SuitesPage from './pages/SuitesPage'
import SpaPage from './pages/SpaPage'

export default function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Aurélian — Timeless Luxury Hotel | Paris</title>
        <meta name="description" content="Experience unparalleled luxury at Aurélian Hotel, Paris. 147 bespoke suites, Michelin-starred dining, world-class spa, and timeless elegance since 1892." />
        <meta name="keywords" content="luxury hotel, Paris hotel, 5 star hotel, boutique hotel, fine dining, spa, presidential suite" />
        <meta property="og:title" content="Aurélian — Timeless Luxury Hotel" />
        <meta property="og:description" content="Where time surrenders to elegance. Book your extraordinary stay at Aurélian." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aurelian-hotel.com" />
      </Helmet>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Film Grain Noise Overlay */}
      <div className="noise-overlay" />

      {/* Page Transition Overlay */}
      <PageTransition />

      {/* Main Content */}
      <SmoothScroll>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pool" element={<PoolPage />} />
            <Route path="/gym" element={<GymPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/room-service" element={<RoomServicePage />} />
            <Route path="/suites" element={<SuitesPage />} />
            <Route path="/spa" element={<SpaPage />} />
          </Routes>
        </main>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  )
}
