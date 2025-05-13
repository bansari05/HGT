import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  console.warn({
    rr: jobs
  })

  const getJobs = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Job/SelectAll", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setJobs(result.data || []);
        console.log("Jobs fetched successfully:", result.data);
      } else {
        console.error("Failed to fetch jobs:", result.message);
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  const handleEdit = async (jobId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Job/SelectById/${jobId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("editJobData", JSON.stringify(data.data));
        navigate(`/employers-dashboard/post-jobs/${jobId}`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching job by ID:", error);
    }
  };

  const handleDelete = async (jobId) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    // if (!confirmDelete) return;
  
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Job/Delete", {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
        },
        body: JSON.stringify({ jobId }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        getJobs(); 
      } else {
        console.error("Failed to delete job:", result.message);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  
  
  


  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>
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
              {/* <th>ID</th> */}
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

<tbody>
  {jobs.map((item) => (
    <tr key={item.job_id}>
      {/* <td>{item.job_id}</td>   */}
      <td>
        <div className="job-block">
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img
                  src={'/public/images/hgt-logo.png' || "/default-logo.png"}
                  alt="logo"
                />
              </span>
              <h4>
                <Link to={`/job-single-v3/${item.job_id}`}>
                  {item.title || item.job_title}
                </Link>
              </h4>
              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.industry || "N/A"}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.country || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </td>
      <td className="applied">
        <a href="#">{item.applications_count || "0"} Applied</a>
      </td>
     <td>
  {item.created
    ? new Date(item.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"}
  <br />
  {item.dead_line_date || item.deadline_date
    ? new Date(item.dead_line_date || item.deadline_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"}
</td>

      <td className="status">{item.status || "Active"}</td>
      <td>
        <div className="option-box">
          <ul className="option-list">
            <li>
              <button data-text="View Application">
                <span className="la la-eye"></span>
              </button>
            </li>
            <li>
              <button data-text="Edit Application" onClick={() => handleEdit(item.job_id)}>
                <span className="la la-pencil"></span>
              </button>
            </li>
            <li>
            <button data-text="Delete Application" onClick={() => handleDelete(item.job_id)}>
  <span className="la la-trash"></span>
</button>

            </li>
          </ul>
        </div>
      </td>
    </tr>
  ))}
  {jobs.length === 0 && (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No job listings found.
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
