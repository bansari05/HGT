import { useState, useEffect, useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";

const WidgetContentBox = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDataMap, setUserDataMap] = useState({});
  const [jobDataMap, setJobDataMap] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  // Memoized filtered applications
  const [approvedApplications, rejectedApplications] = useMemo(() => [
    applications.filter(app => app.status === "Approved"),
    applications.filter(app => app.status === "Rejected")
  ], [applications]);

  useEffect(() => {
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

        if (!appsResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const appsData = await appsResponse.json();
        const usersData = await usersResponse.json();
        const jobsData = await jobsResponse.json();

        // Create user data map
        const userMap = usersData.data?.reduce((acc, user) => ({
          ...acc,
          [user.user_id]: user
        }), {});

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

    fetchData();
  }, []);

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
            <h6>Applications Manager</h6>
            
            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals">Total: {applications.length}</Tab>
              <Tab className="tab-btn approved">Approved: {approvedApplications.length}</Tab>
              <Tab className="tab-btn rejected">Rejected: {rejectedApplications.length}</Tab>
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
              />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const ApplicationList = ({ applications, userDataMap, jobDataMap, onAction, onDelete, actionLoading }) => (
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
        />
      ))
    ) : (
      <div className="col-12 text-center py-4">No applications found</div>
    )}
  </div>
);

const ApplicationCard = ({ application, userData, jobData, onAction, onDelete, isLoading }) => {
  const user = userData || {};
  const job = jobData || {};
  const cvUrl = application.applicant_cv 
    ? `https://apihgt.solvifytech.in/api/v1/documents/${application.applicant_cv}`
    : null;

  return (
    <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
      <div className="inner-box">
        <div className="content">
          <figure className="image">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt={`${user.full_name || 'Applicant'} avatar`}
            />
          </figure>

          <h4 className="name">
            <Link to={`/candidates/${application.user_id}`}>
              {user.full_name ? `${user.full_name}` : `Applicant #${application.user_id}`}
            </Link>
          </h4>

          <ul className="candidate-info">
            {job.job_title && (
              <li className="status-badge">
                {job.job_title}
              </li>
            )}

            <li className={`status-badge ${application.status.toLowerCase()}`}>
              {application.status}
            </li>
            <li>
              <span className="icon flaticon-map-locator"></span>
              Applied: {new Date(application.created).toISOString().split('T')[0]}
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>{job.industry}</li>
          </ul>
        </div>

        <div className="option-box">
          <ul className="option-list">
            <li>
              <Link 
                to={`/applications/${application.application_id}`}
                className="btn-view"
                title="View Details"
              >
                <span className="la la-eye"></span>
              </Link>
            </li>
            
            {application.status !== 'Approved' && (
              <li>
                <button 
                  onClick={() => onAction(application.application_id, 'Approved')}
                  disabled={isLoading}
                  title="Approve"
                >
                  {isLoading ? <span className="la la-spinner spinner"></span> : <span className="la la-check"></span>}
                </button>
              </li>
            )}

            {application.status !== 'Rejected' && (
              <li>
                <button 
                  onClick={() => onAction(application.application_id, 'Rejected')}
                  disabled={isLoading}
                  title="Reject"
                >
                  {isLoading ? <span className="la la-spinner spinner"></span> : <span className="la la-times"></span>}
                </button>
              </li>
            )}

            <li>
              <button 
                onClick={() => onDelete(application.application_id)}
                disabled={isLoading}
                title="Delete"
              >
                {isLoading ? <span className="la la-spinner spinner"></span> : <span className="la la-trash"></span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WidgetContentBox;