import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog Details Dynamic V1 || HGT - Job Board",
  description: "HGT - Job Board",
};

const BlogDetailsDynamic = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Blog/SelectById/${id}`, {
          headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        });
        const data = await response.json();

        if (data.status === 1 && data.data) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

      <section className="blog-single">
        <div className="auto-container">
          <div className="upper-box">
            <h3>{blog?.title}</h3>

            <ul className="post-info">
              <li>
                {blog?.name}
              </li>
              <li>
                {blog?.created
                  ? new Date(blog.created).toLocaleDateString("en-GB") // en-GB locale formats as dd/mm/yyyy
                  : ""}
              </li>

            </ul>
          </div>
        </div>

        <figure className="main-image">
          <img
            src={`https://apihgt.solvifytech.in/${blog?.image}`}
            alt="blog main"
          />
        </figure>

        <div className="auto-container">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default BlogDetailsDynamic;
