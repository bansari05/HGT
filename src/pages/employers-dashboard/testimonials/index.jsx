import MetaComponent from "@/components/common/MetaComponent";
import Testimonials from "../../../components/dashboard-pages/employers-dashboard/testimonials";

const metadata = {
  title: "Company Profile || Superio - Job Board ReactJs Template",
  description: "Superio - Job Board ReactJs Template",
};

const TestimonialsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Testimonials />
    </>
  );
};

export default TestimonialsPage;
