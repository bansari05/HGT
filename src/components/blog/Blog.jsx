import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to strip HTML tags and truncate text
  const getCleanContent = (html, length = 100) => {
    // Remove HTML tags
    const cleanText = html.replace(/<[^>]+>/g, '');
    // Decode HTML entities
    const txt = document.createElement("textarea");
    txt.innerHTML = cleanText;
    const decodedText = txt.value;
    // Truncate to specified length
    return decodedText.length > length 
      ? decodedText.substring(0, length) + '...' 
      : decodedText;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://apihgt.solvifytech.in/api/v1/Blog/SelectActive",
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
          setBlogs(data.data.slice(0, 3));
        } else {
          setError(new Error(data.message || "Failed to load blogs"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div className="text-center">Loading blogs...</div>;
  if (error) return <div className="text-center text-danger">Error: {error.message}</div>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      {blogs.map((blog) => (
        <div className="news-block col-lg-4 col-md-6 col-sm-12" key={blog.blog_id}>
          <div className="inner-box">
            <div className="image-box">
              <figure className="image">
                <img
                  src={`https://apihgt.solvifytech.in/${blog.image}`}
                  alt={blog.title}
                />
              </figure>
            </div>
            <div className="lower-content">
              <ul className="post-meta">
                <li>
                  <span>{formatDate(blog.created)}</span>
                </li>
              </ul>
              <h3>
                <Link to={`/blog-details/${blog.blog_id}`}>{blog.title}</Link>
              </h3>
              <p className="text">{getCleanContent(blog.content)}</p>
              <Link to={`/blog-details/${blog.blog_id}`} className="read-more">
                Read More <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;