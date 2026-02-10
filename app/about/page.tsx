import { Navbar } from "@/components/navbar"
import { StarField } from "@/components/star-field"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { VolunteeringSection } from "@/components/volunteering-section"
import { CertificatesSection } from "@/components/certificates-section"

export const metadata = {
  title: "About | Nathalia",
  description: "Learn more about Nathalia - UI/UX Designer, Developer, and AI Developer.",
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <StarField />
      <Navbar />
      <ExperienceSection />
      <EducationSection />
      <VolunteeringSection />
      <SkillsSection />
      <CertificatesSection />
    </main>
  )
}
