
import ShortlistedResumes from "@/components/dashboard-pages/employers-dashboard/shortlisted-resumes";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shortlisted Resumes || HGT - Job Board",
  description: "HGT - Job Board",
};

const ShortListedResumeEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShortlistedResumes />
    </>
  );
};

export default ShortListedResumeEmploeeDBPage
