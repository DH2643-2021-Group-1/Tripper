import React from "react";
import "./Menu.scss";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import MenuIconPresenter from "./MenuIcons/MenuIconPresenter";

interface Props {}

const MenuView: React.FC<Props> = () => {
  const history = useHistory();
  return (
    <div className="Menu">
      <div className="Menu-content">
        <span className="Menu-item" onClick={() => history.push("/")}>
          <MenuIconPresenter menuIcon="compass" height="20px" />
          Tripper
        </span>
        <span className="Menu-item" onClick={() => history.push("/post")}>
        <MenuIconPresenter menuIcon="plus" height="20px" />
          New blogpost
        </span>
        <span className="Menu-item" onClick={() => history.push("/profile")}>
        <MenuIconPresenter menuIcon="user" height="20px" />
          Profile
        </span>
        <span className="Menu-item">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign out
        </span>
      </div>
    </div>
  );
};

export default MenuView;
