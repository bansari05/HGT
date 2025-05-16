import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeBackground = () => {
    setNavbar(window.scrollY >= 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    // Check if user is logged in by checking token in localStorage
    const token = localStorage.getItem("authToken");
    if (token && token !== "undefined") {
      setIsLoggedIn(true);
    }

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={`main-header ${navbar ? "fixed-header animated slideInDown" : ""}`}
    >
      <div className="main-box">
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link to="/">
                <img src="/public/images/hgt-logo.png" alt="brand" />
              </Link>
            </div>
          </div>

          <HeaderNavContent />
        </div>

        <div className="outer-box">
          <Link to="/candidates-dashboard/cv-manager" className="upload-cv">
            Upload your CV
          </Link>

          <div className="btn-box">
            {/* {!isLoggedIn && ( */}
            <a
              href="#"
              className="theme-btn btn-style-three call-modal"
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal"
            >
              Login / Register - Admin
            </a>
            {/* )} */}

            <Link to="/employers-dashboard/post-jobs" className="theme-btn btn-style-one">
              Job Post
            </Link>

            {/* ✅ Show only when logged in */}
            {isLoggedIn && (
              <Link
                to="/my-profile"
                className="theme-btn btn-style-one"
              >
                User
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
