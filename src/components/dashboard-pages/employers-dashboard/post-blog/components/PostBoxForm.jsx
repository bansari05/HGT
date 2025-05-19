import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Author name is required"),
  content: Yup.string().required("Content is required"),
  imageFile: Yup.mixed()
    .test('fileSize', 'File too large (max 1MB)', value =>
      !value || (value && value.size <= 1024 * 1024)
    )
    .test('fileType', 'Unsupported file format', value =>
      !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
    )
});

const BlogPostForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (blogId) {
        try {
          const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Blog/SelectById/${blogId}`, {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
            }
          });
          const data = await response.json();

          if (data.status === 1) {
            setInitialValues({
              title: data.data.title,
              name: data.data.name,
              content: data.data.content,
              imageFile: null,
              image: data.data.image || ""
            });
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      } else {
        setInitialValues({
          title: "",
          name: "",
          content: "",
          imageFile: null,
          image: ""
        });
      }
      setLoading(false);
    };

    fetchBlogData();
  }, [blogId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("name", values.name);
    formData.append("content", values.content);
    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }

    try {
      const url = blogId
        ? `https://apihgt.solvifytech.in/api/v1/Blog/Update/${blogId}`
        : "https://apihgt.solvifytech.in/api/v1/Blog/Add";

      const method = blogId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: formData
      });

      if (response.ok) {
        navigate("/employers-dashboard/blog");
      } else {
        console.error("Error submitting blog:", await response.json());
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
              <label>Blog Title</label>
              <Field
                name="title"
                type="text"
                className="form-control"
                placeholder="Enter blog title"
              />
              <ErrorMessage name="title" component="div" className="invalid-feedback" />
            </div>

            {/* Author Name */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Author Name</label>
              <Field
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter author name"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            {/* Image Upload */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Featured Image (Max 1MB)</label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                className="form-control"
                accept="image/jpeg, image/png"
                onChange={(e) => setFieldValue("imageFile", e.currentTarget.files[0])}
              />
              <ErrorMessage name="imageFile" component="div" className="invalid-feedback" />

              {blogId && initialValues.image && (
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

            {/* Content Editor */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Blog Content</label>
              <Field name="content">
                {({ field, form }) => (
                  <>
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(newContent) => form.setFieldValue("content", newContent)}
                    />
                    {form.touched.content && form.errors.content && (
                      <div className="invalid-feedback d-block">{form.errors.content}</div>
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
                {blogId ? "Update Blog" : "Publish Blog"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BlogPostForm;
