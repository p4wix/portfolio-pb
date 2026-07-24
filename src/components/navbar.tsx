import { profile } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav
      className="animate-nav-in fixed inset-x-0 top-0 z-20 border-b border-[var(--border)] backdrop-blur-md"
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
        <a
          href="/"
          className="group font-rounded flex items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block text-xl leading-none transition-transform duration-200 ease-out group-hover:rotate-[20deg]"
          >
            {profile.emoji}
          </span>
          <span>{profile.name}</span>
        </a>

        {/* Nav links go here later */}

        <ThemeToggle />
      </div>
    </nav>
  );
}
