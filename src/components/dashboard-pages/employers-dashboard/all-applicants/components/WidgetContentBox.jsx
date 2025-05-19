import { useState, useEffect, useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WidgetContentBox = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDataMap, setUserDataMap] = useState({});
  const [jobDataMap, setJobDataMap] = useState({});
  const [actionLoading, setActionLoading] = useState({});
  const navigate = useNavigate();

  const [approvedApplications, rejectedApplications] = useMemo(() => [
    applications.filter(app => app.status === "Approved"),
    applications.filter(app => app.status === "Rejected")
  ], [applications]);

  const fetchData = async () => {
    try {
      const [appsResponse, usersResponse, jobsResponse] = await Promise.all([
        fetch(`https://apihgt.solvifytech.in/api/v1/Application/SelectAll`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM`
          }
        }),
        fetch(`https://apihgt.solvifytech.in/api/v1/User/SelectAll`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM`
          }
        }),
        fetch(`https://apihgt.solvifytech.in/api/v1/Job/SelectAll`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM`
          }
        })
      ]);

      if (!appsResponse.ok || !usersResponse.ok || !jobsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const appsData = await appsResponse.json();
      const usersData = await usersResponse.json();
      const jobsData = await jobsResponse.json();

      const userMap = usersData.data?.reduce((acc, user) => {
        const id = user.user_id ?? user.id;
        if (id !== undefined) acc[id] = user;
        return acc;
      }, {}) || {};


      const jobMap = jobsData.data?.reduce((acc, job) => ({
        ...acc,
        [job.job_id]: job
      }), {});

      setApplications(appsData.data || []);
      setUserDataMap(userMap || {});
      setJobDataMap(jobMap || {});
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewApplication = async (applicationId) => {
    try {
      const response = await fetch(
        `https://apihgt.solvifytech.in/api/v1/Application/SelectById/${applicationId}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MTk2NTYzLCJpYXQiOjE3NDcxOTQ3NjN9.eOeIIM3OfRTIOheSLh51kTE7TpyRIxqTX832k5XUUFo",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch application details");
      const data = await response.json();
      // Optionally, you can pass data via state or context
      navigate(`/all-applicants/${applicationId}`, { state: { application: data.data } });
    } catch (error) {
      alert("Failed to load application details");
    }
  };

  const handleApplicationAction = async (applicationId, newStatus) => {
    setActionLoading(prev => ({ ...prev, [applicationId]: true }));

    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Application/UpdateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM`
        },
        body: JSON.stringify({
          application_id: applicationId,
          status: newStatus
        })
      });

      if (!response.ok) throw new Error('Action failed');

      setApplications(prev => prev.map(app =>
        app.application_id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Action error:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [applicationId]: false }));
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    setActionLoading(prev => ({ ...prev, [applicationId]: true }));

    try {
      const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Application/Delete/${applicationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM`
        }
      });

      if (!response.ok) throw new Error('Deletion failed');

      setApplications(prev => prev.filter(app => app.application_id !== applicationId));
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [applicationId]: false }));
    }
  };

  if (isLoading) return <div className="widget-content">Loading applications...</div>;
  if (error) return <div className="widget-content error">Error: {error}</div>;

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>Senior Product Designer</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals">Total(s): {applications.length}</Tab>
              {/* <Tab className="tab-btn approved">Approved: {approvedApplications.length}</Tab> */}
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <ApplicationList
                applications={applications}
                userDataMap={userDataMap}
                jobDataMap={jobDataMap}
                onAction={handleApplicationAction}
                onDelete={handleDeleteApplication}
                actionLoading={actionLoading}
                onView={handleViewApplication}
                fetchData={fetchData}
              />
            </TabPanel>

            <TabPanel>
              <ApplicationList
                applications={approvedApplications}
                userDataMap={userDataMap}
                jobDataMap={jobDataMap}
                onAction={handleApplicationAction}
                onDelete={handleDeleteApplication}
                actionLoading={actionLoading}
                fetchData={fetchData}
              />
            </TabPanel>

            <TabPanel>
              <ApplicationList
                applications={rejectedApplications}
                userDataMap={userDataMap}
                jobDataMap={jobDataMap}
                onAction={handleApplicationAction}
                onDelete={handleDeleteApplication}
                actionLoading={actionLoading}
                fetchData={fetchData}
              />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const ApplicationList = ({ applications, userDataMap, jobDataMap, onAction, onDelete, actionLoading, onView, fetchData }) => (
  <div className="row">
    {applications.length > 0 ? (
      applications.map(application => (
        <ApplicationCard
          key={application.application_id}
          application={application}
          userData={userDataMap[application.user_id]}
          jobData={jobDataMap[application.job_id]}
          onAction={onAction}
          onDelete={onDelete}
          isLoading={actionLoading[application.application_id]}
          onView={onView}
          fetchData={fetchData}
        />
      ))
    ) : (
      <div className="col-12 text-center py-4">No applications found</div>
    )}
  </div>
);

