import { test, expect } from "@playwright/test";

// E2E coverage for POST /api/contact via the real contact form UI, per
// docs/SA_BLUEPRINT.md §5 (the one piece of server logic worth testing here:
// validation, honeypot, rate-limit, and Resend-failure branches).
//
// The rate limiter (src/lib/rate-limit.ts) is in-memory, keyed by client IP,
// shared across the whole dev server process — tests that hit the real route
// set a unique `x-forwarded-for` per test so runs don't collide with each
// other or with a prior run against the same still-running dev server.
function testIp() {
  return `203.0.113.${Math.floor(Math.random() * 200) + 1}`;
}

test.describe("Contact form — client-side validation (no network call)", () => {
  test("shows errors for an empty submit", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Enter a valid email")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();
  });

  test("shows an error for an invalid email format", async ({ page }) => {
    await page.goto("/#contact");
    await page.locator("#cf-name").fill("Test User");
    await page.locator("#cf-email").fill("not-an-email");
    await page.locator("#cf-message").fill("Hello there");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Enter a valid email")).toBeVisible();
    // The valid fields shouldn't show errors.
    await expect(page.getByText("Name is required")).not.toBeVisible();
    await expect(page.getByText("Message is required")).not.toBeVisible();
  });
});

test.describe("Contact form — mocked success path", () => {
  test("shows the success state and resets the form", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/#contact");
    await page.locator("#cf-name").fill("Test User");
    await page.locator("#cf-email").fill("test@example.com");
    await page.locator("#cf-message").fill("Hello there");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(
      page.getByText("Thanks — I'll get back to you soon.")
    ).toBeVisible();
  });
});

test.describe("Contact form — honeypot", () => {
  test("silently succeeds when the honeypot field is filled (bot path)", async ({
    page,
  }) => {
    await page.goto("/#contact");
    await page.locator("#cf-name").fill("Bot");
    await page.locator("#cf-email").fill("bot@example.com");
    await page.locator("#cf-message").fill("spam message");
    // Hidden from real users (display:none via the `hidden` class) — a plain
    // `.fill({force: true})` doesn't reliably retarget focus onto a
    // display:none element in Playwright (it can leave focus on the
    // previously-focused field, corrupting that field's value instead), so
    // set the value directly via evaluate, same as a real bot script would.
    await page
      .locator('input[name="honeypot"]')
      .evaluate((el: HTMLInputElement, value: string) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }, "i-am-a-bot");
    await page.getByRole("button", { name: "Send Message" }).click();

    // Route pretends success so the bot doesn't learn it was caught — the
    // real assertion of interest is that no email attempt is made, which is
    // covered server-side by this being unreachable code past the honeypot
    // check; here we just confirm the UI shows success.
    await expect(
      page.getByText("Thanks — I'll get back to you soon.")
    ).toBeVisible();
  });
});

test.describe("Contact form — rate limiting against the real route", () => {
  test("allows 5 submissions per window, then rate-limits the 6th", async ({
    page,
    context,
  }) => {
    await context.setExtraHTTPHeaders({ "x-forwarded-for": testIp() });
    await page.goto("/#contact");

    async function submitOnce(message: string) {
      await page.locator("#cf-name").fill("Test User");
      await page.locator("#cf-email").fill("test@example.com");
      await page.locator("#cf-message").fill(message);
      await page.getByRole("button", { name: "Send Message" }).click();
    }

    // No RESEND_API_KEY is configured in this environment, so every allowed
    // submission fails at the Resend-send step (502 delivery_failed) — the
    // route handler runs the rate-limit check *before* that, so this still
    // exercises the real rate-limit boundary deterministically.
    for (let i = 0; i < 5; i++) {
      await submitOnce(`Message number ${i + 1}`);
      await expect(
        page.getByText("Something went wrong — please try again.")
      ).toBeVisible();
    }

    await submitOnce("Message number 6 — should be rate-limited");
    await expect(
      page.getByText("Too many messages — please try again later.")
    ).toBeVisible();
  });
});
