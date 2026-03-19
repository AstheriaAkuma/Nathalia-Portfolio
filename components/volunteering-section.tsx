"use client";

import { useState, useEffect, useRef } from "react";
import { Palette, Camera, ShieldUser, Settings, User} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const volunteeringAndLeadership = [
  {
    type: "Leadership",
    title: "Senior UI/UX Designer, Dept. of Software & Web Development",
    organization: "AWSCC-PUP Manila",
    period: "Nov 2023 – Nov 2024",
    description: "Led design efforts, maintained design systems, and collaborated with developers to ship consistent, accessible interfaces.",
    icon: ShieldUser,
    accent: "#7c3aed",
  },
  {
    type: "Volunteering",
    title: "UI/UX Designer",
    organization: "Arduino Day Philippines",
    period: "Jan 2025 – Mar 2025",
    description: "Designed and optimized the official event website to enhance accessibility and user experience for 500+ anticipated attendees, ensuring smooth navigation and clear event information delivery.",
    icon: Palette,
    accent: "#06b6d4",
  },
  {
    type: "Volunteering",
    title: "Program Support",
    organization: "The Frame",
    period: "June 2025",
    description: "Assisted as a Springboard Philippines intern managing event registration, guiding participants, and supporting design-related sessions and logistics.",
    icon: ShieldUser,
    accent: "#a78bfa",
  },
  {
    type: "Volunteering",
    title: "Operations & Support Volunteer",
    organization: "Springboard Philippines",
    period: "May 2025",
    description: "Supported workshop operations for \"PHP is Not Dead, Laravel Is Proof\" — handled logistics, technical setup, and participant coordination to ensure smooth session delivery.",
    icon: Settings,
    accent: "#2563eb",
  },
  {
    type: "Volunteering",
    title: "Branding Manager",
    organization: "Springboard Philippines",
    period: "May 2025",
    description: "Led visual identity and social media campaign for a 3-day donation drive in Cavite, helping raise ₱2,000 and grow online presence by 208+ new followers.",
    icon: User,
    accent: "#06b6d4",
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "Genesis Block: JBECP PUP Manila Mainnet Launch",
    period: "October 2024",
    description: "Designed creative assets and supported event visuals for the blockchain community launch event.",
    icon: Palette,
    accent: "#7c3aed",
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "AWS Community Day Philippines 2024",
    period: "September 2024",
    description: "Designed promotional and event materials for AWS community engagement.",
    icon: Palette,
    accent: "#a78bfa",
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "AWSCC Student Community Day",
    period: "April 2024",
    description: "Supported event design and content creation for student participants.",
    icon: Palette,
    accent: "#2563eb",
  },
  {
    type: "Volunteering",
    title: "Photographer",
    organization: "AWSCC PUP Manila: BuildHers+ Ideate & Innovate",
    period: "March 2024",
    description: "Captured key moments and documented the event for promotional and archival use.",
    icon: Camera,
    accent: "#06b6d4",
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "AWS Community Day Philippines 2023",
    period: "May 2023",
    description: "Assisted in creating event visuals and supporting creative initiatives.",
    icon: Palette,
    accent: "#7c3aed",
  },
];

const INITIAL_VISIBLE = 4;

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Stat bubble ───────────────────────────────────────────────────────────────
function StatBubble({ value, label, accent, delay }: { value: string; label: string; accent: string; delay: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        background: "rgba(10,6,28,0.7)",
        border: `1px solid ${accent}30`,
        borderRadius: "14px",
        padding: "20px 24px",
        textAlign: "center",
        backdropFilter: "blur(12px)",
        flex: "1 1 120px",
      }}
    >
      <div
        className="vol-title"
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          background: `linear-gradient(135deg, ${accent}, #f0ecff)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      <div
        className="vol-mono"
        style={{ fontSize: "0.65rem", color: "rgba(196,181,253,0.45)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "4px" }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function VolCard({
  item,
  index,
}: {
  item: typeof volunteeringAndLeadership[0];
  index: number;
}) {
  const { ref, visible } = useReveal(0.08);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${(index % 4) * 80}ms, transform 0.6s ease ${(index % 4) * 80}ms`,
      }}
    >
      <div
        className="vol-card"
        style={{
          position: "relative",
          background: "rgba(10,6,28,0.65)",
          border: "1px solid rgba(124,58,237,0.16)",
          borderRadius: "16px",
          padding: "22px 24px",
          backdropFilter: "blur(14px)",
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${item.accent}50`;
          el.style.boxShadow = `0 0 28px ${item.accent}1a, inset 0 0 20px ${item.accent}08`;
          el.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(124,58,237,0.16)";
          el.style.boxShadow = "none";
          el.style.transform = "translateY(0)";
        }}
      >
        {/* Corner glow */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${item.accent}30 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "15%",
            bottom: "15%",
            width: "2px",
            borderRadius: "0 2px 2px 0",
            background: `linear-gradient(180deg, transparent, ${item.accent}, transparent)`,
          }}
        />

        {/* Type tag + period */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
          <span
            className="vol-mono"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: item.accent,
              background: `${item.accent}15`,
              border: `1px solid ${item.accent}35`,
              padding: "3px 10px",
              borderRadius: "999px",
            }}
          >
            {item.type}
          </span>
          <span
            className="vol-mono"
            style={{ fontSize: "0.65rem", color: "rgba(196,181,253,0.4)", letterSpacing: "0.08em" }}
          >
            {item.period}
          </span>
        </div>

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: `${item.accent}18`,
              border: `1px solid ${item.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            <Icon size={16} color={item.accent} />
          </div>

          <div>
            <h3
              className="vol-title"
              style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3, marginBottom: "4px" }}
            >
              {item.title}
            </h3>
            <p
              style={{ fontSize: "0.8rem", color: item.accent, fontWeight: 500, marginBottom: "10px" }}
            >
              {item.organization}
            </p>
            <p
              className="vol-mono"
              style={{ fontSize: "0.78rem", color: "rgba(196,181,253,0.5)", lineHeight: 1.65 }}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export function VolunteeringSection() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.1);

  const visible = volunteeringAndLeadership;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        .vol-title { font-family: 'Syne', sans-serif; }
        .vol-mono  { font-family: 'DM Mono', monospace; }

        @keyframes vol-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes vol-grid-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .vol-gradient-text {
          background: linear-gradient(90deg, #a78bfa, #67e8f9, #c084fc, #a78bfa);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: vol-shimmer 5s linear infinite;
        }
        .vol-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 999px;
          border: 1px solid rgba(124,58,237,0.35);
          background: rgba(124,58,237,0.08);
          color: #c4b5fd;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .vol-toggle-btn:hover {
          background: rgba(124,58,237,0.2);
          border-color: rgba(124,58,237,0.6);
          color: #ede9fe;
          box-shadow: 0 0 20px rgba(124,58,237,0.25);
          transform: translateY(-1px);
        }
      `}</style>

      <section
        id="volunteering"
        className="relative z-10 py-28 px-6"
        style={{ background: "rgba(6,4,18,0.5)" }}
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "0", left: "30%", width: "400px", height: "300px", background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", right: "20%", width: "350px", height: "250px", background: "radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              marginBottom: "56px",
            }}
          >
            <p
              className="vol-mono"
              style={{ color: "#a78bfa", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "12px" }}
            >
              Community &amp; Impact
            </p>
            <h2
              className="vol-title"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                color: "#f0ecff",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Volunteering &amp;{" "}
              <span className="vol-gradient-text">Leadership</span>
            </h2>
            <p
              className="vol-mono"
              style={{ fontSize: "0.85rem", color: "rgba(196,181,253,0.5)", maxWidth: "480px", lineHeight: 1.7 }}
            >
              Giving back to the community through design, creativity, and mentorship — one event at a time.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "52px" }}>
            <StatBubble value="10+" label="Events Supported" accent="#7c3aed" delay={0} />
            <StatBubble value="500+" label="People Reached" accent="#06b6d4" delay={80} />
            <StatBubble value="2yrs+" label="Active Since" accent="#a78bfa" delay={160} />
            <StatBubble value="₱2K" label="Donations Raised" accent="#2563eb" delay={240} />
          </div>

          {/* Bento grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            {visible.map((item, i) => (
              <VolCard key={`${item.organization}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}