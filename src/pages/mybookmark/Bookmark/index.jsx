// import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import Bookmarks from "@/components/mybookmark";

import JobList from "@/components/job-listing-pages/job-list-v1";

const metadata = {
  title: "Short ListedJobs || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const BookmarkPage = () => {
    return (
      <>
        <MetaComponent meta={metadata} />
        {/* <ShortListedJobs /> */}
        <Bookmarks />
      </>
    );
  };
  
export default BookmarkPage;
  
