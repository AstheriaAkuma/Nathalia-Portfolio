import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const experiences = [
  {
    company: "TechCorp Inc.",
    role: "Senior Product Designer",
    location: "San Francisco, CA",
    period: "2023 - Present",
    description:
      "Leading design for flagship products, mentoring junior designers, and establishing design system foundations.",
    highlights: [
      "Led redesign resulting in 40% increase in user engagement",
      "Established component library used across 5 products",
      "Mentored team of 3 junior designers",
    ],
    tools: ["Figma", "React", "TypeScript", "Framer"],
  },
  {
    company: "StartupLabs",
    role: "UI/UX Designer & Developer",
    location: "New York, NY",
    period: "2021 - 2023",
    description: "Designed and developed user interfaces for early-stage startups across fintech and healthcare.",
    highlights: [
      "Shipped 12+ products from concept to launch",
      "Conducted 50+ user research sessions",
      "Reduced development handoff time by 60%",
    ],
    tools: ["Sketch", "Next.js", "Tailwind CSS", "Prisma"],
  },
  {
    company: "Creative Agency",
    role: "Junior Designer",
    location: "Los Angeles, CA",
    period: "2019 - 2021",
    description: "Created brand identities and digital experiences for clients across various industries.",
    highlights: [
      "Designed 20+ brand identity systems",
      "Won 2 design awards for client work",
      "Transitioned agency to design systems approach",
    ],
    tools: ["Illustrator", "Photoshop", "After Effects", "InVision"],
  },
]

export function ExperienceSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Career</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#591DA9] via-[#9B77CB] to-[#75A3EB] transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#591DA9] rounded-full transform -translate-x-1/2 border-4 border-background" />

              {/* Content */}
              <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <div className="glass rounded-xl p-6 hover:cosmic-glow transition-all duration-500">
                  <div className={`flex flex-wrap items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <Badge className="bg-[#591DA9]/20 text-[#CB98ED] border-[#591DA9]/30">{exp.period}</Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-[#9B77CB] font-medium mb-2">{exp.company}</p>

                  <div
                    className={`flex items-center gap-4 text-sm text-muted-foreground mb-4 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Highlights */}
                  <ul
                    className={`space-y-1 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}
                  >
                    {exp.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="text-[#9B77CB] mt-1.5 text-xs">●</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    {exp.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="border-border text-muted-foreground text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
