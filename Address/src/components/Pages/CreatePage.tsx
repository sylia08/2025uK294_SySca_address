import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Organisms/Form";
import { AddressService, type Address } from "../../service/AddressService";
import Button from "../atoms/Button";

const Create: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: Partial<Address> = {
    id: 0,
    street_name: "",
    street_number: 0,
    city: "",
    country_id: 0,
    importdate: "",
  };

  const createAddress = async (values: Partial<Address>): Promise<Address> => {
    return await AddressService.createAddress({
      ...values,
      importdate: new Date().toLocaleDateString(),
    } as Omit<Address, "id">);
  };

  const handleCreate = async (values: Partial<Address>): Promise<void> => {
    try {
      const response = await createAddress(values);
      if (response?.id) {
        navigate(`/address/${response.id}`);
      } else {
        console.error("No ID returned from createAddress.");
      }
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  return (
    <div className="Library">
      <Form initialValues={initialValues} onSubmit={handleCreate} />
      <Button onClick={() => navigate(-1)}>Cancel</Button>
    </div>
  );
};

export default Create;
