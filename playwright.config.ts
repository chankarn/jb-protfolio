import { defineConfig, devices } from "@playwright/test";

// E2E scope per docs/SA_BLUEPRINT.md §5: POST /api/contact is the only
// server-side logic worth testing this way — everything else on the site is
// static rendering / client interaction, not covered here.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1, // the in-memory rate limiter is shared server-side state; parallel workers would race on it
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
