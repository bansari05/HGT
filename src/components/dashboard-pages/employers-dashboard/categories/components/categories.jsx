import { useState, useEffect } from "react";

const AddCategoryModal = ({ show, handleClose, handleSubmit, initialData, isEditing }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      setCategoryName(initialData.job_category);
    }
  }, [show, isEditing, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSubmit(categoryName);
      handleClose();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? "Edit Category" : "Add New Category"}</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="categoryName" className="fw-bold">Category Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-style-three" onClick={handleClose} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
                  {loading ? "Submitting..." : isEditing ? "Update Category" : "Add Category"}
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
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobCategory/SelectAll", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();
      
      setCategories(Array.isArray(result.data) ? result.data : result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (categoryName) => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobCategory/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ jobCategory: categoryName })
      });

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

  const handleEditSubmit = async (categoryName) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/JobCategory/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ 
          jobCategoryId: selectedCategory.job_category_id,
          jobCategory: categoryName 
        })
      });

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
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/JobCategory/Status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ 
          jobCategoryId: categoryId 
        })
      });

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
      <div className="widget-title">
        <h4>Categories</h4>
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button
            type="button"
            className="theme-btn btn-style-one"
            onClick={() => setShowAddModal(true)}
          >
            Add Categories
          </button>
        </div>
      </div>

      <div className="widget-content">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Category Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading categories...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No categories found</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.job_category_id}>
                    <td>{category.job_category_id}</td>
                    <td>{category.job_category}</td>
                    <td>{category.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="Change Status" onClick={() => handleToggleStatus(category.job_category_id)}>
                              <span className={`la ${category.is_active ? "la-eye-slash" : "la-eye"}`}></span>
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