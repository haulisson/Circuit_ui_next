// import type { IRenderer } from "./IRenderer";
// import type { Wire } from "@/domain/schematic/Wire";

// export class Canvas2DRenderer implements IRenderer {
//   constructor(private ctx: CanvasRenderingContext2D) {}
//   clear() {
//     const { canvas } = this.ctx;
//     this.ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }
//   drawWire(wire: Wire) {
//     this.ctx.lineWidth = 2;
//     this.ctx.beginPath();
//     for (const seg of wire.segments) {
//       this.ctx.moveTo(seg.a.x, seg.a.y);
//       this.ctx.lineTo(seg.b.x, seg.b.y);
//     }
//     this.ctx.stroke();
//   }
// }
// import type { IRenderer } from "@ports/IRenderer";
// import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";

// /**
//  * Canvas2DRenderer — implementação mínima do IRenderer.
//  * Não mantém estado global; desenha sobre o ctx injetado.
//  * (Plugável conforme ADR-004/005)
//  */
// export class Canvas2DRenderer implements IRenderer {
//   constructor(private ctx: CanvasRenderingContext2D, private grid = 1) {}

//   clear(): void {
//     const { canvas } = this.ctx;
//     this.ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }

//   drawComponent(cmp: ComponentJSON): void {
//     // retângulo básico + dois nós (a/b) — MVP para validação visual
//     this.ctx.save();
//     this.ctx.beginPath();
//     this.ctx.strokeRect(cmp.x - 10, cmp.y - 6, 20, 12);
//     this.ctx.stroke();

//     // portas "a" e "b" como nós
//     const a = { x: cmp.x - 12, y: cmp.y };
//     const b = { x: cmp.x + 12, y: cmp.y };
//     [a, b].forEach(p => {
//       this.ctx.beginPath();
//       this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
//       this.ctx.fill();
//     });

//     // seleção (tracejado)
//     if (cmp.selected) {
//       this.ctx.setLineDash([4, 2]);
//       this.ctx.strokeRect(cmp.x - 12, cmp.y - 8, 24, 16);
//     }
//     this.ctx.restore();
//   }

//   drawWire(w: WireJSONSegments): void {
//     this.ctx.save();
//     this.ctx.beginPath();
//     const segs = w.segments;
//     if (segs.length) {
//       // desenha segmentos ortogonais (MVP)
//       this.ctx.moveTo(segs[0].x1, segs[0].y1);
//       for (const s of segs) {
//         this.ctx.lineTo(s.x2, s.y2);
//       }
//       this.ctx.stroke();
//     }
//     this.ctx.restore();
//   }

//   highlight(node: { x: number; y: number }): void {
//     // realce de nó simples (círculo maior)
//     this.ctx.save();
//     this.ctx.beginPath();
//     this.ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
//     this.ctx.stroke();
//     this.ctx.restore();
//   }
// }

// src/adapters/renderer/Canvas2DRenderer.ts
import type { IRenderer } from "@ports/IRenderer";
import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";

export class Canvas2DRenderer implements IRenderer {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("CanvasRenderingContext2D not available");
    this.ctx = ctx;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawComponent(cmp: ComponentJSON): void {
    const c = this.ctx;
    c.save();

    // corpo básico (resistor “caixa”) e nós “a/b”
    c.beginPath();
    c.strokeRect(cmp.x - 10, cmp.y - 6, 20, 12);

    const a = { x: cmp.x - 12, y: cmp.y };
    const b = { x: cmp.x + 12, y: cmp.y };

    c.beginPath(); c.arc(a.x, a.y, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(b.x, b.y, 2, 0, Math.PI * 2); c.fill();

    if (cmp.selected) {
      c.setLineDash?.([4, 2]);
      c.strokeRect(cmp.x - 12, cmp.y - 8, 24, 16);
    }

    c.restore();
  }

  drawWire(w: WireJSONSegments): void {
    const c = this.ctx;
    c.save();
    const segs = w.segments;
    if (segs.length) {
      c.beginPath();
      c.moveTo(segs[0].x1, segs[0].y1);
      for (const s of segs) c.lineTo(s.x2, s.y2);
      c.stroke();
    }
    c.restore();
  }

  highlight(node: { x: number; y: number }): void {
    const c = this.ctx;
    c.save();
    c.beginPath();
    c.arc(node.x, node.y, 4, 0, Math.PI * 2);
    c.stroke();
    c.restore();
  }
}

