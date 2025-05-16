import { Link } from "react-router-dom";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
const HeaderNavContent = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${isActiveParent(homeItems, pathname) ? "current" : ""
              } `}
          >
            {/* <span>Home</span> */}
            <Link to={homeItems[0].items[0].routePath}>Home</Link>

          </li>
          {/* End homepage menu items */}

          <li
            className={`${isActiveParent(findJobItems, pathname) ? "current" : ""
              } dropdown has-mega-menu`}
            id="has-mega-menu"
          >
            <span>Find Jobs</span>
            <div className="mega-menu">
              <div className="mega-menu-bar row">
                {findJobItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <h3>{item.title}</h3>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, pathname)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link to={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>

          <li
            className={`${isActiveParent(employerItems, pathname) ||
                pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
              } dropdown`}
          >
            <span>Employers</span>
            <ul>

              <li
                className={
                  pathname?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link to="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>
              </li>
            </ul>
          </li>
          {/* End Employers menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
