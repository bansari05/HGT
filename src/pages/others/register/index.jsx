

import RegisterForm from "@/components/pages-menu/register";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Register || HGT - Job Board',
  description:
    'HGT - Job Board',
  
}



const RegisterPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <RegisterForm />
    </>
  );
};

export default RegisterPage
