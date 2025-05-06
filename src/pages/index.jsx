import Wrapper from "@/layout/Wrapper";
import HomeComponent from "@/components/home-1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "High Global Talent",
  description: "High Global Talent",
};

export default function Home() {
  return (
    <Wrapper>
    <MetaComponent meta={metadata} />
      <HomeComponent />
    </Wrapper>
  );
}
