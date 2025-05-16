import Qualification from "@/components/dashboard-pages/employers-dashboard/qualification";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Superio - Job Board ReactJs Template",
  description: "Superio - Job Board ReactJs Template",
};

const QualificationPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Qualification />
    </>
  );
};

export default QualificationPage;
