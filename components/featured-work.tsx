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
    subtitle: "Official Website",
    description: "Official community platform designed with a high-energy 'Galaxy' aesthetic to centralize resources and drive student engagement.",
    fullDescription: `The official digital hub for AWS Cloud Club - PUP Manila, designed to centralize event information and community resources.\n\nAs Lead UI/UX Designer, I owned the end-to-end design process, from translating AWS global brand guidelines into a local "Galaxy" theme to prototyping high-fidelity interactions.\n\n→ Implemented a "Galaxy/Cyber" aesthetic using deep violets and glow effects to mirror the futuristic nature of cloud technology.\n→ Integrated purposeful animations and "bloom" effects to increase dwell time and encourage exploration.\n→ Structured the homepage to prioritize "Upcoming Events," reducing friction for user registration.`,
    tags: ["UI/UX Design"],
    image: "/aws-cloud-club-pup2.jpg",
    year: "2024",
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Branding", "Prototyping"],
    accent: "#7c3aed",
    size: "large", // large card in bento
  },
  {
    id: "2",
    title: "AWS Student Community Day",
    subtitle: "Philippines 2025",
    description: "Frontend implementation for a global-scale tech summit, prioritizing performance, accessibility, and fluid responsiveness.",
    fullDescription: `A high-traffic event landing page for the first major AWS Cloud Club summit globally, requiring high performance and cross-device reliability.\n\nAs the Frontend Developer, I was responsible for the technical implementation, focusing on responsiveness, asset optimization, and accessibility.\n\n→ Leveraged Next.js for server-side rendering to ensure fast load times critical for mobile users.\n→ Implemented a fluid grid system to ensure the complex event schedule remained legible on all devices.\n→ Maintained a strict GitHub workflow ensuring zero broken links and consistent styling.`,
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
    subtitle: "National Tech Event Website",
    description: "Establishing a foundational digital presence for a national hardware event, focusing on content clarity and navigation.",
    fullDescription: `The digital face of Arduino Day Philippines, celebrating open-source hardware and local innovation.\n\nAs the UI/UX Designer, I focused on establishing a clear visual hierarchy that balanced technical documentation with community celebration.\n\n→ Opted for a "direct-to-point" layout emphasizing event tracks and speaker lineups without visual clutter.\n→ Worked closely with team members to ensure iconography stayed true to the Arduino ecosystem.\n→ Designed modular systems for event cards to ensure the site was easy to update as speakers were confirmed.`,
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
    title: "Zen",
    subtitle: "Student Productivity App",
    description: "A Gen Z-focused productivity tool designed to combat academic burnout through emotional design and calming aesthetics.",
    fullDescription: `Zen is a student productivity app developed over a 2-week sprint to help students manage tasks and focus without stress.\n\nAs the UI/UX Designer and Frontend Developer, I handled product strategy and visual design, choosing a palette of cosmic blues and violets to induce "Calm Focus."\n\n→ Playful galaxy theme to make productivity feel less like work.\n→ Mirrored familiar UX patterns (like Instagram-style story wrap-ups) to make the learning curve near-zero.\n→ Integrated focus timers and weekly productivity summaries to keep students energized.`,
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
          <p style={{ fontSize: "0.85rem", color: project.accent, fontWeight: 500, marginBottom: "20px" }}>{project.role}</p>

          {/* Body */}
          <div className="fw-mono" style={{ fontSize: "0.82rem", color: "rgba(196,181,253,0.6)", lineHeight: 1.75, whiteSpace: "pre-line", marginBottom: "24px" }}>
            {project.fullDescription}
          </div>

          {/* Tools */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tools.map((t) => (
              <span key={t} className="fw-mono" style={{ fontSize: "0.68rem", padding: "4px 12px", borderRadius: "999px", border: `1px solid ${project.accent}35`, color: `${project.accent}cc`, letterSpacing: "0.05em" }}>{t}</span>
            ))}
          </div>
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

        {/* Top meta */}
        <div style={{ position: "absolute", top: "18px", left: "18px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span key={t} className="fw-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: project.accent, background: "rgba(4,3,10,0.75)", border: `1px solid ${project.accent}40`, padding: "3px 10px", borderRadius: "999px", backdropFilter: "blur(6px)" }}>{t}</span>
          ))}
        </div>

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
              // Portfolio
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