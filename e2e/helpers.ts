import { type Page } from "@playwright/test";

/** Dismiss cookie banner without loading ads/analytics. */
export async function dismissConsentEssential(page: Page) {
  const essential = page.getByRole("button", {
    name: /Essential only|Solo esenciales|仅必要|Chỉ thiết yếu|الأساسية فقط|필수만|केवल आवश्यक|Только необходимые|Esansyèl sèlman|Essentiels seulement/i,
  });
  try {
    await essential.waitFor({ state: "visible", timeout: 4_000 });
    await essential.click();
  } catch {
    // Banner already dismissed or not shown
  }
}
