import { expect, test } from "@playwright/test";

test("landing opens the launch room", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "MirrorRun" })).toBeVisible();
  await page.getByTestId("enter-app").click();
  await expect(page.getByRole("heading", { name: /Try-on media/ })).toBeVisible();
});

test("operator can create a session and see credential blockers", async ({ page }) => {
  await page.goto("/app");
  await page.getByTestId("start-session").click();
  await expect(page.getByText(/MR-\d{3}-/)).toBeVisible();
  await page.getByTestId("run-perfect").click();
  await expect(page.getByTestId("notice-panel")).toContainText("Perfect Corp credentials required");
  await page.getByTestId("run-agent").click();
  await expect(page.getByTestId("agent-output")).toContainText("Crusoe credentials required");
});

test("mobile shopper path can bootstrap a new session", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/m/new");
  await expect(page.getByRole("heading", { name: "Try the launch look" })).toBeVisible();
  await expect(page).toHaveURL(/\/m\/MR-/);
});
