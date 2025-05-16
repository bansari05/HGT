import { useState, useEffect } from "react";
import AddQualificationModal from "./qualification-popup";

const Qualification = () => {
  const [qualifications, setQualifications] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQualifications = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/Qualification/SelectAll",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3Mjg1NzAzLCJpYXQiOjE3NDcyODM5MDN9.hYRa-xvBQfnnqOXBktddVZ5ldvVe-tZFyRgZvMbjxQs",
          },
        }
      );

      const result = await response.json();
      setQualifications(result.data || []);
    } catch (error) {
      console.error("Error fetching qualifications:", error.message);
      alert("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (qualification) => {
    setSelectedQualification(qualification);
    setIsPopupOpen(true);
  };

  const handleSave = async (data) => {
    try {
      // If editing an existing job type
      if (selectedQualification) {
        const response = await fetch(
          `https://apihgt.solvifytech.in/api/v1/Qualification/Update`,
          {
            method: "PUT",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
            body: JSON.stringify({
              qualificationId: selectedQualification.qualification_id,
              qualification: data.qualification,
            }),
          }
        );

        const result = await response.json();
        if (result.status === 1) {
          await fetchQualifications();
        } else {
          console.log("Error", result.message);
        }
      } else {
        // Adding new job type
        const response = await fetch(
          "https://apihgt.solvifytech.in/api/v1/Qualification/Add",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
            body: JSON.stringify({
              qualification: data.qualification,
            }),
          }
        );

        const result = await response.json();
        if (result.status === 1) {
          await fetchQualifications();
        } else {
          console.log("Error", result.message);
        }
      }
    } catch (error) {
      console.error("Error saving job type:", error);
    } finally {
      setIsPopupOpen(false);
      setSelectedQualification(null);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/Qualification/Status",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3Mjg1NzAzLCJpYXQiOjE3NDcyODM5MDN9.hYRa-xvBQfnnqOXBktddVZ5ldvVe-tZFyRgZvMbjxQs",
          },
          body: JSON.stringify({ qualificationId: id }),
        }
      );

      const result = await response.json();
      if (result.status === 1) {
        await fetchQualifications(); // Refresh list
      } else {
        alert(result.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error occurred while updating status.");
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Qualifications</h4>
        <div className="form-group text-right">
          <button
            type="button"
            className="theme-btn btn-style-one"
            onClick={() => {
              setSelectedQualification(null);
              setIsPopupOpen(true);
            }}
          >
            Add Qualification
          </button>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Qualification Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : qualifications.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No qualifications found
                  </td>
                </tr>
              ) : (
                qualifications.map((q) => (
                  <tr key={q.qualification_id}>
                    <td>{q.qualification_id}</td>
                    <td>{q.qualification}</td>
                    <td>{q.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button
                              title={q.is_active ? "Deactivate" : "Activate"}
                              onClick={() =>
                                handleToggleStatus(q.qualification_id)
                              }
                            >
                              <span
                                className={
                                  q.is_active ? "la la-eye-slash" : "la la-eye"
                                }
                              ></span>
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleEdit(q)}>
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button>
                              <span className="la la-trash"></span>
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

      {isPopupOpen && (
        <AddQualificationModal
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedQualification(null);
          }}
          onSave={handleSave}
          initialData={selectedQualification}
        />
      )}
    </div>
  );
};

export default Qualification;
