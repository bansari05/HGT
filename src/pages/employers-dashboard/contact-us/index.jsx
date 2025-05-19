import MetaComponent from "@/components/common/MetaComponent";
import ContactUsIndex from "@/components/dashboard-pages/employers-dashboard/contact-us";

const metadata = {
    title: "Manage Contacts || HGT - Contact Board",
    description: "HGT - Contact Board",
};

const ContactUsDBPage = () => {
    return (
        <>
            <MetaComponent meta={metadata} />
            <ContactUsIndex />
        </>
    );
};

export default ContactUsDBPage
