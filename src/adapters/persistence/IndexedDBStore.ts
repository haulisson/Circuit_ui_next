import type { ISchematicStore } from "@ports/ISchematicStore";
import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";

/**
 * IndexedDBStore — implementação mínima.
 * - Usa IDB se disponível; senão, cai para memória.
 * - Chave única "schematic" (poderemos versionar futuramente).
 */
export class IndexedDBStore implements ISchematicStore {
  private mem: { components: ComponentJSON[]; wires: WireJSONSegments[] } = { components: [], wires: [] };
  private dbPromise: Promise<IDBDatabase> | null = null;
  private readonly dbName = "circuit-sandbox";
  private readonly storeName = "schematics";
  private readonly key = "main";

  constructor(private useMemoryFallback = true) {}

  private hasIDB(): boolean {
    return typeof indexedDB !== "undefined" && !!indexedDB;
  }

  private openDB(): Promise<IDBDatabase> {
    if (!this.hasIDB()) {
      if (!this.useMemoryFallback) throw new Error("IndexedDB indisponível e fallback desativado");
      // fallback em memória
      return Promise.reject(new Error("NO_IDB"));
    }
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return this.dbPromise;
  }

  async save(doc: { components: ComponentJSON[]; wires: WireJSONSegments[] }): Promise<void> {
    try {
      const db = await this.openDB();
      const tx = db.transaction(this.storeName, "readwrite");
      const os = tx.objectStore(this.storeName);
      os.put(doc, this.key);
      await new Promise<void>((res, rej) => {
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
        tx.onabort = () => rej(tx.error);
      });
    } catch {
      // fallback memória
      this.mem = doc;
    }
  }

  async load(): Promise<{ components: ComponentJSON[]; wires: WireJSONSegments[] }> {
    try {
      const db = await this.openDB();
      const tx = db.transaction(this.storeName, "readonly");
      const os = tx.objectStore(this.storeName);
      const value: unknown = await new Promise((res, rej) => {
        const r = os.get(this.key);
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      return (value as any) ?? { components: [], wires: [] };
    } catch {
      return this.mem;
    }
  }
}
