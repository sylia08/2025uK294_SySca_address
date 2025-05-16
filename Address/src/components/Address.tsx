import React, { useEffect, useState } from "react";
import { AddressService, type Address } from "./Service/AddressService";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  validateOnlyText,
  validateNumber,
  validateCountry,
} from "./validation";

const Address: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchOneAddress = async () => {
      try {
        if (id) {
          const result = await AddressService.getOneAddress(id);
          setAddress(result);
        }
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

  const prefilledData = {
    street_name: address.street_name || "",
    street_number: address.street_number || "",
    city: address.city,
    country_id: address.country_id || "",
  };

  return (
    <>
      <Formik
        initialValues={prefilledData}
        onSubmit={(values) => console.log("Success", values)}
        enableReinitialize={true}
      >
        <Form className="Street" key={address.id}>
          <p className="desc">Street:</p>
          <Field
            className="field"
            name="street_name"
            validate={validateOnlyText}
            required
          ></Field>

          <p className="desc">Street Nr.:</p>
          <Field
            className="field"
            name="street_number"
            validate={validateNumber}
            required
          ></Field>

          <p className="desc">City:</p>
          <Field
            className="field"
            name="city"
            validate={validateOnlyText}
            required
          ></Field>

          <p className="desc">Country:</p>
          <Field
            className="field"
            name="country_id"
            validate={validateCountry}
            required
          ></Field>

          <p className="desc">Imported:</p>
          <label className="field">
            {new Date(address.importdate).toLocaleDateString()}
          </label>
        </Form>
      </Formik>
      <button onClick={() => deleteAddress(address.id)}>Delete</button>
    </>
  );
};

export default Address;
