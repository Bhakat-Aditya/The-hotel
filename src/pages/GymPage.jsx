import AmenityPageLayout from '../components/Layout/AmenityPageLayout'

const features = [
  {
    icon: '🏋️',
    title: 'Free Weights Zone',
    description: 'A complete collection of premium dumbbells, barbells, and Olympic lifting platforms in a dedicated space.',
  },
  {
    icon: '🏃',
    title: 'Cardio Terrace',
    description: 'State-of-the-art treadmills, ellipticals, and rowing machines facing floor-to-ceiling windows.',
  },
  {
    icon: '🧘',
    title: 'Yoga & Pilates Studio',
    description: 'A dedicated studio with bamboo floors, ambient lighting, and daily classes led by certified instructors.',
  },
  {
    icon: '👤',
    title: 'Personal Trainers',
    description: 'Elite trainers available for one-on-one sessions. Custom workout plans tailored to your goals.',
  },
  {
    icon: '🥤',
    title: 'Juice & Recovery Bar',
    description: 'Fresh cold-pressed juices, protein shakes, and post-workout recovery snacks made to order.',
  },
  {
    icon: '🧖',
    title: 'Recovery Suite',
    description: 'Ice bath, infrared sauna, and compression therapy for optimal post-workout recovery.',
  },
]

const details = [
  { icon: '🕐', title: 'Operating Hours', description: 'Open 24/7 for all hotel guests. Staffed trainers available 6:00 AM – 9:00 PM.' },
  { icon: '👕', title: 'Complimentary Kit', description: 'Premium workout attire, towels, and water bottles provided. No need to pack gym gear.' },
  { icon: '📅', title: 'Group Classes', description: 'Daily yoga (7 AM), HIIT (12 PM), and meditation (6 PM). Boxing on weekends.' },
  { icon: '📍', title: 'Location', description: 'West Wing, Floor 2. Connected to the Spa via a private corridor.' },
]

const galleryImages = [
  { src: '/images/gym-fitness.png', alt: 'Fitness center overview' },
  { src: '/images/spa-wellness.png', alt: 'Connected spa facilities' },
  { src: '/images/pool-amenity.png', alt: 'Post-workout pool access' },
]

export default function GymPage() {
  return (
    <AmenityPageLayout
      title="Fitness Center"
      subtitle="Peak Performance, Elevated"
      description="A 500m² temple of fitness featuring cutting-edge equipment, panoramic city views, and 24/7 access. Your wellness journey begins here."
      heroImage="/images/gym-fitness.png"
      heroAlt="Aurélian Hotel — Premium fitness center"
      features={features}
      details={details}
      galleryImages={galleryImages}
      ctaText="Book a personal training session or inquire about our wellness programs."
      metaDescription="24/7 luxury fitness center at Aurélian Hotel Paris. Personal trainers, yoga studio, recovery suite, and state-of-the-art equipment."
    />
  )
}
