"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, ExternalLink, ArrowUpRight } from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = ["All", "UI/UX Design", "Frontend Development"]

const projects = [
  {
    id: "1",
    title: "AWS Cloud Club PUP",
    link: "https://www.awsccpup.cloud/",
    subtitle: "Official Website",
    description: "A redesigned community platform focused on increasing engagement, event participation, and member onboarding through functional UX.",
    fullDescription: `This project is a full redesign of the AWS Cloud Club PUP official website. The previous version primarily focused on presenting information about the organization, but lacked functional depth—resulting in low repeat visits and minimal user interaction.

    The goal of the redesign was to transform the website from a static informational page into an interactive platform that supports both engagement and operations.

    As Lead UI/UX Designer, I led the end-to-end design process—from identifying usability gaps to implementing a system that supports real user actions.

    Key improvements include:
    - Introduced an integrated application flow, allowing interested students to apply directly through the website instead of external channels.
    - Designed structured sections for events, programs, and the Skill Builder department to clearly communicate the club’s value.
    - Implemented an ID Finder system to streamline member verification during both onsite and virtual events.
    - Reworked information architecture to prioritize “what users can do” rather than “what the organization is.”

    Despite these functional changes, the visual identity remained consistent with AWS Cloud Club’s “Galaxy” branding—leveraging deep violets, glow effects, and immersive visuals to maintain brand recognition.

    Outcome:
    The redesign shifted the platform from passive viewing to active participation—supporting recruitment, improving accessibility to resources, and encouraging repeated engagement with the community.`,
    tags: ["UI/UX Design"],
    image: "/aws-cloud-club-pup2.jpg",
    year: "2024",
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Branding", "Prototyping"],
    accent: "#7c3aed",
    size: "large", 
  },
  {
    id: "2",
    title: "AWS Student Community Day",
    link: "https://scdmm.awscloudclubs.ph/",
    subtitle: "Philippines 2025",
    description: "A high-traffic event platform built for scalability, responsiveness, and cross-team collaboration across a nationwide organization.",
    fullDescription: `AWS Student Community Day Philippines is a nationwide event organized by AWS Cloud Clubs across the country, requiring a centralized platform capable of handling high traffic and diverse user access.

    As a Frontend Developer, I was responsible for implementing the interface using Next.js, React, and Tailwind CSS, with a focus on responsiveness, performance, and quality assurance.

    This project required constant coordination across multiple teams—including organizers, developers, and UI/UX designers—to ensure consistency in branding and content delivery.

    Key contributions include:
    - Developed responsive layouts to ensure accessibility across devices, particularly for mobile users.
    - Maintained content accuracy and structure, ensuring all event details, schedules, and assets were properly integrated.
    - Conducted quality assurance checks to prevent broken links, layout inconsistencies, and missing resources.
    - Collaborated closely with designers to adjust UI components based on real-time requirements and constraints.

    A major challenge in this project was aligning multiple contributors under a unified system while maintaining speed and quality.

    Outcome:
    The platform successfully supported a large-scale event, delivering a smooth user experience while maintaining visual consistency and technical reliability across devices.`,
    tags: ["Frontend Development"],
    image: "/aws-student-day2.jpg",
    year: "2024",
    role: "Frontend Developer",
    tools: ["Next.js", "React", "Tailwind CSS", "GitHub"],
    accent: "#2563eb",
    size: "normal",
  },
  {
    id: "3",
    title: "Arduino Day Philippines 2025",
    link: "https://www.arduinodayphilippines.cc/",
    subtitle: "National Tech Event Website",
    description: "A clean, hardware-focused interface designed to communicate event details clearly while staying true to Arduino’s branding.",
    fullDescription: `Arduino Day Philippines is a nationwide event celebrating open-source hardware and innovation. The website serves as the primary platform for communicating event details, registration, and program flow.

    As a UI/UX Designer, my role focused on building a consistent design system and designing key sections of the website in collaboration with developers.

    The design approach emphasized clarity, accessibility, and alignment with Arduino’s established visual identity.

    Key contributions include:
    - Developed a design system based on Arduino’s branding—featuring green tones, clean layouts, and minimal visual noise.
    - Designed key pages highlighting event information such as location maps, registration flow, and event timelines.
    - Structured content to ensure users can quickly understand what the event is, where it takes place, and how to participate.
    - Collaborated with developers to ensure accurate implementation of design components.

    Unlike more experimental designs, this project prioritized usability and direct communication—ensuring that both technical and non-technical audiences could navigate the platform بسهولة.

    Outcome:
    The final design provided a clear and structured user experience, making event information easily accessible while reinforcing Arduino’s brand identity.`,
    tags: ["UI/UX Design"],
    image: "/arduino-day-philippines2.jpg",
    year: "2025",
    role: "UI/UX Designer",
    tools: ["Figma", "Responsive Design", "Accessibility"],
    accent: "#06b6d4",
    size: "normal",
  },
  {
    id: "4",
    title: "Zen [2nd Place]",
    link: "https://www.linkedin.com/posts/nathalia-angela-mancilla-807853287_we-just-wrapped-up-the-iseac-2025-hackathon-activity-7301858811428945921-4VTz",
    subtitle: "ISEAC Hackathon Project",
    description: "A goal-oriented productivity platform designed to address short attention spans through personalization, progress tracking, and behavioral design.",
    fullDescription: `Zen is a productivity application developed during a hackathon focused on solving challenges in education, AI, and cybersecurity.

    The problem we addressed was the increasing difficulty of students to maintain focus for extended periods—often linked to shorter attention spans influenced by digital environments and constant stimuli (e.g., social media usage patterns and rapid content consumption).

    Our approach was to design a system that encourages consistency through motivation, personalization, and visible progress.

    As a UI/UX Designer and Frontend Developer, I contributed to both product strategy and implementation.

    Key features include:
    - A goal-oriented dashboard that tracks study progress across daily, weekly, and monthly intervals.
    - Personalized study scheduling, allowing users to define preferred study hours visualized through a “progress ring” system.
    - Integration of the Pomodoro technique to support structured focus sessions.
    - AI-powered note-taking to assist in summarizing and organizing study materials.
    - “AI Study Wrapped” — inspired by Spotify Wrapped — providing users with a visual summary of their study habits to encourage continued engagement.

    This approach combines behavioral design with familiar interaction patterns to reduce friction and improve retention.

    Outcome:
    The project placed 2nd in the competition, demonstrating strong alignment between problem identification, solution design, and user experience execution.`,
    tags: ["UI/UX Design", "Frontend Development"],
    image: "/zen.jpg",
    year: "2024",
    role: "UI/UX Designer & Frontend Developer",
    tools: ["Figma", "React", "Tailwind CSS"],
    accent: "#a78bfa",
    size: "large",
  },
]

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(4,3,10,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "modalFadeIn 0.3s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(10,6,28,0.95)",
          border: `1px solid ${project.accent}40`,
          borderRadius: "20px",
          maxWidth: "720px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: `0 0 60px ${project.accent}25`,
          animation: "modalSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, rgba(10,6,28,0.95))` }} />
          {/* Accent overlay */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${project.accent}20, transparent 60%)`, mixBlendMode: "screen" }} />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(10,6,28,0.8)", border: "1px solid rgba(167,139,250,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#c4b5fd",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.3)" }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,6,28,0.8)" }}
        >
          <X size={15} />
        </button>

        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          {/* Meta row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {project.tags.map((t) => (
              <span key={t} className="fw-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: project.accent, background: `${project.accent}15`, border: `1px solid ${project.accent}35`, padding: "3px 10px", borderRadius: "999px" }}>{t}</span>
            ))}
            <span className="fw-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(196,181,253,0.4)", padding: "3px 10px" }}>{project.year}</span>
          </div>

          <h3 className="fw-title" style={{ fontSize: "1.7rem", fontWeight: 800, color: "#f0ecff", lineHeight: 1.15, marginBottom: "4px" }}>{project.title}</h3>
          <p style={{ fontSize: "0.85rem", color: project.accent, fontWeight: 500,marginBottom: "5px" }}>{project.role}</p>
          {/* Body */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px"}}>
            {project.tools.map((t) => (
              <span
                key={t}
                className="fw-mono"
                style={{
                  fontSize: "0.68rem",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  border: `1px solid ${project.accent}30`,
                  color: `${project.accent}cc`,
                  background: `${project.accent}10`,
                  letterSpacing: "0.05em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="fw-mono" style={{ fontSize: "0.82rem", color: "rgba(196,181,253,0.6)", lineHeight: 1.75, whiteSpace: "pre-line", marginBottom: "24px" }}>
            {project.fullDescription}
          </div>
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "10px",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: project.accent,
                border: `1px solid ${project.accent}40`,
                padding: "10px 16px",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = `${project.accent}20`
                el.style.boxShadow = `0 0 20px ${project.accent}30`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = "transparent"
                el.style.boxShadow = "none"
              }}
            >
              {project.link.includes("linkedin") ? "View Case Study" : "View Live Site"}
              <ExternalLink size={14} />
            </a>
          )}

          {/* Tools
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tools.map((t) => (
              <span key={t} className="fw-mono" style={{ fontSize: "0.68rem", padding: "4px 12px", borderRadius: "999px", border: `1px solid ${project.accent}35`, color: `${project.accent}cc`, letterSpacing: "0.05em" }}>{t}</span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  isLarge,
  onClick,
}: {
  project: typeof projects[0]
  index: number
  isLarge: boolean
  onClick: () => void
}) {
  const { ref, visible } = useReveal(0.08)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.65s ease ${index * 100}ms, transform 0.65s ease ${index * 100}ms`,
      }}
    >
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: "18px",
          overflow: "hidden",
          cursor: "pointer",
          background: "rgba(10,6,28,0.7)",
          border: `1px solid ${hovered ? project.accent + "55" : "rgba(124,58,237,0.16)"}`,
          boxShadow: hovered ? `0 0 36px ${project.accent}22` : "none",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          height: isLarge ? "380px" : "280px",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              filter: hovered ? "brightness(0.45)" : "brightness(0.25) saturate(0.6)",
              transition: "filter 0.45s ease, transform 0.45s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, ${project.accent}18 0%, rgba(4,3,10,0.85) 60%)`,
            transition: "opacity 0.3s ease",
            opacity: hovered ? 1 : 0.7,
          }}
        />

        {/* Corner glow */}
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: `radial-gradient(circle, ${project.accent}35 0%, transparent 65%)`, pointerEvents: "none" }} />

        {/* Top-right year */}
        <div style={{ position: "absolute", top: "18px", right: "18px" }}>
          <span className="fw-mono" style={{ fontSize: "0.62rem", color: "rgba(196,181,253,0.35)", letterSpacing: "0.1em" }}>{project.year}</span>
        </div>

        {/* Bottom content */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "20px 22px 22px",
            background: "linear-gradient(to top, rgba(4,3,10,0.96) 0%, transparent 100%)",
          }}
        >
          <h3 className="fw-title" style={{ fontSize: isLarge ? "1.35rem" : "1.05rem", fontWeight: 800, color: "#f0ecff", lineHeight: 1.2, marginBottom: "4px" }}>{project.title}</h3>
          <p style={{ fontSize: "0.78rem", color: project.accent, fontWeight: 500, marginBottom: "10px" }}>{project.subtitle}</p>
          <p className="fw-mono" style={{ fontSize: "0.75rem", color: "rgba(196,181,253,0.5)", lineHeight: 1.6, display: hovered ? "block" : "none" }}>{project.description}</p>

          {/* Hover CTA */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              marginTop: hovered ? "12px" : "0",
            }}
          >
            <span className="fw-mono" style={{ fontSize: "0.68rem", color: project.accent, letterSpacing: "0.1em" }}>view case study</span>
            <ArrowUpRight size={12} color={project.accent} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Filter pill ───────────────────────────────────────────────────────────────

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fw-mono"
      style={{
        padding: "8px 20px",
        borderRadius: "999px",
        fontSize: "0.75rem",
        letterSpacing: "0.08em",
        cursor: "pointer",
        transition: "all 0.25s ease",
        border: active ? "1px solid rgba(124,58,237,0.6)" : "1px solid rgba(124,58,237,0.2)",
        background: active
          ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.2))"
          : "rgba(124,58,237,0.06)",
        color: active ? "#e9d5ff" : "rgba(196,181,253,0.5)",
        boxShadow: active ? "0 0 18px rgba(124,58,237,0.25)" : "none",
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)" }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)" }}
    >
      {label}
    </button>
  )
}

