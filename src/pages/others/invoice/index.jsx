

import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Invoice || Higher Global Talent - Invoice',
  description:
    'HGT - Job Board',
  
}



const InvoicePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Invoice />
    </>
  );
};

export default InvoicePage
