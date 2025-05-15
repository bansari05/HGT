import { Link } from "react-router-dom";
import About from "../about/About";
import Blog from "../blog/Blog";
import CallToAction from "../call-to-action/CallToAction";
import Partner from "../common/partner/Partner";
import FooterDefault from "../footer/common-footer";
import DefaulHeader2 from "../header/DefaulHeader2";
import Hero1 from "../hero/hero-1";
import JobCategorie1 from "../job-categories/JobCategorie1";
import JobFeatured1 from "../job-featured/JobFeatured1";
import Testimonial from "../testimonial/Testimonial";
import LoginPopup from "../common/form/login/LoginPopup";
import Breadcrumb from "../dashboard-pages/BreadCrumb";
import MobileMenu from "../header/MobileMenu";
import BreadCrumb from "../dashboard-pages/BreadCrumb";
import UserForm from "./components/UserForm";

const index = () => {
    return (
        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            <LoginPopup />
            {/* End Login Popup Modal */}

            <DefaulHeader2 />
            {/* End Header with upload cv btn */}

            <MobileMenu />
            {/* End MobileMenu */}

        

             <section className="banner-section">
        <div className="dashboard-outer">
          <BreadCrumb  />

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>

                  <div className="widget-content">
                    <UserForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>

       

            {/* <!--End Breadcrumb Start--> */}

           
            {/* <!--End Listing Page Section --> */}

            <FooterDefault footerStyle="alternate5" />
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
