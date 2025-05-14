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
import Bookmark from "./components/bookmark";
import Breadcrumb from "../dashboard-pages/BreadCrumb";
import MobileMenu from "../header/MobileMenu";
import BreadCrumb from "../dashboard-pages/BreadCrumb";

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

            {/* <Breadcrumb title="Find Jobs" meta="Jobs" /> */}

            {/* <section className="page-title style-two">
        <div className="auto-container">
            <h2>My Favorites Jobs</h2>
        </div> */}
         {/* <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <SearchBox />
        </div> */}
      {/* </section> */}

            <section className="user-dashboard">
        <div className="dashboard-outer">

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <Bookmark/>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
            
            {/* <!--End Breadcrumb Start--> */}

            <section className="ls-section">
                <div className="auto-container">
                    <div className="row">
                        <div
                            className="offcanvas offcanvas-start"
                            tabIndex="-1"
                            id="filter-sidebar"
                            aria-labelledby="offcanvasLabel"
                        >
                            <div className="filters-column hide-left">
                                {/* <FilterSidebar /> */}
                            </div>
                        </div>
                        {/* End filter column for tablet and mobile devices */}

                        <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12">
                            {/* <FilterSidebar /> */}
                        </div>
                        {/* <!-- End Filters Column for destop and laptop --> */}

                        <div className="content-column col-lg-8 col-md-12 col-sm-12">
                            <div className="ls-outer">
                                {/* <FilterJobsBox /> */}
                                {/* <!-- ls Switcher --> */}
                            </div>
                        </div>
                        {/* <!-- End Content Column --> */}
                    </div>
                    {/* End row */}
                </div>
                {/* End container */}
            </section>
            {/* <!--End Listing Page Section --> */}

            <FooterDefault footerStyle="alternate5" />
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
