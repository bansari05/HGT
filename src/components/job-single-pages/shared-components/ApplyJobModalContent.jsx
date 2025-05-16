
import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  coverLetter: Yup.string()
    .max(5000, "Message should be 5000 characters or less")
    .required("Message is required"),
  file: Yup.mixed().required("CV file is required"),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const ApplyJobModalContent = ({ onClose }) => {
  const { id: jobId } = useParams();
  const fileInputRef = useRef(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const initialValues = {
    coverLetter: "",
    file: null,
    acceptTerms: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("coverLetter", values.coverLetter);
    formData.append("applicantCvFile", values.file);

    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/Application/Add",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0NzI4OTc0MywiaWF0IjoxNzQ3Mjg3OTQzfQ.GUMFnlTdyR8vTPw63le4t-byu6j045FvJ1Q4UKt8WPw",
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Submission failed");

      setSubmitStatus({ success: true, message: "Application submitted!" });
      toast.success("Application submitted successfully!");

      resetForm();

      // Close modal after 2 seconds
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);

    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || "Something went wrong.",
      });
      toast.error(error.message || "Something went wrong.");
    }

    setSubmitting(false);
  };
  

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="default-form job-apply-form">
            <div className="row">
              {/* File Upload */}
              <div className="col-lg-12 form-group">
                <div className="uploading-outer apply-cv-outer">
                  <div className="uploadButton">
                    <input
                      id="upload"
                      type="file"
                      name="file"
                      accept="application/pdf,.doc,.docx,image/*"
                      className="uploadButton-input"
                      ref={fileInputRef}
                      onChange={(e) =>
                        setFieldValue("file", e.currentTarget.files[0])
                      }
                    />

                    {!values.file && (
                      <label
                        htmlFor="upload"
                        className="uploadButton-button ripple-effect"
                      >
                        Upload CV (doc, docx, pdf)
                      </label>
                    )}
                  </div>
                </div>

                {values.file && (
                  <div className="mt-2">
                    <div className="d-flex align-items-center justify-content-between flex-wrap p-3" style={{border: "1.5px dotted #007bff", borderRadius: "6px"}}>
                      <span>{values.file.name}</span>

                      <button
                        type="button"
                        className="theme-btn btn-style-one w-auto"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change CV
                      </button>
                    </div>
                  </div>
                )}
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              {/* Cover Letter */}
              <div className="col-lg-12 form-group">
                <Field
                  as="textarea"
                  name="coverLetter"
                  className="darma"
                  placeholder="Message"
                />
                <ErrorMessage
                  name="coverLetter"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="col-lg-12 form-group">
                <div className="input-group checkboxes square">
                  <Field type="checkbox" name="acceptTerms" id="rememberMe" />
                  <label htmlFor="rememberMe" className="remember">
                    <span className="custom-checkbox"></span> You accept our{" "}
                    <span data-bs-dismiss="modal">
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions and Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>

              {/* Submit Button */}
              <div className="col-lg-12 form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="theme-btn btn-style-one w-100"
                >
                  {isSubmitting ? "Submitting…" : "Apply Job"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ApplyJobModalContent;
