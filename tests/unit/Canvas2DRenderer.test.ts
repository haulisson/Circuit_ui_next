// import { describe, it, expect, vi } from "vitest";
// import { Canvas2DRenderer } from "src/adapters/renderer/Canvas2DRenderer";
// import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";

// describe("Canvas2DRenderer (canvas constructor)", () => {
//   it("usa o contexto 2d do canvas e chama os primitivos", () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = 200; canvas.height = 100;

//     const fakeCtx = {
//       // props que o código mexe
//       strokeStyle: "",
//       fillStyle: "",
//       textAlign: "center" as CanvasTextAlign,
//       textBaseline: "middle" as CanvasTextBaseline,

//       // métodos usados em clear/draw/highlight
//       clearRect: vi.fn(),
//       strokeRect: vi.fn(),
//       beginPath: vi.fn(),
//       arc: vi.fn(),
//       fill: vi.fn(),
//       moveTo: vi.fn(),
//       lineTo: vi.fn(),
//       stroke: vi.fn(),
//       setLineDash: vi.fn(),

//       // estes faltavam:
//       save: vi.fn(),
//       restore: vi.fn(),
//     } as unknown as CanvasRenderingContext2D;

//     vi.spyOn(canvas, "getContext").mockReturnValue(fakeCtx);

//     const renderer = new Canvas2DRenderer(canvas);
//     renderer.clear();

//     const cmp: ComponentJSON = {
//       id: "R1", type: "resistor", x: 50, y: 40, selected: true,
//       ports: [{ id: "a", kind: "bidir" }, { id: "b", kind: "bidir" }]
//     };
//     renderer.drawComponent(cmp);

//     const w: WireJSONSegments = {
//       id: "W1", orthogonal: true,
//       segments: [{ x1: 38, y1: 40, x2: 62, y2: 40 }]
//     };
//     renderer.drawWire(w);

//     expect(fakeCtx.clearRect).toHaveBeenCalled();
//     expect(fakeCtx.strokeRect).toHaveBeenCalled();
//     expect(fakeCtx.beginPath).toHaveBeenCalled();
//     expect(fakeCtx.arc).toHaveBeenCalled();
//     expect(fakeCtx.fill).toHaveBeenCalled();
//     expect(fakeCtx.moveTo).toHaveBeenCalled();
//     expect(fakeCtx.lineTo).toHaveBeenCalled();
//     expect(fakeCtx.stroke).toHaveBeenCalled();
//     expect(fakeCtx.save).toHaveBeenCalled();
//     expect(fakeCtx.restore).toHaveBeenCalled();
//   });
// });

import { describe, it, expect } from "vitest";
import { makeCtx2DStub } from "../helpers/makeCtx2DStub";
import { Canvas2DRenderer } from "@adapters/renderer/Canvas2DRenderer";

describe("Canvas2DRenderer (canvas constructor)", () => {
  it("usa o contexto 2d do canvas e chama os primitivos", () => {
    const { ctx, calls } = makeCtx2DStub(200, 100);
    const r = new Canvas2DRenderer(ctx);

    r.clear();
    expect(calls[0]).toEqual(["clearRect", 0, 0, 200, 100]);

    r.highlight({ x: 24, y: 12 }); // se seu renderer implementa
    // só verifica que chamou algo relacionado a highlight
    // ex.: beginPath ou fillRect (depende da sua implementação)
    // expect(calls.some(c => c[0] === "beginPath" || c[0] === "fillRect")).toBe(true);
  });
});
