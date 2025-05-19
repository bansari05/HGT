import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  const getTestimonials = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Testimonial/SelectAll", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setTestimonials(result.data || []);
        console.log("Testimonials fetched successfully:", result.data);
      } else {
        console.error("Failed to fetch Testimonials:", result.message);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching Testimonials:", error);
      setTestimonials([]);
    }
  };

  const handleEdit = async (testimonialId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Testimonial/SelectById/${testimonialId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("editTestimonialData", JSON.stringify(data.data));
        navigate(`/employers-dashboard/post-testimonial/${testimonialId}`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching testimonial by ID:", error);
    }
  };

  const handleToggleStatus = async (testimonialId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Testimonial/Status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ testimonialId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle status");
      }

      await getTestimonials();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Testimonials Listings</h4>
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
                    <th>Title</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Image</th>
                    <th>Content</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {testimonials.map((testimonial) => (
                    <tr key={testimonial.testimonial_id}>
                        <td>{testimonial.title}</td>
                        <td>{testimonial.name}</td>
                        <td>{testimonial.designation}</td>
                        <td>
                        {testimonial.image && (
                            <img 
                                src={`https://apihgt.solvifytech.in/${testimonial.image}`} 
                                alt="Testimonial" 
                                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                            />
                        )}
                        </td>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{ __html: testimonial.description }}
                          />
                        </td>
                        <td>
                        {testimonial.created ? new Date(testimonial.created).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }) : "N/A"}
                        </td>
                        <td>{testimonial.is_active ? "Active" : "Inactive"}</td>
                        <td>
                          <div className="option-box">
                              <ul className="option-list">
                                <li>
                                  <button data-text="Change Status" onClick={() => handleToggleStatus(testimonial.testimonial_id)}>
                                    <span className={`la ${testimonial.is_active ? "la-eye-slash" : "la-eye"}`}></span>
                                  </button>
                                </li>
                                <li>
                                  <button data-text="Edit" onClick={() => handleEdit(testimonial.testimonial_id)}>
                                    <span className="la la-pencil"></span>
                                  </button>
                                </li>
                              </ul>
                          </div>
                        </td>
                    </tr>
                    ))}
                    
                    {testimonials.length === 0 && (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                        No testimonial listings found.
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

export default Testimonials;