import { Column } from "../tableHeader/tableHeader";
import "./tableBody.css";

export interface TableBodyProps<T, K> {
  items: T[];
  columnKeys: K[];
  columns: Column<T>[];
}

export const TableBody = <T extends object, K extends keyof T>({
  items,
  columns,
  columnKeys,
}: TableBodyProps<T, K>) => {
  const renderInnerElement = (item: T, column: Column<T>) => {
    if (column.element) {
      return column.element(item);
    }
  };

  return (
    <tbody>
      {items.map((item, index) => {
        return (
          <tr className="table__body-row" key={index}>
            {columns.map((column, index) => {
              if (column.render) {
                return (
                  <td className="table__body-data" key={column.name}>
                    {item[columnKeys[index]]}
                    {renderInnerElement(item, column)}
                  </td>
                );
              }
              return null;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
