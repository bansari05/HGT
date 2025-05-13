
import Categories from "@/components/dashboard-pages/employers-dashboard/categories";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
