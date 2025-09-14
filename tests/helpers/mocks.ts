import type { IRenderer } from "@ports/IRenderer";
import type { ISchematicStore } from "@ports/ISchematicStore";

export function makeRendererMock(): IRenderer {
  return {
    clear: () => {},
    drawComponent: () => {},
    drawWire: () => {},
    highlight: () => {}
  };
}

export function makeStoreStub(): ISchematicStore {
  let doc = { components: [], wires: [] };
  return {
    async save(d) { doc = d; },
    async load() { return doc; }
  };
}
