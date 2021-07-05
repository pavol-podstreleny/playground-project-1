import "./tableHeader.css";

export interface Column<T> {
  name: string;
  propName: string;
  render: boolean;
  element?: (data: T) => React.ReactElement;
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  onSort?: (propName: string) => void;
}

const TableHeader = <T extends object>({
  columns,
  onSort,
}: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr className="table-columns">
        {columns.map((column) => {
          if (column.render)
            return onSort ? (
              <th key={column.name} onClick={() => onSort(column.propName)}>
                {column.name}
              </th>
            ) : (
              <th key={column.name}>{column.name}</th>
            );
          return null;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
