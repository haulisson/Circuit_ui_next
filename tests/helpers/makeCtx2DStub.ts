import { vi } from "vitest";

export function makeCtx2DStub(width = 200, height = 100) {
  const calls: any[] = [];
  const ctx = {
    canvas: { width, height },
    // básicos usados pelo renderer
    clearRect: vi.fn((...args) => calls.push(["clearRect", ...args])),
    save: vi.fn(() => calls.push(["save"])),
    restore: vi.fn(() => calls.push(["restore"])),
    beginPath: vi.fn(() => calls.push(["beginPath"])),
    moveTo: vi.fn((...args) => calls.push(["moveTo", ...args])),
    lineTo: vi.fn((...args) => calls.push(["lineTo", ...args])),
    stroke: vi.fn(() => calls.push(["stroke"])),
    fillRect: vi.fn((...args) => calls.push(["fillRect", ...args])),
    arc: vi.fn((...args) => calls.push(["arc", ...args])),
    // propriedades “soltas” que alguns renders setam
    lineWidth: 1,
    strokeStyle: "#000",
    fillStyle: "#000",
  } as unknown as CanvasRenderingContext2D;

  return { ctx, calls };
}
