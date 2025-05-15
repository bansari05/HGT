import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    profile_picture: Yup.mixed().required('Profile picture is Required'),
    name: Yup.string().required('Name is Required'),
    gender: Yup.string().required('Gender is Required'),
    dob: Yup.date().required('Date of Birth is Required'),
    address: Yup.string().required('Address is Required'),
    languages: Yup.string().required('Language is Required'),
    education_level: Yup.string().required('Education is Required'),
    experience: Yup.string().required('Experience is Required'),
    current_salary: Yup.number().required('Current Salary is Required'),
    expected_salary: Yup.number().required('Expected Salary is Required'),
    professional_skills: Yup.string().required('Professional Skill is Required'),
    facebook: Yup.string().url('Invalid URL').required('Facebook URL is Required'),
    instagram: Yup.string().url('Invalid URL').required('Instagram URL is Required'),
    linkedin: Yup.string().url('Invalid URL').required('Linkedin URL is Required'),
    twitter: Yup.string().url('Invalid URL').required('Twitter URL is Required'),
});

const initialValues = {
    profile_picture: null,
    name: '',
    gender: '',
    dob: '',
    address: '',
    languages: '',
    education_level: '',
    experience: '',
    current_salary: '',
    expected_salary: '',
    professional_skills: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
};

export default function UserForm() {
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = (values) => {
        console.log(values);
    };

    const handleImageChange = (event, setFieldValue, setPreviewImage) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue('profile_picture', file); // Update form value (if needed)

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Update preview image state
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null); // Clear preview if no file selected
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values, errors, touched }) => (
                <Form className="default-form">
                    <div className="row">
                        {/* Profile Picture */}
                        <div className="form-group col-lg-12" style={{ display: 'flex', marginBottom: '15px' }}>
                            <div className="profile-image-upload" style={{ position: 'relative' }}>
                                <input
                                    type="file"
                                    name="profile_picture"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={(event) => handleImageChange(event, setFieldValue, setPreviewImage)}
                                />

                                <div className="profile-preview" onClick={triggerFileSelect} style={{ cursor: 'pointer', position: 'relative', width: '96px', height: '96px' }}>
                                    <figure className="image is-96x96" style={{ margin: 0, width: '96px', height: '96px' }}>
                                        <img
                                            src={previewImage ? previewImage : "/public/images/user.jpg"}
                                            alt={previewImage ? "Profile Preview" : "Default Avatar"}
                                            style={{ objectFit: 'cover', borderRadius: '50%', border: '1px solid #ccc', width: '100%', height: '100%' }}
                                        />
                                    </figure>
                                    <div className="upload-icon-overlay" style={{ position: 'absolute', bottom: '0px', right: '-10px', backgroundColor: '#04598b', color: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', cursor: 'pointer', border: '2px solid white' }}>
                                        <span className="plus-icon" style={{ fontSize: '20px' }}>+</span>
                                    </div>
                                </div>
                                {errors.profile_picture && touched.profile_picture && (
                                    <div className="error-message" style={{ color: 'red', marginTop: '5px', fontSize: '12px', textAlign: 'center' }}>{errors.profile_picture}</div>
                                )}
                            </div>
                        </div>



                        {/* Name */}
                        <div className="form-group col-lg-6">
                            <label>Name</label>
                            <Field
                                type="text"
                                name="name"
                                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                placeholder="Enter Your Name"
                            />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        {/* Gender */}
                        <div className="form-group col-lg-6">
                            <label>Gender</label>
                            <Field as="select" name="gender" className={`form-control ${errors.gender && touched.gender ? 'is-invalid' : ''}`}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                        </div>

                        {/* Date of Birth */}
                        <div className="form-group col-lg-6">
                            <label>Date of Birth</label>
                            <Field
                                type="text"
                                name="dob"
                                className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`}
                                placeholder="05.15.2025"
                            />
                            <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                        </div>

                        {/* Address */}
                        <div className="form-group col-lg-6">
                            <label>Address</label>
                            <Field
                                type="text"
                                name="address"
                                className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                                placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                            />
                            <ErrorMessage name="address" component="div" className="invalid-feedback" />
                        </div>

                        {/* Languages */}
                        <div className="form-group col-lg-6">
                            <label>Languages</label>
                            <Field
                                type="text"
                                name="languages"
                                placeholder="English, Hindi"
                                className={`form-control ${errors.languages && touched.languages ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="languages" component="div" className="invalid-feedback" />
                        </div>

                        {/* Education Level */}
                        <div className="form-group col-lg-6">
                            <label>Education Level</label>
                            <Field
                                type="text"
                                name="education_level"
                                className={`form-control ${errors.education_level && touched.education_level ? 'is-invalid' : ''}`}
                                placeholder="Bachelor's Degree in Computer Science"
                            />
                            <ErrorMessage name="education_level" component="div" className="invalid-feedback" />
                        </div>

                        {/* Experience */}
                        <div className="form-group col-lg-6">
                            <label>Experience (in years)</label>
                            <Field
                                type="number"
                                name="experience"
                                placeholder="3"
                                className={`form-control no-spinner ${errors.experience && touched.experience ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="experience" component="div" className="invalid-feedback" />
                        </div>

                        {/* Current Salary */}
                        <div className="form-group col-lg-6">
                            <label>Current Salary</label>
                            <Field
                                type="number"
                                name="current_salary"
                                placeholder="25,000"
                                className={`form-control no-spinner ${errors.current_salary && touched.current_salary ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="current_salary" component="div" className="invalid-feedback" />
                        </div>

                        {/* Expected Salary */}
                        <div className="form-group col-lg-6">
                            <label>Expected Salary</label>
                            <Field
                                type="number"
                                name="expected_salary"
                                placeholder="42,000"
                                className={`form-control no-spinner ${errors.expected_salary && touched.expected_salary ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="expected_salary" component="div" className="invalid-feedback" />
                        </div>

                        {/* Professional Skills */}
                        <div className="form-group col-lg-6">
                            <label>Professional Skills</label>
                            <Field
                                type="text"
                                name="professional_skills"
                                placeholder="ReactJs"
                                className={`form-control ${errors.professional_skills && touched.professional_skills ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="professional_skills" component="div" className="invalid-feedback" />
                        </div>

                        {/* Social Links */}
                        <div className="form-group col-lg-6">
                            <label>Facebook</label>
                            <Field type="url" name="facebook" placeholder="userName" className={`form-control ${errors.facebook && touched.facebook ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="facebook" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Instagram</label>
                            <Field type="url" name="instagram" placeholder="userName" className={`form-control ${errors.instagram && touched.instagram ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="instagram" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-lg-6">
                            <label>LinkedIn</label>
                            <Field type="url" name="linkedin" placeholder="userName" className={`form-control ${errors.linkedin && touched.linkedin ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="linkedin" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Twitter</label>
                            <Field type="url" name="twitter" placeholder="userName" className={`form-control ${errors.twitter && touched.twitter ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="twitter" component="div" className="invalid-feedback" />
                        </div>

                        {/* Submit Button */}
                        <div className="form-group col-lg-12 col-md-12 text-right">
                            <button type="submit" className="theme-btn btn-style-one">
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}