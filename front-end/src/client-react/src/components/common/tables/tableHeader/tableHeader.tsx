import { withTableResponsiveHeader } from "../withTableResponsive";
import "./tableHeader.css";

interface ResponsiveColumn {
  maxWidth: number;
  hasToRender: boolean;
}

export interface Column<T> {
  name: string;
  propName: string;
  render: boolean;
  sortable: boolean;
  responsiveColumn: ResponsiveColumn | null;
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

  const provideClasses = (
    onSort: boolean,
    column: Column<T>,
    sortColumn: SortColumn | undefined
  ): string => {
    const classes = ["table__header-cell"];
    if (onSort && sortColumn && column.sortable) {
      classes.push("table__header-cell--hoverable");
    }
    if (sortColumn?.columnName === column.propName) {
      classes.push("table__header-cell--selected");
    }
    return classes.join(" ");
  };

  const renderTableColumn = (
    onSort: boolean,
    column: Column<T>,
    sortColumn: SortColumn | undefined,
    index: number
  ) => {
    if (column.sortable) {
      return (
        <th
          className={provideClasses(onSort, column, sortColumn)}
          key={column.name}
          onClick={() => raiseSort(column.propName, index)}
        >
          {column.name}
          {renderSortIcon(column)}
        </th>
      );
    } else {
      return (
        <th
          className={provideClasses(onSort, column, sortColumn)}
          key={column.name}
        >
          {column.name}
          {renderSortIcon(column)}
        </th>
      );
    }
  };

  return (
    <thead className="table__head">
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
          return null;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
export const TableHeaderResponsive = withTableResponsiveHeader(TableHeader);
