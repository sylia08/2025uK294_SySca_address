import React from "react";

type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<Props> = ({ children, ...props }) => (
  <label className="label" {...props}>
    {children}
  </label>
);

export default Label;
