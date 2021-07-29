import Joi from "joi";
import React, { useState } from "react";
import Customer from "../../model/customer";
import { getPostalCodeEURegexp } from "../../utils/postalCode";
import {
  containsKey,
  validateProperty,
  ValidKey,
} from "../../utils/validation";
import InputField, { InputType } from "../common/inputFields/inputField";
import "./customerForm.css";

interface CustomerFormProps {
  customer: Customer;
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
  buttonName: string;
  submitting: boolean;
}

interface CustomerError extends ValidKey {
  firstName?: string;
  lastName?: string;
  email?: string;
  postalCode?: string;
  age?: string;
  city?: string;
}

const customerSchema = {
  firstName: Joi.string().min(2).max(20).required().label("First Name"),
  lastName: Joi.string().min(2).max(20).required().label("Last Name"),
  email: Joi.string()
    .max(30)
    .email({ tlds: { allow: false } })
    .allow("")
    .allow(null)
    .label("Email"),
  postalCode: Joi.string()
    .pattern(getPostalCodeEURegexp())
    .message("Please provde correct Postal Code")
    .required(),
  age: Joi.number().min(0).max(120).required().label("Age"),
  city: Joi.string().min(2).max(50).required().label("City"),
};

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onSubmit,
  onCancel,
  buttonName,
  submitting,
}) => {
  const [customerInput, setCustomerInput] = useState<Customer>(customer);
  const [customerError, setCustomerError] = useState<CustomerError>({});
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (customerError !== null) {
      onSubmit(customerInput);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const customerCopy: Customer = { ...customerInput };
    const key = e.target.name;
    const value = e.target.value;
    if (containsKey(customerCopy, key) && containsKey(customerSchema, key)) {
      const errors = validateProperty<CustomerError, string>(
        Joi.object({
          [e.target.name]: (customerSchema as any)[key],
        }),
        key,
        value,
        customerError
      );
      customerCopy[key] = e.target.value;
      setCustomerInput(customerCopy);
      setCustomerError(errors);
    } else {
      console.warn("Specified key is wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__layout">
        <InputField
          name="First Name"
          fieldName="firstName"
          value={customerInput?.firstName || ""}
          errorMessage={customerError?.firstName}
          type={InputType.Text}
          handler={handleChange}
          required={true}
        />
        <InputField
          name="Last Name"
          fieldName="lastName"
          value={customerInput?.lastName || ""}
          errorMessage={customerError?.lastName}
          type={InputType.Text}
          handler={handleChange}
          required={true}
        />
        <InputField
          name="Email"
          fieldName="email"
          value={customerInput?.email || ""}
          errorMessage={customerError?.email}
          type={InputType.Text}
          handler={handleChange}
        />
        <InputField
          name="Postal Code"
          fieldName="postalCode"
          value={customerInput?.postalCode || ""}
          errorMessage={customerError?.postalCode}
          type={InputType.Text}
          handler={handleChange}
          required={true}
        />
        <InputField
          name="Age"
          fieldName="age"
          value={customerInput?.age || ""}
          errorMessage={customerError?.age}
          type={InputType.Number}
          handler={handleChange}
          required={true}
        />
        <InputField
          name="City"
          fieldName="city"
          value={customerInput?.city || ""}
          errorMessage={customerError?.city}
          type={InputType.Text}
          handler={handleChange}
        />
      </div>
      <div className="form__buttons">
        <button
          className="button button--primary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button button--success"
          disabled={submitting}
        >
          {buttonName}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
