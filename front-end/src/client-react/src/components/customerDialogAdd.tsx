import React from "react";
import Customer from "../model/customer";
import CustomerDialogForm from "./customerDialogForm";

export interface CustomerDialogAddProps {
  onDialogSubmit: (customer: Customer) => void;
  onDialogCancel: () => void;
  visible: boolean;
}

const CustomerDialogAdd: React.FC<CustomerDialogAddProps> = ({
  onDialogSubmit,
  onDialogCancel,
  visible,
}) => {
  const customer: Customer = {
    age: 0,
    city: "",
    firstName: "",
    lastName: "",
    partitionKey: "",
    rowKey: "",
    postalCode: "",
    email: null,
  };
  return (
    <CustomerDialogForm
      title="Add Customer"
      buttonName="Add"
      customer={customer}
      onDialogCancel={onDialogCancel}
      onDialogSubmit={onDialogSubmit}
      visible={visible}
    />
  );
};

export default CustomerDialogAdd;
