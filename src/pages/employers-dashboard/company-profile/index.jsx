
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Higher Global Talent - Company Profile",
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
