import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import MenuIconView from "./MenuIconView";
import {
  faCompass,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  menuIcon: string;
  height: string;
}

const MenuIconPresenter: React.FC<Props> = ({ menuIcon, height }) => {
  const location = useLocation();
  const history = useHistory();

  let icon, isActive, iconClickHandler;

  if (menuIcon === "compass") {
    icon = faCompass;
    iconClickHandler = () => history.push("/");
    isActive = location.pathname === "/";
  } else if (menuIcon === "search") {
    icon = faSearch;
    iconClickHandler = () => history.push("/components");
    isActive = location.pathname === "/components";
  } else {
    isActive = false;
    iconClickHandler = () => history.push(location.pathname);
  }

  return (
    <MenuIconView
      height={height}
      icon={icon}
      active={isActive}
      iconClickHandler={iconClickHandler}
    />
  );
};

export default MenuIconPresenter;
