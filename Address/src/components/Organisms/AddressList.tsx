import React from "react";
import { type Address } from "../../service/AddressService";
import AddressCard from "./AddressCard";

interface AddressListProps {
  addresses: Address[];
  onDelete: (id: number) => void;
  onNavigate: (id: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onDelete,
  onNavigate,
}) => (
  <div className="AddressList">
    {addresses.map((address) => (
      <AddressCard
        key={address.id}
        address={address}
        onDelete={onDelete}
        onNavigate={onNavigate}
      />
    ))}
  </div>
);

export default AddressList;
