import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Map from "../../../Map";

const validationSchema = Yup.object({
  job_title: Yup.string().required("Job title is required"),
  job_description: Yup.string().required("Job description is required"),
  email_id: Yup.string().email("Invalid email format").required("Email is required"),
  company_name: Yup.string().required("Company name is required"),
  specialisms: Yup.array().min(1, "At least one specialism is required"),
  job_type: Yup.string().required("Job type is required"),
  salary: Yup.string().required("Salary is required"),
  career_level: Yup.string().required("Career level is required"),
  experience: Yup.string().required("Experience is required"),
  gender: Yup.string().required("Gender is required"),
  industry: Yup.string().required("Industry is required"),
  qualification: Yup.string().required("Qualification is required"),
  dead_line_date: Yup.string().required("Deadline date is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  pincode: Yup.string().required("Pincode is required"),
  findOnMap: Yup.string().required("Map URL is required"),
  lat: Yup.string().required("Latitude is required"),
  long: Yup.string().required("Longitude is required"),
});

const PostBoxForm = () => {
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const { jobId } = useParams();
  const navigate = useNavigate();
   const [jobCategoryOptions, setJobCategoryOptions] = useState([]);

  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    email_id: "",
    company_name: "",
    specialisms: [],
    job_type: "",
    salary: "",
    career_level: "",
    experience: "",
    gender: "",
    industry: "",
    qualification: "",
    dead_line_date: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    findOnMap: "",
    lat: "",
    long: ""
  });


  useEffect(() => {
    if (jobId) {
      const editJobData = localStorage.getItem("editJobData");
      if (editJobData) {
        const jobData = JSON.parse(editJobData);
        setFormData({
          job_title: jobData.job_title || "",
          job_description: jobData.job_description || "",
          email_id: jobData.email_id || "",
          company_name: jobData.company_name || "",
          specialisms: jobData.specialisms
            ? typeof jobData.specialisms === 'string'
              ? jobData.specialisms.split(',').map(s => s.trim())
              : jobData.specialisms
            : [],
          job_type: jobData.job_type_id ? String(jobData.job_type_id) : "",
          salary: jobData.salary || "",
          career_level: jobData.career_level || "",
          experience: String(jobData.experience) || "",
          gender: jobData.gender || "",
          industry: jobData.industry || "",
          qualification: jobData.qualification || "",
          dead_line_date: jobData.dead_line_date
            ? jobData.dead_line_date.split('T')[0]
            : "",
          country: jobData.country || "",
          state: jobData.state || "",
          city: jobData.city || "",
          address: jobData.address || "",
          pincode: jobData.pincode || "",
          findOnMap: jobData.find_on_map || "",
          lat: jobData.lat || "",
          long: jobData.long || ""
        });
      }
    }
  }, [jobId]);

  const fetchJobCategories = async () => {
      try {
        const response = await fetch("http://localhost:5009/api/v1/JobCategory/SelectActive", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
        });

        const result = await response.json();
        if (result.status === 1) {
          const categories = result.data.map(category => ({
            value: category.job_category_id,
            label: category.job_category
          }));
          setJobCategoryOptions(categories);
        } else {
          console.warn("Failed to load job categories");
        }
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    const fetchJobTypes = async () => {
      try {
        const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobType/SelectAll", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
        });
        fetchJobCategories();
        const result = await response.json();
        if (result.status === 1) {
          setJobTypeOptions(result.data);
        } else {
          console.warn("Failed to load job types");
        }
      } catch (error) {
        console.error("Error fetching job types:", error);
      }
    };

  useEffect(() => {
    fetchJobTypes();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const specialismsFormatted = Array.isArray(values.specialisms)
        ? values.specialisms.join(',')
        : values.specialisms;

      const body = {
        jobTitle: values.job_title,
        jobDescription: values.job_description,
        emailId: values.email_id,
        companyName: values.company_name,
        specialisms: specialismsFormatted,
        jobTypeId: values.job_type,
        salary: values.salary,
        careerLevel: values.career_level,
        experience: values.experience,
        gender: values.gender,
        industry: values.industry,
        qualification: values.qualification,
        deadLineDate: values.dead_line_date,
        country: values.country,
        state: values.state,
        city: values.city,
        address: values.address,
        pincode: values.pincode,
        findOnMap: values.findOnMap,
        lat: values.lat,
        long: values.long
      };

      const isUpdate = !!jobId;

      if (isUpdate) {
        body.jobId = parseInt(jobId, 10);
        console.log("Updating job with ID:", jobId);
      }

      const url = isUpdate
        ? 'https://apihgt.solvifytech.in/api/v1/Job/Update'
        : 'https://apihgt.solvifytech.in/api/v1/Job/Add';

      const method = isUpdate ? 'PUT' : 'POST';

      console.log(`Making ${method} request to ${url}`);

      const response = await fetch(url, {
        method: method,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM'
        },
        body: JSON.stringify(body)
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        data = { message: "Invalid response format from server" };
      }

      if (response.ok) {
        navigate("/employers-dashboard/manage-jobs");
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // const specialisms = [
  //   { value: "Banking", label: "Banking" },
  //   { value: "Digital & Creative", label: "Digital & Creative" },
  //   { value: "Retail", label: "Retail" },
  //   { value: "Human Resources", label: "Human Resources" },
  //   { value: "Management", label: "Management" },
  //   { value: "Accounting & Finance", label: "Accounting & Finance" },
  //   { value: "Digital", label: "Digital" },
  //   { value: "Creative Art", label: "Creative Art" },
  // ];

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="default-form">
          <div className="row">
            {/* Job Title */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Job Title</label>
              <Field
                type="text"
                name="job_title"
                placeholder="Title"
                className={`form-control ${errors.job_title && touched.job_title ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="job_title" component="div" className="invalid-feedback" />
            </div>

            {/* Job Description */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Job Description</label>
              <Field
                as="textarea"
                name="job_description"
                placeholder="Enter job description"
                className={`form-control ${errors.job_description && touched.job_description ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="job_description" component="div" className="invalid-feedback" />
            </div>

            {/* Email Address */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Email address</label>
              <Field
                type="email"
                name="email_id"
                placeholder="hr@example.com"
                className={`form-control ${errors.email_id && touched.email_id ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="email_id" component="div" className="invalid-feedback" />
            </div>

            {/* Company Name */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Company Name</label>
              <Field
                type="text"
                name="company_name"
                placeholder="Company Name"
                className={`form-control ${errors.company_name && touched.company_name ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="company_name" component="div" className="invalid-feedback" />
            </div>

            {/* Specialisms */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Specialisms</label>
              <Select
                isMulti
                name="specialisms"
                options={jobCategoryOptions} // Change to use jobCategoryOptions
                className={`basic-multi-select ${errors.specialisms && touched.specialisms ? 'is-invalid' : ''}`}
                classNamePrefix="select"
                value={jobCategoryOptions.filter((category) => 
                  values.specialisms.includes(String(category.value))
                )}
                onChange={(selectedOptions) => 
                  setFieldValue('specialisms', selectedOptions.map(option => String(option.value)))
                }
                onBlur={() => setFieldValue('specialisms', values.specialisms, true)}
              />
              {errors.specialisms && touched.specialisms && (
                <div className="invalid-feedback d-block">{errors.specialisms}</div>
              )}
            </div>

            {/* Job Type */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Job Type</label>
              <Field
                as="select"
                name="job_type"
                className={`form-select ${errors.job_type && touched.job_type ? 'is-invalid' : ''}`}
              >
                {jobTypeOptions.map((type) => (
                  <option key={type.job_type_id} value={type.job_type_id}>
                    {type.job_type}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="job_type" component="div" className="invalid-feedback" />
            </div>


            {/* Offered Salary */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Offered Salary</label>
              <Field
                type="text"
                name="salary"
                placeholder="Enter offered salary"
                className={`form-control ${errors.salary && touched.salary ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="salary" component="div" className="invalid-feedback" />
            </div>

            {/* Career Level */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Career Level</label>
              <Field
                type="text"
                name="career_level"
                placeholder="Enter career level"
                className={`form-control ${errors.career_level && touched.career_level ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="career_level" component="div" className="invalid-feedback" />
            </div>

            {/* Experience */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Experience</label>
              <Field
                type="text"
                name="experience"
                placeholder="Enter experience"
                className={`form-control ${errors.experience && touched.experience ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="experience" component="div" className="invalid-feedback" />
            </div>


            {/* Gender */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Gender</label>
              <Field
                as="select"
                name="gender"
                className={`form-select ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="invalid-feedback" />
            </div>

            {/* Industry */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Industry</label>
              <Field
                type="text"
                name="industry"
                placeholder="Enter industry"
                className={`form-control ${errors.industry && touched.industry ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="industry" component="div" className="invalid-feedback" />
            </div>


            {/* Qualification */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Qualification</label>
              <Field
                as="select"
                name="qualification"
                className={`form-select ${errors.qualification && touched.qualification ? 'is-invalid' : ''}`}
              >
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </Field>
              <ErrorMessage name="qualification" component="div" className="invalid-feedback" />
            </div>

            {/* Application Deadline Date */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Application Deadline Date</label>
              <Field
                type="text"
                name="dead_line_date"
                placeholder="06.05.2025"
                className={`form-control ${errors.dead_line_date && touched.dead_line_date ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="dead_line_date" component="div" className="invalid-feedback" />
            </div>


            {/* Country */}
            <div className="form-group col-lg-4 col-md-12">
              <label>Country</label>
              <Field
                as="select"
                name="country"
                className={`form-select ${errors.country && touched.country ? 'is-invalid' : ''}`}
              >
                <option value="">Select</option>
                <option value="Australia">Australia</option>
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
              </Field>
              <ErrorMessage name="country" component="div" className="invalid-feedback" />
            </div>

            {/* State */}
            <div className="form-group col-lg-4 col-md-12">
              <label>State</label>
              <Field
                type="text"
                name="state"
                placeholder="State"
                className={`form-control ${errors.state && touched.state ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="state" component="div" className="invalid-feedback" />
            </div>

            {/* City */}
            <div className="form-group col-lg-4 col-md-12">
              <label>City</label>
              <Field
                type="text"
                name="city"
                placeholder="City"
                className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="city" component="div" className="invalid-feedback" />
            </div>

            {/* Complete Address */}
            <div className="form-group col-lg-8 col-md-12">
              <label>Complete Address</label>
              <Field
                type="text"
                name="address"
                placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="address" component="div" className="invalid-feedback" />
            </div>

            {/* Pincode */}
            <div className="form-group col-lg-4 col-md-12">
              <label>Pincode</label>
              <Field
                type="text"
                name="pincode"
                placeholder="Pincode/ZIP"
                className={`form-control ${errors.pincode && touched.pincode ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
            </div>

            {/* Find On Map */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Find On Map</label>
              <Field
                type="text"
                name="findOnMap"
                placeholder="Map URL"
                className={`form-control ${errors.findOnMap && touched.findOnMap ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="findOnMap" component="div" className="invalid-feedback" />
            </div>

            {/* Latitude */}
            <div className="form-group col-lg-3 col-md-12">
              <label>Latitude</label>
              <Field
                type="text"
                name="lat"
                placeholder="Latitude"
                className={`form-control ${errors.lat && touched.lat ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="lat" component="div" className="invalid-feedback" />
            </div>

            {/* Longitude */}
            <div className="form-group col-lg-3 col-md-12">
              <label>Longitude</label>
              <Field
                type="text"
                name="long"
                placeholder="Longitude"
                className={`form-control ${errors.long && touched.long ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="long" component="div" className="invalid-feedback" />
            </div>

            {/* Search Location Button */}
            <div className="form-group col-lg-12 col-md-12">
              <button type="button" className="theme-btn btn-style-three">Search Location</button>
            </div>

            {/* Map */}
            <div className="form-group col-lg-12 col-md-12">
              <div className="map-outer">
                <div style={{ height: "420px", width: "100%" }}>
                  <Map />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-group col-lg-12 col-md-12 text-right">
              {/* <button type="submit" className="theme-btn btn-style-one">Submit Job</button> */}
              <button type="submit" className="theme-btn btn-style-one">
                {jobId ? 'Update Job' : 'Submit Job'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostBoxForm;



