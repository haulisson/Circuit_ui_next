import type { Point } from "@/domain/schematic/types";

export class SnapService {
  constructor(private grid = 10) {}
  snap(p: Point): Point {
    const round = (v: number) => Math.round(v / this.grid) * this.grid;
    return { x: round(p.x), y: round(p.y) };
  }
}
