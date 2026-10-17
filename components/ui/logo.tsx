import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The three-blade mark, traced from the brand artwork (public/brand/logo-mark.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" focusable="false" className={cn("size-8 shrink-0", className)}>
      <path
        fill="#0D55C7"
        d="M0 823 4 802 11 783 22 765 33 752 409 403 417 396 423 393 423 701 410 714 348 771 199 906 175 924 162 931 149 936 126 941 114 942 94 941 75 937 62 932 51 926 41 919 30 909 20 897 12 884 7 873 1 851 0 843Z"
      />
      <path
        fill="#1769F5"
        d="M449 123 451 107 454 95 460 79 472 59 482 47 501 31 516 22 530 16 540 13 562 9 584 9 606 13 623 19 637 26 653 37 667 50 682 71 689 86 692 95 695 108 696 117 696 501 692 506 454 664 450 664 449 481Z"
      />
      <path
        fill="#2588FF"
        d="M475 681 478 678 494 667 677 544 689 536 695 533 697 533 880 699 985 796 1001 813 1009 825 1016 840 1020 852 1023 866 1024 875 1024 895 1022 909 1019 921 1015 932 1007 948 999 960 983 978 971 988 959 996 941 1005 923 1011 899 1015 877 1015 867 1014 852 1011 835 1005 820 997 801 983 624 821 484 691 475 682Z"
      />
    </svg>
  );
}

/** Splits "ktTeams" into "kt" + "Teams" so the second part can carry the brand blue. */
function splitName(name: string): [string, string] {
  const m = /^([a-z]+)([A-Z].*)$/.exec(name);
  return m ? [m[1], m[2]] : [name, ""];
}

export function Wordmark({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const [lead, rest] = splitName(site.name);
  return (
    <span className={cn("font-display text-[1.3rem] font-bold tracking-tight", className)}>
      <span className={onDark ? "text-white" : "text-fg"}>{lead}</span>
      {rest && <span className={onDark ? "text-[#5db8ff]" : "text-primary"}>{rest}</span>}
    </span>
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
      <Wordmark onDark={onDark} />
    </Link>
  );
}
