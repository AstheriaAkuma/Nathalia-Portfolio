import { Navbar } from "@/components/navbar"
import { StarField } from "@/components/star-field"

export const metadata = {
  title: "Contact | Nathalia",
  description: "Get in touch with Nathalia for collaboration, projects, or opportunities.",
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <StarField />
      <Navbar />
    </main>
  )
}
