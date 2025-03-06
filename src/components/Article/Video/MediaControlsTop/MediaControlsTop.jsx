import { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './MediaControlsTop.module.scss';

import VolumeIcon from '~/assets/images/volume-icon.svg?react';
import MutedIcon from '~/assets/images/muted-icon.svg?react';
import VolumeControl from './VolumeControl';
import HorizontalTaskbarIcon from '~/assets/images/horizontal-taskbar-icon.svg?react';
import Popup from './Popup';
import { useVolume } from '~/providers/VolumeProvider';

function MediaControlsTop({ handleMute, hoverVisible }) {
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { isMute } = useVolume();

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
        if (isMute) {
            setIsActive(false);
        }
    };

    const handleClick = () => {
        handleMute();
        if (!isMute) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };
    return (
        <div className={styles['wrapper']}>
            <div className={styles['audio-container']}>
                {isHover && !isActive && (
                    <VolumeControl
                        className={styles['volume-control']}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        handleMute={handleMute}
                    />
                )}
                <div
                    className={clsx(styles['volume-container'], {
                        [hoverVisible]: hoverVisible,
                        [styles['visible']]: isMute,
                    })}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {isMute ? <MutedIcon /> : <VolumeIcon />}
                </div>
            </div>
            <Popup>
                <div
                    className={clsx(styles['taskbar'], {
                        [hoverVisible]: hoverVisible,
                    })}
                >
                    <HorizontalTaskbarIcon style={{ width: '24px', height: '24px' }} />
                </div>
            </Popup>
        </div>
    );
}

MediaControlsTop.propTypes = {
    isMute: PropTypes.bool,
    handleMute: PropTypes.func,
    hoverVisible: PropTypes.string,
};
export default MediaControlsTop;
