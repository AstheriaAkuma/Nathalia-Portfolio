import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Globe } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  tags: string[]
  image: string
  link?: string
  tools: string[]
  year: string
  role: string
}

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const hasLink = Boolean(project.link)

  return (
    <article className="relative z-10 pt-28 pb-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header (Restored) */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-[#591DA9]/20 text-[#CB98ED] border-[#591DA9]/30">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">{project.title}</h1>
          <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
            <div>
              <span className="block text-foreground font-medium">{project.role}</span>
              <span>Role</span>
            </div>
            <div>
              <span className="block text-foreground font-medium">{project.year}</span>
              <span>Year</span>
            </div>
          </div>
        </header>

        {/* Hero Image (Restored) */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 glass">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.fullDescription}
              </ReactMarkdown>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-foreground">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="border-border text-muted-foreground">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {hasLink && (
              <div className="glass rounded-xl p-6 space-y-3">
                <h3 className="font-semibold mb-4 text-foreground">Project Links</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Globe className="w-5 h-5 text-[#CB98ED]" />
                  <span className="font-medium">Visit Live Website</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/#projects">
            <Button variant="outline" className="glass border-border hover:bg-secondary/50 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}