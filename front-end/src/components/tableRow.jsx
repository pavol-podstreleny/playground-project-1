import styled from "styled-components";

const StyledTableRow = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }
`;

export const StyledTableData = styled.td`
  padding: 16px 18px;
  font-size: 0.9rem;
  font-family: "Montserrat", sans-serif;
`;

export const TableRow = ({ data, columns, children }) => {
  return (
    <StyledTableRow>
      {Object.entries(data).map((item, idx) => {
        const [key, value] = item;
        if (columns[key]) {
          return <StyledTableData key={idx}>{value}</StyledTableData>;
        }
      })}
      {children}
    </StyledTableRow>
  );
};
