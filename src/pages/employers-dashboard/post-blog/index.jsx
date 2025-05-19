
import PostBlog from "@/components/dashboard-pages/employers-dashboard/post-blog";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || HGT - Job Board",
  description: "HGT - Job Board",
};

const PostBlogsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <PostBlog />
    </>
  );
};

export default PostBlogsEmploeeDBPage
