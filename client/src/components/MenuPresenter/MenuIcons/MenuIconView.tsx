import React from "react";
import "./menuIcon.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon: any;
  height: string;
  active: boolean;
  iconClickHandler: () => void;
}

const MenuIconView: React.FC<Props> = ({
  icon,
  height,
  active,
  iconClickHandler,
}) => {
  const iconColor = active ? "#01966e" : "#232323";

  return (
    <div
      className="MenuIcon"
      style={{
        fontSize: height,
      }}
      onClick={iconClickHandler}
    >
      <FontAwesomeIcon icon={icon} color={iconColor} />
    </div>
  );
};

export default MenuIconView;
