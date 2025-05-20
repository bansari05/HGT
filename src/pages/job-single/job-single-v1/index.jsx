import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jobs from "@/data/job-featured";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import JobSkills from "@/components/job-single-pages/shared-components/JobSkills";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import MetaComponent from "@/components/common/MetaComponent";
import { formatDistanceToNow } from 'date-fns';

const metadata = {
  title: "Job Single Dyanmic V1 || Higher Global Talent - Job Single",
  description: "HGT - Job Board",
};

const JobSingleDynamicV1 = () => {
  let params = useParams();
  const id = params.id;
  const company = jobs.find((item) => item.id == id) || jobs[0];

  const [categoryDetails, setCategoryDetails] = useState({})

  const fetchJobDetail = async () => {
    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Job/SelectById/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });
      if (!response.ok) throw new Error("Failed to fetch details");
      const {data,status} = await response.json();
      console.log({data,status});
      if (status == 1 ) {
        setCategoryDetails(data)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(()=>{
    fetchJobDetail()
  },[id])

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={company.logo || "/images/hgt-logo.png"} alt="logo" />
                  </span>
                  <h4>{categoryDetails.job_title}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {company.company_name}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {`${categoryDetails.city}(${categoryDetails.country})`}
                      {company.country}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>
                       {categoryDetails.dead_line_date
                                          ? `${formatDistanceToNow(new Date(categoryDetails.dead_line_date), { addSuffix: true })}`
                                          : 'N/A'}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      {categoryDetails.salary}
                    </li>
                  </ul>

                  <ul className="job-other-info">
                    {company?.jobType?.map((val, i) => (
                      <li key={i} className={val.styleClass}>{val.type}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#applyJobModal"
                  >
                    Apply For Job
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>

                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <ApplyJobModalContent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions jobDetails={categoryDetails}/>
                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">2020 jobs live - 293 added today.</div>
                  </div>
                  <RelatedJobs />
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Job Overview</h4>
                    <JobOverView jobDetails={categoryDetails}/>

                    {/*<h4 className="widget-title mt-5">Job Location</h4>*/}
                    {/*<div className="widget-content">*/}
                    {/*  <div className="map-outer">*/}
                    {/*    <div style={{ height: "300px", width: "100%" }}>*/}
                    {/*      <MapJobFinder />*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    {/*<h4 className="widget-title mt-5">Job Skills</h4>*/}
                    {/*<div className="widget-content">*/}
                    {/*  <JobSkills />*/}
                    {/*</div>*/}
                  </div>

                  {/*<div className="sidebar-widget company-widget">*/}
                  {/*  <div className="widget-content">*/}
                  {/*    <div className="company-title">*/}
                  {/*      <div className="company-logo">*/}
                  {/*        <img src={company.logo} alt="resource" />*/}
                  {/*      </div>*/}
                  {/*      <h5 className="company-name">{categoryDetails.company_name}</h5>*/}
                  {/*    </div>*/}
                  {/*    <CompnayInfo />*/}
                  {/*    <div className="btn-box">*/}
                  {/*      <a*/}
                  {/*        href="#"*/}
                  {/*        target="_blank"*/}
                  {/*        rel="noopener noreferrer"*/}
                  {/*        className="theme-btn btn-style-three"*/}
                  {/*      >*/}
                  {/*        {company?.link}*/}
                  {/*      </a>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV1;
