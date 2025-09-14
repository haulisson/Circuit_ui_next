// src/adapters/renderer/IRenderer.ts  (Driven Port)
export type Point = { x:number; y:number };
export interface IRenderer {
  clear(): void;
  drawComponent(component: any): void;         // usar tipos do domínio no passo seguinte
  drawWire(wire: any): void;                   // idem
  highlight(p: Point): void;                   // realce de nó/ponto snappado
  flush?(): void;                              // opcional
}

// src/application/ports/ISchematicStore.ts  (Driven Port - Persistência)
export interface ISchematicStore {
  save(data: unknown): Promise<void>;
  load(): Promise<unknown>;
  exportJSON(): Promise<string>;
}
