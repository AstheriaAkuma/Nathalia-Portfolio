import { Navbar } from "@/components/navbar"
import { StarField } from "@/components/star-field"
import { ProjectDetail } from "@/components/project-detail"
import { notFound } from "next/navigation"

// Re-using the same high-impact descriptions from the list for consistency
const projects = [
  {
    id: "1",
    title: "AWS Cloud Club PUP",
    description: "Official community platform designed with a high-energy 'Galaxy' aesthetic to centralize resources and drive student engagement.",
    fullDescription: `As the Lead UI/UX Designer for the official digital hub of AWS Cloud Club - PUP Manila, I was tasked with transforming a technical student organization into an approachable, high-energy community. I developed a distinct "Galaxy" visual identity, leveraging deep violets and purposeful "bloom" micro-interactions to mirror the futuristic nature of cloud technology. Beyond the aesthetics, I structured the information architecture to prioritize upcoming events and resource accessibility, effectively reducing user friction. By bridging the gap between global AWS branding and local student culture, I established a scalable design system that significantly increased community engagement and simplified the registration flow for new members.`,
    tags: ["UI/UX Design"],
    image: "/aws-cloud-club-pup2.jpg",
    year: "2024",
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Branding", "Prototyping"],
    link: "https://www.awsccpup.cloud/" 
  },
  {
    id: "2",
    title: "AWS Student Community Day Philippines",
    description: "Frontend implementation for a global-scale tech summit, prioritizing performance, accessibility, and fluid responsiveness.",
    fullDescription: `For this high-traffic event landing page supporting a global AWS summit, I served as the Lead Frontend Developer with a heavy focus on user-centric implementation. I translated complex design requirements into a high-performance Next.js application, ensuring that the platform remained accessible and lightning-fast for attendees using mobile data. My primary challenge was maintaining responsive integrity across a wide array of devices—from small smartphones to large-scale event projectors—ensuring the complex session schedules were always legible. By implementing a strict GitHub workflow and optimizing asset delivery, I provided a seamless, zero-friction registration experience for hundreds of attendees worldwide.`,
    tags: ["Frontend Development"],
    image: "/aws-student-day2.jpg",
    year: "2024",
    role: "Frontend Developer",
    tools: ["Next.js", "React", "Tailwind CSS", "GitHub"],
    link: "https://scdmm.awscloudclubs.ph/"
  },
  {
    id: "3",
    title: "Arduino Day Philippines 2025",
    description: "Establishing a foundational digital presence for a national hardware event, focusing on content clarity and navigation.",
    fullDescription: `Serving as the UI/UX Designer for Arduino Day Philippines, I focused on creating a foundational digital presence that balanced technical depth with community celebration. I moved away from visual clutter, opting for a minimalist, "direct-to-point" layout that emphasized speaker lineups and workshop tracks to cater to both hobbyists and experts. I designed a modular component system for event cards and FAQs, allowing the organizing team to update the site in real-time as new details emerged. This project was a study in establishing a professional digital touchpoint that validated the event's scale to national sponsors while keeping the user journey intuitive and focused.`,
    tags: ["UI/UX Design"],
    image: "/arduino-day-philippines2.jpg",
    year: "2025",
    role: "UI/UX Designer",
    tools: ["Figma", "Responsive Design", "Accessibility"],
    link: "https://www.arduinodayphilippines.cc/"
  },
  {
    id: "4",
    title: "Zen – Student Productivity App",
    description: "A Gen Z-focused productivity tool designed to combat academic burnout through emotional design and calming aesthetics.",
    fullDescription: `In developing Zen, I acted as both the Lead Product Designer and Frontend Developer to tackle the growing issue of student burnout. Recognizing that traditional productivity apps often feel rigid and stressful, I pivoted toward "Emotional Design," utilizing a calming cosmic palette of violets and blues to induce a state of calm focus. I mirrored familiar UX patterns—such as the "Story" format for weekly wrap-ups—to make the app feel intuitive rather than like a chore. By blending task management with psychological comfort, I created a tool that helps students stay consistent without the typical "alert fatigue" associated with productivity software.`,
    tags: ["UI/UX Design", "Frontend Development"],
    image: "/zen.jpg",
    year: "2024",
    role: "UI/UX Designer & Frontend Developer",
    tools: ["Figma", "React", "Tailwind CSS"],
    link: "https://www.linkedin.com/posts/nathalia-angela-mancilla-807853287_we-just-wrapped-up-the-iseac-2025-hackathon-activity-7301858811428945921-4VTz"
  },
  {
    id: "6",
    title: "NegosyoNav",
    description: "A mobile-first PWA guiding Filipino micro-entrepreneurs through Manila City's business registration via a Taglish AI chatbot and auto-filled government PDF forms.",
    fullDescription: `NegosyoNav is a mobile-first Progressive Web App built for Innolympics 2026 (GDGoC PLM Hackathon) that simplifies the business registration process for Filipino micro-entrepreneurs in Manila City.

First-time business owners must navigate five separate government agencies—DTI, Barangay, BIR, Mayor's Permit, and Cedula—each with their own requirements, fees, and office hours. The opacity of this process discourages many from ever formalizing their businesses.

As UI/UX Designer and Full Stack Developer, I contributed to both the product experience and its technical implementation across the entire stack.

Key features include:
- Lakad Roadmap: A personalized 5-step timeline with costs, requirements, office hours, and embedded Google Maps per agency.
- Form Auto-Fill & PDF Generation: A chat-to-PDF pipeline extracting profile data from conversation and pre-filling official government forms via AcroForm.
- Grant Matching: Identifies eligibility for programs offering up to ₱1 million in funding.
- Negosyante Hub: Community board for entrepreneurs to share tips and experiences.
- Place Finder: Google Maps integration with live directions to relevant government offices.
- Renewal Calendar: Tracks annual renewal deadlines and estimates completion time.

The frontend uses React 19 and shadcn/ui with Tailwind v4. The backend runs Express with tRPC for end-to-end type safety. Firebase Firestore handles data, and pdf-lib fills 30+ named fields on actual government AcroForm templates.

The "Bayanihan Modernism" design system—warm-cream backgrounds, teal-to-blue gradients, and Filipino-language microcopy—gives the app a distinctly local feel.

Outcome: Shipped with 56 passing tests, a functional chat-to-PDF pipeline, and a complete registration roadmap validated with real Manila City data.`,
    tags: ["Full Stack Development"],
    image: "/negosyonav.png",
    year: "2026",
    role: "UI/UX Designer & Full Stack Developer",
    tools: ["React 19", "Express", "tRPC", "Firebase", "Gemini AI", "Google Maps API", "pdf-lib", "Tailwind CSS"],
    link: "https://negosyo-nav.vercel.app/"
  }
]

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <main className="relative min-h-screen">
      <StarField />
      <Navbar />
      <ProjectDetail project={project} />
    </main>
  )
}