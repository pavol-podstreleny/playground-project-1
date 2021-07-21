import { useState } from "react";
import { paginate } from "../../../utils/paginate";
import { sortColumns } from "../../../utils/sortColumn";
import { TableBody } from "./tableBody/tableBody";
import TableHeader, { Column, SortColumn } from "./tableHeader/tableHeader";
import "./table.css";

export interface Paginate<T> {
  pageNumber: number;
  pageSize: number;
}

export interface TableProps<T, K> {
  columns: Column<T>[];
  columnKeys: K[];
  items: T[];
  sortColumnPropName?: string;
  pagination?: Paginate<T>;
}

const Table = <T extends object, K extends keyof T>({
  columns,
  columnKeys,
  items,
  sortColumnPropName,
  pagination,
}: TableProps<T, K>) => {
  const [sortColumn, setSortedColumn] = useState<SortColumn>({
    columnName: sortColumnPropName || "",
    order: "asc",
  });

  const [columnKeyIndex, setColumnKeyIndex] = useState<number>(() => -1);

  const raiseSort = (sortedColumn: SortColumn, keyIndex: number) => {
    setSortedColumn({ ...sortedColumn });
    setColumnKeyIndex(keyIndex);
  };

  // Sort
  sortColumns<T, K>(items, sortColumn, columnKeyIndex, columnKeys);

  let data: T[] = items;
  // Paginate
  if (pagination) {
    data = paginate(items, pagination.pageNumber, pagination.pageSize);
  }
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={raiseSort}
        sortColumn={sortColumn}
      />
      <TableBody items={data} columnKeys={columnKeys} columns={columns} />
    </table>
  );
};

export default Table;
