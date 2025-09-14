export const mkRenderer = () => {
  const calls: any[] = [];
  return {
    calls,
    highlight: (p: {x:number;y:number} | null) => calls.push(["highlight", p]),
    drawWire:  (w: any) => calls.push(["drawWire", w]),
    clear:     () => calls.push(["clear"])
  };
};
