import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validateEmail, validatePassword } from "../validtions/validation";
import { AuthService } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const result = await AuthService.login(values.email, values.password);
      localStorage.setItem("accessToken", result.accessToken);
      navigate("/address");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Login failed");
      }
    }
  };

  return (
    <>
      <div className="Login">
        <h1>Login</h1>
        {apiError && <div className="error">{apiError}</div>}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="Form">
            <ErrorMessage name="email" component="div" className="error" />
            <Field
              type="email"
              id="email"
              name="email"
              className="Email"
              validate={validateEmail}
              required
            />
            <br />

            <ErrorMessage name="password" component="div" className="error" />
            <Field
              type="password"
              id="password"
              name="password"
              className="Pwd"
              validate={validatePassword}
              required
            />
            <br />
            <button type="submit" className="Submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>
      <a href="" className="RegisterLink">
        Don’t have an account yet? Register here
      </a>
    </>
  );
};

export default Login;
