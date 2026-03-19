"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

const roles = ["Product Designer", "Developer", "AI Developer", "UI/UX Designer"]

// ── Utility ──────────────────────────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// ── Star / particle data ──────────────────────────────────────────────────────
interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleOffset: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  hue: number
}

// ── Interactive Starfield Canvas ──────────────────────────────────────────────
function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      starsRef.current = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.3,
        opacity: Math.random() * 0.7 + 0.15,
        speed: Math.random() * 0.4 + 0.05,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    const spawnParticle = (x: number, y: number) => {
      if (particlesRef.current.length > 60) return
      particlesRef.current.push({
        id: Date.now() + Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1,
        alpha: 0.9,
        hue: Math.random() > 0.5 ? 270 : 185, // purple or cyan
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (Math.random() > 0.6) spawnParticle(e.clientX, e.clientY)
    }

    const draw = () => {
      timeRef.current += 0.012
      const t = timeRef.current
      const { x: mx, y: my } = mouseRef.current
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // ── Nebula glows ──
      const glow1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.45)
      glow1.addColorStop(0, "rgba(89,29,169,0.18)")
      glow1.addColorStop(1, "transparent")
      ctx.fillStyle = glow1
      ctx.fillRect(0, 0, w, h)

      const glow2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, w * 0.4)
      glow2.addColorStop(0, "rgba(0,200,220,0.10)")
      glow2.addColorStop(1, "transparent")
      ctx.fillStyle = glow2
      ctx.fillRect(0, 0, w, h)

      // ── Mouse reactive aurora ──
      if (mx > 0) {
        const aurora = ctx.createRadialGradient(mx, my, 0, mx, my, 220)
        aurora.addColorStop(0, "rgba(140,60,255,0.12)")
        aurora.addColorStop(0.5, "rgba(0,230,210,0.05)")
        aurora.addColorStop(1, "transparent")
        ctx.fillStyle = aurora
        ctx.fillRect(0, 0, w, h)
      }

      // ── Stars ──
      starsRef.current.forEach((star) => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.4 + star.twinkleOffset)
        const alpha = star.opacity * twinkle

        // Parallax
        const parallaxX = (mx / w - 0.5) * star.speed * 40
        const parallaxY = (my / h - 0.5) * star.speed * 40
        const sx = star.x + parallaxX
        const sy = star.y + parallaxY

        // Glow for bigger stars
        if (star.size > 1.6) {
          const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 3)
          sg.addColorStop(0, `rgba(200,180,255,${alpha * 0.6})`)
          sg.addColorStop(1, "transparent")
          ctx.fillStyle = sg
          ctx.beginPath()
          ctx.arc(sx, sy, star.size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,210,255,${alpha})`
        ctx.fill()
      })

      // ── Particles ──
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02)
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha *= 0.93
        p.size *= 0.97

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.alpha})`
        ctx.fill()
      })

      // ── Shooting star ──
      const shotInterval = 320
      const shotPhase = Math.floor(t * (60 / shotInterval))
      const shotT = (t * 60) % shotInterval
      if (shotT < 40) {
        const seed = shotPhase * 7919
        const startX = ((seed * 13) % w) * 0.8
        const startY = ((seed * 7) % (h * 0.4))
        const angle = 0.45
        const progress = shotT / 40
        const len = 120 * progress
        const ex = startX + Math.cos(angle) * len * progress * 4
        const ey = startY + Math.sin(angle) * len * progress * 4
        const sx2 = ex - Math.cos(angle) * Math.min(len, 80)
        const sy2 = ey - Math.sin(angle) * Math.min(len, 80)

        const sg = ctx.createLinearGradient(sx2, sy2, ex, ey)
        sg.addColorStop(0, "transparent")
        sg.addColorStop(1, `rgba(200,180,255,${0.9 * (1 - progress)})`)
        ctx.strokeStyle = sg
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sx2, sy2)
        ctx.lineTo(ex, ey)
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}

// ── Magnetic Button ───────────────────────────────────────────────────────────
function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * 0.35,
      y: (e.clientY - cy) * 0.35,
    })
  }, [])

  const handleLeave = useCallback(() => {
    setPos({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: hovered ? "transform 0.15s ease" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
      className="relative group px-10 py-4 rounded-full text-base font-semibold text-white overflow-hidden cursor-pointer border-0 outline-none"
    >
      {/* Animated gradient bg */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed)",
          backgroundSize: "300% 300%",
          animation: "gradShift 4s ease infinite",
        }}
      />
      {/* Shimmer overlay */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: hovered ? "shimmerSlide 0.7s ease forwards" : "none",
        }}
      />
      {/* Glow ring */}
      <span
        className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />
      <span className="relative z-10 tracking-wide">{children}</span>
    </button>
  )
}