// ── Featured Work ─────────────────────────────────────────────────────────────

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const { ref: headerRef, visible: headerVisible } = useReveal(0.1)

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeCategory))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        .fw-title { font-family: 'Syne', sans-serif; }
        .fw-mono  { font-family: 'DM Mono', monospace; }

        @keyframes fw-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .fw-gradient-text {
          background: linear-gradient(90deg, #a78bfa, #67e8f9, #c084fc, #a78bfa);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fw-shimmer 5s linear infinite;
        }

        /* Bento responsive grid */
        .fw-bento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .fw-bento { grid-template-columns: repeat(2, 1fr); }
          .fw-bento [style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 560px) {
          .fw-bento { grid-template-columns: 1fr; }
          .fw-bento [style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>

      <section id="projects" className="relative z-10 py-28 px-6">
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "15%", right: "-150px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-100px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              marginBottom: "40px",
            }}
          >
            <p className="fw-mono" style={{ color: "#a78bfa", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "12px" }}>
              Portfolio
            </p>
            <h2
              className="fw-title"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "#f0ecff", lineHeight: 1.1 }}
            >
              Selected{" "}
              <span className="fw-gradient-text">Work</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
            {categories.map((c) => (
              <FilterPill
                key={c}
                label={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
              />
            ))}
          </div>

          {/* Bento grid */}
          <div className="fw-bento">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isLarge={project.size === "large" && filtered.length > 2}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  )
}