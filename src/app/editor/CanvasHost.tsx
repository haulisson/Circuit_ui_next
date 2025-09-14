"use client";
import { useEffect, useRef } from "react";

export default function CanvasHost() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    const W = cvs.width, H = cvs.height;

    // fundo diferenciado
    ctx.fillStyle = "#f5f7fb";
    ctx.fillRect(0, 0, W, H);

    // grid visível
    const grid = 20;
    ctx.strokeStyle = "#d5dbe6";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= W; x += grid) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
    }
    for (let y = 0; y <= H; y += grid) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
    }
    ctx.stroke();

    // título
    ctx.fillStyle = "#222";
    ctx.font = "16px sans-serif";
    ctx.fillText("Editor Canvas – MVP", 12, 24);

    // wire de demonstração
    ctx.strokeStyle = "#3a68ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 80);
    ctx.lineTo(240, 80);
    ctx.lineTo(240, 180);
    ctx.stroke();

    // nós vermelhos
    const drawNode = (x: number, y: number) => {
      ctx.fillStyle = "#e53935";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#b71c1c";
      ctx.stroke();
    };
    drawNode(60, 80);
    drawNode(240, 180);
  }, []);

  return (
    <canvas
      data-testid="editor-canvas"
      ref={ref}
      width={800}
      height={600}
      style={{ border: "1px solid #888", background: "#fff", display: "block" }}
    />
  );
}
