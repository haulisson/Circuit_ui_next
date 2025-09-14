import type { WireId, WireSeg, WireJSONSegments } from "./types";

export class Wire {
  constructor(
    public readonly id: WireId,
    private _segs: WireSeg[] = []
  ) {}

  get segments() { return this._segs; }
  addSegment(seg: WireSeg) { this._segs = [...this._segs, seg]; }

  toJSON(): WireJSONSegments {
    return { id: this.id, segments: this._segs.map(s => ({...s})), orthogonal: true };
  }
}
