import React, { FC, ReactElement } from 'react';

interface PreloaderProps {
    type: string;
    title: string;
    message: string;
}

const ErrorModal: FC<PreloaderProps> = ({
    type,
    title,
    message,
}: PreloaderProps): ReactElement => {
    return (
        <div className={`error-modal-container ${type}`}>
            <div className="error-content">
                <div className="title">{title}</div>
                <div className="message">{message}</div>
            </div>
        </div>
    );
};

export default ErrorModal;
