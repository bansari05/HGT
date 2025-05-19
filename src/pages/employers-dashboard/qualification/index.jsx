import Qualification from "@/components/dashboard-pages/employers-dashboard/qualification";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Higher Global Talent - Qualifications",
  description: "HGT - Job Board ReactJs Template",
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
