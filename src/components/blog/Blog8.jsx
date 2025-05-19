import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Blog8 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://apihgt.solvifytech.in/api/v1/Blog/SelectActive"
      );
      const result = await response.json();
      if (result.status === 1) {
        setBlogs(result.data);
      } else {
        console.error("API returned an error:", result.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <>
      {blogs.slice(0, 6).map((item) => (
        <div className="news-block col-lg-4 col-md-6 col-sm-12" key={item.blog_id}>
          <div className="inner-box">
            <div className="image-box">
              <figure className="image">
                <img
                  src={`https://apihgt.solvifytech.in/${item.image}`}
                  alt="blog post"
                />
              </figure>
            </div>

            <div className="lower-content">
              <ul className="post-meta">
                <li>
                  <a href="#">{new Date(item.created).toLocaleDateString("en-GB")}</a>
                </li>
              </ul>
              <h3>
                <Link to={`/blog-details/${item.blog_id}`}>{item.title}</Link>
              </h3>
              <p className="text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content.length > 50
                      ? item.content.slice(0, 150) + "..."
                      : item.content,
                  }}
                />
              </p>
              <Link to={`/blog-details/${item.blog_id}`} className="read-more">
                Read More <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </>
  );
};

export default Blog8;
