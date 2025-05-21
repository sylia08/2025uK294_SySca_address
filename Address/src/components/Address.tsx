import React, { useEffect, useState } from "react";
import "./Address.css";
import { AddressService, type Address } from "./Service/AddressService";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
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

  const handleChange = async () => {
    if (!address) return;
    await AddressService.updateAddress(address.id, {
      id: address.id,
      street_name: address.street_name,
      street_number: address.street_number,
      city: address.city,
      country_id: address.country_id,
      importdate: new Date().toLocaleDateString(),
    })
      .then((res) => console.log("Updated", res))
      .catch((err) => console.error("Update failed", err));
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
    id: address.id,
    street_name: address.street_name || "",
    street_number: address.street_number || "",
    city: address.city,
    country_id: address.country_id || "",
    importdate: address.importdate,
  };

  return (
    <div className="Library">
      <Formik
        initialValues={prefilledData}
        onSubmit={handleChange}
        enableReinitialize={true}
      >
        <Form className="Street" key={address.id}>
          <ErrorMessage name="street_name" component="div" className="error" />
          <p className="desc2">Street:</p>
          <Field
            className="editor"
            name="street_name"
            validate={validateOnlyText}
            required
          ></Field>

          <ErrorMessage
            name="street_number"
            component="div"
            className="error"
          />
          <p className="desc2">Street Nr.:</p>
          <Field
            className="editor"
            name="street_number"
            validate={validateNumber}
            required
          ></Field>

          <ErrorMessage name="city" component="div" className="error" />
          <p className="desc2">City:</p>
          <Field
            className="editor"
            name="city"
            validate={validateOnlyText}
            required
          ></Field>

          <ErrorMessage name="country_id" component="div" className="error" />
          <p className="desc2">Country:</p>
          <Field
            className="editor"
            name="country_id"
            validate={validateCountry}
            required
          ></Field>

          <p className="desc2">Imported:</p>
          <label className="editor">
            {new Date(address.importdate).toLocaleDateString()}
          </label>
          <button type="submit" className="Submit2">
            Save
          </button>
        </Form>
      </Formik>
      <button onClick={() => deleteAddress(address.id)} className="Delete2">
        Delete
      </button>
      <button onClick={() => navigate(-1)}>Home</button>
    </div>
  );
};

export default Address;
