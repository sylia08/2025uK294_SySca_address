import React, { useEffect, useState } from "react";
import "./Address.css";
import { AddressService, type Address } from "./Service/AddressService";
import { useParams } from "react-router-dom";
<<<<<<< Updated upstream
=======
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import {
  validateOnlyText,
  validateNumber,
  validateCountry,
} from "./validation";
>>>>>>> Stashed changes

const Address: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
<<<<<<< Updated upstream
  let { id } = useParams();
=======
  const { id } = useParams();
  const navigate = useNavigate();
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
  );
};

export default Address;
