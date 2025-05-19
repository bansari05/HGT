import MetaComponent from "@/components/common/MetaComponent";
import Blog from "../../../components/dashboard-pages/employers-dashboard/blog";

const metadata = {
  title: "Company Profile || Higher Global Talent - Blog",
  description: "Superio - Job Board ReactJs Template",
};

const BlogPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Blog />
    </>
  );
};

export default BlogPage;
