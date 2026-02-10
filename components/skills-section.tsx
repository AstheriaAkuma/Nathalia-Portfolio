const skillCategories = [
  {
    title: "Design",
    skills: ["UI Design", "UX Research", "Interaction Design", "Design Systems", "Prototyping", "Visual Design"],
  },
  {
    title: "Development",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    title: "Tools",
    skills: ["Figma", "Framer", "VS Code", "Git", "Vercel", "Linear"],
  },
  {
    title: "Other",
    skills: ["AI/ML Integration", "Accessibility (WCAG)", "Agile/Scrum", "User Testing", "Data Analysis", "Leadership"],
  },
]

export function SkillsSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Skills & Interests</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-[#CB98ED]">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary/50 text-foreground/80 hover:bg-[#591DA9]/20 hover:text-[#CB98ED] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
