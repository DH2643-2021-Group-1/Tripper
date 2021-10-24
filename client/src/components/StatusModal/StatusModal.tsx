import React, { FC } from 'react';
import Card from '../card/card';
import './StatusModal.scss';

import ErrorIcon from '@mui/icons-material/ErrorOutlineRounded';
import SuccessIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningIcon from '@mui/icons-material/WarningAmberRounded';


export interface StatusModalProps {
    type: StatusModalType,
    title: string,
}

export enum StatusModalType {
    success,
    warning,
    error,
}

const StatusModal: FC<StatusModalProps> = (props) => {
    const statusModalClassStates = [
        props.type === StatusModalType.success ? "status-modal--success" : "",
        props.type === StatusModalType.warning ? "status-modal--warning" : "",
        props.type === StatusModalType.error ? "status-modal--error" : "",
    ];

    const renderIcon = () => {
        switch (props.type) {
            case StatusModalType.success:
                return <SuccessIcon fontSize="large"/>
            case StatusModalType.warning:
                return <WarningIcon fontSize="large"/>
            case StatusModalType.error:
                return <ErrorIcon fontSize="large"/>
            default:
                return <></>
        }
    }

    return (
        <Card>
            <div className={"status-modal " + statusModalClassStates.join(" ")}>
                <div className="status-modal__icon-container">
                    { renderIcon() }
                </div>
                <div className="status-modal__line-split"></div>
                <div className="status-modal__text-container">
                    <div className="status-modal__title">
                        { props.title }
                    </div>
                    <div className="status-modal__description">
                        { props.children}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default StatusModal;