// ── Iridescent badge ──────────────────────────────────────────────────────────
function RoleBadge({ text }: { text: string }) {
  return (
    <span
      className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
      style={{
        background: "rgba(124,58,237,0.15)",
        border: "1px solid rgba(124,58,237,0.4)",
        color: "#c4b5fd",
        letterSpacing: "0.18em",
      }}
    >
      {text}
    </span>
  )
}

// ── Floating orbit rings ──────────────────────────────────────────────────────
function OrbitRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Large outer ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "800px",
          height: "800px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(124,58,237,0.12)",
          animation: "orbitSpin 40s linear infinite",
        }}
      >
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: "4px",
            left: "50%",
            background: "#7c3aed",
            boxShadow: "0 0 12px 4px rgba(124,58,237,0.8)",
          }}
        />
      </div>
      {/* Medium ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "560px",
          height: "560px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(6,182,212,0.10)",
          animation: "orbitSpin 26s linear infinite reverse",
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            bottom: "4px",
            left: "50%",
            background: "#06b6d4",
            boxShadow: "0 0 10px 3px rgba(6,182,212,0.8)",
          }}
        />
      </div>
    </div>
  )
}

// ── Scroll chevron ────────────────────────────────────────────────────────────
function ScrollChevron() {
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      style={{ zIndex: 10 }}
    >
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: "rgba(196,181,253,0.4)", letterSpacing: "0.2em", fontSize: "10px" }}
      >
        Scroll
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ animation: "chevronBounce 2s ease infinite" }}
      >
        <path d="M5 7L10 13L15 7" stroke="rgba(196,181,253,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Typewriter with delete effect
  useEffect(() => {
    const target = roles[currentRole]
    let timeout: NodeJS.Timeout

    if (phase === "typing") {
      if (displayedText.length < target.length) {
        timeout = setTimeout(() => setDisplayedText(target.slice(0, displayedText.length + 1)), 75)
      } else {
        timeout = setTimeout(() => setPhase("hold"), 2600)
      }
    } else if (phase === "hold") {
      setPhase("deleting")
    } else if (phase === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => setDisplayedText((t) => t.slice(0, -1)), 38)
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setPhase("typing")
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, phase, currentRole])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ── Global keyframes injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmerSlide {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        @keyframes orbitSpin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes chevronBounce {
          0%,100% { transform: translateY(0); opacity:.4; }
          50%      { transform: translateY(5px); opacity:.8; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%,100% { opacity:.55; }
          50%      { opacity:1; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes iridescent {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          letter-spacing: -0.03em;
        }
        .hero-mono {
          font-family: 'DM Mono', monospace;
        }
        .gradient-role {
          background: linear-gradient(90deg, #a78bfa, #67e8f9, #c084fc, #a78bfa);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: iridescent 5s ease infinite;
        }
        .hero-tagline {
          background: linear-gradient(90deg, rgba(196,181,253,0.9), rgba(103,232,249,0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24"
      >
        {/* Canvas starfield */}
        <CosmicCanvas />

        {/* Orbit decoration */}
        <OrbitRings />

        {/* Content */}
        <div
          className="relative flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto"
          style={{ zIndex: 10 }}
        >

          {/* Animated badge */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <RoleBadge text="Available for work" />
          </div>

          {/* Name */}
          <h1
            className="hero-title mt-7 mb-2"
            style={{
              fontSize: "clamp(3rem, 10vw, 5.5rem)",
              fontWeight: 800,
              color: "#f0ecff",
              lineHeight: 1.0,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                display: "inline-block",
                animation: "floatY 6s ease-in-out infinite",
              }}
            >
              Nathalia
            </span>
          </h1>

          {/* Typewriter role */}
          <div
            className="relative flex items-center justify-center"
            style={{
              minHeight: "clamp(2.8rem, 8vw, 6rem)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
            }}
          >
            <span
              className="gradient-role hero-title"
              style={{
                fontSize: "clamp(2.6rem, 8vw, 5.8rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {displayedText}
            </span>
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "1em",
                background: "#a78bfa",
                marginLeft: "4px",
                borderRadius: "2px",
                animation: "glowPulse 0.9s ease infinite",
                verticalAlign: "middle",
                boxShadow: "0 0 10px 3px rgba(167,139,250,0.7)",
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="hero-tagline hero-mono mt-6 mb-12"
            style={{
              fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)",
              fontWeight: 300,
              maxWidth: "480px",
              lineHeight: 1.65,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s",
            }}
          >
            Bold design choices, grounded in usability.
          </p>
          {/* CTA */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
            }}
          >
            <MagneticButton onClick={scrollToProjects}>View My Work</MagneticButton>
          </div>

          
        </div>
        {/* Bottom fade to next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #04030a)",
            zIndex: 5,
          }}
        />
      </section>
    </>
  )
}