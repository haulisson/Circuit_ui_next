import type { ComponentId, ComponentJSON, PortId, PortKind } from "./types";

export class Component {
  private _selected = false;
  constructor(
    public readonly id: ComponentId,
    public readonly type: string,
    public x: number,
    public y: number,
    private _ports: Array<{ id: PortId; kind: PortKind }>
  ) {}

  get ports() { return this._ports; }
  isSelected() { return this._selected; }
  select() { this._selected = true; }
  deselect() { this._selected = false; }

  toJSON(): ComponentJSON {
    return {
      id: this.id, type: this.type, x: this.x, y: this.y,
      ports: this._ports.map(p => ({...p})), selected: this._selected
    };
  }
}