const ApplicationCard = ({ application, userData, jobData, onAction, onDelete, isLoading, fetchData }) => {

  const user = userData || {};
  console.warn({
    jj: user
  })
  const job = jobData || {};

  console.warn({
    job: job
  })

  const approveStatus = async (changeApplicationId, applicationStatusType) => {
    try {
      const token = localStorage.getItem("authToken");
      const statusBody = {
        applicationId: changeApplicationId,
        status: applicationStatusType
      }
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Application/Status", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(statusBody)
      });

      const result = await response.json();
      switch (result.status) {
        case 1:
          toast.success(result.message);
          fetchData();
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
      <div className="inner-box p-0 px-2  pb-2">
        <div className="content">
          <figure className="image m-0">
            <img
              className=""
              src={user.avatar || "/images/user.jpg"}
              alt="avatar"
            />
          </figure>
          <h4 className="name ms-3 ms-sm-0">
            <Link to={`/candidates-single-v1/${application.application_id}`}>
              {user.full_name || `Applicant #${application.application_id}`}
            </Link>
          </h4>

          {/* <ul className="candidate-info">
            <li>
              <span className="icon flaticon-map-locator"></span>{" "}
              {user.country || "N/A"}
            </li>
          </ul> */}

          <ul className="post-tags">
            <li className="designation">{job.job_title || "Not specified"}</li>
          </ul>
        </div>

        <div className="option-box" style={{ marginTop: "-2px" }}>
          <ul className="option-list">
            <li>
              <Link
                to={`/candidates-single-v1/${application?.application_id}`}
                data-text="View Application"
                // onClick={() => onView(application.application_id)}
                disabled={isLoading}
                title="View Application"
              >
                {/* <Link to={`/candidates-single-v1/${application.application_id}`}> */}
                <span className="la la-eye"></span>
                {/* </Link> */}
              </Link>
            </li>
            {application.status !== "ShortListed" && (
              <li>
                <button
                  data-text="ShortList Application"
                  onClick={() => approveStatus(application?.application_id, "ShortListed")}
                  disabled={isLoading}
                  title="ShortList Application"
                >
                  {isLoading ? (
                    <span className="la la-spinner spinner"></span>
                  ) : (
                    <span className="la la-check"></span>
                  )}
                </button>
              </li>
            )}
            {/* {application.status !== "Rejected" && (
              <li>
                <button
                  onClick={() => onAction(application.application_id, "Rejected")}
                  disabled={isLoading}
                  title="Reject Application"
                >
                  {isLoading ? (
                    <span className="la la-spinner spinner"></span>
                  ) : (
                    <span className="la la-times-circle"></span>
                  )}
                </button>
              </li>
            )} */}

            <li>
              <button
                data-text="Delete Application"
                onClick={() => onDelete(application.application_id)}
                disabled={isLoading}
                title="Delete Application"
              >
                {isLoading ? (
                  <span className="la la-spinner spinner"></span>
                ) : (
                  <span className="la la-trash"></span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default WidgetContentBox;

