import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "bootstrap";

// Validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  contactNo: Yup.string()
    .matches(/^\d{10}$/, "Contact No must be 10 digits")
    .required("Contact No is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  userType: Yup.string().required("User Type is required"),
});

const FormContent = ({ onRegistrationSuccess }) => {
  const initialValues = {
    fullName: "",
    contactNo: "",
    emailAddress: "",
    password: "",
    userType: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const payload = {
        fullName: values.fullName,
        contactNo: values.contactNo,
        emailId: values.emailAddress,
        password: values.password,
        userType: values.userType,
      };

      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/User/Add",
        {
          method: "POST",
          headers: {
            'accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        resetForm();
        const registerModal = Modal.getInstance(document.getElementById('registerModal'));
        if (registerModal) registerModal.hide();
        
        const loginModal = new Modal(document.getElementById('loginModal'));
        loginModal.show();
        
        if (onRegistrationSuccess) {
          onRegistrationSuccess(values.emailAddress, values.password);
        }
      } else {
        console.error("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="default-form">
          <div className="row">
            <div className="form-group col-lg-12">
              <label>Full Name</label>
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                className={`form-control ${
                  errors.fullName && touched.fullName ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group col-lg-12">
              <label>Contact No</label>
              <Field
                name="contactNo"
                type="text"
                placeholder="Contact No"
                className={`form-control ${
                  errors.contactNo && touched.contactNo ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="contactNo"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group col-lg-12">
              <label>Email Address</label>
              <Field
                name="emailAddress"
                type="email"
                placeholder="Email Address"
                className={`form-control ${
                  errors.emailAddress && touched.emailAddress ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="emailAddress"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group col-lg-12">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group col-lg-12">
              <label>User Type</label>
              <Field
                name="userType"
                as="select"
                className={`form-control ${
                  errors.userType && touched.userType ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Type</option>
                <option value="admin">Admin</option>
                <option value="customer">User</option>
              </Field>
              <ErrorMessage
                name="userType"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group col-lg-12">
              <button 
                type="submit" 
                className="theme-btn btn-style-one"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormContent;