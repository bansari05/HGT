
import AllApplicants from "@/components/dashboard-pages/employers-dashboard/all-applicants";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "All Applicants || Higher Global Talent - Job Board",
  description: "HGT - Job Board",
};

const AllApplicantsEmploeesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <AllApplicants />
    </>
  );
};

export default AllApplicantsEmploeesPage
