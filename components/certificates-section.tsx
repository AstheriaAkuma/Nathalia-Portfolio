import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"

const certificates = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google",
    date: "2023",
    link: "#",
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2022",
    link: "#",
  },
  {
    name: "Accessibility for Web Design",
    issuer: "Interaction Design Foundation",
    date: "2022",
    link: "#",
  },
  {
    name: "Advanced React Patterns",
    issuer: "Frontend Masters",
    date: "2021",
    link: "#",
  },
]

export function CertificatesSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">Credentials</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Certificates</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert) => (
            <a
              key={cert.name}
              href={cert.link}
              className="glass rounded-xl p-5 hover:cosmic-glow transition-all duration-500 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#591DA9]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#CB98ED]" />
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-medium text-sm mb-1 line-clamp-2">{cert.name}</h3>
              <p className="text-muted-foreground text-xs">{cert.issuer}</p>
              <Badge variant="outline" className="border-border text-muted-foreground text-xs mt-3">
                {cert.date}
              </Badge>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
