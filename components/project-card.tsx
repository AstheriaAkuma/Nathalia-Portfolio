"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  tags: string[]
  image: string
  year: string
  role: string
  tools: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <article
        className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:cosmic-glow cursor-pointer"
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6 -mt-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-[#591DA9]/20 text-[#CB98ED] border-[#591DA9]/30 text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
      </div>
      </article>
    </Link>
  )
}
