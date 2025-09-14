"use client";
import { useEffect, useRef } from "react";
import { Schematic } from "@/domain/schematic/Schematic";
import { Canvas2DRenderer } from "@/adapters/render/Canvas2DRenderer";

export default function CanvasHost() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    const render = new Canvas2DRenderer(ctx);
    const sch = new Schematic();
    const w = sch.addWire("w1", { a:{x:50,y:50}, b:{x:200,y:50} });
    w.addSegment({ a:{x:200,y:50}, b:{x:200,y:160} });
    render.clear();
    render.drawWire(w);
  }, []);
  return <canvas data-testid="editor-canvas" ref={ref} width={800} height={600} style={{border:"1px solid #888"}}/>;
}
