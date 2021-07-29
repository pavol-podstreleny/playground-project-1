import { useState } from "react";
import { paginate } from "../../../utils/paginate";
import { sortColumns } from "../../../utils/sort";
import { TableBodyResponsive } from "./tableBody/tableBody";
import {
  Column,
  SortColumn,
  TableHeaderResponsive,
} from "./tableHeader/tableHeader";
import "./table.css";

export interface Paginate {
  pageNumber: number;
  pageSize: number;
}

export interface TableProps<T, K> {
  columns: Column<T>[];
  columnKeys: K[];
  items: T[];
  sortColumnPropName?: string;
  pagination?: Paginate;
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
  let data: T[] = sortColumns<T, K>(
    items,
    sortColumn,
    columnKeyIndex,
    columnKeys
  );
  // Paginate
  if (pagination) {
    data = paginate(data, pagination.pageNumber, pagination.pageSize);
  }
  return (
    <div className="table-overflow-scroll">
      <table className="table">
        <TableHeaderResponsive
          columns={columns}
          onSort={raiseSort}
          sortColumn={sortColumn}
        />
        <TableBodyResponsive
          items={data}
          columnKeys={columnKeys}
          columns={columns}
        />
      </table>
    </div>
  );
};

export default Table;
