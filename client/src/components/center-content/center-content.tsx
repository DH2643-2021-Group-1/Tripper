import React, { FC } from 'react';
import './center-content.scss';

const CenterContent: FC = (props) => {
    return (
        <div className="center-content__outer-container">
            <div className="center-content__inner-container">
                { props.children }
            </div>
        </div>
    )
}

export default CenterContent;