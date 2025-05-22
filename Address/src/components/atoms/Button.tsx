import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ children, ...props }) => (
  <button className="btn" {...props}>
    {children}
  </button>
);

export default Button;
