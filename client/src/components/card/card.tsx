import React, { FC } from 'react';
import './card.scss';


const Card: FC = (props) => {
    return (
        <div className="card">
            { props.children }
        </div>
    )
}

export default Card;