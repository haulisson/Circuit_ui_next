// // src/domain/schematic/Wire.ts
// import type { Point, Segment, WireJSON } from "./types";

// export class Wire {
//   private segs: Segment[] = [];
//   private committed = false;

//   constructor(public readonly id: string) {}

//   begin(p: Point) {
//     if (this.segs.length === 0) {
//       // “âncora” inicial — segmento zero de comprimento opcional
//       this.segs.push({ a: { ...p }, b: { ...p } });
//     }
//   }

//   addSegment(s: Segment) {
//     if (this.committed) return;
//     if (this.segs.length === 0) this.begin(s.a);
//     this.segs.push({ a: { ...s.a }, b: { ...s.b } });
//   }

//   lastPoint(): Point {
//     if (this.segs.length === 0) return { x: 0, y: 0 };
//     return this.segs[this.segs.length - 1].b;
//   }

//   commit() { this.committed = true; }

//   toJSON(): WireJSON {
//     return {
//       id: this.id,
//       segments: this.segs.map(s => ({ a: { ...s.a }, b: { ...s.b } })),
//       orthogonal: true
//     };
//   }
// }

// src/domain/schematic/Wire.ts
export type Point = { x: number; y: number };
export type Segment = { a: Point; b: Point };

export type WireId = string;
export type WireJSON = {
  id: WireId;
  segments: Array<{ a: Point; b: Point }>;
  orthogonal: true;
};

export class Wire {
  private segs: Segment[] = [];
  private committed = false;

  constructor(public readonly id: WireId, start: Point) {
    // começa com um “ponto” (a==b); os segmentos reais entram via extend
    this.segs.push({ a: { ...start }, b: { ...start } });
  }

  /** leitura defensiva */
  get segments(): Segment[] {
    return this.segs.map(s => ({ a: { ...s.a }, b: { ...s.b } }));
  }

  /** adiciona 1 ou 2 segmentos mantendo ortogonalidade (Manhattan) */
  extend(from: Point, to: Point) {
    const last = this.segs[this.segs.length - 1].b;
    // se “from” difere do último b, alinhe
    const start = (from.x === last.x && from.y === last.y) ? from : last;

    if (start.x === to.x || start.y === to.y) {
      // já ortogonal
      this.segs.push({ a: { ...start }, b: { ...to } });
    } else {
      // “L” manhattan: horizontal depois vertical
      const mid: Point = { x: to.x, y: start.y };
      this.segs.push({ a: { ...start }, b: mid });
      this.segs.push({ a: mid, b: { ...to } });
    }
  }

  finish() { this.committed = true; }
  cancel() { this.segs = []; this.committed = false; }

  toJSON(): WireJSON {
    return {
      id: this.id,
      segments: this.segments,
      orthogonal: true
    };
  }
}
