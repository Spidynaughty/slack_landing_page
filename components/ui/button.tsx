import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light" | "deep";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] duration-200 active:scale-[0.98] disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg shadow-[0_8px_20px_-8px_var(--primary)] hover:bg-primary-hover hover:shadow-glow",
  secondary: "border border-line-strong bg-surface text-fg hover:border-fg/40 hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2",
  light: "bg-white text-deep shadow-lg hover:bg-white/90",
  "outline-light": "border border-white/35 text-white hover:border-white/60 hover:bg-white/10",
  deep: "bg-deep text-on-deep hover:bg-deep-2 dark:bg-white dark:text-deep dark:hover:bg-white/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; arrow?: boolean; children: ReactNode };

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "children">) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
      )}
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
      )}
    </button>
  );
}

/** Inline text link with an animated arrow. */
export function ArrowLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group/al inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover/al:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
