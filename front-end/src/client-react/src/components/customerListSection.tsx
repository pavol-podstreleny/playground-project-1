import React, { useEffect, useState } from "react";
import Customer from "../model/customer";
import { getFakeCustomers } from "../services/fakeCustomerApi";
import Card from "./common/cards/card";
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

  useEffect(() => {
    setCustomers(getFakeCustomers());
  }, []);

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
            />
          </Card>
        </div>
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
