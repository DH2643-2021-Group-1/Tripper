import React, { FC } from "react";
import CenterContent from "../center-content/center-content";
import LoadingIndicator from "../loading-indicator/loading-indicator";
import "./page-loading-indicator.scss";

const PageLoadingIndicator: FC = (props) => {
  return (
    <div className="page-loading-indicator__container">
      <CenterContent>
        <LoadingIndicator />
      </CenterContent>
    </div>
  );
};

export default PageLoadingIndicator;
