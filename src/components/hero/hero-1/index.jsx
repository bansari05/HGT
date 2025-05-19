import SearchForm from "../../common/job-search/SearchForm";
import ImageBox from "./ImageBox";
import PopularSearch from "../PopularSearch";
import { useEffect, useState } from "react";

const index = () => {

  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("https://apihgt.solvifytech.in/api/v1/Dashboard/Select", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
        },
      });

      const data = await res.json();
      if (data.status === 1 && data.data.length > 0) {
        setDashboardData(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  },[]);

  return (
    <section className="banner-section">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div
              className="inner-column"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="title-box">
                <h3>
                  There Are <span className="colored">{dashboardData?.posted_jobs ?? 0}</span> Postings
                  Here
                  <br /> For you!
                </h3>
                <div className="text">
                  Find Jobs, Employment & Career Opportunities
                </div>
              </div>

              {/* <!-- Job Search Form --> */}
              <div className="job-search-form">
                <SearchForm />
              </div>
              {/* <!-- Job Search Form --> */}

              {/* <!-- Popular Search --> */}
              <PopularSearch />
              {/* <!-- End Popular Search --> */}
            </div>
          </div>
          {/* End .col */}

          <div className="image-column col-lg-5 col-md-12">
            <ImageBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
