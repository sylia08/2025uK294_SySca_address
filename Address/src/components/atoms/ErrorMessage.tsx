import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

interface ErrorProps {
  name: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ name, className }) => (
  <FormikErrorMessage name={name} component="div" className={className} />
);

export default ErrorMessage;
