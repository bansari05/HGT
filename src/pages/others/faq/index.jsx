

import Faq from "@/components/pages-menu/faq";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Faq || Higher Global Talent - Faq',
  description:
    'HGT - Job Board',
  
}



const FaqPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Faq />
    </>
  );
};

export default FaqPage
