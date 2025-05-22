import React from "react";
import { Field, ErrorMessage } from "formik";

interface FormFieldProps {
  type: string;
  id: string;
  name: string;
  validate?: (value: string) => string | undefined;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  id,
  name,
  validate,
  className,
}) => (
  <>
    <ErrorMessage name={name} className="error" />
    <Field
      type={type}
      id={id}
      name={name}
      validate={validate}
      className={className}
      required
    />
    <br />
  </>
);

export default FormField;
