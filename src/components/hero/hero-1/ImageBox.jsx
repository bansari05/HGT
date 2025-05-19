import { useEffect, useState } from "react";

const ImageBox = () => {

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
    <div className="image-box">
      <figure className="main-image" data-aos="fade-in" data-aos-delay="500">
        <img
        
          layout="responsive"
          src="/images/resource/banner-img-1.png"
          alt="hero image"
        />
      </figure>
      {/* hero image */}
      {/* <!-- Info BLock One --> */}
      <div className="info_block" data-aos="fade-in" data-aos-delay="1000">
        <span className="icon flaticon-email-3"></span>
        <p>
          Work Inquiry From <br />
          {dashboardData?.latest_work_enquiry}
        </p>
      </div>
      {/* <!-- Info BLock Two --> */}
      <div className="info_block_two" data-aos="fade-in" data-aos-delay="2000">
        <p>{dashboardData?.candidates} Candidates</p>
        <div className="image">
          <img
           
            src="/images/resource/multi-peoples.png"
            alt="mulit people"
          />
        </div>
      </div>
      {/* <!-- Info BLock Three --> */}
      <div
        className="info_block_three"
        data-aos="fade-in"
        data-aos-delay="1500"
      >
        <span className="icon flaticon-briefcase"></span>
        <p>{dashboardData?.latest_job?.split(" - ")[0]}</p>
        <span className="sub-text">{dashboardData?.latest_job?.split(" - ")[1]}</span>
        <span className="right_icon fa fa-check"></span>
      </div>
      {/* <!-- Info BLock Four --> */}
      <div className="info_block_four" data-aos="fade-in" data-aos-delay="2500">
        <span className="icon flaticon-file"></span>
        <div className="inner">
          <p>Upload Your CV</p>
          <span className="sub-text">It only takes a few seconds</span>
        </div>
      </div>{" "}
    </div>
  );
};

export default ImageBox;
