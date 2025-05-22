import React from "react";
import { Formik, Form } from "formik";
import FormField from "../molecules/LoginField";
import Button from "../atoms/Button";
import { validateEmail, validatePassword } from "../../validtions/validation";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  initialValues: LoginFormValues;
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  apiError?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  onSubmit,
  apiError,
}) => (
  <>
    {apiError && <div className="error">{apiError}</div>}
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="Form">
        <FormField
          type="email"
          id="email"
          name="email"
          validate={validateEmail}
          className="Email"
        />
        <FormField
          type="password"
          id="password"
          name="password"
          validate={validatePassword}
          className="Pwd"
        />
        <Button type="submit" className="Submit">
          Submit
        </Button>
      </Form>
    </Formik>
  </>
);

export default LoginForm;
