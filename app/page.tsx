import { Navbar } from "@/components/navbar"
import { StarField } from "@/components/star-field"
import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import { AboutSection } from "@/components/about-section"
import { VolunteeringSection } from "@/components/volunteering-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <StarField />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VolunteeringSection />
      <FeaturedWork />
      <ContactSection />
    </main>
  )
}
