import { useState, useEffect } from "react";
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import WidgetContentBox from "./components/WidgetContentBox";
import WidgetTopFilterBox from "./components/WidgetTopFilterBox";
import MenuToggler from "../../MenuToggler";

const AddApplicationForm = ({ show, handleClose, handleSubmit }) => {
  const [jobId, setJobId] = useState("");
  const [applicantCvFile, setApplicantCvFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      getJobs();
    }
  }, [show]);

  const getJobs = async () => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Job/SelectAll", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
      });

      const result = await response.json();

      if (response.ok) {
        setJobs(result.data || []);
        console.log("Jobs fetched successfully:", result.data);
      } else {
        console.error("Failed to fetch jobs:", result.message);
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("applicantCvFile", applicantCvFile);
    handleSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Application</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="jobId" className="fw-bold">Select Job : </label>
                <select
                  className="form-control"
                  id="jobId"
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">Select a job</option>
                  {jobs.map((job) => (
                    <option key={job.job_id} value={job.job_id}>
                      {job.job_title}
                    </option>
                  ))}
                </select>
                {loading && <small className="text-muted">Loading jobs...</small>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="applicantCvFile" className="fw-bold">Upload CV (PDF/DOC) : </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="applicantCvFile"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setApplicantCvFile(e.target.files[0])}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-style-three" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmitApplication = async (formData) => {
    try {
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Application/Add", {
        method: "POST",
        headers: {
          accept: "multipart/form-data",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
        },
        body: formData
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json();
      alert("Application submitted successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />

      <AddApplicationForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmitApplication}
      />

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="d-flex justify-content-between align-items-center">
            <BreadCrumb title="All Applicants!" />
            <button
              className="theme-btn btn-style-one"
              onClick={() => setShowModal(true)}
            >
              Add Application
            </button>
          </div>

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Applicant</h4>
                    {/* <WidgetTopFilterBox /> */}
                    <div className="chosen-outer">
                      <select className="chosen-single form-select chosen-container">
                        <option>Select Jobs</option>
                        <option>Last 12 Months</option>
                        <option>Last 16 Months</option>
                        <option>Last 24 Months</option>
                        <option>Last 5 year</option>
                      </select>
                      {/* <!--Tabs Box--> */}

                      <select className="chosen-single form-select chosen-container" >
                        <option>All Status</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"ShortListed"}>Short Listed</option>
                      </select>
                      {/* <!--Tabs Box--> */}
                    </div>
                  </div>
                  <WidgetContentBox />
                  {/* End widget-content */}
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;