import { buildSearchIndex } from "@/lib/search-index";

/** GET /search-index.json: the site search index, fetched when search is first opened. */
export function GET() {
  return Response.json(buildSearchIndex());
}
