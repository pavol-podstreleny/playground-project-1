import React from "react";
import { createRef } from "react";
import { useDetectOutsideClickWithCallback } from "../hooks/useDetectOutsideClickWithCallback";
import Customer from "../model/customer";
import { CardSize } from "./common/cards/card";
import CardDialog from "./common/dialogs/cardDialog";
import Overlay from "./common/overlay/overlay";
import CustomerForm from "./customerForm";

export interface CustomerDialogEditProps {
  onDialogSubmit: (customer: Customer) => void;
  onDialogCancel: () => void;
  customer: Customer;
  visible: boolean;
}

const CustomerDialogEdit: React.FC<CustomerDialogEditProps> = ({
  onDialogSubmit,
  onDialogCancel,
  customer,
  visible,
}) => {
  const cardDialogRef = createRef<HTMLDivElement>();
  const [_, setClickOutside] = useDetectOutsideClickWithCallback(
    cardDialogRef,
    visible,
    () => {
      setClickOutside(true);
      onDialogCancel();
    }
  );

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickOutside(true);
    onDialogCancel();
  };

  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <CardDialog
        title={"Update User"}
        size={CardSize.MEDIUM}
        ref={cardDialogRef}
      >
        <CustomerForm
          onSubmit={onDialogSubmit}
          customer={customer}
          onCancel={onCancel}
          twoColumns={true}
        />
      </CardDialog>
    </Overlay>
  );
};

export default CustomerDialogEdit;
