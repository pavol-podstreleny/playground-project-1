import { createRef } from "react";
import Customer from "../model/customer";
import { CardSize } from "./common/cards/card";
import CardDialog from "./common/dialogs/cardDialog";
import Overlay from "./common/overlay/overlay";
import { useDetectOutsideClickWithCallback } from "../hooks/useDetectOutsideClickWithCallback";

export interface CustomerDialogDeleteProps {
  onDialogCancel: () => void;
  onDialogDelete: (customer: Customer) => void;
  visible: boolean;
  customer: Customer;
}

const CustomerDialogDelete: React.FC<CustomerDialogDeleteProps> = ({
  onDialogCancel,
  onDialogDelete,
  customer,
  visible,
}) => {
  const cardDialogRef = createRef<HTMLDivElement>();
  const [_, setClickOutside] = useDetectOutsideClickWithCallback(
    cardDialogRef,
    true,
    () => {
      setClickOutside(true);
      onDialogCancel();
    }
  );

  const raiseCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickOutside(true);
    onDialogCancel();
  };

  if (!visible) return null;

  return (
    <Overlay>
      <CardDialog
        title="Customer Deletion"
        size={CardSize.REGULAR}
        message={`Are you sure you want to delete customer ${customer.firstName} ${customer.lastName}?`}
        ref={cardDialogRef}
      >
        <div className="flex-row flex-end">
          <button
            className="button button-primary"
            onClick={(e) => raiseCancel(e)}
          >
            Cancel
          </button>
          <button
            className="button button-delete"
            onClick={() => onDialogDelete(customer)}
          >
            Delete
          </button>
        </div>
      </CardDialog>
    </Overlay>
  );
};

export default CustomerDialogDelete;
