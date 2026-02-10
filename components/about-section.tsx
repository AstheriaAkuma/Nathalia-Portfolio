"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Palette, Code2, Wrench, Sparkles } from "lucide-react"

const experiences = [
  {
    company: "Make Technology Inc.",
    role: "DevOps Intern",
    location: "Manila, PH",
    period: "Oct 2025 - Dec 2025",
    description:
      "Worked on backend-driven proof-of-concepts and real-time systems by integrating cloud services with web and mobile interfaces.",
    highlights: [
      "Built a proof-of-concept JSON formatter using AWS Bedrock with backend logic and a simple frontend interface",
      "Developed a technician monitoring system with real-time updates using AWS Kinesis and WebRTC",
    ],
    tools: [
      "AWS Bedrock",
      "AWS Kinesis",
      "WebRTC",
      "OpenAI",
      "Gemini",
      "JavaScript",
    ],
  },
  {
    company: "Technomancer Inc.",
    role: "Frontend Developer Intern",
    location: "Manila, PH",
    period: "Jul 2025 - Sep 2025",
    description:
      "Contributed to multiple client-facing projects by implementing frontend updates and improving team collaboration workflows.",
    highlights: [
      "Applied Git and Bitbucket workflows with Jira integration to improve collaboration across 10+ active projects",
      "Implemented responsive updates and tested features across multiple client websites, with 5 projects deployed live",
    ],
    tools: ["Git", "Bitbucket", "Jira", "SSH", "HTML", "CSS", "JavaScript"],
  },
  {
    company: "Springboard Labs",
    role: "Product Design Intern",
    location: "Manila, PH",
    period: "Mar 2025 - Jun 2025",
    description:
      "Focused on product design and developer handoff by creating clear user flows and translating designs into usable components.",
    highlights: [
      "Designed a ticketing and project management system in Figma within 3 weeks, emphasizing clean user flows",
      "Collaborated with developers to translate designs into functional frontend components using ShadCN and open-source libraries",
    ],
    tools: ["Figma", "ShadCN", "Design Systems", "UX Research"],
  },
  {
    company: "AWS Cloud Club PUP",
    role: "UI/UX Lead",
    location: "Manila, PH",
    period: "Oct 2023 - Oct 2025",
    description:
      "Led design initiatives and mentorship programs to improve accessibility, onboarding, and design consistency across the organization.",
    highlights: [
      "Led the redesign of the club website and created a scalable UI/UX roadmap for 200+ members",
      "Conducted Figma workshops and UX talks, mentoring 50+ peers and standardizing design practices",
    ],
    tools: ["Figma", "UI/UX Strategy", "Accessibility", "Design Leadership"],
  },
]

const skillCategories = [
  {
    title: "Development",
    icon: Code2,
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "Vue.js",
      "Laravel",
      "Tailwind CSS",
      "REST API Integration",
      "AWS (Bedrock, Kinesis)",
    ],
  },
  {
    title: "Design & Prototyping",
    icon: Palette,
    skills: [
      "UI Design",
      "UX Research",
      "User Testing",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Adobe Illustrator",
      "Figma",
    ],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    skills: [
      "Git/GitHub",
      "Bitbucket",
      "VS Code",
      "Trello",
      "Notion",
      "Vercel",
      "Jira",
    ],
  },
  {
    title: "Interests & Creative Skills",
    icon: Sparkles,
    skills: [
      "AI/ML Integration",
      "Graphic Designing",
      "Photography",
      "Video Editing",
      "Branding & Digital Arts",
    ],
  },
]

export function AboutSection() {
  const [isColored, setIsColored] = useState(false)

  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* About Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              onClick={() => setIsColored(!isColored)}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden glass cursor-pointer group"
            >
              <Image
                src="/nathalia-about-me.jpg"
                alt="Nathalia - UI/UX Designer"
                fill
                className={`
                  object-cover
                  transition-all duration-700 ease-out
                  grayscale
                  group-hover:grayscale-0
                  ${isColored ? "grayscale-0" : ""}
                `}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#591DA9]/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#75A3EB]/20 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-3">About Me</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              Designer, Developer,
              <br />
              <span className="gradient-text">Problem Solver</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm Nathalia, a multidisciplinary designer and developer passionate about creating digital experiences that are both beautiful and functional. I specialize in user-centered products that combine UI/UX design, frontend development, AI integration, and cloud services.
              </p>
              <p>
                My experience spans <strong>web and mobile applications</strong>, from designing responsive interfaces to building frontend components and integrating AI solutions that enhance usability. As <strong>UI/UX Lead at AWS Cloud Club PUP Manila</strong>, I guide projects from concept to implementation and mentor peers to deliver seamless, accessible digital experiences.
              </p>
              <p>
                Outside of work, I enjoy hackathons, collaborative tech projects, and creative pursuits like graphic design, photography, and video editing.
              </p>

            </div>

            <div className="mt-8">
              <Button
                className="
                  gradient-button
                  text-white
                  border-0
                  px-8 py-6
                  text-base font-medium
                  rounded-full
                  transition-all duration-300
                  hover:opacity-90
                  hover:scale-105
                  cosmic-glow
                "
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Career</p>
              <h3 className="text-3xl sm:text-4xl font-bold">Experience</h3>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#591DA9] via-[#9B77CB] to-[#75A2EB00] transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex flex-col md:flex-row gap-8 mb-[-6rem] last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#591DA9] rounded-full transform -translate-x-1/2 border-4 border-background" />

                {/* Content */}
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-16 md:text-left" : "md:pl-16"}`}>
                  <div className="glass rounded-xl p-10 hover:cosmic-glow transition-all duration-500">
                    <div
                      className={`flex flex-wrap items-center gap-3 mb-3`}
                    >
                      <Badge className="bg-[#591DA9]/20 text-[#CB98ED] border-[#591DA9]/30">{exp.period}</Badge>
                    </div>

                    <h4 className="text-xl font-semibold mb-1">{exp.role}</h4>
                    <p className="text-[#9B77CB] font-medium mb-2">{exp.company}</p>

                    <div
                      className={`flex items-center gap-4 text-sm text-muted-foreground mb-4`}
                    >
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <ul
                      className={`space-y-1 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:text-left" : ""}`}
                    >
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="text-[#9B77CB] mt-1.5 text-xs">●</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tools */}
                    <div className={`flex flex-wrap gap-2`}>
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

        {/* Skills */}
        <div>
          <div className="mb-12">
            <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Expertise</p>
            <h3 className="text-3xl sm:text-4xl font-bold">Skills & Interests</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="glass rounded-xl p-6 hover:cosmic-glow transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#591DA9]/20 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-[#CB98ED]" />
                  </div>
                  <h4 className="font-semibold text-[#CB98ED] text-sm uppercase tracking-wide">
                    {category.title}
                  </h4>
                </div>
                                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border border-border/60 bg-transparent text-muted-foreground hover:border-[#9B77CB]/50 hover:text-foreground transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
