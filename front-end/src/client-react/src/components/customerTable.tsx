import React from "react";
import Customer from "../model/customer";
import { MenuItem } from "./common/menus/popupMenu/popupMenu";
import Table from "./common/tables/table";
import { Column } from "./common/tables/tableHeader/tableHeader";
import CustomerTableMenuItems from "./customerTableMenuItems";

interface CustomerTableProps {
  customers: Customer[];
  onDeleteMenuItemClick: (customer: Customer) => void;
  onUpdateMenuItemClick: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onDeleteMenuItemClick,
  onUpdateMenuItemClick,
}) => {
  const raiseDeleteMenuItem = (customer: Customer) => {
    onDeleteMenuItemClick(customer);
  };

  const raiseUpdateMenuItem = (customer: Customer) => {
    console.log("clicked");
    onUpdateMenuItemClick(customer);
  };

  const menuItems: MenuItem<Customer>[] = [
    {
      name: "Delete",
      handler: raiseDeleteMenuItem,
    },
    {
      name: "Update",
      handler: raiseUpdateMenuItem,
    },
  ];
  const columns: Column<Customer>[] = [
    {
      name: "Row Key",
      propName: "rowKey",
      render: false,
    },
    {
      name: "Partition Key",
      propName: "partitionKey",
      render: false,
    },
    {
      name: "First Name",
      propName: "firstName",
      render: true,
    },
    {
      name: "Last Name",
      propName: "lastName",
      render: true,
    },
    {
      name: "Email",
      propName: "email",
      render: true,
    },
    {
      name: "Postal Code (EU)",
      propName: "postalCode",
      render: true,
    },
    {
      name: "Age",
      propName: "age",
      render: true,
    },
    {
      name: "City",
      propName: "city",
      render: true,
    },
    {
      name: "",
      propName: "",
      render: true,
      element: (customer: Customer) => (
        <CustomerTableMenuItems menuItems={menuItems} customer={customer} />
      ),
    },
  ];

  return (
    <Table
      items={customers}
      columnKeys={columns.map((column) => column.propName)}
      columns={columns}
    />
  );
};

export default CustomerTable;
