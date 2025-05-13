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

  // Toggle sidebar menu
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Optional Redux cleanup (if you store user in Redux)
    dispatch(clearUser()); 

    // Redirect to homepage or login page
    window.location.href = "/";
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => {
            const isLogout = item.name === "Logout";

            return (
              <li
                className={`${
                  isActiveLink(item.routePath, pathname) ? "active" : ""
                } mb-1`}
                key={item.id}
                onClick={() => {
                  if (isLogout) {
                    handleLogout();
                  } else {
                    menuToggleHandler();
                  }
                }}
              >
                {/* Use "#" to prevent navigation if Logout */}
                <Link to={isLogout ? "#" : item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
