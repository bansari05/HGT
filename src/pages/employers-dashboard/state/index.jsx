import MetaComponent from "@/components/common/MetaComponent";
import State from "../../../components/dashboard-pages/employers-dashboard/country/state";

const metadata = {
  title: "Company Profile || Higher Global Talent - State",
  description: "Superio - Job Board ReactJs Template",
};

const StatePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <State />
    </>
  );
};

export default StatePage;
