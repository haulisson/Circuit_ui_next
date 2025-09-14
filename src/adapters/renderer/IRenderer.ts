import type { Wire } from "@/domain/schematic/Wire";
export interface IRenderer {
  drawWire(w: Wire): void;
  clear(): void;
}
