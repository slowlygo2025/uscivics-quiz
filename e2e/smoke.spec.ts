import { test, expect } from "@playwright/test";
import { dismissConsentEssential } from "./helpers";

test.describe("smoke", () => {
  test("root redirects to a locale home", async ({ page }) => {
    const res = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(res?.ok() || res?.status() === 304).toBeTruthy();
    await expect(page).toHaveURL(/\/(en|es|zh|vi|tl|ar|ko|hi|ru|ht|fr)(\/|$)/);
    await dismissConsentEssential(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("English home shows brand CTA", async ({ page }) => {
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(
      page.getByRole("heading", { level: 1, name: /USCivics/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Find my test version/i }).first()
    ).toBeVisible();
  });

  test("eligibility flow loads", async ({ page }) => {
    await page.goto("/en/eligibility", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Yes$/i })).toBeVisible();
  });

  test("practice 2025 hub loads study modes", async ({ page }) => {
    await page.goto("/en/practice/2025", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /Flashcards/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Simulate interview/i })
    ).toBeVisible();
  });

  test("questions search (?q=) returns matches", async ({ page }) => {
    await page.goto("/en/questions?q=president", {
      waitUntil: "domcontentloaded",
    });
    await dismissConsentEssential(page);
    await expect(
      page.getByRole("searchbox").or(page.locator('input[type="search"]'))
    ).toBeVisible();
    await expect(page.getByText(/Matches:/i)).toBeVisible();
    await expect(page.locator("ul li").first()).toBeVisible();
  });

  test("drill and legal pages render localized content", async ({ page }) => {
    await page.goto("/en/questions/drill/dates-2025", {
      waitUntil: "domcontentloaded",
    });
    await dismissConsentEssential(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/es/about", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Acerca|USCivics/i
    );

    await page.goto("/fr/privacy", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("sitemap and robots are public", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const sitemapBody = await sitemap.text();
    expect(sitemapBody).toContain("uscivics-quiz.com");
    expect(sitemapBody).toMatch(/<url>/i);

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    const robotsBody = await robots.text();
    expect(robotsBody).toMatch(/Sitemap:\s*https:\/\/uscivics-quiz\.com\/sitemap\.xml/i);
    expect(robotsBody).toMatch(/Disallow:.*indexing-checklist/i);
  });

  test("API officials rejects invalid ZIP", async ({ request }) => {
    const res = await request.get("/api/officials?zip=abc");
    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  test("monitoring health endpoint responds", async ({ request }) => {
    const res = await request.get("/api/monitoring-health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(typeof body.sentry).toBe("boolean");
  });
});
