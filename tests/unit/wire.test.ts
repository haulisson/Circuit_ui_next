import { describe, it, expect } from "vitest";
import { SnapService } from "@/application/services/SnapService";
// import { SnapService } from "../../src/application/services/SnapService";

describe("wire/snap sanity", () => {
  it("snap mantém ortogonalidade na grade 10", () => {
    const snap = new SnapService(10);
    const p = snap.snap({ x: 23, y: 47 });
    expect(p).toEqual({ x: 20, y: 50 });
  });
});
