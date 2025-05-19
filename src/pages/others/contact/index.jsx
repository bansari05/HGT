import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Contact || HGT - Job Board',
  description:
    'HGT - Job Board',
  
}

const ContactPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Contact />
    </>
  );
};

export default ContactPage
