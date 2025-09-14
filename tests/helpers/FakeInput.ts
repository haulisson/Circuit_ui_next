import type { IInputPort, Pointer } from "@application/ports/IInputPort";

export class FakeInput implements IInputPort {
  private m?: (p: Pointer) => void;
  private d?: (p: Pointer) => void;
  private u?: (p: Pointer) => void;
  private k?: (k: string) => void;

  onPointerMove(cb: (p: Pointer) => void): void { this.m = cb; }
  onPointerDown(cb: (p: Pointer) => void): void { this.d = cb; }
  onPointerUp(cb: (p: Pointer) => void): void { this.u = cb; }
  onKeyDown(cb: (key: string) => void): void { this.k = cb; }

  trigger = {
    move: (p: Pointer) => this.m?.(p),
    down: (p: Pointer) => this.d?.(p),
    up:   (p: Pointer) => this.u?.(p),
    key:  (k: string)  => this.k?.(k)
  };
}
