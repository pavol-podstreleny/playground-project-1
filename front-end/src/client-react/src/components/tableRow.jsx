import React from "react";
import "../css/components/tableRow.css";

export const TableRow = ({ data, columns, children }) => {
  return (
    <tr className="table-data">
      {Object.entries(data).map((item, idx) => {
        const [key, value] = item;
        if (columns[key]) {
          return <td key={idx}>{value}</td>;
        }
      })}
      {children}
    </tr>
  );
};
