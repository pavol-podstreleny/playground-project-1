import { CardSize } from "../../common/cards/card";
import CardDialog from "../../common/dialogs/cardDialog";
import Overlay from "../../common/overlay/overlay";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { customerDialogsCancel } from "../../../store/customers";
import { useAppSelector } from "../../../hooks/useAppSelector";
import "./customerDialogDetails.css";

interface CustomerDialogDetailsProps {}

const CustomerDialogDetail: React.FC<CustomerDialogDetailsProps> = () => {
  const dispatch = useAppDispatch();
  const isDialogVisile = useAppSelector(
    (state) => state.entities.customers.dialogs.detailDialogVisible
  );

  const customer = useAppSelector((state) => state.entities.customers.selected);

  const customerDetails = [
    {
      label: "First Name",
      value: customer?.firstName,
    },
    {
      label: "Last Name",
      value: customer?.lastName,
    },
    {
      label: "E-mail",
      value: customer?.email,
    },
    {
      label: "Postal Code",
      value: customer?.postalCode,
    },
    {
      label: "Age",
      value: customer?.age,
    },
    {
      label: "City",
      value: customer?.city,
    },
  ];

  const handleDialogCancel = () => {
    dispatch(customerDialogsCancel());
  };

  const raiseCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDialogCancel();
  };

  if (!isDialogVisile || !customer) return null;

  return (
    <Overlay>
      <CardDialog title="Customer Details" size={CardSize.REGULAR}>
        <div className="customer-detail">
          {customerDetails.map((detail) => {
            if (detail.value) {
              return (
                <p className="customer-detail__text" key={detail.label}>
                  <span className="customer-detail__label">{detail.label}</span>
                  : {detail.value}
                </p>
              );
            }
            return null;
          })}
          <div className="form__buttons">
            <button
              className="button button--primary"
              onClick={(e) => raiseCancel(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      </CardDialog>
    </Overlay>
  );
};

export default CustomerDialogDetail;
