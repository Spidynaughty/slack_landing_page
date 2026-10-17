import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Original mark: a rounded speech bubble holding three "typing" dots in the accent colours. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-8", className)} aria-hidden="true" focusable="false">
      <path
        d="M8 4h24a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H18.5l-7.2 5.6c-.9.7-2.3.1-2.3-1.1V31H8a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6Z"
        fill="#4228d6"
      />
      <path
        d="M8 4h24a6 6 0 0 1 6 6v6C30 9 18 8 2 14v-4a6 6 0 0 1 6-6Z"
        fill="#ffffff"
        fillOpacity="0.14"
      />
      <circle cx="12.5" cy="17.5" r="3.3" fill="#ff7a4d" />
      <circle cx="20" cy="17.5" r="3.3" fill="#ffc23d" />
      <circle cx="27.5" cy="17.5" r="3.3" fill="#34d399" />
    </svg>
  );
}

export function Logo({
  className,
  onDark = false,
  onClick,
}: {
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex items-center gap-2 rounded-lg", className)}
      aria-label={`${site.name} home`}
    >
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.35rem] font-extrabold tracking-tight",
          onDark ? "text-white" : "text-fg",
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
