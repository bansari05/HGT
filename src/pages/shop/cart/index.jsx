
import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || HGT - Job Board",
  description: "HGT - Job Board",
};

const CartPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Cart />
    </>
  );
};

export default CartPage
