import React from "react";
import Customer from "../model/customer";
import CustomerDialogForm from "./customerDialogForm";

export interface CustomerDialogEditProps {
  onDialogSubmit: (customer: Customer) => void;
  onDialogCancel: () => void;
  visible: boolean;
  customer: Customer;
}

const CustomerDialogEdit: React.FC<CustomerDialogEditProps> = ({
  onDialogSubmit,
  onDialogCancel,
  visible,
  customer,
}) => {
  return (
    <CustomerDialogForm
      title="Edit Customer"
      buttonName="Edit"
      customer={customer}
      onDialogCancel={onDialogCancel}
      onDialogSubmit={onDialogSubmit}
      visible={visible}
    />
  );
};

export default CustomerDialogEdit;
