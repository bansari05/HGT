// import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import User from "@/components/User"


const metadata = {
  title: "Short ListedJobs || HGT - Job Borad",
  description: "HGT - Job Board",
};

const UserPage = () => {
    return (
      <>
        <MetaComponent meta={metadata} />
        <User />
      </>
    );
  };
  
export default UserPage;
  
