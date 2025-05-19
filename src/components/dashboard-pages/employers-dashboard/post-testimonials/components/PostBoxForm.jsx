import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  designation: Yup.string().required("Designation is required"),
  description: Yup.string().required("Description is required"),
  imageFile: Yup.mixed()
    .test('fileSize', 'File too large (max 10MB)', value =>
      !value || (value && value.size <= 1024 * 1024 * 10)
    )
    .test('fileType', 'Unsupported file format', value =>
      !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
    )
});

const TestimonialPostForm = () => {
  const { testimonialId } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonialData = async () => {
      if (testimonialId) {
        try {
          const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Testimonial/SelectById/${testimonialId}`, {
            headers: {
              Authorization: "Bearer YOUR_TOKEN_HERE"
            }
          });
          const data = await response.json();

          if (data.status === 1) {
            setInitialValues({
              title: data.data.title,
              name: data.data.name,
              designation: data.data.designation,
              description: data.data.description,
              imageFile: null,
              image: data.data.image || ""
            });
          }
        } catch (error) {
          console.error("Error fetching testimonial data:", error);
        }
      } else {
        setInitialValues({
          title: "",
          name: "",
          designation: "",
          description: "",
          imageFile: null,
          image: ""
        });
      }
      setLoading(false);
    };

    fetchTestimonialData();
  }, [testimonialId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    formData.append("description", values.description);
    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }

    try {
      const url = testimonialId
        ? `https://apihgt.solvifytech.in/api/v1/Testimonial/Update/${testimonialId}`
        : "https://apihgt.solvifytech.in/api/v1/Testimonial/Add";

      const method = testimonialId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: formData
      });

      if (response.ok) {
        navigate("/employers-dashboard/testimonial");
      } else {
        console.error("Error submitting testimonial:", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="default-form">
          <div className="row">
            {/* Title */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Testimonial Title</label>
              <Field
                name="title"
                type="text"
                className="form-control"
                placeholder="Enter testimonial title"
              />
              <ErrorMessage name="title" component="div" className="invalid-feedback" />
            </div>

            {/* Name */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Name</label>
              <Field
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter person's name"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            {/* Designation */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Designation</label>
              <Field
                name="designation"
                type="text"
                className="form-control"
                placeholder="Enter person's designation"
              />
              <ErrorMessage name="designation" component="div" className="invalid-feedback" />
            </div>

            {/* Image Upload */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Featured Image (Max 10MB)</label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                className="form-control"
                accept="image/jpeg, image/png"
                onChange={(e) => setFieldValue("imageFile", e.currentTarget.files[0])}
              />
              <ErrorMessage name="imageFile" component="div" className="invalid-feedback" />

              {testimonialId && initialValues.image && (
                <div className="mt-2">
                  <span>Current Image: </span>
                  <a
                    href={`https://apihgt.solvifytech.in/${initialValues.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </div>
              )}
            </div>

            {/* Description Editor */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Testimonial Description</label>
              <Field name="description">
                {({ field, form }) => (
                  <>
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(newContent) => form.setFieldValue("description", newContent)}
                    />
                    {form.touched.description && form.errors.description && (
                      <div className="invalid-feedback d-block">{form.errors.description}</div>
                    )}
                  </>
                )}
              </Field>
            </div>

            {/* Submit Button */}
            <div className="form-group col-lg-12 col-md-12 text-right">
              <button
                type="submit"
                className="theme-btn btn-style-one"
                disabled={isSubmitting}
              >
                {testimonialId ? "Update Testimonial" : "Publish Testimonial"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TestimonialPostForm;