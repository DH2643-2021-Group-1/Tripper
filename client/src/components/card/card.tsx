import React, { FC } from 'react';
import './card.scss';

interface CardProps {
    className?: string,
}

const Card: FC<CardProps> = (props) => {
    return (
        <div className={"card " + props.className}>
            { props.children }
        </div>
    )
}

export default Card;