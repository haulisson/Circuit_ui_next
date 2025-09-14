// src/domain/schematic/types.ts
export type ComponentId = string;
export type PortId = string;
export type PortKind = "in" | "out" | "bidirectional";
export type WireId = string;

export type Point = { x: number; y: number };

export type ComponentJSON = {
  id: ComponentId;
  type: string;
  x: number;
  y: number;
  ports: Array<{ id: PortId; kind: PortKind }>;
  selected?: boolean;
};

export type WireJSON = {
  id: WireId;
  segments: Array<{ a: Point; b: Point }>;
  orthogonal: true;
};

export type SchematicJSON = {
  components: ComponentJSON[];
  wires: WireJSON[];
};
