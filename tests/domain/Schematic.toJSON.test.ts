import { describe, it, expect } from "vitest";
import { Schematic } from "@domain/schematic/Schematic";

describe("Schematic.toJSON", () => {
  it("serializa wires com segments e orthogonal=true", () => {
    const sch = new Schematic();
    const w = sch.startWireAt(10, 10);
    sch.extendWire(w, { x: 10, y: 10 }, { x: 22, y: 10 }); // controller faria snap antes
    sch.finishWire(w);

    const json = sch.toJSON();
    expect(json.wires.length).toBe(1);
    expect(json.wires[0].segments.length).toBeGreaterThan(0);
    expect(json.wires[0].orthogonal).toBe(true);
  });
});
