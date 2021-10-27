import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import MenuIconView from "./MenuIconView";
import { faCompass, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

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
    isActive = location.pathname === "/" || location.pathname === "/home";
  } else if (menuIcon === "plus") {
    icon = faPlus;
    iconClickHandler = () => history.push("/post");
    isActive = location.pathname === "/post";
  } else if (menuIcon === "user") {
    icon = faUser;
    iconClickHandler = () => history.push("/profile");
    isActive =
      location.pathname === "/profile" || location.pathname === "/edit";
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
