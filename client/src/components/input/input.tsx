import React, { FC } from 'react';
import './input.scss';

export interface InputProps {
    type?: string,
    name: string,
    label?: string,
    disabled?: boolean,
    placeholder?: string,
    value?: string,
    errorText?: string,
    onFocus?: () => void,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void,
}

const Input: FC<InputProps> = (props) => {
    const inputClassStates = [
        props.disabled ? "input--disabled" : "",
    ];

    return (
        <div className="input-container">
            <div>
                <label htmlFor={ props.name }>
                    { props.label }
                </label>
            </div>
            <input
                name={ props.name }
                disabled={ props.disabled }
                placeholder={ props.placeholder }
                value= { props.value }
                onFocus={ props.onFocus }
                onChange={ (inputEvent) => { 
                    if (props.onChange) props.onChange(inputEvent);
                }}
                onInput={ (inputEvent) => { 
                    if (props.onInput) props.onInput(inputEvent);
                }}
                className={ "input-container__input" + inputClassStates.join(" ") }
                type={ props.type}  />
            { props.errorText }
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    disabled: false,
    placeholder: "",
    value: "",
    label: "",
    onFocus: () => {/***/},
    onChange: (_) => {/***/},
    onInput: (_) => {/***/}
}

export default Input;