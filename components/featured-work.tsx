"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { cn } from "@/lib/utils"

const categories = ["All", "UI/UX Design", "Frontend Development"]

const projects = [
  {
    id: "1",
    title: "AWS Cloud Club PUP - Official Website",
    description:
      "Official community platform designed with a high-energy 'Galaxy' aesthetic to centralize resources and drive student engagement.",
    fullDescription: `**Project Overview**\nThe official digital hub for AWS Cloud Club - PUP Manila, designed to centralize event information and community resources.\n\n**The Goal**\nTo transform a technical student organization into an approachable community by leveraging a distinct visual identity that resonates with student developers.\n\n**My Role & Responsibilities**\nAs Lead UI/UX Designer, I owned the end-to-end design process, from translating AWS global brand guidelines into a local "Galaxy" theme to prototyping high-fidelity interactions.\n\n**Key Design Decisions**\n- **Visual Hook:** Implemented a "Galaxy/Cyber" aesthetic using deep violets and glow effects to mirror the futuristic nature of cloud technology.\n- **Micro-interactions:** Integrated purposeful animations and "bloom" effects to increase dwell time and encourage exploration.\n- **Information Architecture:** Structured the homepage to prioritize "Upcoming Events," reducing friction for user registration.`,
    tags: ["UI/UX Design"],
    image: "/aws-cloud-club-pup.jpg",
    year: "2024",
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Branding", "Prototyping"],
  },
  {
    id: "2",
    title: "AWS Student Community Day Philippines 2025",
    description:
      "Frontend implementation for a global-scale tech summit, prioritizing performance, accessibility, and fluid responsiveness.",
    fullDescription: `**Project Overview**\nA high-traffic event landing page for the first major AWS Cloud Club summit globally, requiring high performance and cross-device reliability.\n\n**My Role**\nAs the Frontend Developer, I was responsible for the technical implementation of the UI, focusing on responsiveness, asset optimization, and accessibility (A11y).\n\n**Key Engineering Decisions**\n- **Performance:** Leveraged Next.js for server-side rendering to ensure fast load times critical for mobile users.\n- **Responsive Integrity:** Implemented a fluid grid system to ensure the complex event schedule remained legible on all devices.\n- **Quality Assurance:** Maintained a strict GitHub workflow, ensuring zero broken links and consistent styling through version control.`,
    tags: ["Frontend Development"],
    image: "/aws-student-day.jpg",
    year: "2024",
    role: "Frontend Developer",
    tools: ["Next.js", "React", "Tailwind CSS", "GitHub"],
  },
  {
    id: "3",
    title: "Arduino Day Philippines 2025 - National Tech Event Website",
    description:
      "Establishing a foundational digital presence for a national hardware event, focusing on content clarity and navigation.",
    fullDescription: `**Project Overview**\nThe digital face of Arduino Day Philippines, celebrating open-source hardware and local innovation.\n\n**My Role**\nAs the UI/UX Designer, I focused on establish a clear visual hierarchy that balanced technical documentation with community celebration.\n\n**Key Design Decisions**\n- **Minimalist Layout:** Opted for a "direct-to-point" layout that emphasized event tracks and speaker lineups without visual clutter.\n- **Collaborative Design:** Worked closely with team members to ensure the iconography and color palette stayed true to the Arduino ecosystem.\n- **Scalable Components:** Designed modular systems for event cards to ensure the site was easy to update as speakers were confirmed.`,
    tags: ["UI/UX Design"],
    image: "/arduino-day-philippines.jpg",
    year: "2025",
    role: "UI/UX Designer",
    tools: ["Figma", "Responsive Design", "Accessibility"],
  },
  {
    id: "4",
    title: "Zen – Student Productivity App",
    description:
      "A Gen Z-focused productivity tool designed to combat academic burnout through emotional design and calming aesthetics.",
    fullDescription: `**Project Overview**\nZen is a student productivity app developed over a 2-week sprint for ISEAC to help students manage tasks and focus without stress.\n\n**The Problem**\nTraditional productivity apps often feel rigid and clinical, contributing to student burnout rather than solving it.\n\n**My Role & Approach**\nAs the UI/UX Designer and Frontend Developer, I handled product strategy and visual design. I chose a palette of cosmic blues and violets to induce "Calm Focus."\n\n**Key Features**\n- **Emotional Design:** Playful galaxy theme to make productivity feel less like work.\n- **Friction Reduction:** Mirrored familiar UX patterns (like Instagram-style story wrap-ups) to make the learning curve near-zero.\n- **Motivation Focus:** Integrated focus timers and weekly productivity summaries to keep students energized.`,
    tags: ["UI/UX Design", "Frontend Development"],
    image: "/zen.jpg",
    year: "2024",
    role: "UI/UX Designer & Frontend Developer",
    tools: ["Figma", "React", "Tailwind CSS"],
  }
]

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.tags.includes(activeCategory))

  return (
    <section id="projects" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">Selected Work</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "gradient-button text-white"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}