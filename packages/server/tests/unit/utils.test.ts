import { centsToDollars } from "../../src/utils";

describe("utils > centsToDollars", () => {
  it("should return a currency formatted string when given a number", () => {
    const cents = 1234;
    const formatted = centsToDollars(cents);
    const expected = "$12.34";

    expect(formatted).toEqual(expected);
  });
});
