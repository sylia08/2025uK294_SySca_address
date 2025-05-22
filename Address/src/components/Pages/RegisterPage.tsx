import React, { useState } from "react";
import LoginForm from "../Organisms/LoginForm";
import { Registration } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import "../../styling/Login.css";

interface RegisterFormValues {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await Registration.register(values.email, values.password);
      localStorage.setItem("accessToken", result.accessToken);
      navigate("/address");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Regestry failed");
      }
    }
  };

  return (
    <>
      <div className="Login">
        <h1>Register</h1>
        <LoginForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          apiError={apiError}
        />
      </div>
    </>
  );
};

export default Register;
