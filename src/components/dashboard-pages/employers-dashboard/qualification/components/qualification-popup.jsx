
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddQualificationModal = ({ onClose, onSave, initialData }) => {
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
              {initialData ? "Edit Qualification" : "Add New Qualification"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <Formik
              initialValues={{
                qualification: initialData?.qualification || "",
                qualification_id: initialData?.qualification_id ?? undefined,
              }}
              enableReinitialize={true}
              validationSchema={Yup.object({
                qualification: Yup.string()
                  .trim()
                  .required("Qualification name is required"),
              })}
              onSubmit={(values) => {
                onSave({
                  ...values,
                  qualification: values.qualification.trim(),
                });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="qualification" className="fw-bold">
                      Qualification Name:
                    </label>
                    <Field
                      type="text"
                      name="qualification"
                      id="qualification"
                      className={`form-control ${
                        errors.qualification && touched.qualification
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter qualification name"
                    />
                    <ErrorMessage
                      name="qualification"
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

export default AddQualificationModal;
