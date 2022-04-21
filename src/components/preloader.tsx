import React, { FC, ReactElement } from 'react';

interface PreloaderProps {
    type: string;
    title: string;
    message: string;
}

const Preloader: FC<PreloaderProps> = ({
    type,
    title,
    message,
}: PreloaderProps): ReactElement => {
    return (
        <div className={`preloader-container ${type}`}>
            <div className="preloader-content">
                <div className="title">{title}</div>
                <div className="message">{message}</div>
            </div>
        </div>
    );
};

export default Preloader;
