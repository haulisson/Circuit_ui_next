
00-README-brief.md           ← o “contrato” do projeto (objetivos, escopo, estilo)
01-Glossario-terminos.md     ← termos e nomes de entidades
  02-ADRs/                   ← Architecture Decision Records curtos (1 decisão/arquivo)
  03-Especificacoes/         ← PRD, casos de uso, APIs
  04-Codigo/                 ← fontes (subpastas por módulo)
  05-Notas/                  ← anotações, atas, links
  06-Resumos/                ← sumários gerados 


## Glossário:

Schematic: grafo de Components conectados por Nets/Wires.

Port: nó de conexão; cada Component expõe Ports com tipos (in/out/bidir).

ToolMode: estado atual do editor (Select/Wire/Place/Pan).

Chunk: trecho de código/arquivo alvo de análise/refatoração.


# Arquitetura recomendada (enxuta e escalável)

Estilo: Hexagonal (Ports & Adapters) + DDD leve
Camadas:

Domain (core puro TS): Schematic, Component, Port, Net, Wire, Grid, ToolMode, Selection, Constraints.

Application (serviços & comandos): CommandBus, UndoRedo, SelectionService, RoutingService, SnapService, ExporterService, ImporterService.

Adapters (bordas): UI (React), Render (Canvas/WebGL/SVG), Storage (Local/IndexedDB/Remote), Simulação (SPICE/Verilog), Import/Export (JSON, SVG, TikZ, Netlist).

## Padrões mapeados:

Command + Memento: undo/redo granular (desenho de wire, mover, deletar, etc.).

State: modos de ferramenta (Select, Pan, Wire, Place, Text).

Strategy: regras de snapping/roteamento, layout de symbols.

Observer/EventBus: eventos de edição (para UI e autosave).

Factory + Registry: catálogo de componentes (símbolos e pinos).

Flyweight: glyphs/reutilização de paths de símbolos.

Adapter: exportadores (SVG/TikZ/Netlist) e backends de simulação.

Facade: orquestra operações de alto nível (abrir/projetar/simular/exportar).

Visitor (opcional): varrer grafo p/ validação/export.


## Stack sugerida (pragmática)

Next.js (App Router) + TypeScript

Zustand (ou Redux Toolkit) para estado de UI/App

EventBus leve (RxJS opcional) para eventos do domínio

Canvas 2D puro (máximo controle) ou Konva (produtividade)

IndexedDB (local autosave/versioning) + persistência em JSON

Vitest/Jest + Playwright (testes unitários/E2E)

## Estrutura mínima de pastas
/src
  /domain
    schematic/
      Schematic.ts
      Component.ts
      Port.ts
      Net.ts
      Wire.ts
      types.ts
    rules/
      SnapStrategy.ts
      RouteStrategy.ts
    services/
      ValidationService.ts
  /app (Next.js)
    /editor
      page.tsx
      Toolbar.tsx
      Sidebar.tsx
      CanvasHost.tsx
  /application
    commands/
      ICommand.ts
      CommandBus.ts
      AddWire.ts
      MoveComponent.ts
      DeleteSelection.ts
    services/
      SelectionService.ts
      UndoRedoService.ts
      ExporterService.ts
      ImporterService.ts
  /adapters
    render/
      IRenderer.ts
      Canvas2DRenderer.ts
      HitTest.ts
    persistence/
      IndexedDBStore.ts
      FileStore.ts
    exporters/
      SvgExporter.ts
      TikzExporter.ts
      NetlistExporter.ts
    simulators/
      SpiceAdapter.ts
  /ui
    state/useEditorStore.ts
    components/
      StatusBar.tsx
      MiniMap.tsx
      LayerPanel.tsx
  /catalog
    registry.ts
    symbols/
      resistor.ts
      capacitor.ts
      ...
/docs
  ADR-000.md
  ADR-001.md
  glossary.md
  brief.md
