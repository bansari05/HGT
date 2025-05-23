import MetaComponent from "@/components/common/MetaComponent";
import City from "../../../components/dashboard-pages/employers-dashboard/country/city";

const metadata = {
  title: "Company Profile || Higher Global Talent - City",
  description: "Superio - Job Board ReactJs Template",
};

const CityPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <City />
    </>
  );
};

export default CityPage;
