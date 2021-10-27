import React, { FC } from "react";
import "./loading-indicator.scss";
import spinner from "../../resources/images/spinner.gif";

const LoadingIndicator: FC = (props) => {
  return <img className={"loader"} src={spinner} alt="loading..." />;
};

export default LoadingIndicator;
