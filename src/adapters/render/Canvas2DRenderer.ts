import type { IRenderer } from "./IRenderer";
import type { Wire } from "@/domain/schematic/Wire";

export class Canvas2DRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}
  clear() {
    const { canvas } = this.ctx;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  drawWire(wire: Wire) {
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    for (const seg of wire.segments) {
      this.ctx.moveTo(seg.a.x, seg.a.y);
      this.ctx.lineTo(seg.b.x, seg.b.y);
    }
    this.ctx.stroke();
  }
}
