import { Navbar } from "@/components/navbar"
import { StarField } from "@/components/star-field"

export const metadata = {
  title: "Projects | Nathalia",
  description: "Selected work showcasing UI/UX design, development, and AI projects.",
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <StarField />
      <Navbar />

      {/* Page Header */}
      <section className="relative z-10 pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-3">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">Selected Work</h1>
          <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
            A curated collection of projects spanning UI design, UX research, branding, and full-stack development.
          </p>
        </div>
      </section>
    </main>
  )
}
