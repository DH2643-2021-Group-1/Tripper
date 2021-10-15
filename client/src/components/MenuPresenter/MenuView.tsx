import React from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import MenuIconPresenter from "./MenuIcons/MenuIconPresenter";

interface Props {}

const MenuView: React.FC<Props> = () => {
  return (
    <div className="Menu">
      <div className="Menu-content">
        <Link className="Menu-item" to="/">
          <MenuIconPresenter menuIcon="compass" height="20px" />
          Tripper!
        </Link>
        <Link className="Menu-item" to="/post">
          <MenuIconPresenter menuIcon="plus" height="20px" />
          New blogpost
        </Link>
        <Link className="Menu-item" to="/profile">
          <MenuIconPresenter menuIcon="user" height="20px" />
          Profile
        </Link>
        <Link className="Menu-item" to="/">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default MenuView;
