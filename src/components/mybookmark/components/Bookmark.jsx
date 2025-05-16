import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Bookmark = () => {
  const [savedJobs, setSavedJobs] = useState(null);
  const { jobId } = useParams();

  const fetchSavedJobs = async (savedPostId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/SavedPost/SelectById/${savedPostId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setSavedJobs(result.data);
      } else {
        console.error("Failed to fetch saved job:", result.message);
        setSavedJobs(null);
      }
    } catch (error) {
      console.error("Error fetching saved job:", error);
      setSavedJobs(null);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchSavedJobs(jobId);
    }
  }, [jobId]);

  const handleDelete = async () => {
  
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/SavedPost/Delete", {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MTk2NTYzLCJpYXQiOjE3NDcxOTQ3NjN9.eOeIIM3OfRTIOheSLh51kTE7TpyRIxqTX832k5XUUFo",
        },
        body: JSON.stringify({
          savedPostId: jobId, 
        }),
      });

      if (response.ok) {
        setSavedJobs(null); 
      } else {
        const result = await response.json();
      }
    } catch (error) {
      console.error("Error deleting saved job:", error);
    }
  };

  if (savedJobs === null) {
    return <p>Loading saved job details...</p>;
  }

  return (
    <>
      <div className="job-search-container">
        <div className="w-100 ml-84">
          <h2>My Favorites Jobs</h2>
        </div>
        <div className="search-field">
          <i className="la la-search"></i>
          <input type="text" placeholder="Job title, keywords, or company" />
        </div>
        <div className="search-field">
          <i className="la la-map-marker"></i>
          <input type="text" placeholder="City or postcode" />
        </div>
        <div className="search-field">
          <i className="la la-briefcase"></i>
          <select style={{ fontFamily: "Jost, sans-serif" }}>
            <option>Choose a category</option>
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>
        <button className="search-btn">Find Jobs</button>
      </div>

      <div className="tabs-box">
        <div className="widget-title">
          <div className="chosen-outer">
            <select className="chosen-single form-select">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>Last 16 Months</option>
              <option>Last 24 Months</option>
              <option>Last 5 year</option>
            </select>
          </div>
        </div>

        <div className="widget-content">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedJobs ? (
                  <tr>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img src="/images/hgt-logo.png" alt="logo" />
                            </span>
                            <h4>
                              <Link to={`/job-single-v1/${savedJobs.jobId}`}>
                                {savedJobs.job?.title || savedJobs.job?.job_title || `Job ID: ${savedJobs.jobId}`}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {savedJobs.job?.industry || "N/A"}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {savedJobs.job?.country || "N/A"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="status">Active</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Application">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Application" onClick={handleDelete}>
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="3">No saved job details found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
