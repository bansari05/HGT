
import ChangePassword from "@/components/dashboard-pages/employers-dashboard/change-password";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Change Password || HGT - Job Board",
  description: "HGT - Job Board",
};

const ChangePasswordEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordEmploeeDBPage
