"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Wallet } from "lucide-react";
import { useState } from "react";
import type { Job } from "@/data/jobs";
import { LeadForm } from "@/components/forms/lead-form";
import { cn } from "@/lib/utils";

/** Filterable job list with expandable details and an inline application form. */
export function JobBoard({ jobs }: { jobs: Job[] }) {
  const teams = ["All teams", ...Array.from(new Set(jobs.map((j) => j.team)))];
  const places = ["All locations", ...Array.from(new Set(jobs.map((j) => j.workplace)))];
  const [team, setTeam] = useState(teams[0]);
  const [place, setPlace] = useState(places[0]);
  const [open, setOpen] = useState<string | null>(null);
  const [applying, setApplying] = useState<string | null>(null);

  const list = jobs.filter((j) => (team === teams[0] || j.team === team) && (place === places[0] || j.workplace === place));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-subtle uppercase">Team</span>
          <select value={team} onChange={(e) => setTeam(e.target.value)} className="h-12 w-full rounded-xl border border-line-strong bg-surface px-4 font-semibold text-fg outline-none focus:border-primary">
            {teams.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-subtle uppercase">Workplace</span>
          <select value={place} onChange={(e) => setPlace(e.target.value)} className="h-12 w-full rounded-xl border border-line-strong bg-surface px-4 font-semibold text-fg outline-none focus:border-primary">
            {places.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {list.length} open role{list.length === 1 ? "" : "s"}
      </p>
      <ul className="flex flex-col gap-4">
        {list.map((j) => {
          const isOpen = open === j.slug;
          return (
            <li key={j.slug} className={cn("rounded-[var(--radius-card)] border bg-surface shadow-soft transition-shadow", isOpen ? "border-primary/40 shadow-card" : "border-line")}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`job-${j.slug}`}
                onClick={() => setOpen(isOpen ? null : j.slug)}
                className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <span>
                  <span className="block font-display text-lg font-bold text-fg">{j.title}</span>
                  <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="size-4" aria-hidden="true" />
                      {j.team}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden="true" />
                      {j.location} · {j.workplace}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Wallet className="size-4" aria-hidden="true" />
                      {j.salary}
                    </span>
                  </span>
                </span>
                <ChevronDown className={cn("size-5 shrink-0 text-subtle transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`job-${j.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line p-5 sm:p-6">
                      <p className="text-fg">{j.summary}</p>
                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="font-display font-bold text-fg">What you&apos;ll do</h3>
                          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted marker:text-primary">
                            {j.responsibilities.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-fg">What you&apos;ll bring</h3>
                          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted marker:text-primary">
                            {j.requirements.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {applying === j.slug ? (
                        <div className="mt-8 rounded-2xl bg-bg-soft p-5 sm:p-6">
                          <h3 className="mb-4 font-display text-lg font-bold text-fg">Apply for {j.title}</h3>
                          <LeadForm
                            submitLabel="Submit application"
                            successTitle="Application received"
                            successBody="Thanks for applying! Our recruiting team reviews every application and will be in touch within two weeks."
                            fields={[
                              { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
                              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                              { name: "portfolio", label: "Portfolio or profile URL", type: "url", half: true },
                              { name: "location", label: "Current location", half: true },
                              { name: "note", label: "Why this role?", type: "textarea" },
                            ]}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setApplying(j.slug)}
                          className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 font-semibold text-primary-fg hover:bg-primary-hover"
                        >
                          Apply for this role
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
