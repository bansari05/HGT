import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  userId: Yup.number().integer(),
  fullName: Yup.string(),
  contactNo: Yup.string().matches(/^[0-9]+$/, 'Contact number must contain only digits'),
  emailId: Yup.string().email('Invalid email'),
  password: Yup.string(),
  userType: Yup.string().required('User type is required'),
  profilePictureFile: Yup.mixed().test('fileSize', 'File too large (max 10MB)', value => {
    if (!value) return true;
    return value.size <= 10 * 1024 * 1024;
  }),
  profilePicture: Yup.string().nullable(),
  address: Yup.string(),
  dateOfBirth: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  currentSalary: Yup.string(),
  expectedSalary: Yup.string(),
  gender: Yup.string(),
  languages: Yup.string(),
  qualification: Yup.string(),
  facebook: Yup.string().url('Invalid Facebook URL'),
  twitter: Yup.string().url('Invalid Twitter URL'),
  linkedIn: Yup.string().url('Invalid LinkedIn URL'),
  instagram: Yup.string().url('Invalid Instagram URL'),
  professionalSkills: Yup.string(),
});

const userTypeOptions = ['Admin', 'User'];

const UserForm = () => {
  const fileInputRef = useRef(null);
  const [initialValues, setInitialValues] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user_id;

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://apihgt.solvifytech.in/api/v1/User/SelectById/${userId}`, {
          headers: { Authorization: `Bearer ${userData?.access_token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch user data');
        const { data } = await res.json();

        const profilePicUrl = data.profile_picture?.startsWith('http')
          ? data.profile_picture
          : `https://apihgt.solvifytech.in/${data.profile_picture}`;

        setInitialValues({
          userId: data.user_id || userId,
          fullName: data.full_name || '',
          contactNo: data.contact_no || '',
          emailId: data.email_id || '',
          password: data.password || '',
          userType: data.user_type || '',
          profilePictureFile: null,
          profilePicture: data.profile_picture || null,
          address: data.address || '',
          dateOfBirth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
          currentSalary: data.current_salary || '',
          expectedSalary: data.expected_salary || '',
          gender: data.gender || '',
          languages: data.languages || '',
          qualification: data.qualification || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          linkedIn: data.linked_in || '',
          instagram: data.instagram || '',
          professionalSkills: data.professional_skills || '',
        });

        setPreviewImage(profilePicUrl || '/images/user.jpg');
      } catch (error) {
        console.error('Fetch user error:', error);
      }
    }

    if (userId) fetchUser();
  }, [userId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      if (values.profilePictureFile instanceof File) {
        formData.append('profilePictureFile', values.profilePictureFile);
      }

      formData.append('userId', values.userId);
      formData.append('fullName', values.fullName);
      formData.append('contactNo', values.contactNo);
      formData.append('emailId', values.emailId);
      if (values.password) formData.append('password', values.password);
      formData.append('userType', values.userType);
      formData.append('profilePicture', values.profilePicture || '');
      formData.append('address', values.address);
      formData.append('dateOfBirth', values.dateOfBirth);
      formData.append('currentSalary', values.currentSalary);
      formData.append('expectedSalary', values.expectedSalary);
      formData.append('gender', values.gender);
      formData.append('languages', values.languages);
      formData.append('qualification', values.qualification);
      formData.append('facebook', values.facebook);
      formData.append('twitter', values.twitter);
      formData.append('linkedIn', values.linkedIn);
      formData.append('instagram', values.instagram);
      formData.append('professionalSkills', values.professionalSkills);

      const res = await fetch(`https://apihgt.solvifytech.in/api/v1/User/Update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Update failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setFieldValue('profilePictureFile', file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!initialValues) return <p>Loading user data...</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="default-form row">
          {/* Profile Picture Upload */}
          <div className="form-group col-lg-12 text-center">
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(e, setFieldValue)}
            />
            <div onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
              <img
                src={previewImage}
                alt="Profile"
                style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>Click to change profile picture</div>
            </div>
            <ErrorMessage name="profilePictureFile" component="div" className="text-danger" />
          </div>

          {/* All Fields */}
          {[
            { label: 'User ID', name: 'userId', type: 'number', disabled: true },
            { label: 'Full Name', name: 'fullName' },
            { label: 'Contact Number', name: 'contactNo' },
            { label: 'Email', name: 'emailId', type: 'email' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter new password' },
            {
              label: 'User Type',
              name: 'userType',
              type: 'select',
              options: userTypeOptions,
            },
            { label: 'Address', name: 'address' },
            { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
            { label: 'Current Salary', name: 'currentSalary' },
            { label: 'Expected Salary', name: 'expectedSalary' },
            {
              label: 'Gender',
              name: 'gender',
              type: 'select',
              options: ['Male', 'Female', 'Transgender'],
            },
            { label: 'Languages', name: 'languages' },
            { label: 'Qualification', name: 'qualification' },
            { label: 'Facebook URL', name: 'facebook' },
            { label: 'Twitter URL', name: 'twitter' },
            { label: 'LinkedIn URL', name: 'linkedIn' },
            { label: 'Instagram URL', name: 'instagram' },
            { label: 'Professional Skills', name: 'professionalSkills' },
          ].map(({ label, name, type = 'text', disabled = false, options, placeholder }, i) => (
            <div className="form-group col-lg-6" key={i}>
              <label htmlFor={name}>{label}</label>
              {type === 'select' ? (
                <Field as="select" name={name} disabled={disabled} className="form-control">
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  id={name}
                  name={name}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  className="form-control"
                />
              )}
              <ErrorMessage name={name} component="div" className="text-danger" />
            </div>
          ))}

          <div className="form-group col-12 text-center">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;