
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddCountryModel= ({ onClose, onSave, initialData }) => {
  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {initialData ? "Edit country" : "Add New country"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <Formik
              initialValues={{
                country: initialData?.country || "",
                country_id: initialData?.country_id ?? undefined,
              }}
              enableReinitialize={true}
              validationSchema={Yup.object({
                country: Yup.string()
                  .trim()
                  .required("country name is required"),
              })}
              onSubmit={(values) => {
                onSave({
                  ...values,
                  country: values.country.trim(),
                });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="country" className="fw-bold">
                    country Name:
                    </label>
                    <Field
                      type="text"
                      name="country"
                      id="country"
                      className={`form-control ${
                        errors.country && touched.country
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter country name"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-style-three"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="theme-btn btn-style-one">
                      {initialData ? "Update" : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCountryModel;
