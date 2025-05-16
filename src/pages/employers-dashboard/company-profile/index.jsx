
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || HGT - Job Board",
  description: "HGT - Job Board",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <CompanyProfile />
    </>
  );
};

export default CompanyProfileEmploeeDBPage
