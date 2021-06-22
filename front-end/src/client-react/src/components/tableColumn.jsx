import React from "react";
import "../css/components/tableColumn.css";

export const TableColumn = ({ columns, children }) => {
  return (
    <tr className="table-columns">
      {columns.map((item, itemIdx) => {
        return <th key={itemIdx}>{item}</th>;
      })}
      {children}
    </tr>
  );
};
