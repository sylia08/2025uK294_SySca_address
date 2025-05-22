import { Field, ErrorMessage } from "formik";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

const InputField = ({ name, label, validate }: any) => (
  <div className="line">
    <Label htmlFor={name} className="label">
      {label}
    </Label>
    <div className="input">
      <Field
        id={name}
        name={name}
        validate={validate}
        as={Input}
        className="value"
      />
      <ErrorMessage name={name} />
    </div>
  </div>
);

export default InputField;
