import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import Customer from "../model/customer";
import { apiCallBegan } from "../store/apis";
import {
  customerDialogsCancel,
  customerRequestPatchSucceeded,
  customersRequestFailed,
  customersRequestStarted,
  patchCustomer,
} from "../store/customers";
import CustomerDialogForm from "./customerDialogForm";

interface CustomerDialogEditProps {}

const CustomerDialogEdit: React.FC<CustomerDialogEditProps> = () => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.entities.customers.selected);
  const errorMessage = useAppSelector(
    (state) => state.entities.customers.api.patch.errorMessage
  );
  const dialogVisible = useAppSelector(
    (state) => state.entities.customers.dialogs.editDialogVisible
  );
  const isLoading = useAppSelector(
    (state) => state.entities.customers.api.patch.isLoading
  );

  const handleDialogCancel = () => {
    dispatch(customerDialogsCancel());
  };

  const handleDialogSubmit = (customer: Customer) => {
    dispatch(patchCustomer(customer));
  };

  if (!customer || !dialogVisible) {
    return null;
  }

  const errors = errorMessage ? { message: errorMessage, isError: true } : null;
  return (
    <CustomerDialogForm
      title="Edit Customer"
      buttonName="Edit"
      customer={customer!}
      onDialogCancel={handleDialogCancel}
      onDialogSubmit={handleDialogSubmit}
      visible={dialogVisible}
      errorMessage={errors ? [errors] : undefined}
      submitting={{ isLoading, text: "Editting..." }}
    />
  );
};

export default CustomerDialogEdit;
