
// src/application/controllers/InteractionController.ts
import type { IRenderer } from "@adapters/renderer/IRenderer";
import type { IInputPort , Pointer} from "@application/ports/IInputPort";
import type { Wire } from "@domain/schematic/Wire";
import type { Schematic } from "@domain/schematic/Schematic";

type State = 
  | { kind: "Idle" }
  | { kind: "WireDrawing"; wire: Wire; last: {x:number;y:number} };

export class InteractionController {
  private state: State = { kind: "Idle" };
  constructor(
    private readonly input: IInputPort,
    private readonly renderer: IRenderer,
    private readonly schematic: Schematic,
    private readonly gridSize = 4
  ) {}

  init() {
    this.input.onPointerMove(p => this.handleMove(p));
    this.input.onPointerDown(p => this.handleDown(p));
    this.input.onPointerUp(p => this.handleUp(p));
    this.input.onKeyDown(k => this.handleKey(k));
  }

  private snap(x:number,y:number){ 
    const gx = Math.round(x/this.gridSize)*this.gridSize;
    const gy = Math.round(y/this.gridSize)*this.gridSize;
    return {x:gx,y:gy};
  }

  private handleMove(p: Pointer) {
    if (this.state.kind === "WireDrawing") {
      const s = this.snap(p.x,p.y);
      this.renderer.highlight(s);
    }
  }

  private handleDown(p: Pointer) {
    const s = this.snap(p.x,p.y);
    if (this.state.kind === "Idle") {
      // MVP: iniciar wire sempre que clicar num ponto da grade (filtro de nó pode vir depois)
      const w = this.schematic.startWireAt(s.x, s.y); // helper a implementar no Schematic
      this.state = { kind: "WireDrawing", wire: w, last: s };
    } else if (this.state.kind === "WireDrawing") {
      // adiciona segmento ortogonal do last -> s
      this.schematic.extendWire(this.state.wire, this.state.last, s); // mantém ortogonalidade
      this.state.last = s;
      this.renderer.drawWire(this.state.wire.toJSON());
    }
  }

  private handleUp(_p: Pointer) {
    if (this.state.kind === "WireDrawing") {
      // MVP: finalizar wire no mouse up
      this.schematic.finishWire(this.state.wire);
      this.renderer.drawWire(this.state.wire.toJSON());
      this.state = { kind: "Idle" };
    }
  }

  private handleKey(key: string) {
    if (key === "Escape" && this.state.kind === "WireDrawing") {
      this.schematic.cancelWire(this.state.wire); // descarta segmentos temporários
      this.state = { kind: "Idle" };
    }
  }
}
