import { getAllLabelNames } from "lib/linear/services/label.service";
import { describe, it, expect } from "vitest";

describe("Label Service", () => {
  it("should fetch label names", async () => {
    const labels = await getAllLabelNames();
    expect(labels.size).toBeGreaterThan(0);
  });
});
