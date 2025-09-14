import { describe, it, expect, vi } from "vitest";
import { Wire } from "@domain/schematic/Wire";
import { createResistor } from "@domain/schematic/resistor";
import { PlaceComponent } from "@application/usecases/PlaceComponent";
import { DrawWire } from "@application/usecases/DrawWire";
import { makeRendererMock } from "./helpers/mocks";

describe("Wire + Usecases", () => {
  it("desenha dois componentes e um wire (por segmentos) via casos de uso", () => {
    const r1 = createResistor("R1", 0, 0, 1000);
    const r2 = createResistor("R2", 40, 0, 1000);

    const w = new Wire("W1", [{ x1: 10, y1: 0, x2: 40, y2: 0 }]);
    const renderer = makeRendererMock();

    const spyCmp = vi.spyOn(renderer, "drawComponent");
    const spyWire = vi.spyOn(renderer, "drawWire");

    new PlaceComponent(renderer).exec(r1);
    new PlaceComponent(renderer).exec(r2);
    new DrawWire(renderer).exec(w);

    expect(spyCmp).toHaveBeenCalledTimes(2);
    expect(spyWire).toHaveBeenCalledTimes(1);
    expect(w.toJSON().orthogonal).toBe(true);
  });
});
