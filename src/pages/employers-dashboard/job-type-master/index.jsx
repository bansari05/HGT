

import MetaComponent from "@/components/common/MetaComponent";
import Jobtypemaster from "../../../components/dashboard-pages/employers-dashboard/job-type-master";

const metadata = {
  title: "Manage Jobs || Higher Global Talent - Job Board",
  description: "HGT - Job Board",
};

const JobTypeMasterDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Jobtypemaster />
    </>
  );
};

export default JobTypeMasterDBPage
