import { Component } from "./Component";
import type { ComponentId, PortKind } from "./types";

// Mantemos a fábrica no domínio (regras/portas); símbolo visual fica no catalog (posterior).
export function createResistor(id: ComponentId, x: number, y: number, ohms: number) {
  const ports: Array<{ id: string; kind: PortKind }> = [
    { id: "a", kind: "bidir" },
    { id: "b", kind: "bidir" }
  ];
  const cmp = new Component(id, "resistor", x, y, ports);
  // (Futuro) anexar metadata R via attrs/props; domínio mantém forma canônica.
  return cmp;
}
