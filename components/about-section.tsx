"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Download, MapPin, ChevronRight } from "lucide-react"
import { Palette, Code2, Wrench, Sparkles } from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const experiences = [
  {
    company: "Make Technology Inc.",
    role: "DevOps Intern",
    location: "Manila, PH",
    period: "Oct 2025 – Dec 2025",
    description:
      "Built AI-powered proof-of-concepts and real-time systems by integrating Next.js applications with AWS services and modern AI models.",
    highlights: [
      "Developed an AI-enhanced interior design catalog using Next.js with a chatbot interface for product matching and synthetic image generation",
      "Engineered an AI-powered JSON formatter using AWS Bedrock and Next.js, optimizing large-scale data structures and deploying via Vercel",
      "Architected a real-time technician monitoring system connecting React Native and Next.js using AWS Kinesis and WebRTC, integrating GPT-4o mini for video analysis",
    ],
    tools: ["Next.js", "AWS Bedrock", "AWS Kinesis", "WebRTC", "GPT-4o mini", "Vercel", "JavaScript"],
    accent: "#7c3aed",
  },
  {
    company: "Technomancer Inc.",
    role: "Web Developer Intern",
    location: "Manila, PH",
    period: "Jul 2025 – Sep 2025",
    description:
      "Supported development and deployment of multiple client websites while improving collaboration workflows across teams.",
    highlights: [
      "Managed version control and project workflows using Git, Bitbucket, and Jira across 10+ active projects with SSH-based environments",
      "Developed and maintained responsive features for 5 live Laravel-based client websites, ensuring cross-device compatibility",
    ],
    tools: ["Git", "Bitbucket", "Jira", "SSH", "Laravel", "HTML", "CSS", "JavaScript"],
    accent: "#2563eb",
  },
  {
    company: "Springboard Labs",
    role: "Product Design Intern",
    location: "Manila, PH",
    period: "Mar 2025 – Jun 2025",
    description:
      "Designed product systems and worked closely with developers to translate UX decisions into production-ready components.",
    highlights: [
      "Designed a ticketing and project management system in Figma within a 3-week sprint, focusing on efficient user flows",
      "Collaborated with engineers to convert high-fidelity designs into functional components using ShadCN UI and open-source libraries",
    ],
    tools: ["Figma", "ShadCN UI", "Design Systems", "UX Research"],
    accent: "#06b6d4",
  },
  {
    company: "AWS Cloud Club PUP",
    role: "UI/UX Lead",
    location: "Manila, PH",
    period: "Oct 2023 – Oct 2025",
    description:
      "Led UI/UX initiatives, improving accessibility, onboarding, and design consistency for a growing tech community.",
    highlights: [
      "Directed a full website redesign and established a scalable UI/UX roadmap for 200+ members",
      "Facilitated Figma workshops and UX sessions for 50+ peers, standardizing design systems and component usage",
    ],
    tools: ["Figma", "UI/UX Strategy", "Accessibility", "Design Systems"],
    accent: "#a78bfa",
  },
]

const skillCategories = [
  {
    title: "Development",
    icon: Code2,
    color: "#7c3aed",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Vue.js", "Laravel", "Tailwind CSS", "REST API", "AWS"],
  },
  {
    title: "Design",
    icon: Palette,
    color: "#06b6d4",
    skills: ["UI Design", "UX Research", "User Testing", "Wireframing", "Prototyping", "Design Systems", "Figma", "Illustrator"],
  },
  {
    title: "Tools",
    icon: Wrench,
    color: "#2563eb",
    skills: ["Git/GitHub", "Bitbucket", "VS Code", "Trello", "Notion", "Vercel", "Jira"],
  },
  {
    title: "Creative",
    icon: Sparkles,
    color: "#a78bfa",
    skills: ["AI/ML Integration", "Graphic Design", "Photography", "Video Editing", "Branding & Digital Arts"],
  },
]

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="about-mono mb-3 text-xs font-medium tracking-[0.22em] uppercase"
      style={{ color: "#a78bfa" }}
    >
      {children}
    </p>
  )
}

// ── Skill pill ────────────────────────────────────────────────────────────────
function SkillPill({ label, color, delay }: { label: string; color: string; delay: number }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "0.72rem",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.04em",
        border: `1px solid ${hov ? color : "rgba(167,139,250,0.2)"}`,
        color: hov ? color : "rgba(196,181,253,0.6)",
        background: hov ? `${color}18` : "transparent",
        transition: "all 0.22s ease",
        cursor: "default",
        animationDelay: `${delay}ms`,
      }}
    >
      {label}
    </span>
  )
}

