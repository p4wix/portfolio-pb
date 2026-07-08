import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons";

/**
 * All portfolio content lives here.
 * Replace the placeholders below with your own data — the rest
 * of the page updates automatically.
 */
export const profile = {
  name: "Paweł Biniak",
  // One sentence about you (rasmic.xyz style)
  tagline: "Software engineer. I build web apps and AI-powered products.",
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
