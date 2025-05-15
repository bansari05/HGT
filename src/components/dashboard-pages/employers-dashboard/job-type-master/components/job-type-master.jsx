import React, { useEffect, useState } from "react";
import Jobtypemasterpopup from "./job-type-master-popup";

const Jobtypemaster = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentJobType, setCurrentJobType] = useState(null);

  const getJobTypes = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobType/SelectAll", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
        },
      });

      const result = await response.json();
      if (result.status === 1) {
        setJobTypes(result.data || []);
      } else {
        setJobTypes([]);
        console.warn("API returned unsuccessful status:", result.status);
      }
    } catch (error) {
      console.error("Error fetching job types:", error);
      setJobTypes([]);
    }
  };

  const handleSave = async (data) => {
    try {
      // If editing an existing job type
      if (currentJobType) {
        const response = await fetch(`https://apihgt.solvifytech.in/api/v1/JobType/Update`, {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
          body: JSON.stringify({
            jobTypeId: currentJobType.job_type_id,
            jobType: data.jobType,
          }),
        });

        const result = await response.json();
        if (result.status === 1) {
          await getJobTypes();
        } else {
          console.log('Error',result.message);
        }
      } else {
        // Adding new job type
        const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobType/Add", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
          },
          body: JSON.stringify({
            jobType: data.jobType,
          }),
        });

        const result = await response.json();
        if (result.status === 1) {
          await getJobTypes();
        } else {
          console.log('Error',result.message);
        }
      }
    } catch (error) {
      console.error("Error saving job type:", error);
    } finally {
      setIsPopupOpen(false);
      setCurrentJobType(null);
    }
  };


  const handleEdit = async (jobTypeId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/JobType/SelectById/${jobTypeId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
        },
      });

      const result = await response.json();
      if (result.status === 1) {
        setCurrentJobType(result.data);
        setIsPopupOpen(true);
      } else {
        console.log('Error', result)
      }
    } catch (error) {
      console.error("Error fetching job type details:", error);
    }
  };

 const handleToggleStatus = async (jobTypeId) => {
  try {
    const response = await fetch("https://apihgt.solvifytech.in/api/v1/JobType/Status", {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
      },
      
      body: JSON.stringify({
        jobTypeId: jobTypeId,
      }),
      
    });
    console.log(response)

    const result = await response.json();
console.warn({
hh: result 
})
    if (result.status === 1) {
      // Success - fetch latest list from backend
      await getJobTypes();
    } else {
      alert(result.message || "Failed to update status.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Error occurred while updating status.");
  }
};


  useEffect(() => {
    getJobTypes();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Job Type Master</h4>
       

            <div className="form-group col-lg-12 col-md-12 text-right">
              <button type="submit" className="theme-btn btn-style-one"  onClick={() => {
            setCurrentJobType(null);
            setIsPopupOpen(true);
          }}>
                Add Job
              </button>
            </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Type Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobTypes.map((item) => (
                <tr key={item.job_type_id}>
                  <td>{item.job_type_id}</td>
                  <td>{item.job_type}</td>
                  <td>{item.is_active ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button
                            data-text="View Application"
                            // title={item.is_active ? "Deactivate" : "Activate"}
                            onClick={() => handleToggleStatus(item.job_type_id)}
                          >
                            <span className={`la ${item.is_active ? "la-eye-slash" : "la-eye"}`}></span>
                          </button>


                        </li>
                        <li>
                          <button
                            data-text="Edit Application"
                            onClick={() => handleEdit(item.job_type_id)}
                          >
                            <span className="la la-pencil"></span>
                          </button>
                        </li>
                        <li>
                          <button
                            data-text="Delete Application"
                          >
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              {jobTypes.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No job types found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && (
        <Jobtypemasterpopup
          onClose={() => {
            setIsPopupOpen(false);
            setCurrentJobType(null);
          }}
          onSave={handleSave}
          initialData={currentJobType}
        />
      )}
    </div>
  );
};

export default Jobtypemaster;