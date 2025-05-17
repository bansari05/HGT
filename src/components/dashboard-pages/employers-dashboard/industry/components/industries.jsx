import { useState, useEffect } from "react";

const AddIndustryModal = ({ show, handleClose, handleSubmit, initialData, isEditing }) => {
  const [industryName, setIndustryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      setIndustryName(initialData.industry);
    } else {
      setIndustryName("");
    }
  }, [show, isEditing, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSubmit(industryName);
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
            <h5 className="modal-title">{isEditing ? "Edit Industry" : "Add New Industry"}</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="industryName" className="fw-bold">Industry Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="industryName"
                  value={industryName}
                  onChange={(e) => setIndustryName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-style-three" onClick={handleClose} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
                  {loading ? "Submitting..." : isEditing ? "Update Industry" : "Add Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Industry/SelectAll", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch industries");
      const result = await response.json();
      
      setIndustries(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (industryName) => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Industry/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ industry: industryName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add industry");
      }

      await fetchIndustries();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleEditSubmit = async (industryName) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Industry/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ 
          industryId: selectedIndustry.industry_id,
          industry: industryName 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update industry");
      }

      await fetchIndustries();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleToggleStatus = async (industryId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Industry/Status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ industryId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle status");
      }

      await fetchIndustries();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Industries</h4>
        <button
            type="button"
            className="theme-btn btn-style-one"
            onClick={() => setShowAddModal(true)}
          >
            Add Industries
          </button>
      </div>

      <div className="widget-content">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Industry Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading industries...</td>
                </tr>
              ) : industries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No industries found</td>
                </tr>
              ) : (
                industries.map((industry) => (
                  <tr key={industry.industry_id}>
                    <td>{industry.industry_id}</td>
                    <td>{industry.industry}</td>
                    <td>{industry.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button 
                              data-text="Change Status" 
                              onClick={() => handleToggleStatus(industry.industry_id)}
                            >
                              <span className={`la ${industry.is_active ? "la-eye-slash" : "la-eye"}`}></span>
                            </button>
                          </li>
                          <li>
                            <button 
                              data-text="Edit Industry"
                              onClick={() => {
                                setSelectedIndustry(industry);
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

      <AddIndustryModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAddSubmit}
        isEditing={false}
      />

      <AddIndustryModal
        show={showEditModal}
        handleClose={() => {
          setShowEditModal(false);
          setSelectedIndustry(null);
        }}
        handleSubmit={handleEditSubmit}
        initialData={selectedIndustry}
        isEditing={true}
      />
    </div>
  );
};

export default Industries;