

import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'About || HGT - Job Board',
  description:
    'HGT - Job Board',
  
}



const AboutPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <About />
    </>
  );
};

export default AboutPage
