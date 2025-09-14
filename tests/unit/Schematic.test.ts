import { describe, it, expect } from "vitest";
import { Schematic } from "@domain/schematic/Schematic";
import type { WireSeg, WireId } from "@domain/schematic/types";

describe("Schematic (mínimo)", () => {
  it("adiciona e obtém wire", () => {
    const sch = new Schematic();
    const seg: WireSeg = { x1: 0, y1: 0, x2: 10, y2: 0 };
    const w = sch.addWire("W1" as WireId, seg);
    expect(sch.getWire("W1")).toBe(w);
  });
});
