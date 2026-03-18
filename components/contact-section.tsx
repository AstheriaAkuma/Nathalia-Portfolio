"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Linkedin, Github, ArrowUpRight, Send } from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nathalia-angela-mancilla-807853287/",
    icon: Linkedin,
    description: "Connect professionally",
    accent: "#2563eb",
  },
  {
    name: "GitHub",
    href: "https://github.com/AstheriaAkuma",
    icon: Github,
    description: "View my code",
    accent: "#a78bfa",
  },
]

// ── Scroll reveal ─────────────────────────────────────────────────────────────

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

// ── Orbiting dot canvas (small, decorative) ───────────────────────────────────

function ContactOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let t = 0

    const orbs = [
      { r: 180, speed: 0.004, size: 3, color: "#7c3aed", offset: 0 },
      { r: 220, speed: 0.003, size: 2, color: "#06b6d4", offset: Math.PI * 0.7 },
      { r: 150, speed: 0.006, size: 2, color: "#a78bfa", offset: Math.PI * 1.4 },
      { r: 260, speed: 0.002, size: 1.5, color: "#2563eb", offset: Math.PI * 0.3 },
    ]

    const draw = () => {
      t += 0.016
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach((orb) => {
        const angle = t * orb.speed * 60 + orb.offset
        const x = cx + Math.cos(angle) * orb.r
        const y = cy + Math.sin(angle) * orb.r

        // Trail
        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.size * 4)
        grad.addColorStop(0, orb.color + "cc")
        grad.addColorStop(1, "transparent")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, orb.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(x, y, orb.size, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)
    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.45,
      }}
    />
  )
}

// ── Magnetic email button ─────────────────────────────────────────────────────

function EmailButton() {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  return (
    <a
      ref={ref}
      href="mailto:mancillanathaliaangela@gmail.com"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 40px",
        borderRadius: "999px",
        color: "#fff",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "1rem",
        textDecoration: "none",
        overflow: "hidden",
        cursor: "pointer",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: hovered
          ? "transform 0.15s ease, box-shadow 0.25s ease"
          : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease",
        boxShadow: hovered ? "0 0 40px rgba(124,58,237,0.55)" : "0 0 0px transparent",
      }}
    >
      {/* Gradient bg */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "999px",
        background: "linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed)",
        backgroundSize: "300% 300%",
        animation: "contact-grad 4s ease infinite",
      }} />
      {/* Shimmer */}
      {hovered && <span style={{
        position: "absolute", inset: 0, borderRadius: "999px",
        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
        backgroundSize: "200% 100%",
        animation: "contact-shimmer 0.7s ease forwards",
      }} />}
      <Mail size={18} style={{ position: "relative", zIndex: 1 }} />
      <span style={{ position: "relative", zIndex: 1, letterSpacing: "0.04em" }}>Email Me</span>
    </a>
  )
}

// ── Social card ───────────────────────────────────────────────────────────────

