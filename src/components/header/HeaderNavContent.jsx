import { Link } from "react-router-dom";
import { blogItems, candidateItems, employerItems, findJobItems, homeItems, pageItems, shopItems, } from "../../data/mainMenuData";
import { isActiveParent, isActiveLink, isActiveParentChaild } from "../../utils/linkActiveChecker";

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
            <Link to={homeItems[0].items[0].routePath}>Home</Link>

          </li>
          {/* End homepage menu items */}

          <li>
            <Link to={'/job-list-v1'}>Find Jobs</Link>
          </li>
          <li>
            <Link to={'/blog'}>Blogs</Link>
          </li>
          <li>
            <Link to={'/about'}>About Us</Link>
          </li>
          <li>
            <Link to={'/contact'}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
