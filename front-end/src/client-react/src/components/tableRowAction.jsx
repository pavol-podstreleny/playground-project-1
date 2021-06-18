import { TableRow, StyledTableData } from "./tableRow";

export const TableRowAction = ({ data, columns, children }) => {
  return (
    <TableRow data={data} columns={columns}>
      <StyledTableData>{children}</StyledTableData>
    </TableRow>
  );
};
