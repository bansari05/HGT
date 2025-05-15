
import Industries from "@/components/dashboard-pages/employers-dashboard/industry";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
