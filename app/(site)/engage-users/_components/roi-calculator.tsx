"use client";

import { useId, useState } from "react";
import { CalendarDays, Clock, Timer, User } from "lucide-react";
import { inputClass } from "@/components/forms/lead-form";
import { cn } from "@/lib/utils";

/** Share of meeting time teams typically replace with huddles, clips and async updates. */
const MEETING_SHARE_SAVED = 0.25;
/** Hours per person, per week, saved catching up through AI recaps and search. */
const CATCH_UP_HOURS = 1.1;
const WORK_WEEKS = 46;
const HOURS_PER_DAY = 8;

const fmtNumber = (n: number, decimals = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const fmtCurrency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Field({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  rangeMax,
  step,
  prefix,
  unit,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  rangeMax: number;
  step: number;
  prefix?: string;
  unit: string;
}) {
  const id = useId();
  const clamp = (n: number) => Math.min(max, Math.max(0, Number.isFinite(n) ? n : 0));
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <label id={`${id}-label`} htmlFor={`${id}-num`} className="block font-semibold text-fg">
            {label}
          </label>
          <p id={`${id}-hint`} className="text-sm text-muted">
            {hint}
          </p>
        </div>
        <div className="relative">
          {prefix && (
            <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted">
              {prefix}
            </span>
          )}
          <input
            id={`${id}-num`}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-describedby={`${id}-hint`}
            onChange={(e) => onChange(clamp(e.target.valueAsNumber))}
            className={cn(inputClass, "h-11 w-28 text-right tabular-nums", prefix && "pl-7")}
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={rangeMax}
        step={step}
        value={Math.min(Math.max(value, min), rangeMax)}
        aria-labelledby={`${id}-label`}
        aria-valuetext={`${prefix ?? ""}${fmtNumber(value)} ${unit}`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer accent-[var(--primary)]"
      />
      <div aria-hidden="true" className="mt-1 flex justify-between text-xs text-subtle">
        <span>
          {prefix}
          {fmtNumber(min)}
        </span>
        <span>
          {prefix}
          {fmtNumber(rangeMax)}+
        </span>
      </div>
    </div>
  );
}

/** Purely client-side estimate of time and money saved; nothing is sent anywhere. */
export function RoiCalculator() {
  const [team, setTeam] = useState(150);
  const [meetings, setMeetings] = useState(8);
  const [rate, setRate] = useState(60);

  const perPerson = meetings * MEETING_SHARE_SAVED + CATCH_UP_HOURS;
  const weekly = team * perPerson;
  const annual = weekly * WORK_WEEKS;
  const value = annual * rate;
  const days = annual / HOURS_PER_DAY;

  const results = [
    { icon: Clock, label: "Team hours saved per week", value: fmtNumber(weekly) },
    { icon: CalendarDays, label: "Team hours saved per year", value: fmtNumber(annual) },
    { icon: User, label: "Hours saved per person, per week", value: fmtNumber(perPerson, 1) },
    { icon: Timer, label: "Workdays returned per year", value: fmtNumber(days) },
  ];

  return (
    <div className="grid overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface shadow-card lg:grid-cols-[1.05fr_1fr]">
      <form
        aria-label="Productivity calculator inputs"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-9 p-6 sm:p-10"
      >
        <Field
          label="Team size"
          hint="People who would use it every day"
          value={team}
          onChange={setTeam}
          min={5}
          max={500000}
          rangeMax={2000}
          step={5}
          unit="people"
        />
        <Field
          label="Meetings per person"
          hint="Average hours of internal meetings each week"
          value={meetings}
          onChange={setMeetings}
          min={0}
          max={40}
          rangeMax={30}
          step={1}
          unit="hours per week"
        />
        <Field
          label="Average hourly cost"
          hint="Fully loaded cost of one hour of work"
          value={rate}
          onChange={setRate}
          min={15}
          max={1000}
          rangeMax={200}
          step={5}
          prefix="$"
          unit="per hour"
        />
      </form>

      <div className="deep-adaptive relative overflow-hidden bg-deep p-6 text-on-deep sm:p-10">
        <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-15" />
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.12em] text-on-deep-muted uppercase">Your estimate</p>
          <p className="mt-6 text-sm text-on-deep-muted">Estimated value of time saved each year</p>
          <p className="mt-1 font-display text-display-md font-extrabold break-words text-white tabular-nums">{fmtCurrency(value)}</p>
          <p className="sr-only" aria-live="polite">
            {`Estimated ${fmtNumber(weekly)} team hours saved per week, worth ${fmtCurrency(value)} per year.`}
          </p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="flex items-center gap-2 text-xs font-medium text-on-deep-muted">
                  <r.icon className="size-4 text-sun" aria-hidden="true" />
                  {r.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-bold text-white tabular-nums">{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-on-deep-muted">
            Illustrative estimate. Assumes {Math.round(MEETING_SHARE_SAVED * 100)}% of meeting time moves to huddles, clips and
            async updates, plus {CATCH_UP_HOURS} hours per person each week saved catching up with AI recaps and search, over{" "}
            {WORK_WEEKS} working weeks. Your results will vary.
          </p>
        </div>
      </div>
    </div>
  );
}
