import { describe, it, expect } from "vitest";
import { SnapService } from "@/application/services/SnapService";

describe("SnapService", () => {
  it("arredonda para a grade", () => {
    const snap = new SnapService(10);
    expect(snap.snap({x:14,y:26})).toEqual({x:10,y:30});
  });
});
