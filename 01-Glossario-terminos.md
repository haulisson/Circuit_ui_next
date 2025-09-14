
  
- `00-README-brief.md`  ← **“contrato” do projeto** (objetivos, escopo, estilo)

- `01-Glossario-terminos.md`  ← termos e nomes de entidades

- `02-ADRs/`   ← *Architecture Decision Records* curtos (1 decisão/arquivo)

- `03-Especificacoes/`  ← PRD, casos de uso, APIs

- `04-Codigo/`  ← fontes (subpastas por módulo)

- `05-Notas/`  ← anotações, atas, links

- `06-Resumos/`  ← sumários gerados



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

```bash
circuit-sandbox-remake/
│── src/                         # Código-fonte principal
│   ├── domain/                  # Domínio (modelos centrais)
│   │   ├── schematic/           # Entidades do esquemático
│   │   │   ├── Schematic.ts
│   │   │   ├── Component.ts
│   │   │   ├── Port.ts
│   │   │   ├── Net.ts
│   │   │   ├── Wire.ts
│   │   │   └── types.ts
│   │   ├── rules/               # Estratégias e regras
│   │   │   ├── SnapStrategy.ts
│   │   │   └── RouteStrategy.ts
│   │   └── services/            # Serviços de domínio
│   │       └── ValidationService.ts
│   │
│   ├── app/                     # Aplicação (Next.js)
│   │   └── editor/              # Editor principal
│   │       ├── page.tsx
│   │       ├── Toolbar.tsx
│   │       ├── Sidebar.tsx
│   │       └── CanvasHost.tsx
│   │
│   ├── application/             # Camada de aplicação
│   │   ├── commands/            # Comandos (CQRS)
│   │   │   ├── ICommand.ts
│   │   │   ├── CommandBus.ts
│   │   │   ├── AddWire.ts
│   │   │   ├── MoveComponent.ts
│   │   │   └── DeleteSelection.ts
│   │   └── services/            # Serviços de aplicação
│   │       ├── SelectionService.ts
│   │       ├── UndoRedoService.ts
│   │       ├── ExporterService.ts
│   │       └── ImporterService.ts
│   │
│   ├── adapters/                # Adapters (integrações externas)
│   │   ├── render/              # Renderização
│   │   │   ├── IRenderer.ts
│   │   │   ├── Canvas2DRenderer.ts
│   │   │   └── HitTest.ts
│   │   ├── persistence/         # Persistência
│   │   │   ├── IndexedDBStore.ts
│   │   │   └── FileStore.ts
│   │   ├── exporters/           # Exportadores
│   │   │   ├── SvgExporter.ts
│   │   │   ├── TikzExporter.ts
│   │   │   └── NetlistExporter.ts
│   │   └── simulators/          # Simuladores
│   │       └── SpiceAdapter.ts
│   │
│   ├── ui/                      # Interface do usuário
│   │   ├── state/               # Estado (Zustand/Store)
│   │   │   └── useEditorStore.ts
│   │   └── components/          # Componentes visuais
│   │       ├── StatusBar.tsx
│   │       ├── MiniMap.tsx
│   │       └── LayerPanel.tsx
│   │
│   └── catalog/                 # Catálogo de símbolos
│       ├── registry.ts
│       └── symbols/
│           ├── resistor.ts
│           ├── capacitor.ts
│           └── ...
│
│── docs/                        # Documentação
│   ├── ADR-000.md
│   ├── ADR-001.md
│   ├── glossary.md
│   └── brief.md
│
│── tests/                       # Testes automatizados
```
