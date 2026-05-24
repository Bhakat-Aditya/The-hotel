import AmenityPageLayout from '../components/Layout/AmenityPageLayout'

const features = [
  {
    icon: '🏊',
    title: 'Infinity Edge Pool',
    description: 'Our signature 25m rooftop infinity pool with heated waters, offering uninterrupted views of the Parisian skyline.',
  },
  {
    icon: '🍹',
    title: 'Poolside Bar',
    description: 'Award-winning mixologists crafting bespoke cocktails and fresh juices served directly to your lounger.',
  },
  {
    icon: '🛏️',
    title: 'Private Cabanas',
    description: 'Six exclusive cabanas with dedicated butler service, premium sound systems, and chilled champagne.',
  },
  {
    icon: '👶',
    title: 'Family Pool',
    description: 'A dedicated heated pool for families with children, featuring gentle water features and a shallow play area.',
  },
  {
    icon: '🌊',
    title: 'Hydrotherapy Jets',
    description: 'Integrated hydrotherapy stations along the pool edge for a rejuvenating massage experience.',
  },
  {
    icon: '🌅',
    title: 'Sunset Sessions',
    description: 'Every Friday, live DJ sessions at the pool deck with curated cocktails and Mediterranean tapas.',
  },
]

const details = [
  { icon: '🕐', title: 'Operating Hours', description: 'Daily from 7:00 AM to 10:00 PM. Night swimming available for penthouse guests.' },
  { icon: '🌡️', title: 'Temperature', description: 'Main pool maintained at 28°C year-round. Family pool at 30°C.' },
  { icon: '🧴', title: 'Amenities Included', description: 'Premium towels, sunscreen, robes, and complimentary fruit platters.' },
  { icon: '👔', title: 'Dress Code', description: 'Elegant resort wear. Designer swimwear boutique available on the pool deck.' },
  { icon: '📍', title: 'Location', description: 'Rooftop level (Floor 8). Accessible via the private glass elevator from the lobby.' },
]

const galleryImages = [
  { src: '/images/pool-amenity.png', alt: 'Infinity pool at sunset' },
  { src: '/images/hotel-exterior.png', alt: 'Hotel rooftop view' },
  { src: '/images/spa-wellness.png', alt: 'Pool & spa connection' },
]

export default function PoolPage() {
  return (
    <AmenityPageLayout
      title="Infinity Pool"
      subtitle="Rooftop Aquatic Paradise"
      description="Perched atop the 8th floor, our infinity pool dissolves into the Parisian skyline. Heated year-round, with private cabanas, a poolside bar, and sunset DJ sessions every Friday."
      heroImage="/images/pool-amenity.png"
      heroAlt="Aurélian Hotel — Rooftop infinity pool at sunset"
      features={features}
      details={details}
      galleryImages={galleryImages}
      ctaText="Reserve a private cabana or plan your poolside evening with our concierge."
      metaDescription="Experience the rooftop infinity pool at Aurélian Hotel Paris. Private cabanas, poolside bar, heated year-round with panoramic skyline views."
    />
  )
}
