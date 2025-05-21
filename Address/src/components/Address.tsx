import React, { useEffect, useState } from "react";
import "./Address.css";
import { AddressService, type Address } from "./Service/AddressService";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
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
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6

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
<<<<<<< HEAD
=======
    id: address.id,
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
    street_name: address.street_name || "",
    street_number: address.street_number || "",
    city: address.city,
    country_id: address.country_id || "",
<<<<<<< HEAD
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
=======
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
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
            name="street_name"
            validate={validateOnlyText}
            required
          ></Field>

<<<<<<< HEAD
          <p className="desc">Street Nr.:</p>
          <Field
            className="field"
=======
          <ErrorMessage
            name="street_number"
            component="div"
            className="error"
          />
          <p className="desc2">Street Nr.:</p>
          <Field
            className="editor"
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
            name="street_number"
            validate={validateNumber}
            required
          ></Field>

<<<<<<< HEAD
          <p className="desc">City:</p>
          <Field
            className="field"
=======
          <ErrorMessage name="city" component="div" className="error" />
          <p className="desc2">City:</p>
          <Field
            className="editor"
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
            name="city"
            validate={validateOnlyText}
            required
          ></Field>

<<<<<<< HEAD
          <p className="desc">Country:</p>
          <Field
            className="field"
=======
          <ErrorMessage name="country_id" component="div" className="error" />
          <p className="desc2">Country:</p>
          <Field
            className="editor"
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
            name="country_id"
            validate={validateCountry}
            required
          ></Field>

<<<<<<< HEAD
          <p className="desc">Imported:</p>
          <label className="field">
            {new Date(address.importdate).toLocaleDateString()}
          </label>
        </Form>
      </Formik>
      <button onClick={() => deleteAddress(address.id)}>Delete</button>
    </>
=======
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
>>>>>>> 7ed20554625580952f8045fcc803af5d42340dc6
  );
};

export default Address;
