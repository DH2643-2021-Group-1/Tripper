import React, { FC } from 'react';

interface PureInputProps {
    text: string
    onEditText: (newText: string) => void,
}

const PureInput: FC<PureInputProps> = (props) => {
    return (
        <span 
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(event) => {
                const element = event.target as HTMLDivElement;
                props.onEditText(element.innerText);
            }}>
            { props.text }
        </span>
    )
}

export default PureInput;