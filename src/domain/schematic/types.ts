export type ComponentId = string;
export type PortId = string;
export type WireId = string;

export type PortKind = "in" | "out" | "bidir";
export interface PortRef { componentId: ComponentId; portId: PortId; }

export interface ComponentJSON {
  id: ComponentId;
  type: string;
  x: number; y: number;
  ports: Array<{ id: PortId; kind: PortKind }>;
  selected: boolean;
}

export type WireSeg = { x1: number; y1: number; x2: number; y2: number };

export interface WireJSONSegments {
  id: WireId;
  segments: WireSeg[];
  orthogonal: boolean; // MVP (mantemos true), evolui depois para PortRef quando integrar nets
}

