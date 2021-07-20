import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import Customer from "../model/customer";
import {
  customerAddDialogCanceled,
  customerDialogsCancel,
  postCustomer,
} from "../store/customers";
import CustomerDialogForm from "./customerDialogForm";

interface CustomerDialogAddProps {}

const CustomerDialogAdd: React.FC<CustomerDialogAddProps> = ({}) => {
  const dispatch = useAppDispatch();
  const dialogVisibile = useAppSelector(
    (state) => state.entities.customers.dialogs.addDialogVisibile
  );
  const errorMessage = useAppSelector(
    (state) => state.entities.customers.api.post.errorMessage
  );
  const isLoading = useAppSelector(
    (state) => state.entities.customers.api.post.isLoading
  );

  const handleDialogCancel = () => {
    dispatch(customerDialogsCancel());
    dispatch(customerAddDialogCanceled());
  };

  const handleDialogSubmit = (customer: Customer) => {
    dispatch(postCustomer(customer));
  };

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

  if (!dialogVisibile) {
    return null;
  }

  return (
    <CustomerDialogForm
      title="Add Customer"
      buttonName="Add"
      customer={customer}
      onDialogCancel={handleDialogCancel}
      onDialogSubmit={handleDialogSubmit}
      visible={dialogVisibile}
      errorMessage={[{ isError: true, message: errorMessage || "" }]}
      submitting={{ isLoading, text: "Submitting..." }}
    />
  );
};

export default CustomerDialogAdd;
