import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const JobCategorie1 = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://apihgt.solvifytech.in/api/v1/JobCategory/SelectActive",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
          }
        );

        const data = await response.json();
        if (data.status === 1) {
          setCategories(data.data);
        } else {
          setError(new Error(data.message || "Failed to fetch categories"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error.message}</div>;
  }

  return (
    <>
      {categories.map((category) => (
        <div
          className="category-block col-lg-4 col-md-6 col-sm-12"
          key={category.job_category_id}
        >
          <div className="inner-box">
            <div className="content">
              {category.icon && (
                <img 
                  src={`https://apihgt.solvifytech.in/${category.icon}`}
                  alt={category.job_category}
                  className="icon"
                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                />
              )}
              <h4>
                <Link to={`/job-list-v1/${category.job_category_id}`}>
                  {category.job_category}
                </Link>
              </h4>
              <p>({category.total_positions} open positions)</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie1;