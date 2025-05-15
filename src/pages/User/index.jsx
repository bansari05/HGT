// import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import User from "@/components/User"


const metadata = {
  title: "Short ListedJobs || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
  
