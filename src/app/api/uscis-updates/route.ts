import { scrapeUscisTestUpdates } from "@/lib/uscis-scrape";
import { FALLBACK_USCIS_UPDATES } from "@/lib/federal-officials";

export const revalidate = 86400;

export async function GET() {
  try {
    const raw = await scrapeUscisTestUpdates();
    return Response.json(
      { ...raw, live: true },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    console.error("[uscis-updates]", err);
    return Response.json(
      { ...FALLBACK_USCIS_UPDATES, live: false, error: "scrape_failed" },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  }
}
