import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./Address.css";

import { AddressService, type Address } from "./Service/AddressService";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOneAddress = async () => {
      try {
        if (id) {
          const result = await AddressService.getOneAddress(Number(id));
          setAddress(result);
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch address"
        );
      }
    };

    fetchOneAddress();
  }, [id]);

  const handleDelete = async (id: number) => {
    try {
      await AddressService.deleteAddress(id);
      setIsDeleted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete address");
    }
  };

  const handleUpdate = async (values: Partial<Address>) => {
    try {
      await AddressService.updateAddress(Number(id), {
        ...values,
        importdate: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (isDeleted)
    return (
      <div>
        Address has been deleted.
        <button onClick={() => navigate(-1)}>OK</button>
      </div>
    );
  if (!address) return <div>Loading...</div>;

  const initialValues = {
    id: address.id,
    street_name: address.street_name || "",
    street_number: address.street_number || "",
    city: address.city || "",
    country_id: address.country_id || "",
  };

  return (
    <div className="Library">
      <Formik
        initialValues={initialValues}
        onSubmit={handleUpdate}
        enableReinitialize
      >
        <Form className="Street">
          <div className="form-group">
            <p className="desc2">Street:</p>
            <Field
              className="editor"
              name="street_name"
              validate={validateOnlyText}
              required
            />
            <ErrorMessage
              name="street_name"
              component="div"
              className="error"
            />
          </div>

          <div className="form-group">
            <p className="desc2">Street Nr.:</p>
            <Field
              className="editor"
              name="street_number"
              validate={validateNumber}
              required
            />
            <ErrorMessage
              name="street_number"
              component="div"
              className="error"
            />
          </div>

          <div className="form-group">
            <p className="desc2">City:</p>
            <Field
              className="editor"
              name="city"
              validate={validateOnlyText}
              required
            />
            <ErrorMessage name="city" component="div" className="error" />
          </div>

          <div className="form-group">
            <p className="desc2">Country:</p>
            <Field
              className="editor"
              name="country_id"
              validate={validateCountry}
              required
            />
            <ErrorMessage name="country_id" component="div" className="error" />
          </div>

          <div className="form-group">
            <p className="desc2">Imported:</p>
            <label className="editor">
              {new Date(address.importdate).toLocaleDateString()}
            </label>
          </div>

          <button type="submit" className="Submit2">
            Save
          </button>
        </Form>
      </Formik>

      <button onClick={() => handleDelete(address.id)} className="Delete2">
        Delete
      </button>
      <button onClick={() => navigate(-1)}>Home</button>
    </div>
  );
};

export default Address;
