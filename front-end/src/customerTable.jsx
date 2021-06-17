import React, { useEffect, useState } from "react";
import getFakeCustomers from "./services/fakeCustomerApi";
import { TableRowAction } from "./components/tableRowAction";
import { TableColumnAction } from "./components/tableColumnAction";
import styled from "styled-components";
import { Card } from "./components/card";

const StyledTable = styled.table`
  box-sizing: border-box;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(getFakeCustomers());
  }, []);

  // Filter columns and returns object in format
  // {columnName: true | false} where true means
  // that columWill be included in final table
  const filterColumns = (columns, noInclude) => {
    const filteredColumns = {};
    Object.keys(columns).forEach((key) => {
      filteredColumns[key] = !(key in noInclude);
    });
    return filteredColumns;
  };

  if (customers.length === 0) {
    return null;
  }

  const filteredColumns = { PartitionKey: false, RowKey: false };
  const finalColumns = filterColumns(customers[0], filteredColumns);
  const displayColumns = Object.entries(finalColumns)
    .filter((entry) => {
      const [key, value] = entry;
      return value;
    })
    .map((entry) => {
      return entry[0];
    });

  return (
    <StyledTable>
      <thead>
        <TableColumnAction columns={displayColumns} />
      </thead>
      <tbody>
        {customers.map((customer) => {
          return (
            <TableRowAction
              data={customer}
              columns={finalColumns}
              key={customer.RowKey + customer.PartitionKey}
            ></TableRowAction>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
