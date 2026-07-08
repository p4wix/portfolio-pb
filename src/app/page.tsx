import Image from "next/image";
import { Experience } from "@/components/experience";
import { ThemeToggle } from "@/components/theme-toggle";
import { actions, profile, socials } from "@/lib/data";

export default function Home() {
  return (
    <>
      <div className="bg-grid" aria-hidden />
      <div className="bg-ambient" aria-hidden />

      <header className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col">
        <section className="flex min-h-[72svh] items-center justify-center px-6 pt-16 pb-10">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          {/* Avatar — small, minimalist */}
          <div className="animate-fade-up mb-6" style={{ animationDelay: "0ms" }}>
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={256}
              height={256}
              quality={95}
              priority
              style={{ objectPosition: "50% 18%" }}
              className="h-28 w-28 rounded-full border border-[var(--border)] object-cover shadow-sm"
            />
          </div>

          <h1
            className="animate-fade-up text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ animationDelay: "70ms" }}
          >
            {profile.name}
          </h1>

          <p
            className="animate-fade-up mt-3 max-w-sm text-balance text-[15px] leading-relaxed text-[var(--muted)]"
            style={{ animationDelay: "140ms" }}
          >
            {profile.tagline}
          </p>

          <div
            className="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "210ms" }}
          >
            {actions.map((action, i) => (
              <a
                key={action.label}
                href={action.href}
                className={
                  i === 0
                    ? "rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
                    : "rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
                }
              >
                {action.label}
              </a>
            ))}
          </div>

          <nav
            className="animate-fade-up mt-10 flex items-center justify-center gap-1"
            style={{ animationDelay: "280ms" }}
            aria-label="Social"
          >
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </nav>
        </div>
        </section>

        <Experience />
      </main>

      <footer className="pb-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
