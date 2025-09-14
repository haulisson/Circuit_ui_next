import { test, expect } from "@playwright/test";

test("renderiza canvas do editor", async ({ page }) => {
  await page.goto("/editor/canvas", { waitUntil: "networkidle" });

  const canvas = page.getByTestId("editor-canvas");
  await canvas.waitFor({ state: "visible", timeout: 10_000 });

  // Sanidade: dimensões esperadas
  const box = await canvas.boundingBox();
  expect(box?.width).toBeGreaterThan(700);
  expect(box?.height).toBeGreaterThan(500);

  // Remove animações (se houver CSS futuro)
  await page.addStyleTag({ content: `
    *, *::before, *::after { transition: none !important; animation: none !important; }
  `});

  // Snapshot (na 1ª vez: rode com --update-snapshots)
  await expect(canvas).toHaveScreenshot("editor-canvas.png");
});


