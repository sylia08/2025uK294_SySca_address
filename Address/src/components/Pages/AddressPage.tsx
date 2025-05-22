import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddressForm from "../Organisms/Form";
import Layout from "../Templates/Layout";
import { AddressService, type Address } from "../../service/AddressService";
import "../../styling/Address.css";

const AddressPage = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await AddressService.getOneAddress(Number(id));
        setAddress(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchAddress();
  }, [id]);

  const handleUpdate = async (values: Partial<Address>) => {
    try {
      await AddressService.updateAddress(Number(id), {
        ...values,
        importdate: new Date().toLocaleDateString(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await AddressService.deleteAddress(Number(id));
      setIsDeleted(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isDeleted)
    return (
      <div className="page">
        Address deleted. <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!address) return <div>Loading...</div>;

  const { street_name, street_number, city, country_id } = address;

  const initialValues = {
    street_name,
    street_number,
    city,
    country_id,
  };

  return (
    <Layout>
      <h2>Edit Address</h2>
      <AddressForm initialValues={initialValues} onSubmit={handleUpdate} />
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </Layout>
  );
};

export default AddressPage;
