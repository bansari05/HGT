
import Checkout from "@/components/shop/checkout";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Checkout || HGT - Job Board",
  description: "HGT - Job Board",
};

const CheckoutPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Checkout />
    </>
  );
};

export default CheckoutPage
