"use client";

import { useId, useState } from "react";
import { saveSeo } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { ActionForm } from "./form-kit";
import { adminInput, adminTextarea, Field } from "./ui";

type Props = {
  path: string;
  title: string;
  description: string;
  originalTitle: string;
  originalDescription: string;
  /** "ktTeams", added after every title except the home page's */
  siteName: string;
  siteUrl: string;
  titleLimit: number;
  descriptionLimit: number;
};

/** Length hint that turns amber outside the range search engines show in full. */
function Counter({ length, min, max }: { length: number; min: number; max: number }) {
  const ok = length >= min && length <= max;
  return (
    <span className={cn("text-xs font-semibold tabular-nums", ok ? "text-mint-ink" : "text-sun-ink")}>
      {length} characters · aim for {min}–{max}
    </span>
  );
}

function SeoFields({ errors, ...p }: Props & { errors: Record<string, string> }) {
  const id = useId();
  const [title, setTitle] = useState(p.title);
  const [description, setDescription] = useState(p.description);
  const isHome = p.path === "/";
  // Same rule as searchTitle() in lib/seo.ts: the site name is added only while the whole title fits in 60 characters
  const withName = `${title} | ${p.siteName}`;
  const fullTitle = isHome || withName.length > 60 ? title : withName;
  const host = p.siteUrl.replace(/^https?:\/\//, "");
  const crumbs = p.path === "/" ? host : `${host} › ${p.path.split("/").filter(Boolean).join(" › ")}`;

  return (
    <>
      <input type="hidden" name="path" value={p.path} />
      <input type="hidden" name="original_title" value={p.originalTitle} />
      <input type="hidden" name="original_description" value={p.originalDescription} />

      <Field
        label="Title"
        htmlFor={`${id}-t`}
        error={errors.title}
        hint={isHome ? "Shown exactly as written." : `“ | ${p.siteName}” is added after it while the whole title fits in 60 characters.`}
      >
        <input
          id={`${id}-t`}
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={p.titleLimit + 20}
          aria-invalid={Boolean(errors.title)}
          className={adminInput}
        />
      </Field>
      <div className="-mt-3">
        <Counter length={fullTitle.length} min={30} max={60} />
      </div>

      <Field label="Description" htmlFor={`${id}-d`} error={errors.description} hint="The summary under the title in search results and link previews.">
        <textarea
          id={`${id}-d`}
          name="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={p.descriptionLimit + 40}
          aria-invalid={Boolean(errors.description)}
          className={adminTextarea}
        />
      </Field>
      <div className="-mt-3">
        <Counter length={description.length} min={120} max={160} />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-fg">Preview in Google</p>
        <div className="rounded-2xl border border-line bg-[#fff] p-4 [font-family:Arial,sans-serif]">
          <p className="truncate text-xs text-[#4d5156]">{crumbs}</p>
          <p className="mt-1 truncate text-lg leading-snug text-[#1a0dab]">{fullTitle || "Untitled page"}</p>
          <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{description || "No description: search engines will pick some text from the page."}</p>
        </div>
      </div>
    </>
  );
}

export function SeoForm(props: Props) {
  return <ActionForm action={saveSeo}>{(errors) => <SeoFields {...props} errors={errors} />}</ActionForm>;
}
