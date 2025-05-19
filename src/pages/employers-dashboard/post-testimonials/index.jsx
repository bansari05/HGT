
import PostTestimonial from "@/components/dashboard-pages/employers-dashboard/post-testimonials";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || Higher Global Talent - Testimonials",
  description: "HGT - Job Board",
};

const PostTestimonialsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <PostTestimonial />
    </>
  );
};

export default PostTestimonialsEmploeeDBPage
