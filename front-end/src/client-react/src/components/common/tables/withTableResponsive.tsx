import { useContext } from "react";
import { WidthContext } from "../../../context/widthContext";
import TableBody from "./tableBody/tableBody";
import TableHeader, {
  Column,
  TableHeaderProps,
} from "./tableHeader/tableHeader";

export interface TableBodyProps<T, K> {
  items: T[];
  columnKeys: K[];
  columns: Column<T>[];
}

function createResponsiveColumns<T, K>(
  keys: K[] | undefined,
  columns: Column<T>[],
  width: number
): [Column<T>[], K[]] {
  const responsiveColumns: Column<T>[] = [];
  const columnKeys: K[] = [];
  let totalWidth = 0;

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i].responsiveColumn;
    if (column?.hasToRender) {
      while (column.maxWidth + totalWidth >= width) {
        if (responsiveColumns.length === 0) break;
        const item = responsiveColumns.pop();
        columnKeys.pop();
        totalWidth -= item?.responsiveColumn?.maxWidth || 0;
      }
      responsiveColumns.push(columns[i]);
      if (keys) columnKeys.push(keys[i]);
      totalWidth += column.maxWidth;
    } else {
      if (column?.maxWidth && column.maxWidth + totalWidth <= width) {
        responsiveColumns.push(columns[i]);
        if (keys) columnKeys.push(keys[i]);
        totalWidth += column.maxWidth;
      }
    }
  }

  return [responsiveColumns, columnKeys];
}

export function withTableResponsiveHeader(Component: typeof TableHeader) {
  const WithTableResponseBody = <T extends object>(
    props: TableHeaderProps<T>
  ) => {
    const width = useContext(WidthContext);

    const columns = createResponsiveColumns(undefined, props.columns, width)[0];

    return <Component {...props} columns={columns} />;
  };
  return WithTableResponseBody;
}

export default function withTableResponsiveBody(Component: typeof TableBody) {
  const WithTableResponseBody = <T extends object, K extends keyof T>({
    items,
    columnKeys,
    columns,
  }: TableBodyProps<T, K>) => {
    const width = useContext(WidthContext);

    const [responsiveColumns, columnKeysResponsive] = createResponsiveColumns(
      columnKeys,
      columns,
      width
    );

    return (
      <Component
        items={items}
        columnKeys={columnKeysResponsive}
        columns={responsiveColumns}
      />
    );
  };
  return WithTableResponseBody;
}
