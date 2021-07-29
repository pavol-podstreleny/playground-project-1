import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Customer from "../../model/customer";
import {
  customerDeleteDialogShowed,
  customerDetailDialogShowed,
  customerEditDialogShowed,
  customerSelected,
} from "../../store/customers";
import withPixelWidth from "../common/hoc/withPixelWidth";
import { MenuItem } from "../common/menus/popupMenu/popupMenu";
import Table, { Paginate } from "../common/tables/table";
import { Column } from "../common/tables/tableHeader/tableHeader";
import CustomerTableMenuItems from "../customerTableMenuItems";

interface CustomerTableProps {
  customers: Customer[];
  pagination?: Paginate;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  pagination,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteCustomerClick = (customer: Customer) => {
    dispatch(customerSelected(customer));
    dispatch(customerDeleteDialogShowed());
  };

  const handleDetailsCustomerClick = (customer: Customer) => {
    dispatch(customerSelected(customer));
    dispatch(customerDetailDialogShowed());
  };

  const handleEditCustomerClick = (customer: Customer) => {
    dispatch(customerSelected(customer));
    dispatch(customerEditDialogShowed());
  };

  const menuItems: MenuItem<Customer>[] = [
    {
      name: "Details",
      handler: handleDetailsCustomerClick,
    },
    {
      name: "Delete",
      handler: handleDeleteCustomerClick,
    },
    {
      name: "Update",
      handler: handleEditCustomerClick,
    },
  ];
  const columns: Column<Customer>[] = [
    {
      name: "Row Key",
      propName: "rowKey",
      render: false,
      sortable: false,
      responsiveColumn: null,
    },
    {
      name: "Partition Key",
      propName: "partitionKey",
      render: false,
      sortable: false,
      responsiveColumn: null,
    },
    {
      name: "First Name",
      propName: "firstName",
      render: true,
      sortable: true,
      responsiveColumn: {
        hasToRender: false,
        maxWidth: 130,
      },
    },
    {
      name: "Last Name",
      propName: "lastName",
      render: true,
      sortable: true,
      responsiveColumn: {
        hasToRender: false,
        maxWidth: 130,
      },
    },
    {
      name: "Email",
      propName: "email",
      render: true,
      sortable: false,
      responsiveColumn: {
        hasToRender: false,
        maxWidth: 130,
      },
    },
    {
      name: "Postal Code (EU)",
      propName: "postalCode",
      render: true,
      sortable: true,
      responsiveColumn: {
        hasToRender: false,
        maxWidth: 130,
      },
    },
    {
      name: "Age",
      propName: "age",
      render: true,
      sortable: true,
      responsiveColumn: {
        hasToRender: false,
        maxWidth: 130,
      },
    },
    {
      name: "City",
      propName: "city",
      render: true,
      sortable: true,
      responsiveColumn: {
        hasToRender: false,
        maxWidth: 130,
      },
    },
    {
      name: "",
      propName: "",
      render: true,
      element: (customer: Customer) => (
        <CustomerTableMenuItems menuItems={menuItems} customer={customer} />
      ),
      sortable: false,
      responsiveColumn: {
        hasToRender: true,
        maxWidth: 50,
      },
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

export default withPixelWidth(CustomerTable);
