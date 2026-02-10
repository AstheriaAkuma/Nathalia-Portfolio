import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"

const education = [
  {
    institution: "Stanford University",
    degree: "M.S. Human-Computer Interaction",
    period: "2017 - 2019",
    description: "Focused on interaction design, user research methods, and design thinking.",
  },
  {
    institution: "UCLA",
    degree: "B.S. Computer Science, Minor in Design",
    period: "2013 - 2017",
    description: "Combined technical foundations with design principles and visual communication.",
  },
]

export function EducationSection() {
  return (
    <section className="relative z-10 py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Background</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Education</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div key={edu.institution} className="glass rounded-xl p-6 hover:cosmic-glow transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#591DA9]/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#CB98ED]" />
                </div>
                <div>
                  <Badge className="bg-[#591DA9]/20 text-[#CB98ED] border-[#591DA9]/30 mb-2">{edu.period}</Badge>
                  <h3 className="text-lg font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-[#9B77CB] font-medium mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground text-sm">{edu.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
