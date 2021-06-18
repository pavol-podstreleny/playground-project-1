import styled from "styled-components";

export const StyledTableHeader = styled.th`
  color: rgba(0, 0, 0, 0.55);
  font-size: 0.75rem;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  padding: 8px 18px;
`;

export const TableColumn = ({ columns, children }) => {
  return (
    <tr>
      {columns.map((item, itemIdx) => {
        return <StyledTableHeader key={itemIdx}>{item}</StyledTableHeader>;
      })}
      {children}
    </tr>
  );
};
