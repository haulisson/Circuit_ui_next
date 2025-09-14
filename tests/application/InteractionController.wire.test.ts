import { describe, it, expect } from "vitest";
import { FakeInput } from "../helpers/FakeInput";
import { mkRenderer } from "../helpers/mkRenderer";

import { InteractionController } from "@application/controller/InteractionController";
import { Schematic } from "@domain/schematic/Schematic";

describe("InteractionController - fluxo de wire", () => {
  it("down -> move -> down -> Escape (snap, draw e cancel)", () => {
    const input = new FakeInput();
    const renderer = mkRenderer();
    const sch = new Schematic();
    const ctl = new InteractionController(input as any, renderer as any, sch, 4);
    ctl.init();

    // inicia em (10,10) -> snap(10,10) = (8?12?) 10/4=2.5 => round=3 => 3*4=12
    // Para início tanto faz o snap visível; importante é o estado.
    input.trigger.down({ x: 10, y: 10 });

    // move para (22,10) -> snap=(24,12)
    input.trigger.move({ x: 22, y: 10 });
    // última chamada foi highlight({24,12})
    const last = renderer.calls.at(-1);
    expect(last[0]).toBe("highlight");
    expect(last[1]).toEqual({ x: 24, y: 12 });

    // fixa segmento com novo down
    input.trigger.down({ x: 22, y: 10 });
    const draw1 = renderer.calls.filter(c => c[0] === "drawWire").length;
    expect(draw1).toBe(1);

    // cancela com ESC (não deve haver novo drawWire)
    input.trigger.key("Escape");
    const draw2 = renderer.calls.filter(c => c[0] === "drawWire").length;
    expect(draw2).toBe(1);

    // schematic sem wires após cancel
    expect(sch.getWires().length).toBe(0);

    // último highlight deve limpar (null)
    const last2 = renderer.calls.at(-1);
    expect(last2[0]).toBe("highlight");
    expect(last2[1]).toBeNull();
  });
});
