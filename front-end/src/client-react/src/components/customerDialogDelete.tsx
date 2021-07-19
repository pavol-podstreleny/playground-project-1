import { createRef } from "react";
import Customer from "../model/customer";
import { CardSize } from "./common/cards/card";
import CardDialog from "./common/dialogs/cardDialog";
import Overlay from "./common/overlay/overlay";
import { useDetectOutsideClickWithCallback } from "../hooks/useDetectOutsideClickWithCallback";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { customerDialogsCancel, deleteCustomer } from "../store/customers";
import { useAppSelector } from "../hooks/useAppSelector";
import { isError } from "joi";

interface CustomerDialogDeleteProps {}

const CustomerDialogDelete: React.FC<CustomerDialogDeleteProps> = () => {
  const dispatch = useAppDispatch();
  const isDialogVisile = useAppSelector(
    (state) => state.entities.customers.dialogs.deleteDialogVisible
  );
  const errorMessage = useAppSelector(
    (state) => state.entities.customers.api.delete.errorMessage
  );
  const customer = useAppSelector((state) => state.entities.customers.selected);
  const cardDialogRef = createRef<HTMLDivElement>();
  const [, setClickOutside] = useDetectOutsideClickWithCallback(
    cardDialogRef,
    true,
    () => {
      setClickOutside(true);
      handleDialogCancel();
    }
  );

  const handleDialogCancel = () => {
    dispatch(customerDialogsCancel());
  };

  const handleCustomerDelete = (customer: Customer) => {
    dispatch(deleteCustomer(customer));
  };

  const raiseCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickOutside(true);
    handleDialogCancel();
  };

  if (!isDialogVisile || !customer) return null;

  const messages = [
    {
      message: `Are you sure you want to delete customer ${
        customer!.firstName
      } ${customer!.lastName}`,
      isError: false,
    },
  ];

  if (errorMessage) {
    messages.push({
      message: errorMessage,
      isError: true,
    });
  }

  return (
    <Overlay>
      <CardDialog
        title="Customer Deletion"
        size={CardSize.REGULAR}
        messages={messages}
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
            onClick={() => handleCustomerDelete(customer!)}
          >
            Delete
          </button>
        </div>
      </CardDialog>
    </Overlay>
  );
};

export default CustomerDialogDelete;
