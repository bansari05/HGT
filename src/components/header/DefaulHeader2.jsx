import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const changeBackground = () => {
    setNavbar(window.scrollY >= 10);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    dispatch(clearUser());
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
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
                <img src="/images/hgt-logo.png" alt="brand" />
              </Link>
            </div>
          </div>

          <HeaderNavContent />
        </div>

        <div className="outer-box">
          {/*<Link to="/candidates-dashboard/cv-manager" className="upload-cv">*/}
          {/*  Upload your CV*/}
          {/*</Link>*/}

          <div className="btn-box">
            {user?.user_type !== "User" && (
              <a
                href="#"
                className="theme-btn btn-style-three call-modal"
                data-bs-toggle="modal"
                data-bs-target="#loginPopupModal"
              >
                Login / Register - Admin
              </a>
            )}

            {/* ✅ Show only when logged in */}
            {user?.access_token && (
              <Link to="/my-profile" className="theme-btn btn-style-one">
                Hi, {user?.full_name}
              </Link>
            )}

            {
              user?.user_type === "User" && (
                <>
                  <div className="d-flex align-items-center justify-content-center px-3" style={{ marginLeft: "18px", backgroundColor: "#04598b", color: "white", borderRadius: "8px" }} onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: "20px", color: "white" }}></i>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
