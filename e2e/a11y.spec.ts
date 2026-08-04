import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { dismissConsentEssential } from "./helpers";

/**
 * Accessibility gate — fails on serious/critical axe violations.
 * Runs in CI as part of `npm run test:e2e`.
 */
const PAGES = [
  { path: "/en", name: "home" },
  { path: "/en/eligibility", name: "eligibility" },
  { path: "/en/contact", name: "contact" },
  { path: "/en/practice/2025", name: "practice" },
] as const;

for (const { path, name } of PAGES) {
  test(`a11y ${name} (${path}) has no critical/serious issues`, async ({
    page,
  }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await page.waitForTimeout(200);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules([
        // Color contrast can flap with theme/fonts in CI screenshots; skip until design tokens audited.
        "color-contrast",
      ])
      .analyze();

    const blockers = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact || "")
    );

    if (blockers.length) {
      const summary = blockers
        .map(
          (v) =>
            `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s)`
        )
        .join("\n");
      expect(blockers, summary).toEqual([]);
    }
  });
}

test("skip link targets main content", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await dismissConsentEssential(page);
  const skip = page.locator(".gw-skip-link");
  await expect(skip).toHaveAttribute("href", "#main-content");
  await skip.focus();
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("#main-content")).toBeVisible();
});
