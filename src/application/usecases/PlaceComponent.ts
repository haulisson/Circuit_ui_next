import type { IRenderer } from "@ports/IRenderer";
import type { Component } from "@domain/schematic/Component";

export class PlaceComponent {
  constructor(private renderer: IRenderer) {}
  exec(cmp: Component) {
    this.renderer.drawComponent(cmp.toJSON());
    return cmp;
  }
}
