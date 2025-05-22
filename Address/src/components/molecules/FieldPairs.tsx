import React from "react";
import Label from "../atoms/Label";
import Text from "../atoms/Text";

interface FieldPairProps {
  label: string;
  value: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}

const FieldPair: React.FC<FieldPairProps> = ({ label, value }) => (
  <div className="line">
    <Label className="label">{label}</Label>
    <Text className="value">{value}</Text>
  </div>
);

export default FieldPair;
