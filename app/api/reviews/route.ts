import { connection } from "next/server";
import { getPublishedReviews } from "@/lib/content";

/** GET /api/reviews: published reviews, in display order. */
export async function GET() {
  // Answer per request (the review list itself stays cached until the admin changes it)
  await connection();
  const reviews = await getPublishedReviews();
  return Response.json({
    reviews: reviews.map(({ id, name, role, company, rating, quote, featured }) => ({
      id,
      name,
      role,
      company,
      rating,
      quote,
      featured: Boolean(featured),
    })),
  });
}
