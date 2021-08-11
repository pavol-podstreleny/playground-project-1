import { paginate } from "../../utils/paginate";

describe("pagination", () => {
  test("first page with 5 item size", () => {
    const items = [{}, {}, {}, {}, {}, {}];
    const expected = 5;
    const result = paginate(items, 1, 5);
    expect(result.length).toBe(expected);
  });

  test("second page with 1 remaining item with item size 3", () => {
    const items = [{}, {}, {}, {}];
    const expected = 1;
    const result = paginate(items, 2, 3);
    expect(result.length).toBe(expected);
  });

  test("no items page with 1 and item size 3", () => {
    const items: any[] = [];
    const expected = items.length;
    const result = paginate(items, 1, 5);
    expect(result.length).toBe(expected);
  });

  test("last page with 1 item size", () => {
    const items = [10, 2342, 3221];
    const expected = items[2];
    const result = paginate(items, 3, 1);
    expect(result).toEqual([expected]);
  });
  test("second page with 2 item size", () => {
    const items = [
      {
        name: "Palo",
      },
      {
        name: "Fero",
      },
      {
        name: "Alojz",
      },
      {
        name: "Jura",
      },
    ];
    const expected = [items[2], items[3]];
    const result = paginate(items, 2, 2);
    expect(result).toEqual(expected);
  });

  test("zero page with 2 items size", () => {
    const items: any[] = [{}, {}];
    const expected = items.length;
    const result = paginate(items, 0, 2);
    expect(result.length).toBe(expected);
  });
});
