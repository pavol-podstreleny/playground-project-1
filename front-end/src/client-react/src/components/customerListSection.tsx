import React, { useEffect, useState } from "react";
import Customer from "../model/customer";
import { getFakeCustomers } from "../services/fakeCustomerApi";
import { paginate } from "../utils/paginate";
import Card from "./common/cards/card";
import PageSizeSelector from "./common/pagination/pageSizeSelector";
import Pagination from "./common/pagination/pagination";
import CustomerDialogAdd from "./customerDialogAdd";
import CustomerDialogDelete from "./customerDialogDelete";
import CustomerDialogEdit from "./customerDialogEdit";
import CustomerTable from "./customerTable";

interface CustomerDialogs {
  addDialog: boolean;
  editDialog: boolean;
  deleteDialog: boolean;
}

export const CustomerListSection = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerDialogs, setCustomerDialogsVisibility] =
    useState<CustomerDialogs>({
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
    });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setCustomers(getFakeCustomers());
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPage(1);
    setPageSize(pageSize);
  };

  const handleDeleteMenuItemClick = (customer: Customer) => {
    setCustomerDialogsVisibility({
      deleteDialog: true,
      editDialog: false,
      addDialog: false,
    });
    setSelectedCustomer(customer);
  };

  const handleEditMenuItemClick = (customer: Customer) => {
    setCustomerDialogsVisibility({
      deleteDialog: false,
      editDialog: true,
      addDialog: false,
    });
    setSelectedCustomer({ ...customer });
  };

  const handleAddCustomerButtonClick = () => {
    setCustomerDialogsVisibility({
      deleteDialog: false,
      editDialog: false,
      addDialog: true,
    });
  };

  const handleDialogCancel = () => {
    setCustomerDialogsVisibility({
      deleteDialog: false,
      editDialog: false,
      addDialog: false,
    });
  };

  const handleDeleteCustomer = (customer: Customer): void => {
    customerDialogs.deleteDialog = false;
    setCustomerDialogsVisibility({ ...customerDialogs });
  };

  const handleEditCustomer = (customer: Customer): void => {
    customerDialogs.editDialog = false;
    setCustomerDialogsVisibility({ ...customerDialogs });
  };

  const handleAddCustomer = (customer: Customer): void => {
    customerDialogs.addDialog = false;
    setCustomerDialogsVisibility({ ...customerDialogs });
  };

  const paginatedCustomers = paginate(customers, currentPage, pageSize);
  return (
    <React.Fragment>
      <section className="customer-list">
        <div className="center">
          <button
            className="button button-primary"
            onClick={handleAddCustomerButtonClick}
          >
            Add Customer
          </button>
          <Card>
            <h1>Customers</h1>
            <CustomerTable
              customers={paginatedCustomers}
              onDeleteMenuItemClick={handleDeleteMenuItemClick}
              onUpdateMenuItemClick={handleEditMenuItemClick}
            />
          </Card>
        </div>
        <Pagination
          itemsCount={customers.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <PageSizeSelector
          actualPageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          pageOptions={[1, 2, 5, 10, 25, 50, 100]}
        />
      </section>
      {selectedCustomer && (
        <CustomerDialogDelete
          onDialogCancel={handleDialogCancel}
          onDialogDelete={handleDeleteCustomer}
          customer={selectedCustomer}
          visible={customerDialogs.deleteDialog}
        />
      )}
      {selectedCustomer && (
        <CustomerDialogEdit
          customer={selectedCustomer}
          onDialogSubmit={handleEditCustomer}
          onDialogCancel={handleDialogCancel}
          visible={customerDialogs.editDialog}
        />
      )}
      <CustomerDialogAdd
        onDialogCancel={handleDialogCancel}
        onDialogSubmit={handleAddCustomer}
        visible={customerDialogs.addDialog}
      />
    </React.Fragment>
  );
};
