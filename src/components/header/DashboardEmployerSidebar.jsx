import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { clearUser } from "../../store/userSlice";

const DashboardEmployerSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const activeParent = employerMenuData.find((item) =>
      item.subtype?.some((subItem) => isActiveLink(subItem.routePath, pathname))
    );
    setOpenDropdownId(activeParent?.id || null);
  }, [pathname]);

  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    dispatch(clearUser());
    window.location.href = "/";
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => {
            const isLogout = item.name === "Logout";
            const hasSubtype = item.subtype?.length > 0;
            const isParentActive = hasSubtype && item.subtype.some(
              (subItem) => isActiveLink(subItem.routePath, pathname)
            );

            return (
              <li
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
                      <i className={`las la-angle-down dropdown-arrow ${openDropdownId === item.id ? "open" : ""} position-absolute`} style={{ right: 0, fontSize: "17px" }}></i>
                    </Link>
                    {openDropdownId === item.id && (
                      <ul className="submenu">
                        {item.subtype.map((subItem) => (
                          <li
                            key={subItem.id}
                            className={isActiveLink(subItem.routePath, pathname) ? "active" : ""} >
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
        </ul>
      </div>
    </div >
  );
};

export default DashboardEmployerSidebar;