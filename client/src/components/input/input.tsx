import React, { FC } from "react";
import "./input.scss";

export interface InputProps {
  multiLine?: boolean;
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  errorText?: string;
  isMissing?: boolean;
  onFocus?: () => void;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>,
  ) => void;
  onInput?: (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>,
  ) => void;
}

const Input: FC<InputProps> = (props) => {
  const inputClassStates = [props.disabled ? "input--disabled" : ""];

  const singleLineRender = () => {
    return (
      <>
        <div>
          <label htmlFor={props.name}>{props.label}</label>
        </div>
        <input
          name={props.name}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          onFocus={props.onFocus}
          onChange={(inputEvent) => {
            if (props.onChange) props.onChange(inputEvent);
          }}
          onInput={(inputEvent) => {
            if (props.onInput) props.onInput(inputEvent);
          }}
          className={
            props.isMissing
              ? ["input-container__input--empty", inputClassStates].join(" ")
              : ["input-container__input--default", inputClassStates].join(" ")
          }
          type={props.type}
        />
        {props.errorText}
      </>
    );
  };

  const multiLineRender = () => {
    return (
      <>
        <div>
          <label htmlFor={props.name}>{props.label}</label>
        </div>
        <textarea
          name={props.name}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          onFocus={props.onFocus}
          onChange={(inputEvent) => {
            if (props.onChange) props.onChange(inputEvent);
          }}
          onInput={(inputEvent) => {
            if (props.onInput) props.onInput(inputEvent);
          }}
          className={
            props.isMissing
              ? [
                  "input-container__input--empty",
                  "input-container--multiline",
                  inputClassStates,
                ].join(" ")
              : [
                  "input-container__input--default",
                  "input-container--multiline",
                  inputClassStates,
                ].join(" ")
          }
        ></textarea>
        {props.errorText}
      </>
    );
  };

  return (
    <div className="input-container">
      {!props.multiLine && singleLineRender()}
      {props.multiLine && multiLineRender()}
    </div>
  );
};

Input.defaultProps = {
  multiLine: false,
  type: "text",
  disabled: false,
  placeholder: "",
  value: "",
  label: "",
  isMissing: false,
  onFocus: () => {
    /***/
  },
  onChange: (_) => {
    /***/
  },
  onInput: (_) => {
    /***/
  },
};

export default Input;
