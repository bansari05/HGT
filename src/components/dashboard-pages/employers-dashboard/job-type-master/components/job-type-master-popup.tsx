import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Jobtypemasterpopup = ({ onClose, onSave, initialData }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 border-t-4 border-blue-500" style={{ padding: '20px' }}>
                
                {/* Title */}
                <div className="mb-6 text-center">
                    <h5 className="text-sm font-bold text-gray-800 mb-3">
                        {initialData ? "Edit Job Type" : "Add New Job Type"}
                    </h5>
                </div>

                {/* Formik Form */}
                <Formik
                    initialValues={{
                        jobType: initialData?.job_type || "",
                    }}
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                        jobType: Yup.string().trim().required("Job Type Name is required"),
                    })}
                    onSubmit={(values) => {
                        onSave({
                            jobType: values.jobType.trim(),
                        });
                    }}
                >
                    {({ values, errors, touched }) => (
                        <Form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Type Name <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="jobType"
                                    placeholder="Enter job type name"
                                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.jobType && touched.jobType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                                <ErrorMessage
                                    name="jobType"
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="flex gap-2 justify-content-end mt-3">
                                <button type="button" className="theme-btn btn-style-one" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="theme-btn btn-style-one">
                                    {initialData ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Jobtypemasterpopup;

