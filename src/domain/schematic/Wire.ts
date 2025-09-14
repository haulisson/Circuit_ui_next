import type { WireId, WireSeg } from "./types";

export class Wire {
  constructor(public readonly id: WireId, private _segs: WireSeg[] = []) {}
  get segments() { return this._segs; }
  addSegment(seg: WireSeg) { this._segs = [...this._segs, seg]; }
}
