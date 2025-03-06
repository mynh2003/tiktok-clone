import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './VolumeControl.module.scss';
import { useVolume } from '~/providers/VolumeProvider';

function VolumeControl({ className, handleMouseEnter, handleMouseLeave, handleMute }) {
    const { isMute, volume, handleVolumeChange, toggleMute } = useVolume();
    const progressRef = useRef(null);
    const circleRef = useRef(null);
    const [transformX, setTransformX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isMute) {
            setTransformX(volume * 36);
        } else {
            setTransformX(0);
        }
    }, [volume, isMute]);

    const handleTransformChange = () => {
        if (isMute) {
            handleMute();
        }
    };

    const handleClickProgress = (e) => {
        const react = e.target.getBoundingClientRect();
        const progressWidth = react.width;

        const clickPosition = e.pageX - react.left;
        const limitedTransformX = Math.max(0, Math.min(clickPosition, progressWidth - 12));

        const newTranslateX = limitedTransformX.toFixed(4);
        setTransformX(newTranslateX);
        handleVolumeChange((newTranslateX / (progressWidth - 12)).toFixed(4));
        handleTransformChange();
    };
    const handleClickBar = (e) => {
        const react = e.target.getBoundingClientRect();
        const progressRect = progressRef.current.getBoundingClientRect();
        const progressWidth = progressRect.width;

        const clickPosition = e.pageX - react.left;
        setTransformX(clickPosition);
        handleVolumeChange((clickPosition / (progressWidth - 12)).toFixed(4));
        handleTransformChange();
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (event) => {
        if (!isDragging || !progressRef.current) return;

        const progressRect = progressRef.current.getBoundingClientRect();
        const progressWidth = progressRect.width;
        const movePosition = event.pageX - progressRect.left;

        const limitedTransformX = Math.max(0, Math.min(movePosition, progressWidth - 12));
        const newTranslateX = limitedTransformX.toFixed(4);

        setTransformX(newTranslateX);
        handleVolumeChange((newTranslateX / (progressWidth - 12)).toFixed(4));
        handleTransformChange();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className={clsx(styles['wrapper'], {
                [className]: className,
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles['volume-control-progress']} ref={progressRef} onClick={handleClickProgress}></div>
            <div
                ref={circleRef}
                className={styles['volume-control-circle']}
                onMouseDown={handleMouseDown}
                style={{
                    transform: `translateX(${transformX}px)`,
                }}
            ></div>
            <div
                className={styles['volume-control-bar']}
                style={{
                    transform: `scaleX(${(transformX / 36).toFixed(4)})`,
                }}
                onClick={handleClickBar}
            ></div>
        </div>
    );
}
VolumeControl.propTypes = {
    className: PropTypes.string,
    isMute: PropTypes.bool,
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func,
    handleMute: PropTypes.func,
};
export default VolumeControl;
