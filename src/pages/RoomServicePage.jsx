import AmenityPageLayout from '../components/Layout/AmenityPageLayout'

const features = [
  {
    icon: '🛎️',
    title: '24/7 In-Room Dining',
    description: 'A full gourmet menu available any hour. From midnight cravings to sunrise breakfasts, we never sleep.',
  },
  {
    icon: '🍽️',
    title: 'Curated Mini-Bar',
    description: 'Each suite features a bespoke mini-bar with local artisan treats, premium spirits, and fresh daily selections.',
  },
  {
    icon: '🧳',
    title: 'Personal Butler',
    description: 'Presidential and Royal suite guests enjoy a dedicated butler for unpacking, pressing, and personal requests.',
  },
  {
    icon: '💐',
    title: 'Floral Concierge',
    description: 'Daily fresh flower arrangements customized to your preference. Special occasion designs on request.',
  },
  {
    icon: '👶',
    title: 'Family Services',
    description: 'Baby-sitting, children\'s menus, crib setup, and age-appropriate entertainment kits delivered to your room.',
  },
  {
    icon: '🚗',
    title: 'Chauffeur Service',
    description: 'Mercedes S-Class fleet for airport transfers, city tours, and dinner reservations. Available 24/7.',
  },
]

const details = [
  { icon: '🕐', title: 'Availability', description: 'All room service amenities available 24 hours a day, 7 days a week.' },
  { icon: '⚡', title: 'Express Service', description: 'Orders delivered within 30 minutes. Express breakfast in 15 minutes.' },
  { icon: '🧹', title: 'Housekeeping', description: 'Twice daily housekeeping with turndown service. Laundry returned within 4 hours.' },
  { icon: '💻', title: 'Tech Concierge', description: 'IT support, device charging stations, and complimentary high-speed WiFi throughout.' },
  { icon: '📍', title: 'How to Order', description: 'Via in-room tablet, phone (dial 0), or the Aurélian mobile app.' },
]

const galleryImages = [
  { src: '/images/room-service.png', alt: 'Room service breakfast' },
  { src: '/images/suite-presidential.png', alt: 'Presidential suite service' },
  { src: '/images/hotel-lobby.png', alt: 'Concierge desk' },
]

export default function RoomServicePage() {
  return (
    <AmenityPageLayout
      title="Room Service"
      subtitle="At Your Service, Always"
      description="From a perfectly timed espresso at dawn to a midnight tasting menu, our dedicated team ensures every in-room experience is flawless. Your suite, your rules."
      heroImage="/images/room-service.png"
      heroAlt="Aurélian Hotel — Premium room service experience"
      features={features}
      details={details}
      galleryImages={galleryImages}
      ctaText="Contact our concierge to pre-arrange your in-room experience before arrival."
      metaDescription="24/7 luxury room service at Aurélian Hotel Paris. Personal butler, chauffeur service, gourmet in-room dining, and bespoke concierge services."
    />
  )
}
