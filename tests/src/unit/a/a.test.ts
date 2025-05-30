import { sum } from "./a.js";

describe("test test", () => {
  const res = sum(1, 2);

  it("should return 3", () => {
    expect(res).toBe(3);
  });
});
