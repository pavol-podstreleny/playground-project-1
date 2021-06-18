import { TableColumn, StyledTableHeader } from "./tableColumn";

export const TableColumnAction = ({ columns }) => {
  return (
    <TableColumn columns={columns}>
      <StyledTableHeader></StyledTableHeader>
    </TableColumn>
  );
};
