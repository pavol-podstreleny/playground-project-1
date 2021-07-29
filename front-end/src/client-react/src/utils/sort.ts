import { SortColumn } from "../components/common/tables/tableHeader/tableHeader";

export const sortColumns = <T, K extends keyof T>(
  items: T[],
  sortColumn: SortColumn,
  selectedColumnKeyIndex: number,
  columnKeys: K[]
): T[] => {
  if (
    sortColumn.columnName !== "" &&
    selectedColumnKeyIndex !== -1 &&
    selectedColumnKeyIndex < columnKeys.length
  ) {
    if (columnKeys[selectedColumnKeyIndex]) {
      const key: K = columnKeys[selectedColumnKeyIndex];
      const itemsCopy = [...items];
      itemsCopy.sort((a, b) => {
        if (a && b && a !== null && b !== null) {
          if (typeof a[key] === "number") {
            const result =
              (a[key] as unknown as number) - (b[key] as unknown as number);
            return result;
          } else if (typeof a[key] === "string") {
            const result = (a[key] as unknown as string).localeCompare(
              b[key] as unknown as string
            );
            return result;
          } else {
            console.warn(
              "Sorting allowed only for no nullable numbers and strings"
            );
          }
        }
        return 0;
      });
      if (sortColumn.order === "desc") {
        return itemsCopy.reverse();
      }
      return itemsCopy;
    }
  }
  return items;
};