// ── Experience card ───────────────────────────────────────────────────────────
function ExpCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, visible } = useReveal(0.1)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
      }}
    >
      <div
        className="exp-card group"
        style={{
          position: "relative",
          background: "rgba(10,6,28,0.7)",
          border: "1px solid rgba(124,58,237,0.18)",
          borderRadius: "16px",
          padding: "28px 32px",
          backdropFilter: "blur(16px)",
          transition: "border-color 0.3s, box-shadow 0.3s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = `${exp.accent}55`
          el.style.boxShadow = `0 0 32px ${exp.accent}22, inset 0 0 32px ${exp.accent}08`
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = "rgba(124,58,237,0.18)"
          el.style.boxShadow = "none"
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: "3px",
            borderRadius: "0 3px 3px 0",
            background: `linear-gradient(180deg, transparent, ${exp.accent}, transparent)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className="about-mono"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                color: exp.accent,
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              {exp.period}
            </span>
            <h4
              className="about-title"
              style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f0ecff", marginBottom: "2px" }}
            >
              {exp.role}
            </h4>
            <p style={{ fontSize: "0.88rem", color: exp.accent, fontWeight: 500 }}>{exp.company}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <MapPin size={11} style={{ color: "rgba(196,181,253,0.4)" }} />
            <span className="about-mono" style={{ fontSize: "0.68rem", color: "rgba(196,181,253,0.4)" }}>
              {exp.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: "0.875rem", color: "rgba(196,181,253,0.55)", marginTop: "14px", lineHeight: 1.65 }}>
          {exp.description}
        </p>

        {/* Expandable highlights */}
        <div style={{ marginTop: "16px" }}>
          <ul style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {exp.highlights.map((h, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "0.82rem",
                  color: "rgba(196,181,253,0.65)",
                  marginBottom: "8px",
                }}
              >
                <ChevronRight size={12} style={{ color: exp.accent, marginTop: "3px", flexShrink: 0 }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
          {exp.tools.map((t) => (
            <span
              key={t}
              className="about-mono"
              style={{
                fontSize: "0.65rem",
                padding: "3px 10px",
                borderRadius: "999px",
                border: `1px solid ${exp.accent}40`,
                color: `${exp.accent}cc`,
                letterSpacing: "0.06em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Skill card ────────────────────────────────────────────────────────────────
function SkillCard({ cat, index }: { cat: typeof skillCategories[0]; index: number }) {
  const { ref, visible } = useReveal(0.1)
  const Icon = cat.icon

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(10,6,28,0.65)",
          border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(12px)",
          height: "100%",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = `${cat.color}50`
          el.style.boxShadow = `0 0 28px ${cat.color}18`
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = "rgba(124,58,237,0.15)"
          el.style.boxShadow = "none"
        }}
      >
        {/* Background glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cat.color}25 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "9px",
              background: `${cat.color}20`,
              border: `1px solid ${cat.color}35`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={16} color={cat.color} />
          </div>
          <span
            className="about-title"
            style={{ fontSize: "0.8rem", fontWeight: 700, color: cat.color, letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {cat.title}
          </span>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {cat.skills.map((s, i) => (
            <SkillPill key={s} label={s} color={cat.color} delay={i * 30} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── About Section ─────────────────────────────────────────────────────────────
export function AboutSection() {
  const [isColored, setIsColored] = useState(false)
  const { ref: bioRef, visible: bioVisible } = useReveal(0.1)
  const { ref: imgRef, visible: imgVisible } = useReveal(0.1)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        .about-title { font-family: 'Syne', sans-serif; }
        .about-mono  { font-family: 'DM Mono', monospace; }

        @keyframes about-float {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes scanline {
          0%   { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        @keyframes borderRotate {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
        @keyframes about-pulse-ring {
          0%   { opacity:.6; transform: scale(1); }
          100% { opacity:0;  transform: scale(1.6); }
        }
        @keyframes about-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .about-img-wrap:hover .about-img-hover-layer { opacity: 1 !important; }

        .about-gradient-text {
          background: linear-gradient(90deg, #a78bfa, #67e8f9, #c084fc, #a78bfa);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: about-shimmer 5s linear infinite;
        }

        .about-dl-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #fff;
          cursor: pointer;
          border: none;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .about-dl-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 28px rgba(124,58,237,0.5);
        }
        .about-dl-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed);
          background-size: 300% 300%;
          animation: about-shimmer 4s ease infinite;
          z-index: 0;
        }
        .about-dl-btn span { position: relative; z-index: 1; }

        .timeline-dot-pulse::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid currentColor;
          animation: about-pulse-ring 2s ease infinite;
        }
      `}</style>

      <section
        id="about"
        className="relative z-10 py-28 px-6"
        style={{ background: "transparent" }}
      >
        {/* Ambient side glows */}
        <div style={{ position: "absolute", top: "10%", left: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* ── BIO ───────────────────────────────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "56px",
              alignItems: "center",
              marginBottom: "120px",
            }}
          >
            {/* Text */}
            <div
              ref={bioRef}
              style={{
                opacity: bioVisible ? 1 : 0,
                transform: bioVisible ? "translateX(0)" : "translateX(-28px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <SectionLabel>About me</SectionLabel>
              <h2
                className="about-title"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#f0ecff",
                  marginBottom: "24px",
                }}
              >
                Designer,{" "}
                <span className="about-gradient-text">Developer,</span>
                <br />
                Problem Solver.
              </h2>

              <div className="about-mono" style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(196,181,253,0.6)" }}>
                <p style={{ marginBottom: "14px" }}>
                  I'm <strong style={{ color: "#c4b5fd" }}>Nathalia</strong>, a multidisciplinary designer and developer passionate about creating digital experiences that are both beautiful and functional. I specialize in the intersection of AI-native logic and high-fidelity user experience.
                </p>
                <p style={{ marginBottom: "14px" }}>
                  My experience spans <strong style={{ color: "#e9d5ff" }}>Product Design, Web Development,</strong> and <strong style={{ color: "#e9d5ff"  }}>DevOps</strong>. Whether I’m architecting AI-enhanced systems or leading UI/UX roadmaps, I bridge the gap between complex technical constraints and seamless digital interfaces.
                </p>
                <p>
                  Outside of work, I enjoy hackathons, collaborative tech projects, and creative pursuits like graphic design, photography, and video editing.
                </p>
              </div>

              <div style={{ marginTop: "32px" }}>
                <Link
                  href="/Resume_MANCILLA.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-dl-btn"
                >
                  <span>Download Resume</span>
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div
              ref={imgRef}
              style={{
                opacity: imgVisible ? 1 : 0,
                transform: imgVisible ? "translateX(0)" : "translateX(28px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              <div
                className="about-img-wrap"
                onClick={() => setIsColored((v) => !v)}
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid rgba(124,58,237,0.25)",
                  boxShadow: "0 0 60px rgba(124,58,237,0.15)",
                  animation: "about-float 7s ease-in-out infinite",
                }}
              >
                <Image
                  src="/nathalia-about-me.jpg"
                  alt="Nathalia – UI/UX Designer"
                  fill
                  style={{
                    objectFit: "cover",
                    filter: isColored ? "none" : "grayscale(100%) brightness(0.85)",
                    transition: "filter 0.7s ease",
                  }}
                />
                {/* Scanline overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                    pointerEvents: "none",
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Hover color hint */}
                <div
                  className="about-img-hover-layer"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                  }}
                />
                {/* Bottom caption */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 20px 16px",
                    background: "linear-gradient(to top, rgba(4,3,10,0.85), transparent)",
                  }}
                >
                  <span
                    className="about-mono"
                    style={{ fontSize: "0.65rem", color: "rgba(167,139,250,0.5)", letterSpacing: "0.15em" }}
                  >
                    {isColored ? "// color mode" : "// click to reveal color"}
                  </span>
                </div>

                {/* Corner bracket decorations */}
                {[
                  { top: "10px", left: "10px", borderTop: "2px solid", borderLeft: "2px solid" },
                  { top: "10px", right: "10px", borderTop: "2px solid", borderRight: "2px solid" },
                  { bottom: "10px", left: "10px", borderBottom: "2px solid", borderLeft: "2px solid" },
                  { bottom: "10px", right: "10px", borderBottom: "2px solid", borderRight: "2px solid" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: "18px",
                      height: "18px",
                      borderColor: "rgba(167,139,250,0.5)",
                      ...s,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── EXPERIENCE ────────────────────────────────────────────── */}
          <div style={{ marginBottom: "100px" }}>
            <SectionLabel>Career</SectionLabel>
            <h3
              className="about-title"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#f0ecff",
                marginBottom: "48px",
              }}
            >
              Experience
            </h3>

            {/* Vertical timeline */}
            <div style={{ position: "relative", paddingLeft: "30px" }}>
              {/* Line */}
              <div
                style={{
                  position: "absolute",
                  left: "7px",
                  top: "12px",
                  bottom: "12px",
                  width: "1px",
                  background: "linear-gradient(180deg, #7c3aed 0%, rgba(124,58,237,0.15) 100%)",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {experiences.map((exp, i) => (
                  <div key={exp.company} style={{ position: "relative" }}>
                    {/* Timeline dot */}
                    <div
                      className="timeline-dot-pulse"
                      style={{
                        position: "absolute",
                        left: "-29px",
                        top: "30px",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: exp.accent,
                        boxShadow: `0 0 10px ${exp.accent}`,
                        color: exp.accent,
                      }}
                    />
                    <ExpCard exp={exp} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SKILLS ────────────────────────────────────────────────── */}
          <div>
            <SectionLabel>Expertise</SectionLabel>
            <h3
              className="about-title"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#f0ecff",
                marginBottom: "40px",
              }}
            >
              Skills &amp; Interests
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {skillCategories.map((cat, i) => (
                <SkillCard key={cat.title} cat={cat} index={i} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}