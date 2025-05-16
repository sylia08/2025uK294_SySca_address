import React, { useEffect, useState } from "react";
import { AddressService, type Address } from "./Service/AddressService";
import { useParams } from "react-router-dom";

const Address: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const fetchOneAddress = async () => {
      try {
        const result = await AddressService.getOneAddress(id);
        setAddress(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load profile");
        }
      }
    };

    fetchOneAddress();
  }, [id]);

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
  if (isDeleted)
    return (
      <div>
        Address has been deleted.
        <button>OK</button>
      </div>
    );
  if (!address) return <div>Loading...</div>;

  return (
    <>
      <div className="AddressList">
        <div className="Street" key={address.id}>
          <p className="desc">Street:</p>
          <p className="field">{address.street_name}</p>

          <p className="desc">Street Nr.:</p>
          <p className="field">{address.street_number}</p>

          <p className="desc">City:</p>
          <p className="field">{address.city}</p>

          <p className="desc">Country:</p>
          <p className="field">{address.country_id}</p>

          <p className="desc">Imported:</p>
          <p className="field">
            {new Date(address.importdate).toLocaleDateString()}
            {new Date(address.importdate).toLocaleTimeString()}
          </p>
          <button>Edit</button>
          <button onClick={deleteAddress}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default Address;
