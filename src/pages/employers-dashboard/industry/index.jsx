
import Industries from "@/components/dashboard-pages/employers-dashboard/industry";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Higher Global Talent - Job Board",
  description: "HGT - Job Board",
};

const IndustriesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Industries />
    </>
  );
};

export default IndustriesPage
