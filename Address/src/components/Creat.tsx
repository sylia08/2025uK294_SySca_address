import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  validateOnlyText,
  validateNumber,
  validateCountry,
} from "./validation";
import { AddressService, type Address } from "./Service/AddressService";

const Create: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    id: 0,
    street_name: "",
    street_number: "",
    city: "",
    country_id: "",
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleCreate}
        enableReinitialize
      >
        <Form className="Street">
          <div className="form-group">
            <p className="desc2">Street:</p>
            <Field
              className="editor"
              name="street_name"
              id="street_name"
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
              id="street_number"
              validate={validateNumber}
              required
            />
            <ErrorMessage
              name="street_number"
              component="div"
              className="error"
            />
          </div>

          <div className="form-group2">
            <p className="desc2">City:</p>
            <Field
              className="editor"
              name="city"
              id="city"
              validate={validateOnlyText}
              required
            />
            <ErrorMessage name="city" component="div" className="error" />
          </div>

          <div className="form-group2">
            <p className="desc3">Country:</p>
            <Field
              className="editor"
              name="country_id"
              id="country_id"
              validate={validateCountry}
              required
            />
            <ErrorMessage name="country_id" component="div" className="error" />
          </div>

          <button type="submit" className="Submit3">
            Creat
          </button>
        </Form>
      </Formik>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};
export default Create;
