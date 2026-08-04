import { test, expect } from "@playwright/test";
import { dismissConsentEssential } from "./helpers";

test.describe("hero layout", () => {
  test("home hero has overlay content and contained photo (desktop)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);

    const hero = page.locator(".gw-hero");
    await expect(hero).toBeVisible();
    await expect(page.locator(".gw-hero__headline")).toBeVisible();
    await expect(page.locator(".gw-hero__glow")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Find my test version/i }).first()
    ).toBeVisible();

    const ok = await page.evaluate(() => {
      const section = document.querySelector(".gw-hero");
      const photo = document.querySelector(".gw-hero__photo");
      const glow = document.querySelector(".gw-hero__glow");
      if (!section || !photo || !glow) return { fail: "missing" };
      const hr = section.getBoundingClientRect();
      const pr = photo.getBoundingClientRect();
      const gr = glow.getBoundingClientRect();
      const overflowX =
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 2;
      return {
        fail: null,
        photoContained:
          pr.top >= hr.top - 2 &&
          pr.bottom <= hr.bottom + 2 &&
          pr.left >= hr.left - 2 &&
          pr.right <= hr.right + 2,
        glowHasSize: gr.height > 40 && gr.width > 40,
        overflowX,
        photoNotFullViewport: pr.height < window.innerHeight - 40,
      };
    });

    expect(ok.fail).toBeNull();
    expect(ok.photoContained).toBeTruthy();
    expect(ok.glowHasSize).toBeTruthy();
    expect(ok.overflowX).toBeFalsy();
    expect(ok.photoNotFullViewport).toBeTruthy();
  });

  test("home hero works on mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);

    await expect(page.locator(".gw-hero__headline")).toBeVisible();
    const ok = await page.evaluate(() => {
      const section = document.querySelector(".gw-hero");
      const photo = document.querySelector(".gw-hero__photo");
      if (!section || !photo) return false;
      const hr = section.getBoundingClientRect();
      const pr = photo.getBoundingClientRect();
      const overflowX =
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 2;
      return (
        !overflowX &&
        pr.top >= hr.top - 2 &&
        pr.bottom <= hr.bottom + 2
      );
    });
    expect(ok).toBeTruthy();
  });
});

test.describe("eligibility fidelity", () => {
  test("supports not-sure and split 65/20 questions", async ({ page }) => {
    await page.goto("/en/eligibility", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(page.getByRole("button", { name: /I'm not sure/i })).toBeVisible();
    await page.getByRole("button", { name: /^No$/i }).first().click();
    await expect(page.getByText(/Are you 65 or older\?/i)).toBeVisible();
  });
});

test.describe("contact form", () => {
  test("contact page exposes operable form fields", async ({ page }) => {
    await page.goto("/en/contact", { waitUntil: "domcontentloaded" });
    await dismissConsentEssential(page);
    await expect(page.getByLabel(/Your name/i)).toBeVisible();
    await expect(page.getByLabel(/Your email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
  });
});
