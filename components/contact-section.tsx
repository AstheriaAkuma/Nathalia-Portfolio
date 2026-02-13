import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nathalia-angela-mancilla-807853287/",
    icon: Linkedin,
    description: "Connect professionally",
  },
  {
    name: "GitHub",
    href: "https://github.com/AstheriaAkuma",
    icon: Github,
    description: "View my code",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Main Card */}
        <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#591DA9]/30 rounded-full blur-[100px] -z-10" />

          {/* Header */}
          <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
            {"Let's Create "}
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 text-pretty">
            {"Have a project in mind or just want to chat about design and development? I'd love to hear from you."}
          </p>

          {/* Primary CTA */}
          <a href="mailto:mancillanathaliaangela@gmail.com">
            <Button
              size="lg"
              className="gradient-button text-white border-0 px-8 py-6 text-base font-medium rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 cosmic-glow"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </Button>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-muted-foreground text-sm">or find me on</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl px-6 py-4 flex items-center gap-4 
                    w-full sm:w-auto
                    bg-white/5 backdrop-blur-xl border border-white/10
                    hover:cosmic-glow transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-[#591DA9]/20 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-[#CB98ED]" />
                </div>
                <div className="text-left">
                  <p className="font-medium group-hover:text-[#CB98ED] transition-colors">{link.name}</p>
                  <p className="text-muted-foreground text-sm">{link.description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          {"Currently open to freelance projects and full-time opportunities."}
        </p>
      </div>
    </section>
  )
}
