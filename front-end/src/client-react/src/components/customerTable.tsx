import React from "react";
import Customer from "../model/customer";
import { paginate } from "../utils/paginate";
import { MenuItem } from "./common/menus/popupMenu/popupMenu";
import Table, { Paginate } from "./common/tables/table";
import { Column } from "./common/tables/tableHeader/tableHeader";
import CustomerTableMenuItems from "./customerTableMenuItems";

interface CustomerTableProps {
  customers: Customer[];
  pagination?: Paginate<Customer>;
  onDeleteMenuItemClick: (customer: Customer) => void;
  onUpdateMenuItemClick: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onDeleteMenuItemClick,
  onUpdateMenuItemClick,
  pagination,
}) => {
  const raiseDeleteMenuItem = (customer: Customer) => {
    onDeleteMenuItemClick(customer);
  };

  const raiseUpdateMenuItem = (customer: Customer) => {
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
      sortable: false,
    },
    {
      name: "Partition Key",
      propName: "partitionKey",
      render: false,
      sortable: false,
    },
    {
      name: "First Name",
      propName: "firstName",
      render: true,
      sortable: true,
    },
    {
      name: "Last Name",
      propName: "lastName",
      render: true,
      sortable: true,
    },
    {
      name: "Email",
      propName: "email",
      render: true,
      sortable: false,
    },
    {
      name: "Postal Code (EU)",
      propName: "postalCode",
      render: true,
      sortable: true,
    },
    {
      name: "Age",
      propName: "age",
      render: true,
      sortable: true,
    },
    {
      name: "City",
      propName: "city",
      render: true,
      sortable: true,
    },
    {
      name: "",
      propName: "",
      render: true,
      element: (customer: Customer) => (
        <CustomerTableMenuItems menuItems={menuItems} customer={customer} />
      ),
      sortable: false,
    },
  ];

  return (
    <Table
      items={customers}
      columnKeys={columns.map((column) => column.propName)}
      columns={columns}
      sortColumnPropName={"firstName"}
      pagination={pagination}
    />
  );
};

export default CustomerTable;
