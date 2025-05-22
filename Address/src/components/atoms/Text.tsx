import React from "react";

interface TextProps {
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ className, children }) => (
  <p className={className}>{children}</p>
);

export default Text;
