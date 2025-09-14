// src/domain/schematic/Schematic.ts
import type {ComponentJSON, SchematicJSON, WireJSON, Point, WireId } from "./types";
import { Wire } from "./Wire";

// Se você já tem Component.ts com toJSON(), use-o.
// Aqui definimos o mínimo necessário para compilar.
export interface ComponentLike {
  id: string;
  type: string;
  x: number;
  y: number;
  toJSON(): ComponentJSON;
}

export class Schematic {
  private components: ComponentLike[] = [];
  private wires: Wire[] = [];

  // --- API de componentes (MVP) ---
  addComponent(c: ComponentLike) { this.components.push(c); }
  getComponents() { return this.components.slice(); }

  // --- API de wires (helpers usados na Application) ---
  startWireAt(x: number, y: number): Wire {
    const id: WireId = `w${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const w = new Wire(id, { x, y });
    this.wires.push(w);
    return w;
  }

  extendWire(wire: Wire, from: Point, to: Point) {
    wire.extend(from, to); // garante ortogonalidade
  }

  finishWire(wire: Wire) {
    wire.finish();
  }

  cancelWire(wire: Wire) {
    // descarta segmentos (e remove o wire vazio da lista)
    wire.cancel();
    this.wires = this.wires.filter(w => w !== wire);
  }

  getWires() { return this.wires.slice(); }

  // --- Serialização ---
  toJSON(): SchematicJSON {
    const components: ComponentJSON[] = this.getComponents().map(c => c.toJSON());
    const wires: WireJSON[] = this.getWires().map(w => w.toJSON());
    return { components, wires };
  }
    // --- Compat: API legada de wires (para testes antigos) ---
  // Overloads para aceitar tanto Wire pronto quanto (id, seg)
  addWire(wire: Wire): Wire;
  addWire(id: WireId, seg: { x1:number; y1:number; x2:number; y2:number } | { a: Point; b: Point }): Wire;
  addWire(idOrWire: Wire | WireId,
          seg?: { x1:number; y1:number; x2:number; y2:number } | { a: Point; b: Point }): Wire {
    // Caso 1: já veio um Wire
    if (typeof idOrWire !== "string") {
      const w = idOrWire;
      this.wires.push(w);
      return w;
    }

    // Caso 2: (id, seg)
    const id = idOrWire as WireId;
    const isXY = (s: any): s is { x1:number; y1:number; x2:number; y2:number } =>
      s && typeof s.x1 === "number" && typeof s.y1 === "number"
        && typeof s.x2 === "number" && typeof s.y2 === "number";

    const from: Point = isXY(seg)
      ? { x: seg.x1, y: seg.y1 }
      : { x: (seg as any).a.x, y: (seg as any).a.y };

    const to: Point = isXY(seg)
      ? { x: seg.x2, y: seg.y2 }
      : { x: (seg as any).b.x, y: (seg as any).b.y };

    const w = new Wire(id, from);
    w.extend(from, to); // mantém ortogonalidade (H/V ou “L”)
    this.wires.push(w);
    return w;
  }

  getWire(id: WireId): Wire | undefined {
    return this.wires.find(w => w.id === id);
  }

}
