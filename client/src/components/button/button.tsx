import React, { FC, useEffect, useState } from "react";
import "./button.scss";

export interface ButtonProps {
  type?: ButtonTypes;
  disabled?: boolean;
  onPress: () => void;

  /** Defaults to false. If set to true, the onPress callback is called regardless of the disabled state */
  propagatePressOnDisabled?: boolean;
  isLoading?: boolean;
}

export enum ButtonTypes {
  primary,
  onPrimary,
  secondary,
  tertiary,
  danger,
}

const Button: FC<ButtonProps> = (props) => {
  const [loadingDots, setLoadingDots] = useState<string>("");

  const buttonClassStates = [
    props.disabled ? "button--disabled" : "",
    props.type === ButtonTypes.primary ? "button--primary" : "",
    props.type === ButtonTypes.onPrimary ? "button--on-primary" : "",
    props.type === ButtonTypes.secondary ? "button--secondary" : "",
    props.type === ButtonTypes.tertiary ? "button--tertiary" : "",
    props.type === ButtonTypes.danger ? "button--danger" : "",
  ];

  const handleOnClick = () => {
    if (props.disabled && !props.propagatePressOnDisabled) return;
    props.onPress();
  };

  useEffect(() => {
    var interval = setInterval(() => {
      setLoadingDots((currentDots) => {
        if (currentDots.length >= 3) {
          return "";
        }
        return currentDots + ".";
      });
    }, 250);
    return () => {
      clearInterval(interval);
    };
  }, [props.isLoading]);

  return (
    <div
      onClick={handleOnClick}
      className={"button " + buttonClassStates.join(" ")}
    >
      {props.isLoading ? "Loading" + loadingDots : props.children}
    </div>
  );
};

Button.defaultProps = {
  type: ButtonTypes.primary,
  disabled: false,
  propagatePressOnDisabled: false,
  isLoading: false,
};

export default Button;
