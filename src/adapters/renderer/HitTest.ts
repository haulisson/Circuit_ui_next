import type { Point } from "@/domain/schematic/types";
export function distToSegment(p: Point, a: Point, b: Point) {
  // distância ponto-segmento (para seleção): versão simples
  const vx=b.x-a.x, vy=b.y-a.y;
  const wx=p.x-a.x, wy=p.y-a.y;
  const c1 = vx*wx + vy*wy;
  const c2 = vx*vx + vy*vy || 1;
  const t = Math.max(0, Math.min(1, c1/c2));
  const proj = { x: a.x + t*vx, y: a.y + t*vy };
  const dx=p.x-proj.x, dy=p.y-proj.y;
  return Math.hypot(dx, dy);
}
