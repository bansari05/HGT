import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Candidate Single Dyanmic V1 || Higher Global Talent - Candidates",
  description: "HGT - Job Board",
};

const CandidateSingleDynamicV1 = () => {
  const location = useLocation();
  const { applicationId } = useParams();

  const [application, setApplication] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Validate applicationId
      if (!applicationId || isNaN(Number(applicationId))) {
        setError("Invalid application ID");
        setLoading(false);
        return;
      }

      try {
        // Fetch Application, Users, and Jobs concurrently
        const [appsResponse, usersResponse, jobsResponse] = await Promise.all([
          fetch(`https://apihgt.solvifytech.in/api/v1/Application/SelectById/${applicationId}`, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MTk2NTYzLCJpYXQiOjE3NDcxOTQ3NjN9.eOeIIM3OfRTIOheSLh51kTE7TpyRIxqTX832k5XUUFo",
            },
          }),
          fetch(`https://apihgt.solvifytech.in/api/v1/User/SelectAll`, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
          }),
          fetch(`https://apihgt.solvifytech.in/api/v1/Job/SelectAll`, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
          }),
        ]);

        // Check for any failed response
        if (!appsResponse.ok) {
          const errData = await appsResponse.json();
          throw new Error(errData?.message || "Failed to fetch application");
        }
        if (!usersResponse.ok) {
          const errData = await usersResponse.json();
          throw new Error(errData?.message || "Failed to fetch users");
        }
        if (!jobsResponse.ok) {
          const errData = await jobsResponse.json();
          throw new Error(errData?.message || "Failed to fetch jobs");
        }

        // Parse JSON
        const appsData = await appsResponse.json();
        const usersData = await usersResponse.json();
        const jobsData = await jobsResponse.json();

        // Handle errors from API responses
        if (appsData.status === 0) {
          throw new Error(appsData.message || "Error fetching application");
        }
        if (usersData.status === 0) {
          throw new Error(usersData.message || "Error fetching users");
        }
        if (jobsData.status === 0) {
          throw new Error(jobsData.message || "Error fetching jobs");
        }

        // Set Application state
        setApplication(appsData.data);

        // Transform Users array into a map with userId as key for easy lookup
        const userMap = (usersData.data || []).reduce((acc, user) => {
          const id = user.user_id ?? user.id;
          if (id !== undefined) acc[id] = user;
          return acc;
        }, {});
        setUsers(userMap);

        // Set jobs array
        setJobs(jobsData.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if application data is not already in location.state
    if (!location.state?.application) {
      fetchData();
    } else {
      setApplication(location.state.application);
      setLoading(false);
    }
  }, [applicationId, location.state]);

  // Find matched job from jobs array for current application
  const matchedJob = jobs.find((job) => job.id === application?.jobId);

  // Find user info if needed (for example, application.userId)
  const matchedUser = users[application?.userId || application?.user_id];


  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img

                      src={'/images/user.jpg'}
                      alt="avatar"
                    />
                  </figure>
                  <h4 className="name">{matchedUser?.full_name}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{matchedJob?.job_title}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {matchedJob?.country || "N/A"},{matchedJob?.state || "N/A"}

                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      {matchedJob?.salary} / hour
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member Since,{" "}
                      {matchedJob?.dead_line_date ? formatDate(matchedJob.dead_line_date) : "N/A"}
                    </li>

                  </ul>

                  <ul className="post-tags">
                    {application?.tags?.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    className="theme-btn btn-style-one"
                    href="/images/sample.pdf"
                    download
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <div className="video-outer">
                    <h4>Candidates About</h4>
                    <AboutVideo />
                  </div>
                  {/* <!-- About Video Box --> */}
                  <p>
                    Hello my name is Nicole Wells and web developer from
                    Portland. In pharetra orci dignissim, blandit mi semper,
                    ultricies diam. Suspendisse malesuada suscipit nunc non
                    volutpat. Sed porta nulla id orci laoreet tempor non
                    consequat enim. Sed vitae aliquam velit. Aliquam ante erat,
                    blandit at pretium et, accumsan ac est. Integer vehicula
                    rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et
                    pulvinar tortor luctus. Suspendisse condimentum lorem ut
                    elementum aliquam.
                  </p>
                  <p>
                    Mauris nec erat ut libero vulputate pulvinar. Aliquam ante
                    erat, blandit at pretium et, accumsan ac est. Integer
                    vehicula rhoncus molestie. Morbi ornare ipsum sed sem
                    condimentum, et pulvinar tortor luctus. Suspendisse
                    condimentum lorem ut elementum aliquam. Mauris nec erat ut
                    libero vulputate pulvinar.
                  </p>

                  {/* <!-- Portfolio --> */}

                  {/* <!-- Candidate Resume End --> */}
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>0-2 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>28-33 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>11K - 15K</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>26K - 30K</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>Female</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>English, German, Spanish</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>Master Degree</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CandidateSingleDynamicV1
