import React, { FC } from 'react';
import './button.scss';

export interface ButtonProps {
    type?: ButtonTypes,
    disabled?: boolean,
    onPress: () => void

    /** Defaults to false. If set to true, the onPress callback is called regardless of the disabled state */ 
    propagatePressOnDisabled?: boolean
}

export enum ButtonTypes {
    primary,
    secondary
}

const Button: FC<ButtonProps> = (props) => {
    const buttonClassStates = [
        props.disabled ? "button--disabled" : "",
        props.type === ButtonTypes.primary ? "button--primary" : "",
        props.type === ButtonTypes.secondary ? "button--secondary" : "",
    ];

    const handleOnClick = () => {
        if (props.disabled && !props.propagatePressOnDisabled) return;
        props.onPress();
    }

    return (
        <div 
            onClick={ handleOnClick }
            className={ "button " + buttonClassStates.join(" ") }>
            { props.children }
        </div>
    )
}

Button.defaultProps = {
    type: ButtonTypes.primary,
    disabled: false,
    propagatePressOnDisabled: false,
}

export default Button;