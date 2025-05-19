
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || Higher Global Talent - Post Jobs",
  description: "HGT - Job Board",
};

const PostJobsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <PostJob />
    </>
  );
};

export default PostJobsEmploeeDBPage
