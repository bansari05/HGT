import { useState, useEffect } from "react";

const AddCategoryModal = ({ show, handleClose, handleSubmit, initialData, isEditing }) => {
  const [categoryName, setCategoryName] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (isEditing && initialData) {
      setCategoryName(initialData.job_category || "");
      setIconFile(null); // Reset file input on edit open
      setFileError("");
    } else if (!isEditing) {
      setCategoryName("");
      setIconFile(null);
      setFileError("");
    }
  }, [show, isEditing, initialData]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        setFileError("File size must be 100KB or less");
        setIconFile(null);
      } else {
        setFileError("");
        setIconFile(file);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (fileError) return;

    setLoading(true);
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("jobCategory", categoryName);
      if (iconFile) {
        formData.append("iconFile", iconFile);
      }
      await handleSubmit(formData);
      handleClose();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? "Edit Category" : "Add New Category"}
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <div className="form-group mb-3">
                <label htmlFor="categoryName" className="fw-bold">
                  Category Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  maxLength={200}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="iconFile" className="fw-bold">
                  Banner Image (max 100KB):
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="iconFile"
                  accept="image/*"
                  onChange={onFileChange}
                  disabled={loading}
                />
                {fileError && (
                  <small className="text-danger">{fileError}</small>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-style-three"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="theme-btn btn-style-one"
                  disabled={loading || fileError}
                >
                  {loading
                    ? "Submitting..."
                    : isEditing
                    ? "Update Category"
                    : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/JobCategory/SelectAll",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();

      setCategories(Array.isArray(result.data) ? result.data : result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (formData) => {
    setError("");
    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/JobCategory/Add",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      await fetchCategories();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleEditSubmit = async (formData) => {
    setError("");
    try {
      // Add jobCategoryId to FormData as required
      formData.append("jobCategoryId", selectedCategory.job_category_id);

      const response = await fetch(
        `https://apihgt.solvifytech.in/api/v1/JobCategory/Update`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      await fetchCategories();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleToggleStatus = async (categoryId) => {
    setError("");
    try {
      const response = await fetch(
        `https://apihgt.solvifytech.in/api/v1/JobCategory/Status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
          body: JSON.stringify({
            jobCategoryId: categoryId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle status");
      }

      await fetchCategories();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title d-flex justify-content-between align-items-center">
        <h4>Categories</h4>
        <button
          type="button"
          className="theme-btn btn-style-one"
          onClick={() => setShowAddModal(true)}
        >
          Add Categories
        </button>
      </div>

      <div className="widget-content">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Category Name</th>
                <th>Icon</th>
                <th>Total Positions</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.job_category_id}>
                    <td>{category.job_category_id}</td>
                    <td>{category.job_category}</td>
                    <td><img src={`https://apihgt.solvifytech.in/${category.icon}`} alt="" width={50} height={50} /></td>
                    <td>{category.total_positions}</td>
                    <td>{category.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list d-flex gap-2">
                          <li>
                            <button
                              data-text="Change Status"
                              onClick={() =>
                                handleToggleStatus(category.job_category_id)
                              }
                            >
                              <span
                                className={`la ${
                                  category.is_active
                                    ? "la-eye-slash"
                                    : "la-eye"
                                }`}
                              ></span>
                            </button>
                          </li>
                          <li>
                            <button
                              data-text="Edit Category"
                              onClick={() => {
                                setSelectedCategory(category);
                                setShowEditModal(true);
                              }}
                            >
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddCategoryModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAddSubmit}
        isEditing={false}
      />
      <AddCategoryModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSubmit={handleEditSubmit}
        initialData={selectedCategory}
        isEditing={true}
      />
    </div>
  );
};

export default Categories;