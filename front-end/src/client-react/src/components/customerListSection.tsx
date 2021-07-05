import React, { useEffect, useState } from "react";
import Customer from "../model/customer";
import { getFakeCustomers } from "../services/fakeCustomerApi";
import Card from "./common/cards/card";
import CustomerDialogDelete from "./customerDialogDelete";
import CustomerDialogEdit from "./customerDialogEdit";
import CustomerTable from "./customerTable";

export const CustomerListSection = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [isDialogEditVisible, setDialogEditVisible] = useState<boolean>(false);
  const [isDialogDeleteVisible, setDialogDeleteVisibible] =
    useState<boolean>(false);

  useEffect(() => {
    setCustomers(getFakeCustomers());
  }, []);

  const handleDeleteMenuItemClick = (customer: Customer) => {
    setDialogDeleteVisibible(true);
    setDialogEditVisible(false);
    setSelectedCustomer(customer);
  };

  const handleEditMenuItemClick = (customer: Customer) => {
    setDialogEditVisible(true);
    setDialogDeleteVisibible(false);
    setSelectedCustomer({ ...customer });
  };

  const handleDialogCancel = () => {
    setDialogEditVisible(false);
    setDialogDeleteVisibible(false);
  };

  const handleDeleteCustomer = (customer: Customer): void => {
    setDialogDeleteVisibible(false);
  };

  const handleEditCustomer = (customer: Customer): void => {
    setDialogEditVisible(false);
  };

  const handleSort = (key: string): void => {
    console.log(key);
  };

  return (
    <React.Fragment>
      <section className="customer-list">
        <div className="center">
          <button className="button button-primary">Add Customer</button>
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
          visible={isDialogDeleteVisible}
        />
      )}
      {selectedCustomer && (
        <CustomerDialogEdit
          customer={selectedCustomer}
          onDialogSubmit={handleEditCustomer}
          onDialogCancel={handleDialogCancel}
          visible={isDialogEditVisible}
        />
      )}
    </React.Fragment>
  );
};
