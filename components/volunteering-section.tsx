"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Palette, Camera, ShieldUser, Settings, User, ChevronDown, ChevronUp } from "lucide-react";

const volunteeringAndLeadership = [
  {
    type: "Volunteering",
    title: "Program Support",
    organization: "The Frame",
    period: "June 2025",
    description: "Assisted as a Springboard Philippines intern in managing event registration, guiding participants, and supporting design-related sessions and logistics.",
    icon: ShieldUser,
  },
  {
    type: "Volunteering",
    title: "Operations & Support Volunteer",
    organization: "Springboard Philippines",
    period: "May 2025",
    description: "Supported workshop operations for \"PHP is Not Dead, Laravel Is Proof\" by Springboard Labs, assisting with logistics, technical setup, and participant coordination to ensure smooth session delivery.",
    icon: Settings,
  },
  {
    type: "Volunteering",
    title: "UI/UX Designer",
    organization: "Arduino Day Philippines",
    period: "Jan 2025 - March 2025",
    description: "Designed and optimized the official event website to enhance accessibility and user experience for over 500 anticipated attendees, ensuring smooth navigation and clear event information delivery.",
    icon: Palette,
  },
  {
    type: "Volunteering",
    title: "Branding Manager",
    organization: "Springboard Philippines",
    period: "May 2025",
    description: "Led the visual identity and social media campaign for a 3-day donation drive in Cavite, helping raise ₱2,000 in donations and grow the initiative's online presence by 208+ new followers.",
    icon: User,
  },
  {
    type: "Leadership",
    title: "Senior UI/UX Designer, Department of Software & Web Development",
    organization: "AWSCC-PUP Manila",
    period: "November 2023 - November 2024",
    description: "Leading design efforts, maintaining design systems, and collaborating with developers.",
    icon: ShieldUser,
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "Genesis Block: JBECP PUP Manila Mainnet Launch",
    period: "October 2024",
    description: "Contributed to the launch by designing creative assets and supporting event visuals.",
    icon: Palette,
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "AWS Community Day Philippines 2024",
    period: "September 2024",
    description: "Designed promotional and event materials for AWS community engagement.",
    icon: Palette,
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "AWSCC Student Community Day",
    period: "April 2024",
    description: "Supported event design and content creation for student participants.",
    icon: Palette,
  },
  {
    type: "Volunteering",
    title: "Photographer",
    organization: "AWSCC PUP Manila: BuildHers+ Ideate & Innovate",
    period: "March 2024",
    description: "Captured key moments and documented the event for promotional use.",
    icon: Camera,
  },
  {
    type: "Volunteering",
    title: "Creatives Committee",
    organization: "AWS Community Day Philippines 2023",
    period: "May 2023",
    description: "Assisted in creating event visuals and supporting creative initiatives.",
    icon: Palette,
  },
];

export function VolunteeringSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? volunteeringAndLeadership
    : volunteeringAndLeadership.slice(0, 3);

  return (
    <section className="relative z-10 py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <p className="text-[#9B77CB] text-sm font-medium tracking-wider uppercase mb-2">
          Community & Impact
        </p>
        <h2 className="text-3xl font-bold mb-10">
          Volunteering & Leadership
        </h2>

        <div className="space-y-4">
          {visibleItems.map((item, index) => (
            <div key={index} className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#591DA9]/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#CB98ED]" />
                </div>

                <div>
                  <Badge className="mb-2 bg-[#591DA9]/20 text-[#CB98ED] border-[#591DA9]/30">
                    {item.period}
                  </Badge>

                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-[#9B77CB] text-sm mb-2">
                    {item.organization}
                  </p>

                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        {volunteeringAndLeadership.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
                inline-flex items-center gap-2
                rounded-full border border-[#591DA9]/40
                bg-[#591DA9]/10
                px-5 py-2.5
                text-sm font-medium text-[#CB98ED]
                transition-all duration-300
                hover:bg-[#591DA9]/20 hover:text-white
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB98ED]/50
              "
            >
              {showAll ? "Show less" : "View more"}
              {showAll ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
