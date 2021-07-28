import React from "react";
import "./inputField.css";

export enum InputType {
  Text = "text",
  Email = "email",
  Number = "number",
}

export interface IInputField {}

export interface InputFieldSectionProps {
  fieldName: string;
  name: string;
  value: string | number;
  type: InputType;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
  min?: string | number;
  max?: string | number;
}

const InputField: React.FC<InputFieldSectionProps> = ({
  fieldName,
  name,
  value,
  required,
  type,
  handler,
  min,
  max,
  errorMessage,
}) => {
  return (
    <div className="input-group">
      <label
        className={
          required
            ? "input-group__label input-group__label--required"
            : "input-group__label"
        }
        htmlFor={fieldName}
      >
        {name}
      </label>
      <input
        className={
          errorMessage
            ? "input-group__field input-group__field--error"
            : "input-group__field"
        }
        name={fieldName}
        id={fieldName}
        type={type}
        value={value}
        onChange={handler}
        required={required}
        min={min}
        max={max}
        autoComplete="off"
      />
      {errorMessage && (
        <p className="input-group__message input-group__message--error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
