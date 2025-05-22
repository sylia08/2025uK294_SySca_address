import React from "react";

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="error-text text-red-600 text-sm mt-1">{children}</div>
);

export default ErrorText;
