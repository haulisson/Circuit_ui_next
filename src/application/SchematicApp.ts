// src/application/SchematicApp.ts
import type { IRenderer } from "@adapters/renderer/IRenderer";
import type { IInputPort } from "@application/ports/IInputPort";
import type { ISchematicStore } from "@application/ports/ISchematicStore";
import { InteractionController } from "@application/controllers/InteractionController";
import { Schematic } from "@domain/schematic/Schematic";

export class SchematicApp {
  private readonly schematic = new Schematic();
  private readonly controller: InteractionController;

  constructor(
    private readonly input: IInputPort,           // Driver Port
    private readonly renderer: IRenderer,         // Driven Port
    private readonly store: ISchematicStore,      // Driven Port
    private readonly gridSize = 4
  ){
    this.controller = new InteractionController(
      this.input, this.renderer, this.schematic, this.gridSize
    );
  }

  init() {
    this.controller.init();
    this.renderer.clear();
    // desenhar estado inicial se existir
  }

  addComponent(type: string, at: {x:number;y:number}) {
    const c = this.schematic.addComponent(type, at.x, at.y);
    this.renderer.drawComponent(c.toJSON());
  }

  async exportNetlist(): Promise<string> {
    // Poderia consultar um Exporter específico; MVP usa store
    return await this.store.exportJSON();
  }
}
