import React from "react";
import Home from "@/components/home-1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-1 || Higher Global Talent - Home",
  description: "HGT - Job Board",
};

const HomePage1 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage1;
