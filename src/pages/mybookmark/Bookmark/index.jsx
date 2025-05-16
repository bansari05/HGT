// import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import Bookmarks from "@/components/mybookmark";


const metadata = {
  title: "Short ListedJobs || HGT - Job Board",
  description: "HGT - Job Board",
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
  
