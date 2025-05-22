import { Field, ErrorMessage } from "formik";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import ErrorText from "../atoms/ErrorText";

const InputField = ({ name, label, validate }: any) => (
  <div className="form-group">
    <Label htmlFor={name}>{label}</Label>
    <Field id={name} name={name} validate={validate} as={Input} />
    <ErrorMessage name={name} component={ErrorText} />
  </div>
);

export default InputField;
