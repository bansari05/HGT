import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { setUser } from "../../../../store/userSlice";

const validationSchema = Yup.object({
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initialValues = {
    emailId: "",
    password: "",
  };


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/User/Login",
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (data.status === 1) {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();

        document.body.classList.remove("modal-open");
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "";

        localStorage.setItem("authToken", data?.data?.access_token);
        localStorage.setItem("userData", JSON.stringify(data?.data));
        dispatch(setUser(data?.data));
        navigate("/employers-dashboard/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to HGT</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="default-form">
            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>
              <Field
                type="email"
                name="emailId"
                placeholder="Email Address"
                className="form-control"
              />
              <ErrorMessage
                name="emailId"
                component="div"
                className="invalid-feedback d-block"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback d-block"
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="form-group">
              <div className="field-outer">
                <div className="input-group checkboxes square">
                  <input type="checkbox" name="remember-me" id="remember" />
                  <label htmlFor="remember" className="remember">
                    <span className="custom-checkbox"></span> Remember me
                  </label>
                </div>
                <a href="#" className="pwd">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div className="form-group">
              <button
                type="submit"
                className="theme-btn btn-style-one"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Bottom Section */}
      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            to="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>
        {/* 
        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial /> */}
      </div>
    </div>
  );
};

export default FormContent;