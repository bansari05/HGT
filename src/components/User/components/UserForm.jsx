import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  contactNo: Yup.string()
    .matches(/^[0-9]+$/, "Contact number must be digits only")
    .required("Contact number is required"),
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  userType: Yup.string().required("User type is required"),
  profilePictureFile: Yup.mixed()
    .required("Profile picture is required")
    .test("fileSize", "File too large, max 10MB", (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    }),
  address: Yup.string().required("Address is required"),
  dateOfBirth: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .required("Date of birth is required"),
  currentSalary: Yup.string().required("Current salary is required"),
  expectedSalary: Yup.string().required("Expected salary is required"),
  gender: Yup.string().required("Gender is required"),
  languages: Yup.string().required("Languages are required"),
  qualification: Yup.string().required("Qualification is required"),
  facebook: Yup.string().url("Invalid URL").nullable(),
  twitter: Yup.string().url("Invalid URL").nullable(),
  linkedIn: Yup.string().url("Invalid URL").nullable(),
  instagram: Yup.string().url("Invalid URL").nullable(),
  professionalSkills: Yup.string().required("Professional skills are required"),
});

const initialValues = {
  fullName: "",
  contactNo: "",
  emailId: "",
  password: "",
  userType: "",
  profilePictureFile: null,
  address: "",
  dateOfBirth: "",
  currentSalary: "",
  expectedSalary: "",
  gender: "",
  languages: "",
  qualification: "",
  facebook: "",
  twitter: "",
  linkedIn: "",
  instagram: "",
  professionalSkills: "",
};

