import type { Metadata } from "next";
import { NotFoundContent } from "@/components/sections/not-found-content";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for has moved or no longer exists.",
  robots: { index: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
