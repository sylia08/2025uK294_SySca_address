import { Field, ErrorMessage } from "formik";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import "../../styling/Address.css";

const InputField = ({ name, label, validate }: any) => (
  <div className="line">
    <Label htmlFor={name} className="label">
      {label}
    </Label>

    <ErrorMessage name={name} className="error" />
    <br />
    <Field
      id={name}
      name={name}
      validate={validate}
      as={Input}
      className="value"
    />
  </div>
);

export default InputField;
