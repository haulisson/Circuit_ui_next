import type { IRenderer } from "@ports/IRenderer";
import type { Wire } from "@domain/schematic/Wire";

export class DrawWire {
  constructor(private renderer: IRenderer) {}
  exec(wire: Wire) {
    this.renderer.drawWire(wire.toJSON());
    return wire;
  }
}
