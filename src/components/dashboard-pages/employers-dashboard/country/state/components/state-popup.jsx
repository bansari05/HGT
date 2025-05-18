
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddStateModel= ({ onClose, onSave, initialData, countryName }) => {
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
              {initialData ? "Edit state" : "Add New state"}
            </h5>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <Formik
              initialValues={{
                state: initialData?.state || "",
                state_id: initialData?.state_id ?? undefined,
              }}
              enableReinitialize={true}
              validationSchema={Yup.object({
                state: Yup.string()
                  .trim()
                  .required("state name is required"),
              })}
              onSubmit={(values) => {
                onSave({
                  ...values,
                  state: values.state.trim(),
                });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mb-3">
                    <label htmlFor="country" className="fw-bold">Country Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={countryName || "Loading..."}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state" className="fw-bold">
                    State Name:
                    </label>
                    <Field
                      type="text"
                      name="state"
                      id="state"
                      className={`form-control ${
                        errors.state && touched.state
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter state name"
                    />
                    <ErrorMessage
                      name="state"
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

export default AddStateModel;
