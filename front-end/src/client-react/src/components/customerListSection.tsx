import React, { useEffect, useState } from "react";
import Customer from "../model/customer";
import Card from "./common/cards/card";
import PageSizeSelector from "./common/pagination/pageSizeSelector";
import Pagination from "./common/pagination/pagination";
import CustomerDialogAdd from "./customerDialogAdd";
import CustomerDialogDelete from "./customerDialogDelete";
import CustomerDialogEdit from "./customerDialogEdit";
import CustomerTable from "./customerTable";
import { http } from "../services/httpService/httpService";
import config from "../config.json";
import { useFetchData } from "../hooks/useFetchData";
import Loader from "./common/loading/loader";
import TryAgain from "./common/errors/tryAgain";
import { MessageType } from "./common/dialogs/cardDialog";

interface CustomerDialogs {
  addDialog: boolean;
  editDialog: boolean;
  deleteDialog: boolean;
}

export const CustomerListSection = () => {
  const [
    customers,
    setCustomers,
    isLoading,
    initialRequestError,
    reFetchCustomer,
  ] = useFetchData<Customer[]>("customers");
  const [customerDialogs, setCustomerDialogsVisibility] =
    useState<CustomerDialogs>({
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
    });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [customerAddErrorMessage, setCustomerAddErrorMessage] =
    useState<MessageType>();

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
    setCustomerAddErrorMessage(undefined);
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
    const copyCustomers = customers ? [...customers] : [];
    customers?.push(customer);
    setCustomers(customers);
    http
      .post(`${config.apiEndpoint}customers`, customer)
      .then(() => {
        customerDialogs.addDialog = false;
        setCustomerDialogsVisibility({ ...customerDialogs });
        setCustomerAddErrorMessage(undefined);
      })
      .catch((error) => {
        setCustomers(copyCustomers);
        setCustomerAddErrorMessage({
          isError: true,
          message: error?.errorMessage || "lol",
        });
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (initialRequestError) {
    return (
      <div className="force-center">
        <TryAgain onClick={reFetchCustomer} />
      </div>
    );
  }

  if (!customers) {
    return null;
  }

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
              customers={customers}
              onDeleteMenuItemClick={handleDeleteMenuItemClick}
              onUpdateMenuItemClick={handleEditMenuItemClick}
              pagination={{
                pageNumber: currentPage,
                pageSize: pageSize,
              }}
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
        errorMessage={customerAddErrorMessage}
      />
    </React.Fragment>
  );
};
