import React, { FC, ReactElement, useState } from 'react';

export interface PreloaderProps {
    showCapture: boolean;
    onCompleteCallback: () => void;
    triggerDisplay: () => void;
}

const Preloader: FC<PreloaderProps> = ({
    showCapture,
    onCompleteCallback,
}: PreloaderProps): ReactElement => {
    const [displayTransition, setDisplayTransition] = useState(false);
    const [fade, setFade] = useState(false);
    const handleCaptured = (event: any) => {
        if (event.animationName !== 'fade') return;
        setDisplayTransition(false);
        setFade(false);
        onCompleteCallback();
    };
    return (
        <>
            <div
                className={`preloader-container ${fade ? 'fade' : ''}`}
                onAnimationEnd={(event) => handleCaptured(event)}
            >
                <div
                    className={`preloader-content ${
                        showCapture ? 'preloader-still' : 'preloader-active'
                    }`}
                >
                    <div className="pokeball-top" />
                    <div className="pokeball-center">
                        <div className="circle">
                            <div className="inner-circle">
                                <div
                                    className={`inner-inner-circle ${
                                        showCapture ? 'capture' : ''
                                    }`}
                                    onAnimationEnd={() =>
                                        setDisplayTransition(true)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pokeball-bottom" />
                </div>
            </div>
            {displayTransition && (
                <div
                    className={`transition ${fade ? 'fade' : ''}`}
                    onAnimationEnd={() => setFade(true)}
                />
            )}
        </>
    );
};

export default Preloader;
