import Image from "next/image";
import { Experience } from "@/components/experience";
import { Navbar } from "@/components/navbar";
import { VoxelModel } from "@/components/voxel-model";
import { actions, profile, socials } from "@/lib/data";

export default function Home() {
  return (
    <>
      <div className="bg-grid" aria-hidden />
      <div className="bg-ambient" aria-hidden />

      <Navbar />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-20 pb-10">
        {/* 3D voxel model */}
        <VoxelModel />

        {/* Greeting box */}
        <div
          className="animate-fade-up greeting-box mb-6 rounded-lg px-4 py-3 text-center text-[15px]"
          style={{ animationDelay: "0ms" }}
        >
          {profile.greeting}
        </div>

        {/* Name + profile image */}
        <div
          className="animate-fade-up flex items-center"
          style={{ animationDelay: "70ms" }}
        >
          <div className="grow">
            <h1 className="font-rounded text-3xl font-extrabold tracking-tight sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-[15px] text-[var(--muted)]">
              {profile.role}
            </p>
          </div>
          <div className="ml-6 shrink-0">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={200}
              height={200}
              quality={95}
              priority
              style={{ objectPosition: "50% 18%" }}
              className="h-[100px] w-[100px] rounded-full border-2 border-[var(--box-border)] object-cover"
            />
          </div>
        </div>

        {/* Work section */}
        <section
          className="animate-fade-up mt-10"
          style={{ animationDelay: "140ms" }}
        >
          <h2 className="section-title font-rounded font-semibold">Work</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/90">
            {profile.about}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {actions.map((action, i) => (
              <a
                key={action.label}
                href={action.href}
                className={
                  i === 0
                    ? "rounded-lg bg-[var(--teal)] px-5 py-2 text-sm font-medium text-[#202023] transition-opacity hover:opacity-90"
                    : "rounded-lg border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
                }
              >
                {action.label}
              </a>
            ))}
          </div>

          <nav
            className="mt-6 flex items-center gap-1"
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
        </section>

        <Experience />
      </main>

      <footer className="pb-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
