import React, { useEffect, useState } from "react";
import { AddressService, type Address } from "./Service/AddressService";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Address: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  let { id } = useParams();

  interface EditingValues {
    street_number: number;
    street_name: string;
    city: string;
    country_id: number;
    importdate: string;
  }

  useEffect(() => {
    const fetchOneAddress = async () => {
      try {
        const result = await AddressService.getOneAddress();
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <ErrorMessage name="email" component="div" className="error" />
          <div className="Street" key={address.id}>
            <p className="desc">Street:</p>
            <Field className="field">{address.street_name}</Field>

            <p className="desc">Street Nr.:</p>
            <Field className="field">{address.street_number}</Field>

            <p className="desc">City:</p>
            <Field className="field">{address.city}</Field>

            <p className="desc">Country:</p>
            <Field className="field">{address.country_id}</Field>

            <p className="desc">Imported:</p>
            <Field className="field">
              {new Date(address.importdate).toLocaleDateString()}
              {new Date(address.importdate).toLocaleTimeString()}
            </Field>
          </div>
        </Form>
      </Formik>
      <button>Edit</button>
      <button onClick={() => deleteAddress(address.id)}>Delete</button>
    </>
  );
};

export default Address;
