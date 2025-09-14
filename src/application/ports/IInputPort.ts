// src/application/ports/IInputPort.ts  (Driver Port)
export type Pointer = { 
  x: number; 
  y: number; 
  button?: 0|1|2;
  alt?: boolean;
  ctrl?: boolean; 
  shift?: boolean; 
};
export interface IInputPort {
  onPointerMove(cb: (p: Pointer) => void): void;
  onPointerDown(cb: (p: Pointer) => void): void;
  onPointerUp(cb: (p: Pointer) => void): void;
  onKeyDown(cb: (key: string) => void): void; // "Escape", "Delete", etc.
}

