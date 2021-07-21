import "./tableHeader.css";

export interface Column<T> {
  name: string;
  propName: string;
  render: boolean;
  sortable: boolean;
  element?: (data: T) => React.ReactElement;
}

export interface SortColumn {
  columnName: string;
  order: "asc" | "desc";
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortColumn?: SortColumn;
  onSort?: (sortedColumn: SortColumn, sortedColumnIndex: number) => void;
}

const TableHeader = <T extends object>({
  columns,
  onSort,
  sortColumn,
}: TableHeaderProps<T>) => {
  const raiseSort = (sortKey: string, columnIndex: number) => {
    if (sortColumn) {
      if (sortColumn.columnName === sortKey) {
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      } else {
        if (sortKey) sortColumn.columnName = sortKey;
        sortColumn.order = "asc";
      }
      if (onSort) onSort(sortColumn, columnIndex);
    }
  };

  const renderSortIcon = (column: Column<T>) => {
    if (!sortColumn) return null;
    if (sortColumn.columnName !== column.propName) return null;
    if (
      sortColumn.columnName === column.propName &&
      sortColumn.order === "asc"
    ) {
      return <span>&#8593;</span>;
    }
    return <span>&#8595;</span>;
  };

  const renderTableColumn = (
    onSort: boolean,
    column: Column<T>,
    sortColumn: SortColumn | undefined,
    index: number
  ) => {
    if (onSort && column.sortable && sortColumn) {
      return (
        <th
          className={
            sortColumn.columnName === column.propName
              ? "table__header-cell table__header-cell--hoverable table__header-cell--selected"
              : "table__header-cell table__header-cell--hoverable"
          }
          key={column.name}
          onClick={() => raiseSort(column.propName, index)}
        >
          {column.name}
          {renderSortIcon(column)}
        </th>
      );
    } else {
      return (
        <th className="table__header-cell" key={column.name}>
          {column.name}
        </th>
      );
    }
  };

  return (
    <thead>
      <tr className="table__header-row">
        {columns.map((column, index) => {
          if (column.render) {
            return renderTableColumn(
              onSort !== undefined,
              column,
              sortColumn,
              index
            );
          }
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
