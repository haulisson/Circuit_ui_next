import type { ComponentJSON, WireJSONSegments } from "@domain/schematic/types";
export interface ISchematicStore {
  save(doc: { components: ComponentJSON[]; wires: WireJSONSegments[] }): Promise<void>;
  load(): Promise<{ components: ComponentJSON[]; wires: WireJSONSegments[] }>;
}
