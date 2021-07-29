import React from "react";
import Customer from "../model/customer";
import { CardSize } from "./common/cards/card";
import CardDialog, {
  CardLoaderProps,
  MessageType,
} from "./common/dialogs/cardDialog";
import Overlay from "./common/overlay/overlay";
import CustomerForm from "./customerForm/customerForm";

interface CustomerDialogFormProps {
  onDialogSubmit: (customer: Customer) => void;
  onDialogCancel: () => void;
  visible: boolean;
  customer: Customer;
  title: string;
  buttonName: string;
  errorMessage?: MessageType[];
  submitting: CardLoaderProps;
}

const CustomerDialogForm: React.FC<CustomerDialogFormProps> = ({
  onDialogSubmit,
  onDialogCancel,
  visible,
  customer,
  title,
  buttonName,
  errorMessage,
  submitting,
}) => {
  const onCancel = () => {
    onDialogCancel();
  };

  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <CardDialog
        title={title}
        size={CardSize.MEDIUM}
        messages={errorMessage}
        isLoading={submitting}
      >
        <CustomerForm
          onSubmit={onDialogSubmit}
          onCancel={onCancel}
          customer={customer}
          buttonName={buttonName}
          submitting={submitting.isLoading}
        />
      </CardDialog>
    </Overlay>
  );
};

export default CustomerDialogForm;
