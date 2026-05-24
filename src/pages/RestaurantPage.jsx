import AmenityPageLayout from '../components/Layout/AmenityPageLayout'

const features = [
  {
    icon: '⭐',
    title: 'Michelin-Starred Cuisine',
    description: 'Two Michelin stars. A menu that evolves with the seasons, celebrating French haute cuisine with global influences.',
  },
  {
    icon: '🍷',
    title: 'Wine Cellar',
    description: 'Over 3,000 curated vintages. Our sommelier offers private tastings and perfect pairings for every course.',
  },
  {
    icon: '👨‍🍳',
    title: 'Chef\'s Table',
    description: 'An exclusive 8-seat experience in the kitchen. Watch Chef Laurent Beaumont craft your tasting menu live.',
  },
  {
    icon: '🌿',
    title: 'Rooftop Garden',
    description: 'Herbs, micro-greens, and edible flowers grown on our rooftop, harvested daily for the freshest ingredients.',
  },
  {
    icon: '🍸',
    title: 'Le Bar Doré',
    description: 'Pre-dinner cocktails in our art deco bar. Award-winning mixology and live jazz every evening.',
  },
  {
    icon: '🎂',
    title: 'Private Dining',
    description: 'Exclusive rooms for celebrations seating 6–24 guests. Custom menus and dedicated sommelier service.',
  },
]

const details = [
  { icon: '🕐', title: 'Dinner Service', description: 'Tuesday – Saturday, 7:00 PM – 11:00 PM. Last seating at 9:30 PM.' },
  { icon: '☀️', title: 'Lunch Service', description: 'Wednesday – Sunday, 12:00 PM – 2:30 PM. Business lunch menu available.' },
  { icon: '🍳', title: 'Breakfast', description: 'Daily, 7:00 AM – 10:30 AM. Continental, à la carte, and the signature "Grand Petit Déjeuner".' },
  { icon: '👔', title: 'Dress Code', description: 'Smart elegant for dinner. Smart casual for lunch and breakfast.' },
  { icon: '📍', title: 'Location', description: 'Ground floor, East Wing. Terrace dining available seasonally.' },
]

const galleryImages = [
  { src: '/images/restaurant-dining.png', alt: 'Le Jardin Doré dining room' },
  { src: '/images/hotel-lobby.png', alt: 'Adjacent lobby lounge' },
  { src: '/images/suite-deluxe.png', alt: 'Room service dining option' },
]

export default function RestaurantPage() {
  return (
    <AmenityPageLayout
      title="Le Jardin Doré"
      subtitle="Two Michelin Stars"
      description="Our signature restaurant where Chef Laurent Beaumont orchestrates a symphony of flavors. Seasonal tasting menus, a legendary wine cellar, and an atmosphere of understated opulence."
      heroImage="/images/restaurant-dining.png"
      heroAlt="Aurélian Hotel — Le Jardin Doré fine dining restaurant"
      features={features}
      details={details}
      galleryImages={galleryImages}
      ctaText="Reserve your table at Le Jardin Doré. Chef's Table experiences require 72-hour advance booking."
      metaDescription="Le Jardin Doré — Two Michelin-starred restaurant at Aurélian Hotel Paris. French haute cuisine, wine cellar with 3,000 vintages, Chef's Table experience."
    />
  )
}
