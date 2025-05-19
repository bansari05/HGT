import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Blog/SelectAll", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setBlogs(result.data || []);
        console.log("Blogs fetched successfully:", result.data);
      } else {
        console.error("Failed to fetch blogs:", result.message);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  const handleEdit = async (blogId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Blog/SelectById/${blogId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("editBlogData", JSON.stringify(data.data));
        navigate(`/employers-dashboard/post-blog/${blogId}`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching job by ID:", error);
    }
  };

  const handleToggleStatus = async (blogId) => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Blog/Status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: JSON.stringify({ blogId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle status");
      }

      await getBlogs();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Blog Listings</h4>
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
                    <th>Author</th>
                    <th>Image</th>
                    <th>Content</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {blogs.map((blog) => (
                    <tr key={blog.blog_id}>
                        <td>{blog.title}</td>
                        <td>{blog.name}</td>
                        <td>
                        {blog.image && (
                            <img 
                                src={`https://apihgt.solvifytech.in/${blog.image}`} 
                                alt="Blog" 
                                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                            />
                        )}
                        </td>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          />
                        </td>
                        <td>
                        {blog.created ? new Date(blog.created).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }) : "N/A"}
                        </td>
                        <td>{blog.is_active ? "Active" : "Inactive"}</td>
                        <td>
                          <div className="option-box">
                              <ul className="option-list">
                                <li>
                                  <button data-text="Change Status" onClick={() => handleToggleStatus(blog.blog_id)}>
                                    <span className={`la ${blog.is_active ? "la-eye-slash" : "la-eye"}`}></span>
                                  </button>
                                </li>
                                <li>
                                  <button data-text="Edit" onClick={() => handleEdit(blog.blog_id)}>
                                    <span className="la la-pencil"></span>
                                  </button>
                                </li>
                              </ul>
                          </div>
                        </td>
                    </tr>
                    ))}
                    
                    {blogs.length === 0 && (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                        No blog listings found.
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

export default Blog;