import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";

const formValidation = Yup.object({
  jobTitle: Yup.string().max(30, "Job title length should be less than or equal to 30 characters.").required("Job title is required."),
  jobDescription: Yup.string().max(500, "Job description length should be less than or equal to 500 characters.").required("Job description is required."),
  specialisms: Yup.array()
    .min(1, "Select at least one specialism")
    .required("Specialisms is required."),
  jobType: Yup.array()
    .min(1, "Select at least one job type")
    .required("Required"),
  jobCategory: Yup.string().max(200, "Job category should be less than or equal to 200 characters.").required("Job category is required."),
  salary: Yup.string().max(20, "Salary length should be less than or equal to 20 characters.").required("Salary is required."),
  careerLevel: Yup.string().max(20, "Career level length should be less than or equal to 20 characters.").required("Career level is required."),
  experience: Yup.number().moreThan(-1, "Invalid experience.").required("Experience is required."),
  gender: Yup.string().trim().required('Gender is required.').oneOf(['Male', 'Female', 'Other'], 'Gender must be one of Male, Female or Other.'),
  industry: Yup.string().max(200, "Industry should be less than or equal to 200 characters.").required("Industry is required."),
  qualification: Yup.string().max(50, "Qualification should be less than or equal to 50 characters.").required("Qualification is required."),
  deadLineDate: Yup.string().required("Deadline date is required"),
  country: Yup.string().max(50, "Country should be less than or equal to 50 characters.").required("Country is required."),
  state: Yup.string().max(50, "State should be less than or equal to 50 characters.").required("State is required."),
  city: Yup.string().max(50, "City should be less than or equal to 50 characters.").required("City is required."),
  address: Yup.string().max(500, "Address should be less than or equal to 500 characters.").required("Address is required"),
  pincode: Yup.string().max(30, "Pincode should be less than or equal to 30 characters.").required("Pincode is required")
});

const PostBoxForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobCategoryOptions, setJobCategoryOptions] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [initialValues, setInitialValues] = useState({
    jobTitle: "",
    jobDescription: "",
    specialisms: [],
    jobType: [],
    jobCategory: "",
    salary: "",
    careerLevel: "",
    experience: 0,
    gender: "",
    industry: "",
    qualification: "",
    deadLineDate: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: ""
  });

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Country/SelectActive");
      const result = await response.json();
      switch (result.status) {
        case 1:
          const countries = result.data.map((country) => ({
            value: country.country_id,
            label: country.country,
          }));
          setCountryOptions(countries);
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchJobCategories = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobCategory/SelectActive");
      const result = await response.json();
      switch (result.status) {
        case 1:
          const categories = result.data.map((category) => ({
            value: category.job_category_id,
            label: category.job_category,
          }));
          setJobCategoryOptions(categories);
          fetchCountries();
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchQualifications = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Qualification/SelectActive");
      const result = await response.json();
      switch (result.status) {
        case 1:
          const qualifications = result.data.map((qualification) => ({
            value: qualification.qualification_id,
            label: qualification.qualification,
          }));
          setQualifications(qualifications);
          fetchJobCategories();
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchIndustries = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Industry/SelectActive");
      const result = await response.json();
      switch (result.status) {
        case 1:
          const industries = result.data.map(industry => ({
            value: industry.industry_id,
            label: industry.industry
          }));
          setIndustryOptions(industries);
          fetchQualifications();
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchJobTypes = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobType/SelectActive");
      const result = await response.json();
      switch (result.status) {
        case 1:
          const jobTypes = result.data.map((jobType) => ({
            value: jobType.job_type_id,
            label: jobType.job_type
          }));
          setJobTypeOptions(jobTypes);
          fetchIndustries();
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const getJobData = async (jobId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Job/SelectById/${jobId}`, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      const data = result?.data;
      console.log("data", data);

      switch (result.status) {
        case 1:
          setInitialValues((prev) => ({
            ...prev,
            jobTitle: data?.job_title,
            jobDescription: data?.job_description,
            jobCategory: data?.job_category,
            specialisms: data.specialisms
              ? typeof data.specialisms === "string"
                ? data.specialisms.split(",").map((s) => s.trim())
                : data.specialisms
              : [],
            jobType: data?.job_type ? String(data.job_type) : "",
            salary: data?.salary || "",
            careerLevel: data?.career_level || "",
            experience: String(data?.experience) || "",
            gender: data?.gender || "",
            industry: data?.industry || "",
            qualification: data?.qualification || "",
            deadLineDate: data?.dead_line_date
              ? data?.dead_line_date.split("T")[0]
              : "",
            country: data?.country || "",
            state: data?.state || "",
            city: data?.city || "",
            address: data?.address || "",
            pincode: data?.pincode || ""
          }))
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Invalid access token.");
    }
    if (jobId) {
      getJobData(jobId);
    }
    fetchJobTypes();
  }, []);

  const fetchState = async (selectedCountryId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/State/SelectByCountryId/${selectedCountryId}`, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();

      switch (result?.status) {
        case 1:
          const states = result.data.map((state) => ({
            value: state.state_id,
            label: state.state,
          }));
          setStateOptions(states);
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  const fetchCity = async (selectedCity) => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/City/SelectActive");
      const result = await response.json();
      switch (result.status) {
        case 1:
          const city = result.data.map((cities) => ({
            value: cities.city_id,
            label: cities.city,
          }));
          setCityOptions(city);
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("authToken");
      const body = {
        jobTitle: values.jobTitle,
        jobDescription: values.jobDescription,
        specialisms: values.specialisms.join(","),
        jobType: values.jobType.join(","),
        salary: values.salary,
        careerLevel: values.careerLevel,
        experience: values.experience,
        gender: values.gender,
        jobCategory: values.jobCategory,
        industry: values.industry,
        qualification: values.qualification,
        deadLineDate: values.deadLineDate,
        country: values.country,
        state: values.state,
        city: values.city,
        address: values.address,
        pincode: values.pincode
      };

      const isUpdate = !!jobId;

      if (isUpdate) {
        body.jobId = parseInt(jobId, 10);
      }

      const url = isUpdate ? "https://apihgt.solvifytech.in/api/v1/Job/Update" : "https://apihgt.solvifytech.in/api/v1/Job/Add";

      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidation}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(prop) => (
        <Form className="default-form">
          <div className="row">
            {/* Job Title */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Job Title</label>
              <Field
                type="text"
                name="jobTitle"
                placeholder="Title"
                className={`form-control ${prop.errors.jobTitle && prop.touched.jobTitle ? "is-invalid" : ""}`}
              />
              <ErrorMessage name="jobTitle" component="div" className="invalid-feedback" />
            </div>

            {/* Job Description */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Job Description</label>
              <Field
                as="textarea"
                name="jobDescription"
                placeholder="Enter job description"
                className={`form-control ${prop.errors.jobDescription && prop.touched.jobDescription ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="jobDescription"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Specialisms */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Specialisms</label>
              <Select
                isMulti
                name="specialisms"
                placeholder="Select specialisms"
                options={jobCategoryOptions}
                value={jobCategoryOptions.filter(option =>
                  prop.values.specialisms.includes(option.label)
                )}
                onChange={(selected) =>
                  prop.setFieldValue(
                    "specialisms",
                    selected.map(option => option.label)
                  )
                }
                onBlur={() => prop.setFieldTouched("specialisms", true)}
                className={`basic-multi-select ${prop.errors.specialisms && prop.touched.specialisms ? "is-invalid" : ""}`}
                classNamePrefix="select"
              />
              <ErrorMessage
                name="specialisms"
                component="div"
                className="invalid-feedback d-block"
              />
            </div>

            {/* Job Type */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Job Type</label>
              <Select
                isMulti
                name="jobType"
                placeholder="Select job type"
                options={jobTypeOptions}
                value={jobTypeOptions.filter(option =>
                  prop.values.jobType.includes(option.label)
                )}
                onChange={(selected) =>
                  prop.setFieldValue(
                    "jobType",
                    selected.map(option => option.label)
                  )
                }
                onBlur={() => prop.setFieldTouched("jobType", true)}
                className={`basic-multi-select ${prop.errors.jobType && prop.touched.jobType ? "is-invalid" : ""
                  }`}
                classNamePrefix="select"
              />
              <ErrorMessage
                name="jobType"
                component="div"
                className="invalid-feedback d-block"
              />
            </div>

            {/* Job Category */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Job Category</label>
              <Field
                as="select"
                name="jobCategory"
                className={`form-select ${prop.errors.jobCategory && prop.touched.jobCategory ? "is-invalid" : ""}`}
              >
                <option value="">Select job category</option>
                {
                  jobCategoryOptions?.map((type) => (
                    <option key={type.value + type.label} value={type.label}>
                      {type.label}
                    </option>
                  ))
                }
              </Field>
              <ErrorMessage
                name="jobCategory"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Salary */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Salary</label>
              <Field
                type="number"
                name="salary"
                placeholder="Enter salary"
                className={`form-control ${prop.errors.salary && prop.touched.salary ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="salary"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Career Level */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Career Level</label>
              <Field
                type="text"
                name="careerLevel"
                placeholder="Enter career level"
                className={`form-control ${prop.errors.careerLevel && prop.touched.careerLevel ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="careerLevel"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Experience */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Experience</label>
              <Field
                type="number"
                name="experience"
                placeholder="Enter experience"
                className={`form-control ${prop.errors.experience && prop.touched.experience ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Gender */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Gender</label>
              <Field
                as="select"
                name="gender"
                className={`form-select ${prop.errors.gender && prop.touched.gender ? "is-invalid" : ""}`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Industry */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Industry</label>
              <Field
                as="select"
                name="industry"
                className={`form-select ${prop.errors.industry && prop.touched.industry ? "is-invalid" : ""}`}
              >
                <option value="">Select industry</option>
                {
                  industryOptions?.map((val) => (
                    <option key={val.value + val.label} value={val.label}>
                      {val.label}
                    </option>
                  ))
                }
              </Field>
              <ErrorMessage name="industry" component="div" className="invalid-feedback" />
            </div>

            {/* Qualification */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Qualification</label>
              <Field
                as="select"
                name="qualification"
                className={`form-select ${prop.errors.qualification && prop.touched.qualification ? "is-invalid" : ""}`}
              >
                <option value="">Select qualification</option>
                {qualifications.map((q) => (
                  <option key={q.value + q?.label} value={q.label}>
                    {q.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="qualification"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Application Deadline Date */}
            <div className="form-group col-md-12 col-lg-6">
              <label>Application Deadline Date</label>
              <Field
                type="date"
                name="deadLineDate"
                style={{ backgroundColor: "#f0f5f7", height: "62px" }}
                className={`form-control ${prop.errors.deadLineDate && prop.touched.deadLineDate ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="deadLineDate"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Country */}
            <div className="form-group col-lg-4 col-md-12">
              <label>Country</label>
              <Field
                as="select"
                name="country"
                className={`form-select ${prop.errors.country && prop.touched.country ? "is-invalid" : ""}`}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  prop.setFieldValue("country", selectedValue);
                  fetchState(parseInt(selectedValue.slice(-1)));
                }}>
                <option value="">Select</option>
                {
                  countryOptions?.map((val) => (
                    <option key={val?.value + val?.label} value={`${val?.label} ${val?.value}`}>{val?.label}</option>
                  ))
                }
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* State */}
            <div className="form-group col-lg-4 col-md-12">
              <label>State</label>
              <Field
                as="select" // Changed from type="text"
                name="state"
                className={`form-select ${prop.errors.state && prop.touched.state ? "is-invalid" : ""}`}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  prop.setFieldValue("state", selectedValue);
                  fetchCity(selectedValue); // Pass state ID if needed
                }}
              >
                <option value="">Select</option>
                {stateOptions?.map((val) => (
                  <option key={val.value + val.label} value={val.label}> {/* Use value, not label */}
                    {val.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="state" component="div" className="invalid-feedback" />
            </div>

            {/* City */}
            <div className="form-group col-lg-4 col-md-12">
              <label>City</label>
              <Field
                as="select" // Changed from type="text"
                name="city"
                className={`form-select ${prop.errors.city && prop.touched.city ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                {cityOptions?.map((val, index) => (
                  <option key={val.value + index} value={val.label}> {/* Use value, not label */}
                    {val.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="city" component="div" className="invalid-feedback" />
            </div>

            {/* Complete Address */}
            <div className="form-group col-lg-8 col-md-12">
              <label>Complete Address</label>
              <Field
                type="text"
                name="address"
                placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                className={`form-control ${prop.errors.address && prop.touched.address ? "is-invalid" : ""
                  }`}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Pincode */}
            <div className="form-group col-lg-4 col-md-12">
              <label>Pincode</label>
              <Field
                type="text"
                name="pincode"
                placeholder="Pincode/ZIP"
                className={`form-control ${prop.errors.pincode && prop.touched.pincode ? "is-invalid" : ""
                  }`}
              />
              <ErrorMessage
                name="pincode"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Submit Button */}
            <div className="form-group col-lg-12 col-md-12 text-right">
              {/* <button type="submit" className="theme-btn btn-style-one">Submit Job</button> */}
              <button type="submit" className={`theme-btn ${!prop.isValid ? "btn-style-one-disabled" : "btn-style-one"}`}>
                {jobId ? "Update Job" : "Submit Job"}
              </button>
            </div>
          </div>
        </Form>
      )
      }
    </Formik >
  );
};

export default PostBoxForm;
