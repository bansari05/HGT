

import MetaComponent from "@/components/common/MetaComponent";
import Jobtypemaster from "../../../components/dashboard-pages/employers-dashboard/job-type-master";

const metadata = {
  title: "Manage Jobs || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
