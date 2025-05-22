import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressService, type Address } from "../../service/AddressService";
import AddressList from "../Organisms/AddressList";
import Button from "../atoms/Button";
import "../../styling/Address.css";
const AddressLibrary: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const result = await AddressService.getAddress();
        setAddresses(result);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load addresses"
        );
      }
    };
    fetchAddresses();
  }, []);

  const deleteAddress = async (id: number) => {
    try {
      await AddressService.deleteAddress(id);
      setIsDeleted(true);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete address");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!addresses.length) return <div>Loading...</div>;
  if (isDeleted)
    return (
      <div>
        Address has been deleted.
        <Button onClick={() => setIsDeleted(false)}>OK</Button>
      </div>
    );

  return (
    <div className="page">
      <div className="line">
        <Button onClick={() => navigate(`create`)}>Create</Button>
        <Button
          onClick={() => (
            localStorage.removeItem("accessToken"), (window.location.href = "/")
          )}
        >
          Logout
        </Button>
      </div>
      <AddressList
        addresses={addresses}
        onDelete={deleteAddress}
        onNavigate={(id) => navigate(`/address/${id}`)}
      />
    </div>
  );
};

export default AddressLibrary;
