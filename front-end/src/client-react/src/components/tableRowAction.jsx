import { TableRow } from "./tableRow";

export const TableRowAction = ({ data, columns, children }) => {
  return (
    <TableRow data={data} columns={columns}>
      <td>{children}</td>
    </TableRow>
  );
};
