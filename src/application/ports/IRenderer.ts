// src/ports/IRenderer.ts
import type { WireJSON, Point } from "@domain/schematic/types";

export interface IRenderer {
  /** Realça um ponto “snappado”; passe null para limpar o realce */
  highlight(p: Point | null): void;

  /** Desenha/atualiza um wire (dados prontos do domínio) */
  drawWire(wire: WireJSON): void;
}
