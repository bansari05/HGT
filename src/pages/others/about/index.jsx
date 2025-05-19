

import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'About || Higher Global Talent - About',
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
