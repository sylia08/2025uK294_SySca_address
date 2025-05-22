import React from "react";
import { type Address } from "../../service/AddressService";
import FieldPair from "../molecules/FieldPairs";
import DeleteInfo from "../molecules/DeleteInfo";

interface AddressCardProps {
  address: Address;
  onDelete: (id: number) => void;
  onNavigate: (id: number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onDelete,
  onNavigate,
}) => {
  const importedDate = new Date(address.importdate).toLocaleDateString();

  return (
    <div className="Street" onClick={() => onNavigate(address.id)}>
      <FieldPair label="Nr." value={address.id} labelClassName="Nr" />
      <FieldPair label="Street:" value={address.street_name} />
      <FieldPair label="Street Nr.:" value={address.street_number} />
      <FieldPair label="City:" value={address.city} />
      <FieldPair label="Country:" value={address.country_id} />
      <DeleteInfo
        importedDate={importedDate}
        onDelete={(e) => {
          e.stopPropagation();
          onDelete(address.id);
        }}
      />
    </div>
  );
};

export default AddressCard;
