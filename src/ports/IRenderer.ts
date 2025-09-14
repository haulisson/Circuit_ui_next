import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";
export interface IRenderer {
  clear(): void;
  drawComponent(cmp: ComponentJSON): void;
  drawWire(w: WireJSONSegments): void;
  highlight(node: { x: number; y: number }): void;
}