export default function UserForm() {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("profilePictureFile", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFieldValue("profilePictureFile", null);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      // Append all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === "profilePictureFile") {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch("https://apihgt.solvifytech.in/api/v1/User/Add", {
        method: "POST",
        headers: {
              Accept: "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      alert("User added successfully!");
      resetForm();
      setPreviewImage(null);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, errors, touched, isSubmitting }) => (
        <Form className="default-form">
          <div className="row">
            {/* Profile Picture */}
            <div className="form-group col-lg-12" style={{ display: "flex", marginBottom: "15px" }}>
              <div className="profile-image-upload" style={{ position: "relative" }}>
                <input
                  type="file"
                  name="profilePictureFile"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <div
                  className="profile-preview"
                  onClick={triggerFileSelect}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    width: "96px",
                    height: "96px",
                  }}
                >
                  <figure className="image is-96x96" style={{ margin: 0, width: "96px", height: "96px" }}>
                    <img
                      src={previewImage || "/images/user.jpg"}
                      alt={previewImage ? "Profile Preview" : "Default Avatar"}
                      style={{ objectFit: "cover", borderRadius: "50%", border: "1px solid #ccc", width: "100%", height: "100%" }}
                    />
                  </figure>
                  <div
                    className="upload-icon-overlay"
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      right: "-10px",
                      backgroundColor: "#04598b",
                      color: "white",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      cursor: "pointer",
                      border: "2px solid white",
                    }}
                  >
                    <span className="plus-icon" style={{ fontSize: "20px" }}>
                      +
                    </span>
                  </div>
                </div>
                {errors.profilePictureFile && touched.profilePictureFile && (
                  <div className="error-message" style={{ color: "red", marginTop: "5px", fontSize: "12px", textAlign: "center" }}>
                    {errors.profilePictureFile}
                  </div>
                )}
              </div>
            </div>

            {/* Full Name */}
            <div className="form-group col-lg-6">
              <label>Full Name</label>
              <Field
                type="text"
                name="fullName"
                className={`form-control ${errors.fullName && touched.fullName ? "is-invalid" : ""}`}
                placeholder="Enter full name"
              />
              <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
            </div>

            {/* Contact Number */}
            <div className="form-group col-lg-6">
              <label>Contact Number</label>
              <Field
                type="text"
                name="contactNo"
                className={`form-control ${errors.contactNo && touched.contactNo ? "is-invalid" : ""}`}
                placeholder="Enter contact number"
              />
              <ErrorMessage name="contactNo" component="div" className="invalid-feedback" />
            </div>

            {/* Email */}
            <div className="form-group col-lg-6">
              <label>Email</label>
              <Field
                type="email"
                name="emailId"
                className={`form-control ${errors.emailId && touched.emailId ? "is-invalid" : ""}`}
                placeholder="Enter email"
              />
              <ErrorMessage name="emailId" component="div" className="invalid-feedback" />
            </div>

            {/* Password */}
            <div className="form-group col-lg-6">
              <label>Password</label>
              <Field
                type="password"
                name="password"
                className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>

            {/* User Type */}
            <div className="form-group col-lg-6">
              <label>User Type</label>
              <Field
                as="select"
                name="userType"
                className={`form-control ${errors.userType && touched.userType ? "is-invalid" : ""}`}
              >
                <option value="">Select user type</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </Field>
              <ErrorMessage name="userType" component="div" className="invalid-feedback" />
            </div>

            {/* Address */}
            <div className="form-group col-lg-6">
              <label>Address</label>
              <Field
                type="text"
                name="address"
                className={`form-control ${errors.address && touched.address ? "is-invalid" : ""}`}
                placeholder="Enter address"
              />
              <ErrorMessage name="address" component="div" className="invalid-feedback" />
            </div>

            {/* Date of Birth */}
            <div className="form-group col-lg-6">
              <label>Date of Birth</label>
              <Field
                type="date"
                name="dateOfBirth"
                className={`form-control ${errors.dateOfBirth && touched.dateOfBirth ? "is-invalid" : ""}`}
              />
              <ErrorMessage name="dateOfBirth" component="div" className="invalid-feedback" />
            </div>

            {/* Current Salary */}
            <div className="form-group col-lg-6">
              <label>Current Salary</label>
              <Field
                type="text"
                name="currentSalary"
                className={`form-control ${errors.currentSalary && touched.currentSalary ? "is-invalid" : ""}`}
                placeholder="Enter current salary"
              />
              <ErrorMessage name="currentSalary" component="div" className="invalid-feedback" />
            </div>

            {/* Expected Salary */}
            <div className="form-group col-lg-6">
              <label>Expected Salary</label>
              <Field
                type="text"
                name="expectedSalary"
                className={`form-control ${errors.expectedSalary && touched.expectedSalary ? "is-invalid" : ""}`}
                placeholder="Enter expected salary"
              />
              <ErrorMessage name="expectedSalary" component="div" className="invalid-feedback" />
            </div>

            {/* Gender */}
            <div className="form-group col-lg-6">
              <label>Gender</label>
                <Field
                    as="select"
                    name="gender"
                    className={`form-control ${errors.gender && touched.gender ? "is-invalid" : ""}`}
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                </Field>
              <ErrorMessage name="gender" component="div" className="invalid-feedback" />
            </div>

            {/* Languages */}
            <div className="form-group col-lg-6">
              <label>Languages</label>
              <Field
                type="text"
                name="languages"
                className={`form-control ${errors.languages && touched.languages ? "is-invalid" : ""}`}
                placeholder="Enter languages"
              />
              <ErrorMessage name="languages" component="div" className="invalid-feedback" />
            </div>

            {/* Qualification */}
            <div className="form-group col-lg-6">
              <label>Qualification</label>
              <Field
                type="text"
                name="qualification"
                className={`form-control ${errors.qualification && touched.qualification ? "is-invalid" : ""}`}
                placeholder="Enter qualification"
              />
              <ErrorMessage name="qualification" component="div" className="invalid-feedback" />
            </div>

            {/* Social Links */}
            <div className="form-group col-lg-6">
              <label>Facebook</label>
              <Field
                type="url"
                name="facebook"
                className={`form-control ${errors.facebook && touched.facebook ? "is-invalid" : ""}`}
                placeholder="Facebook URL"
              />
              <ErrorMessage name="facebook" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group col-lg-6">
              <label>Twitter</label>
              <Field
                type="url"
                name="twitter"
                className={`form-control ${errors.twitter && touched.twitter ? "is-invalid" : ""}`}
                placeholder="Twitter URL"
              />
              <ErrorMessage name="twitter" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group col-lg-6">
              <label>LinkedIn</label>
              <Field
                type="url"
                name="linkedIn"
                className={`form-control ${errors.linkedIn && touched.linkedIn ? "is-invalid" : ""}`}
                placeholder="LinkedIn URL"
              />
              <ErrorMessage name="linkedIn" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group col-lg-6">
              <label>Instagram</label>
              <Field
                type="url"
                name="instagram"
                className={`form-control ${errors.instagram && touched.instagram ? "is-invalid" : ""}`}
                placeholder="Instagram URL"
              />
              <ErrorMessage name="instagram" component="div" className="invalid-feedback" />
            </div>

            {/* Professional Skills */}
            <div className="form-group col-lg-12">
              <label>Professional Skills</label>
              <Field
                as="textarea"
                name="professionalSkills"
                className={`form-control ${errors.professionalSkills && touched.professionalSkills ? "is-invalid" : ""}`}
                placeholder="Enter professional skills"
              />
              <ErrorMessage name="professionalSkills" component="div" className="invalid-feedback" />
            </div>

            {/* Submit Button */}
            <div className="form-group col-lg-12" style={{ marginTop: "10px" }}>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}