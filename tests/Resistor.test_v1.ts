// tests/Resistor.test.ts
// TDD do domínio (API alvo). Implemente depois em src/domain/schematic/*

type PortKind = "in" | "out" | "bidir";

interface PortRef {
  id: string;
  kind: PortKind;
  ownerId: string; // component id
}

interface ComponentJSON {
  id: string;
  type: string;
  x: number;
  y: number;
  ports: Array<{ id: string; kind: PortKind }>;
  selected: boolean;
}

interface IComponent {
  id: string;
  type: string;
  x: number;
  y: number;
  isSelected(): boolean;
  select(): void;
  deselect(): void;
  getPorts(): PortRef[];
  toJSON(): ComponentJSON;
}

interface WireJSON {
  id: string;
  a: { componentId: string; portId: string };
  b: { componentId: string; portId: string };
  orthogonal: boolean;
}

interface IWire {
  id: string;
  connect(a: PortRef, b: PortRef): void;
  toJSON(): WireJSON;
}

// ---- Fábricas esperadas pelo domínio (implementar no src/domain/schematic) ---
function createResistor(id: string, x: number, y: number): IComponent {
  // POR ENQUANTO: stub lançando erro para guiar a implementação
  throw new Error("createResistor() not implemented");
}

function createWire(id: string): IWire {
  throw new Error("createWire() not implemented");
}
// -----------------------------------------------------------------------------

describe("Resistor domain model", () => {
  it("cria resistor com 2 portas e serializa para JSON", () => {
    const r = createResistor("R1", 10, 20);
    expect(r.id).toBe("R1");
    expect(r.type).toBe("resistor");

    const ports = r.getPorts();
    expect(ports.length).toBe(2);
    // supondo resistor com portas bidirecionais
    ports.forEach(p => expect(p.kind).toBe("bidir"));

    const json = r.toJSON();
    expect(json).toMatchObject({
      id: "R1",
      type: "resistor",
      x: 10,
      y: 20,
      selected: false
    });
    expect(json.ports).toHaveLength(2);
  });

  it("seleciona e desseleciona", () => {
    const r = createResistor("R2", 0, 0);
    expect(r.isSelected()).toBe(false);
    r.select();
    expect(r.isSelected()).toBe(true);
    r.deselect();
    expect(r.isSelected()).toBe(false);
  });
});

describe("Wire domain model", () => {
  it("conecta duas portas (R1.p0 ↔ R2.p0) e serializa", () => {
    const r1 = createResistor("R1", 0, 0);
    const r2 = createResistor("R2", 100, 0);
    const w = createWire("W1");

    const a = r1.getPorts()[0];
    const b = r2.getPorts()[0];

    w.connect(a, b);

    const json = w.toJSON();
    expect(json).toMatchObject({
      id: "W1",
      orthogonal: true,
      a: { componentId: "R1", portId: a.id },
      b: { componentId: "R2", portId: b.id }
    });
  });
});
