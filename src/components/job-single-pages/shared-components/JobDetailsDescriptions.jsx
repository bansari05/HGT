const JobDetailsDescriptions = ({jobDetails}) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>
        {jobDetails.job_description}
        {/*As a Product Designer, you will work within a Product Delivery Team*/}
        {/*fused with UX, engineering, product and data talent. You will help the*/}
        {/*team design beautiful interfaces that solve business challenges for our*/}
        {/*clients. We work with a number of Tier 1 banks on building web-based*/}
        {/*applications for AML, KYC and Sanctions List management workflows. This*/}
        {/*role is ideal if you are looking to segue your career into the FinTech*/}
        {/*or Big Data arenas.*/}
      </p>
    </div>
  );
};

export default JobDetailsDescriptions;
