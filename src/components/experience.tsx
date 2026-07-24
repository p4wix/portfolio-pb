import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section className="animate-fade-up mt-14 mb-6" style={{ animationDelay: "210ms" }}>
      <h2 className="section-title font-rounded font-semibold">Experience</h2>

      <ol className="mt-8 ml-3.5 border-l border-[var(--border)]">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.period}`}
            className="relative mb-10 pl-9 last:mb-0"
          >
            <span className="absolute -left-[14px] top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]">
              <Briefcase className="h-3.5 w-3.5 text-[var(--muted)]" />
            </span>

            <h3 className="text-base font-medium leading-tight">{job.role}</h3>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              {job.company} · {job.type}
            </p>
            <p className="mt-0.5 text-[13px] text-[var(--muted)]">{job.period}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
