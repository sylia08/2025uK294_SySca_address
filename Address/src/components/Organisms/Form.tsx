import { Formik, Form } from "formik";
import InputField from "../molecules/InputField";
import Button from "../atoms/Button";
import {
  validateOnlyText,
  validateNumber,
  validateCountry,
} from "../../validtions/validation";

const AddressForm = ({ initialValues, onSubmit }: any) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
    <Form className="form">
      <InputField
        name="street_name"
        label="Street"
        validate={validateOnlyText}
      />
      <InputField
        name="street_number"
        label="Street Nr."
        validate={validateNumber}
      />
      <InputField name="city" label="City" validate={validateOnlyText} />
      <InputField
        name="country_id"
        label="Country"
        validate={validateCountry}
      />
      <Button type="submit">Save</Button>
    </Form>
  </Formik>
);

export default AddressForm;
