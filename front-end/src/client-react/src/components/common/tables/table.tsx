import { TableBody, TableBodyProps } from "./tableBody/tableBody";
import TableHeader, { TableHeaderProps } from "./tableHeader/tableHeader";

export interface TableProps<T, K>
  extends TableHeaderProps<T>,
    TableBodyProps<T, K> {}

const Table = <T extends object, K extends keyof T>({
  columns,
  onSort,
  columnKeys,
  items,
}: TableProps<T, K>) => {
  return (
    <table>
      <TableHeader columns={columns} onSort={onSort} />
      <TableBody items={items} columnKeys={columnKeys} columns={columns} />
    </table>
  );
};

export default Table;
