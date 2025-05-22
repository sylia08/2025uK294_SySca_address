import React from "react";
import Label from "../atoms/Label";
import Text from "../atoms/Text";

interface FieldPairProps {
  label: string;
  value: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}

const FieldPair: React.FC<FieldPairProps> = ({
  label,
  value,
  labelClassName,
  valueClassName,
}) => (
  <div className="Line">
    <Label className={labelClassName}>{label}</Label>
    <Text className={valueClassName}>{value}</Text>
  </div>
);

export default FieldPair;
