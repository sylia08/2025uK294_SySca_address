import React, { useState } from "react";
import LoginForm from "../Organisms/LoginForm";
import { AuthService } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import "../../styling/Login.css";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const initialValues: LoginFormValues = {
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
        <LoginForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          apiError={apiError}
        />
      </div>
      <a href="" className="RegisterLink">
        Don’t have an account yet? Register here
      </a>
    </>
  );
};

export default Login;
