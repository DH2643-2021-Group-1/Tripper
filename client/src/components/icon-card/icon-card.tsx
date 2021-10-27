import React, { FC } from "react";
import Card from "../card/card";
import CenterContent from "../center-content/center-content";
import "./icon-card.scss";

interface IconCardProps {
  leading: React.ReactNode;
}

const IconCard: FC<IconCardProps> = (props) => {
  return (
    <Card className="icon-card__container">
      <div className="icon-card__inner-container">
        <div className="icon-card__leading-container">
          <CenterContent>{props.leading}</CenterContent>
        </div>
        <div className="icon-card__split"></div>
        <div className="icon-card__content-container">{props.children}</div>
      </div>
    </Card>
  );
};

export default IconCard;
