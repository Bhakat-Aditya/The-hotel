import AmenityPageLayout from '../components/Layout/AmenityPageLayout'

const features = [
  {
    icon: '💆',
    title: 'Signature Massages',
    description: 'Hot stone, deep tissue, aromatherapy, and our exclusive "Elysian Touch" — a 90-minute full-body ritual.',
  },
  {
    icon: '🧴',
    title: 'Facial Treatments',
    description: 'Anti-aging, hydrating, and brightening facials using La Mer, Sisley, and our own bespoke skincare line.',
  },
  {
    icon: '🧖',
    title: 'Hammam & Steam',
    description: 'A traditional Turkish hammam experience with marble slabs, eucalyptus steam, and exfoliation rituals.',
  },
  {
    icon: '🧘',
    title: 'Meditation Garden',
    description: 'An outdoor zen garden for guided meditation sessions. Sound healing bowls and breathwork workshops.',
  },
  {
    icon: '💎',
    title: 'Gem Therapy',
    description: 'An exclusive treatment using heated precious stones placed on energy points for deep chakra alignment.',
  },
  {
    icon: '🛁',
    title: 'Hydrotherapy Circuit',
    description: 'A 7-stage water journey: cold plunge, warm jets, salt float, herbal steam, rain shower, ice mist, and warm wrap.',
  },
]

const details = [
  { icon: '🕐', title: 'Operating Hours', description: 'Daily from 8:00 AM to 9:00 PM. Late evening appointments available on request.' },
  { icon: '📅', title: 'Booking', description: 'We recommend booking 48 hours in advance. Same-day availability subject to capacity.' },
  { icon: '👫', title: 'Couples Packages', description: 'Private couples suites available for dual treatments. Champagne and chocolate included.' },
  { icon: '🎁', title: 'Gift Cards', description: 'Spa gift cards available from €150. Beautifully packaged for special occasions.' },
  { icon: '📍', title: 'Location', description: 'Lower Ground Floor, Garden Wing. Private entrance from the outdoor zen garden.' },
]

const galleryImages = [
  { src: '/images/spa-wellness.png', alt: 'Spa treatment room' },
  { src: '/images/pool-amenity.png', alt: 'Spa pool connection' },
  { src: '/images/hotel-lobby.png', alt: 'Spa reception' },
]

export default function SpaPage() {
  return (
    <AmenityPageLayout
      title="Elysian Spa"
      subtitle="Sanctuary for the Soul"
      description="A 2,000m² wellness sanctuary where ancient healing traditions meet modern luxury. Surrender to tranquility with our curated treatments, hydrotherapy circuits, and meditation gardens."
      heroImage="/images/spa-wellness.png"
      heroAlt="Aurélian Hotel — Elysian Spa wellness sanctuary"
      features={features}
      details={details}
      galleryImages={galleryImages}
      ctaText="Book your spa journey and let us design a bespoke wellness experience for you."
      metaDescription="Elysian Spa at Aurélian Hotel Paris. 2,000m² wellness sanctuary with hammam, hydrotherapy, meditation garden, and luxury treatments."
    />
  )
}