function SocialCard({ link, delay }: { link: typeof socialLinks[0]; delay: number }) {
  const { ref, visible } = useReveal(0.1)
  const [hov, setHov] = useState(false)
  const Icon = link.icon

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        flex: "1 1 220px",
      }}
    >
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "18px 22px",
          borderRadius: "16px",
          background: hov ? `${link.accent}12` : "rgba(10,6,28,0.6)",
          border: `1px solid ${hov ? link.accent + "55" : "rgba(124,58,237,0.18)"}`,
          backdropFilter: "blur(14px)",
          boxShadow: hov ? `0 0 28px ${link.accent}20` : "none",
          textDecoration: "none",
          transition: "all 0.28s ease",
          transform: hov ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        <div style={{
          width: "40px", height: "40px", borderRadius: "11px",
          background: `${link.accent}20`,
          border: `1px solid ${link.accent}35`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={18} color={link.accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="contact-title" style={{ fontSize: "0.92rem", fontWeight: 700, color: hov ? "#f0ecff" : "#c4b5fd", marginBottom: "2px", transition: "color 0.2s" }}>{link.name}</p>
          <p className="contact-mono" style={{ fontSize: "0.72rem", color: "rgba(196,181,253,0.4)", letterSpacing: "0.04em" }}>{link.description}</p>
        </div>
        <ArrowUpRight
          size={15}
          color={link.accent}
          style={{ opacity: hov ? 1 : 0, transform: hov ? "translate(0,0)" : "translate(-4px,4px)", transition: "all 0.25s ease", flexShrink: 0 }}
        />
      </a>
    </div>
  )
}

// ── Contact Section ───────────────────────────────────────────────────────────

export function ContactSection() {
  const { ref: sectionRef, visible: sectionVisible } = useReveal(0.08)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        .contact-title { font-family: 'Syne', sans-serif; }
        .contact-mono  { font-family: 'DM Mono', monospace; }

        @keyframes contact-grad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes contact-shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        @keyframes contact-text-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes contact-pulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes contact-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        .contact-gradient-text {
          background: linear-gradient(90deg, #a78bfa, #67e8f9, #c084fc, #a78bfa);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: contact-text-shimmer 5s linear infinite;
        }
        .contact-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
          animation: contact-pulse 2.2s ease infinite;
          display: inline-block;
          margin-right: 7px;
          vertical-align: middle;
        }
      `}</style>

      <section id="contact" className="relative z-10 py-32 px-6" style={{ background: "transparent" }}>
        {/* Far ambient glows */}
        <div style={{ position: "absolute", top: "0%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Main card */}
          <div
            ref={sectionRef}
            style={{
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              background: "rgba(10,6,28,0.75)",
              border: "1px solid rgba(124,58,237,0.22)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 80px rgba(124,58,237,0.12), inset 0 0 60px rgba(124,58,237,0.04)",
              padding: "clamp(36px, 8vw, 72px) clamp(28px, 6vw, 72px)",
              textAlign: "center",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Orbiting dots canvas */}
            <ContactOrbs />

            {/* Corner brackets */}
            {[
              { top: "14px", left: "14px", borderTop: "1.5px solid", borderLeft: "1.5px solid" },
              { top: "14px", right: "14px", borderTop: "1.5px solid", borderRight: "1.5px solid" },
              { bottom: "14px", left: "14px", borderBottom: "1.5px solid", borderLeft: "1.5px solid" },
              { bottom: "14px", right: "14px", borderBottom: "1.5px solid", borderRight: "1.5px solid" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: "20px", height: "20px", borderColor: "rgba(167,139,250,0.35)", pointerEvents: "none", ...s }} />
            ))}

            {/* Inner content */}
            <div style={{ position: "relative", zIndex: 1 }}>

              {/* Label */}
              <p className="contact-mono" style={{ color: "#a78bfa", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "20px" }}>
                // Get In Touch
              </p>

              {/* Heading */}
              <h2
                className="contact-title"
                style={{
                  fontSize: "clamp(2rem, 6vw, 3.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#f0ecff",
                  marginBottom: "20px",
                  animation: "contact-float 7s ease-in-out infinite",
                }}
              >
                Let's Create{" "}
                <span className="contact-gradient-text">Something Great</span>
              </h2>

              {/* Sub */}
              <p className="contact-mono" style={{ fontSize: "0.88rem", color: "rgba(196,181,253,0.55)", maxWidth: "460px", margin: "0 auto 36px", lineHeight: 1.75 }}>
                Have a project in mind or just want to chat about design and development? I'd love to hear from you.
              </p>

              {/* Email CTA */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                <EmailButton />
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(124,58,237,0.3))" }} />
                <span className="contact-mono" style={{ fontSize: "0.68rem", color: "rgba(167,139,250,0.4)", letterSpacing: "0.12em" }}>or find me on</span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(124,58,237,0.3))" }} />
              </div>

              {/* Social cards */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                {socialLinks.map((link, i) => (
                  <SocialCard key={link.name} link={link} delay={i * 100} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
              opacity: sectionVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.4s",
            }}
          >
            <p className="contact-mono" style={{ fontSize: "0.72rem", color: "rgba(167,139,250,0.35)", letterSpacing: "0.1em" }}>
              <span className="contact-status-dot" />
              currently open to freelance projects and full-time opportunities
            </p>
          </div>

        </div>
      </section>
    </>
  )
}