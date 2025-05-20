import { format } from 'date-fns';

const JobOverView = ({jobDetails}) => {
  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{jobDetails?.created && format(new Date(jobDetails.created), 'MMMM dd, yyyy')}</span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>
          {jobDetails?.dead_line_date && format(new Date(jobDetails.dead_line_date), 'MMMM dd, yyyy')}
          </span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{`${jobDetails.city},${jobDetails.country}`}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jobDetails.job_title}</span>
        </li>
        {/*<li>*/}
        {/*  <i className="icon icon-clock"></i>*/}
        {/*  <h5>Hours:</h5>*/}
        {/*  <span>50h / week</span>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <i className="icon icon-rate"></i>*/}
        {/*  <h5>Rate:</h5>*/}
        {/*  <span>$15 - $25 / hour</span>*/}
        {/*</li>*/}
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{jobDetails.salary}</span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;
