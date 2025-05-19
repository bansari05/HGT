
import Categories from "@/components/dashboard-pages/employers-dashboard/categories";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Higher Global Talent - Job Board",
  description: "HGT - Job Board",
};

const CategoriesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Categories />
    </>
  );
};

export default CategoriesPage
