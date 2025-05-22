import React, { useEffect, useState } from "react";
import { AddressService, type Address } from "../service/AddressService";
import "./Address.css";
import { useNavigate } from "react-router-dom";

const AddressLibrary: React.FC = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const result = await AddressService.getAddress();
        setAddress(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load profile");
        }
      }
    };
    fetchAddresses();
  }, []);

  const deleteAddress = async (id: number) => {
    await AddressService.deleteAddress(id);
    try {
      await AddressService.deleteAddress(id);
      setIsDeleted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load profile");
      }
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!address) return <div>Loading...</div>;
  if (isDeleted)
    return (
      <div>
        Address has been deleted.
        <button>OK</button>
      </div>
    );

  return (
    <>
      <button onClick={() => navigate(`create`)}>Creat</button>
      <div className="AddressList">
        {address.map((address) => (
          <button
            className="Street"
            key={address.id}
            onClick={() => navigate(`/address/${address.id}`)}
          >
            <p className="Nr">Nr. {address.id}</p>
            <div className="line">
              <p className="desc">Street:</p>
              <p className="field">{address.street_name}</p>

              <p className="desc">Street Nr.:</p>
              <p className="field">{address.street_number}</p>
            </div>

            <div className="line">
              <p className="desc">City: </p>
              <p className="field">{address.city}</p>
            </div>

            <div className="line">
              <p className="desc">Country:</p>
              <p className="field">{address.country_id}</p>
            </div>

            <div className="line">
              <p className="desc">Imported:</p>
              <p className="date">
                {new Date(address.importdate).toLocaleDateString()}
              </p>
              <button onClick={() => deleteAddress(address.id)}>Delete</button>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};
export default AddressLibrary;
