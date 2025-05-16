
import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";

const index = ({ footerStyle = "" }) => {
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img
                      
                      src="/images/hgt-logo.png"
                      alt="brand"
                    />
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="tel:+19055660004">+1 (905) 566-0004</a>
                </p>
                <a 
                  className="address" 
                  href="https://www.google.com/maps?q=Unit+16,+83+Kennedy+Rd+South,+Brampton,+ON,+L6W+3E1,+Canada" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Unit 16, 83 Kennedy Rd South,
                  <br /> Brampton, ON, L6W 3E1, Canada.
                </a>
                <p>
                  <a href="mailto:vipin@visamastercanada.com" className="email">
                    vipin@visamastercanada.com
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;
