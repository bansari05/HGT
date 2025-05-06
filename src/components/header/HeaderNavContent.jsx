

import {
  homeItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
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
            className={`${
              isActiveParent(homeItems, pathname) ? "current" : ""
            } `}
          >
            <span>Home</span>
          </li>
          {/* End homepage menu items */}

          
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
