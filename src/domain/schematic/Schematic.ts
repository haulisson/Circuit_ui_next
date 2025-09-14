import { Wire } from "./Wire";
import type { WireId, WireSeg } from "./types";

export class Schematic {
  private wires = new Map<WireId, Wire>();
  addWire(id: WireId, firstSeg: WireSeg) {
    const w = new Wire(id, [firstSeg]);
    this.wires.set(id, w);
    return w;
  }
  getWire(id: WireId) { return this.wires.get(id) ?? null; }
}
