
import Packages from "@/components/dashboard-pages/employers-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || Higher Global Talent - Packages",
  description: "HGT - Job Board",
};

const PackageEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackageEmploeeDBPage
