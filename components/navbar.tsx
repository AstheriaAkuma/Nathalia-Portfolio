"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ["hero", "about", "projects", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.replace("#", ""))
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
        .nav-mono { font-family: 'DM Mono', monospace; }

        @keyframes nav-mobile-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-underline-glow {
          0%,100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        .nav-hidden-mobile { display: flex !important; }
        .nav-show-mobile   { display: none  !important; }
        @media (max-width: 640px) {
          .nav-hidden-mobile { display: none  !important; }
          .nav-show-mobile   { display: block !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: "padding 0.35s ease",
        }}
      >
        <div style={{ padding: isScrolled ? "10px 16px" : "18px 16px" }}>
          <nav
            style={{
              width: "100%",
              maxWidth: "680px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: isScrolled ? "rgba(10,6,28,0.85)" : "transparent",
              backdropFilter: isScrolled ? "blur(20px)" : "none",
              border: isScrolled ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent",
              borderRadius: "999px",
              padding: "6px 12px",
              transition: "all 0.35s ease",
              boxShadow: isScrolled ? "0 0 32px rgba(124,58,237,0.08)" : "none",
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", lineHeight: 0, flexShrink: 0 }}
            >
              <img src="/nathalia-logo.png" alt="N Logo" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </button>

            {/* Desktop links */}
            <ul className="nav-hidden-mobile" style={{ alignItems: "center", gap: "2px", listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "")
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="nav-mono"
                      style={{
                        position: "relative",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px 16px 10px",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        letterSpacing: "0.08em",
                        color: isActive ? "#e9d5ff" : "rgba(196,181,253,0.45)",
                        fontWeight: isActive ? 400 : 300,
                        transition: "color 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(196,181,253,0.8)"
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(196,181,253,0.45)"
                      }}
                    >
                      {link.label}
                      {/* Underline — thicker, glowing, clearly visible */}
                      <span style={{
                        position: "absolute",
                        bottom: "2px",
                        left: "16px",
                        right: "16px",
                        height: "2px",
                        borderRadius: "999px",
                        background: isActive
                          ? "linear-gradient(90deg, #a78bfa, #67e8f9)"
                          : "transparent",
                        boxShadow: isActive ? "0 0 8px rgba(167,139,250,0.8), 0 0 16px rgba(103,232,249,0.4)" : "none",
                        transition: "background 0.25s ease, box-shadow 0.25s ease",
                        animation: isActive ? "nav-underline-glow 2s ease infinite" : "none",
                      }} />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-show-mobile"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(196,181,253,0.7)", padding: "6px", lineHeight: 0 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          {/* Mobile dropdown */}
          {isMobileMenuOpen && (
            <div style={{ maxWidth: "680px", margin: "8px auto 0", padding: "10px", background: "rgba(10,6,28,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "18px", animation: "nav-mobile-in 0.22s ease" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "")
                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="nav-mono"
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          borderLeft: isActive ? "2px solid #a78bfa" : "2px solid transparent",
                          cursor: "pointer",
                          padding: "10px 16px",
                          borderRadius: "0 10px 10px 0",
                          fontSize: "0.78rem",
                          letterSpacing: "0.08em",
                          color: isActive ? "#e9d5ff" : "rgba(196,181,253,0.45)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {link.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            )}
          </div>
      </header>
    </>
  )
}