import { test, expect } from "@playwright/test";

test("abre a rota do editor e encontra o canvas", async ({ page }) => {
  await page.goto("/editor/canvas");
  await expect(page.getByTestId("editor-canvas")).toBeVisible();
});

