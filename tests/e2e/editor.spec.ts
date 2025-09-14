import { test, expect } from "@playwright/test";

test("renderiza canvas do editor", async ({ page }) => {
  await page.goto("/editor/canvas");
  const canvas = page.getByTestId("editor-canvas");
  await expect(canvas).toBeVisible();
  // screenshot básico (artefato visual)
  await expect(canvas).toHaveScreenshot("editor-canvas.png");
});
