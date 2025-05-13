import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

const JobFeatured1 = () => {
  const [jobs, setJobs] = useState([]);

    const handleBookmarkClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", 
    });
  };

  const getJobs = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Job/SelectAll", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        }
      });

      const result = await response.json();
      if (response.ok) {
        setJobs(result.data || []);
      } else {
        console.error("Failed to fetch jobs:", result.message);
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      {jobs.slice(0, 6).map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.job_id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img
                  src={"/images/hgt-logo.png" || "/default-logo.png"}
                  alt="item brand"
                />
              </span>

              <h4>
                <Link to={`/job-single-v1/${item.job_id}`}>{item.title || item.job_title}</Link>
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
              <li>
  <span className="icon flaticon-clock-3"></span>
  {item.created
    ? `${formatDistanceToNow(new Date(item.created), { addSuffix: true })}`
    : 'N/A'}
</li>
                <li>
                  <span className="icon flaticon-money"></span>
                  {item.salary || "N/A"}
                </li>
              </ul>

              <ul className="job-other-info">
                <li className="green">{item.job_type || ''}</li>
                <li className="orange">Urgent</li>
              </ul>

              <button className="bookmark-btn" onClick={handleBookmarkClick}>
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {jobs.length === 0 && <p>No featured jobs available.</p>}
    </>
  );
};

export default JobFeatured1;
