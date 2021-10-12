import React, { FC } from 'react';
import './content-wrapper.scss';

interface ContentWrapperProps {
    size?: ContentWrapperSize
}

export enum ContentWrapperSize {
    small,
    medium,
    large,
}

const ContentWrapper: FC<ContentWrapperProps> = (props) => {

    const sizeClass = [
        props.size === ContentWrapperSize.large ? "content-wrapper__large" : "",
        props.size === ContentWrapperSize.medium ? "content-wrapper__medium" : "",
        props.size === ContentWrapperSize.small ? "content-wrapper__small" : ""
    ];

    return (
        <div className={"content-wrapper__container " + sizeClass.join(" ")}>
            { props.children }
        </div>
    )
}

ContentWrapper.defaultProps = {
    size: ContentWrapperSize.medium
}

export default ContentWrapper;