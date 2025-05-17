// import React from "react";
// import MetaComponent from "@/components/common/MetaComponent";
// import Country from "../../../components/dashboard-pages/employers-dashboard/country";

// const metadata = {
//   title: "Company Profile || Superio - Job Board ReactJs Template",
//   description: "Superio - Job Board ReactJs Template",
// };

// const CountryPage = () => {
//   return (
//     <>
//       <MetaComponent meta={metadata} />
//       <Country />
//     </>
//   );
// };

// export default CountryPage;

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import State from "../../../components/dashboard-pages/employers-dashboard/country/state";

const metadata = {
  title: "Company Profile || Superio - Job Board ReactJs Template",
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
