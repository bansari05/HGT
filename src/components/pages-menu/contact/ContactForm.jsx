import { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const formValidation = Yup.object({
  name: Yup.string().max(100, "Name length should be less than or equal to 100 characters.").required('Name is required.'),
  emailId: Yup.string().max(150, "Email address length should be less than or equal to 150 characters.").matches(/^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,}$/, "Invalid email address.").required('Email address is required.'),
  subject: Yup.string().max(200, "Subject length should be less than or equal to 200 characters.").required('Subject is required.'),
  message: Yup.string().max(1000, "Message length should be less than or equal to 1000 characters.").required('Message is required.')
});

const ContactForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    emailId: "",
    subject: "",
    message: ""
  });

  const resetForm = () => {
    const resetData = {
      name: "",
      emailId: "",
      subject: "",
      message: ""
    }
    setInitialValues(resetData)
  }

  const handleSubmit = async (values, actions) => {
    const body = {
      name: values.name,
      email: values.emailId,
      subject: values.subject,
      message: values.message
    }
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/ContactUs/Add", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();

      switch (result?.status) {
        case 1:
          toast.success(result.message);
          actions.resetForm();
          resetForm();
          break;
        case 0:
          toast.error(result.message);
          break;
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation}
        onSubmit={handleSubmit}
      >
        {(prop) => (
          <Form>
            <div className="row">
              <div className="form-group col-lg-6">
                <label>Name</label>
                <Field
                  type="text"
                  name="name"
                  className={`form-control ${prop.errors.name && prop.touched.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group col-lg-6">
                <label>Email</label>
                <Field
                  type="text"
                  name="emailId"
                  className={`form-control ${prop.errors.emailId && prop.touched.emailId ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                <ErrorMessage name="emailId" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group col-lg-12">
                <label>Subject</label>
                <Field
                  type="text"
                  name="subject"
                  className={`form-control ${prop.errors.subject && prop.touched.subject ? 'is-invalid' : ''}`}
                  placeholder="Enter subject"
                />
                <ErrorMessage name="subject" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group col-lg-12">
                <label>Message</label>
                <Field
                  as="textarea"
                  name="message"
                  className={`form-control ${prop.errors.message && prop.touched.message ? 'is-invalid' : ''}`}
                  placeholder="Write your message..."
                />
                <ErrorMessage name="message" component="div" className="invalid-feedback" />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <button
                  className={`theme-btn ${!prop.isValid ? "btn-style-one-disabled" : "btn-style-one"}`}
                  type="submit"
                  disabled={!prop.isValid}
                  id="submit"
                  name="submit-form"
                >
                  Send Message
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
