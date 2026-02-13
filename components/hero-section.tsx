  "use client"

  import { useEffect, useState } from "react"
  import { Button } from "@/components/ui/button"

  const roles = ["Product Designer", "Developer", "AI Developer", "UI/UX Designer"]

  export function HeroSection() {
    const [currentRole, setCurrentRole] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      setIsVisible(true)
    }, [])

    useEffect(() => {
      const currentRoleText = roles[currentRole]
      let charIndex = 0
      let typingInterval: NodeJS.Timeout

      // Clear and start typing
      setDisplayedText("")

      const type = () => {
        if (charIndex < currentRoleText.length) {
          setDisplayedText(currentRoleText.slice(0, charIndex + 1))
          charIndex++
          typingInterval = setTimeout(type, 80)
        } else {
          // Hold the full text for 3 seconds, then switch roles
          typingInterval = setTimeout(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }, 3000)
        }
      }

      type()

      return () => clearTimeout(typingInterval)
    }, [currentRole])

    const scrollToProjects = () => {
      const element = document.getElementById("projects")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Cosmic background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[#591DA9]/10 z-0" />

        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#591DA9]/20 rounded-full blur-[120px] z-0" />

        <div
          className={cn(
            "relative z-10 text-center w-full max-w-[90vw] mx-auto",
            "transition-all duration-[1500ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Greeting - always visible */}
          <p className="text-lg sm:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty font-medium">
            Bold design choices, grounded in usability.
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-0 tracking-tight text-balance">
            {"Hi, I'm Nathalia "}
          </h1>

          <div className="relative min-h-[3rem] sm:h-[5.5rem] md:h-[6.5rem] lg:h-[7.5rem] mx-auto mb-12">
            <p
              className={cn(
                "gradient-text",
                "flex items-center justify-center",
                "whitespace-normal sm:whitespace-nowrap",
                "text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold",                "min-h-full"
              )}
            >
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* CTA Button - scrolls to projects section */}
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="gradient-button text-white border-0 px-8 py-6 text-base font-medium rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 cosmic-glow"
          >
            View My Work
          </Button>
        </div>
      </section>
    )
  }

  function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ")
  }
