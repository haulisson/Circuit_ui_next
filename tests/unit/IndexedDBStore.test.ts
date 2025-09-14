import { describe, it, expect } from "vitest";
import { IndexedDBStore } from "src/adapters/persistence/IndexedDBStore";

describe("IndexedDBStore (fallback memória)", () => {
  it("save e load funcionam sem IDB real", async () => {
    const store = new IndexedDBStore(true);
    const doc = {
      components: [{ id:"R1", type:"resistor", x:10, y:20, selected:false, ports:[] }],
      wires: [{ id:"W1", orthogonal:true, segments:[] }]
    };
    await store.save(doc);
    const out = await store.load();
    expect(out.components[0].id).toBe("R1");
    expect(out.wires[0].id).toBe("W1");
  });
});
