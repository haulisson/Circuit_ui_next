import { describe, it, expect } from "vitest";
import { createResistor } from "@domain/schematic/resistor";

describe("Resistor (domain)", () => {
  it("cria com portas a/b e serializa JSON", () => {
    const r = createResistor("R1", 10, 20, 1000);
    expect(r.type).toBe("resistor");
    const j = r.toJSON();
    expect(j.id).toBe("R1");
    expect(j.ports.map(p => p.id)).toEqual(["a","b"]);
    expect(j.selected).toBe(false);
  });

  it("seleciona e desseleciona", () => {
    const r = createResistor("R2", 0, 0, 220);
    r.select();
    expect(r.isSelected()).toBe(true);
    r.deselect();
    expect(r.isSelected()).toBe(false);
  });
});
