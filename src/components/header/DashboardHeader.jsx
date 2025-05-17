import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
    const { pathname } = useLocation();
    const [navbar, setNavbar] = useState(false);
    const user = useSelector((state) => state.user.user);

    const changeBackground = () => {
        if (window.scrollY >= 0) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        const activeParent = employerMenuData.find((item) =>
            item.subtype?.some((subItem) => isActiveLink(subItem.routePath, pathname))
        );
        window.addEventListener("scroll", changeBackground);
    }, []);

    const menuToggleHandler = () => {
        dispatch(menuToggle());
    };

    return (
        // <!-- Main Header-->
        <header
            className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""
                }`}
        >
            <div className="container-fluid">
                {/* <!-- Main box --> */}
                <div className="main-box">
                    {/* <!--Nav Outer --> */}
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link to="/">
                                    <img
                                        alt="brand"
                                        src="/public/images/hgt-logo.png"

                                    />
                                </Link>
                            </div>
                        </div>
                        {/* End .logo-box */}

                        {/* <HeaderNavContent /> */}
                        {/* <!-- Main Menu End--> */}
                    </div>
                    {/* End .nav-outer */}
                    <div className="outer-box">
                        {/* <button className="menu-btn">
                            <span className="count">1</span>
                            <span className="icon la la-heart-o"></span>
                        </button> */}
                        {/* wishlisted menu */}

                        {/* <button className="menu-btn">
                            <span className="icon la la-bell"></span>
                        </button> */}
                        {/* End notification-icon */}

                        {/* <!-- Dashboard Option --> */}
                        <div className="dropdown dashboard-option">
                            <a
                                className="" // dropdown-toggle
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {/* <img
                                    alt="avatar"
                                    className="thumb"
                                    src="/images/resource/company-6.png"

                                /> */}
                                <span className="name">{user?.full_name}</span>
                            </a>

                            {/* <ul className="dropdown-menu">
                                {employerMenuData.map((item) => (
                                    <li
                                        className={`${isActiveLink(
                                            item.routePath,
                                            pathname
                                        )
                                            ? "active"
                                            : ""
                                            } mb-1`}
                                        key={item.id}
                                    >
                                        <Link to={item.routePath}>
                                            <i
                                                className={`la ${item.icon}`}
                                            ></i>{" "}
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                                 {employerMenuData.map((item) => {
                                    const isLogout = item.name === "Logout";
                                    const hasSubtype = item.subtype?.length > 0;
                                    const isParentActive = hasSubtype && item.subtype.some(
                                        (subItem) => isActiveLink(subItem.routePath, pathname)
                                    );

                                    return (
                                        <li
                                            // className={`${isParentActive || isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                                            className={`${isParentActive || isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                                            key={item.id}
                                            onClick={() => {
                                                if (isLogout) handleLogout();
                                                else if (hasSubtype) {
                                                    setOpenDropdownId((prev) =>
                                                        prev === item.id ? null : item.id
                                                    );
                                                } else menuToggleHandler();
                                            }}
                                        >
                                            {hasSubtype ? (
                                                <>
                                                    <Link to={isLogout ? "#" : item.routePath}>
                                                        <i className={`la ${item.icon}`}></i> {item.name}
                                                        <i className={`las la-angle-left dropdown-arrow ${openDropdownId === item.id ? "open" : ""} position-absolute`} style={{ right: 0, fontSize: "17px" }}></i>
                                                    </Link>
                                                    {openDropdownId === item.id && (
                                                        <ul className="submenu">
                                                            {item.subtype.map((subItem) => (
                                                                <li
                                                                    key={subItem.id}
                                                                    className={`${isActiveLink(subItem.routePath, pathname) ? "active" : ""} mt-1`} >
                                                                    <Link
                                                                        to={subItem.routePath}
                                                                        onClick={menuToggleHandler}
                                                                    >
                                                                        <i className={`la ${subItem.icon}`}></i>{" "}
                                                                        {subItem.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </>
                                            ) : (
                                                <Link to={isLogout ? "#" : item.routePath}>
                                                    <i className={`la ${item.icon}`}></i> {item.name}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })} 
                            </ul>*/}
                        </div>
                        {/* End dropdown */}
                    </div>

                    {/* End outer-box */}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
