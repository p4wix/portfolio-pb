import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons";

/**
 * All portfolio content lives here.
 * Replace the placeholders below with your own data - the rest
 * of the page updates automatically.
 */
export const profile = {
  name: "Paweł Biniak",
  // One sentence about you (rasmic.xyz style)
  tagline:
    "Software engineer specializing in Salesforce. I build CRM solutions, web apps, and AI-powered products.",
  // Path to the photo in /public
  avatar: "/avatar.jpg",
  location: "Poland",
  email: "pawel.biniak9@gmail.com",
} as const;

/** Primary call-to-action links shown under the bio */
export const actions = [
  { label: "Get in touch", href: "mailto:pawel.biniak9@gmail.com" },
  {
    label: "Work with me",
    href: "mailto:pawel.biniak9@gmail.com?subject=Work%20with%20me",
  },
] as const;

/** Social icons in the footer */
export const socials = [
  { label: "GitHub", href: "https://github.com/p4wix", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pawel-biniak/",
    icon: LinkedinIcon,
  },
  { label: "X", href: "https://x.com/p4wix1", icon: XIcon },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@pawelbiniak",
    icon: YoutubeIcon,
  },
  { label: "Email", href: "mailto:pawel.biniak9@gmail.com", icon: Mail },
] as const;

/** Professional experience (newest first) - shown as a minimal timeline */
export const experience = [
  {
    role: "Salesforce Developer",
    company: "Spyrosoft",
    type: "Full-time",
    period: "Jul 2026 - Present",
  },
  {
    role: "Salesforce Developer",
    company: "Synechron",
    type: "Full-time",
    period: "Mar 2026 - Jun 2026",
  },
  {
    role: "Salesforce Developer",
    company: "Mindpal",
    type: "Part-time",
    period: "Feb 2026 - Present",
  },
  {
    role: "Salesforce Developer",
    company: "Think Beyond",
    type: "Full-time",
    period: "Jan 2023 - Feb 2026",
  },
  {
    role: "Junior Salesforce Developer",
    company: "ACE Agency",
    type: "Full-time",
    period: "Apr 2022 - Jan 2023",
  },
] as const;
