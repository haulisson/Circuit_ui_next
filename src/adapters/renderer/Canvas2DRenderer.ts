// // src/adapters/renderer/Canvas2DRenderer.ts
// import type { IRenderer } from "@ports/IRenderer";
// import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";

// export class Canvas2DRenderer implements IRenderer {
//   private readonly ctx: CanvasRenderingContext2D;

//   constructor(private readonly canvas: HTMLCanvasElement) {
//     const ctx = canvas.getContext("2d");
//     if (!ctx) throw new Error("CanvasRenderingContext2D not available");
//     this.ctx = ctx;
//   }

//   clear(): void {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   drawComponent(cmp: ComponentJSON): void {
//     const c = this.ctx;
//     c.save();

//     // corpo básico (resistor “caixa”) e nós “a/b”
//     c.beginPath();
//     c.strokeRect(cmp.x - 10, cmp.y - 6, 20, 12);

//     const a = { x: cmp.x - 12, y: cmp.y };
//     const b = { x: cmp.x + 12, y: cmp.y };

//     c.beginPath(); c.arc(a.x, a.y, 2, 0, Math.PI * 2); c.fill();
//     c.beginPath(); c.arc(b.x, b.y, 2, 0, Math.PI * 2); c.fill();

//     if (cmp.selected) {
//       c.setLineDash?.([4, 2]);
//       c.strokeRect(cmp.x - 12, cmp.y - 8, 24, 16);
//     }

//     c.restore();
//   }

//   drawWire(w: WireJSONSegments): void {
//     const c = this.ctx;
//     c.save();
//     const segs = w.segments;
//     if (segs.length) {
//       c.beginPath();
//       c.moveTo(segs[0].x1, segs[0].y1);
//       for (const s of segs) c.lineTo(s.x2, s.y2);
//       c.stroke();
//     }
//     c.restore();
//   }

//   highlight(node: { x: number; y: number }): void {
//     const c = this.ctx;
//     c.save();
//     c.beginPath();
//     c.arc(node.x, node.y, 4, 0, Math.PI * 2);
//     c.stroke();
//     c.restore();
//   }
// }

import type { IRenderer, Point } from "./IRenderer";

export class Canvas2DRenderer implements IRenderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  clear(): void { this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height); }

  drawComponent(component: any): void {
    // MVP: desenhar bounding box/símbolo simples
  }

  drawWire(wire: any): void {
    // MVP: percorrer segmentos e traçar linhas
  }

  highlight(p: Point): void {
    // MVP: desenhar pequeno quadrado/círculo sem alterar estado do domínio
  }
}