import React from "react";
import { createRef } from "react";
import { useDetectOutsideClickWithCallback } from "../hooks/useDetectOutsideClickWithCallback";
import Customer from "../model/customer";
import { CardSize } from "./common/cards/card";
import CardDialog, { MessageType } from "./common/dialogs/cardDialog";
import Overlay from "./common/overlay/overlay";
import CustomerForm from "./customerForm";

export interface CustomerDialogFormProps {
  onDialogSubmit: (customer: Customer) => void;
  onDialogCancel: () => void;
  visible: boolean;
  customer: Customer;
  title: string;
  buttonName: string;
  errorMessage?: MessageType[];
}

const CustomerDialogForm: React.FC<CustomerDialogFormProps> = ({
  onDialogSubmit,
  onDialogCancel,
  visible,
  customer,
  title,
  buttonName,
  errorMessage,
}) => {
  const cardDialogRef = createRef<HTMLDivElement>();
  const [, setClickOutside] = useDetectOutsideClickWithCallback(
    cardDialogRef,
    true,
    () => {
      setClickOutside(true);
      onDialogCancel();
    }
  );

  const onCancel = () => {
    setClickOutside(true);
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
        ref={cardDialogRef}
        messages={errorMessage}
      >
        <CustomerForm
          onSubmit={onDialogSubmit}
          onCancel={onCancel}
          customer={customer}
          twoColumns={true}
          buttonName={buttonName}
        />
      </CardDialog>
    </Overlay>
  );
};

export default CustomerDialogForm;
