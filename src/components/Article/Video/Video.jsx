import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Video.module.scss';
import { useVolume } from '~/providers/VolumeProvider';
import { useAutoScroll } from '~/providers/AutoScrollProvider';

import AnimationVolumeIcon from '~/assets/images/animation-volume-icon.svg?react';
import AnimationMutedIcon from '~/assets/images/animation-muted-icon.svg?react';
import AnimationPlayIcon from '~/assets/images/animation-play-icon.svg?react';
import AnimationPausedIcon from '~/assets/images/animation-pause-icon.svg?react';
import MusicNoteIcon from '~/assets/images/music-note-icon.svg?react';
import CaptionIcon from '~/assets/images/caption-icon.svg?react';
import MiniPlayericon from '~/assets/images/mini-player-icon.svg?react';
import TooltipNotArrow from '~/components/TooltipNotArrow';
import MediaControlsTop from './MediaControlsTop';

function Video({ data, scrollToNext }) {
    const [isPlay, setIsPlay] = useState(false);
    const [showAnimation, setShowAnimation] = useState(null);
    const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);

    const videoRef = useRef(null);
    const progressBarScrubHeadRef = useRef(null);
    const progressBarElapsedRef = useRef(null);

    const { volume, isMute, toggleMute } = useVolume();
    const { isAutoScroll } = useAutoScroll();

    const observer = useRef(null);

    const formatTime = (timestamp) => {
        const now = new Date();
        const createdDate = new Date(timestamp * 1000);
        const diffMs = now - createdDate;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffWeek = Math.floor(diffDay / 7);

        if (now.toDateString() === createdDate.toDateString()) {
            return diffHour > 0 ? `${diffHour} giờ trước` : 'Vừa xong';
        }
        if (diffDay < 7) return `${diffDay} ngày trước`;
        if (diffWeek < 4) return `${diffWeek} tuần trước`;
        return now.getFullYear() === createdDate.getFullYear()
            ? `${createdDate.getMonth() + 1}-${createdDate.getDate()}`
            : `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}-${createdDate.getDate()}`;
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) videoElement.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (!videoRef.current) return;
        const videoElement = videoRef.current;

        const setProgressAnimation = () => {
            setIsMetadataLoaded(true);
        };

        videoElement.addEventListener('loadedmetadata', setProgressAnimation);

        observer.current = new IntersectionObserver(([entry]) => {
            const progressBarElapsedElement = progressBarElapsedRef.current;
            const progressBarScrubHeadElement = progressBarScrubHeadRef.current;
            if (!videoElement || !progressBarElapsedElement || !progressBarScrubHeadElement) return;

            const duration = videoElement.duration || 0;
            if (!isMetadataLoaded || isNaN(duration) || duration <= 0) return;

            if (entry.isIntersecting && isMetadataLoaded) {
                videoElement.play();
                setIsPlay(true);
                progressBarElapsedElement.style.animation = `${duration}s linear 0s infinite normal none running ${styles['animation-progress']}`;
                progressBarScrubHeadElement.style.animation = `${duration}s linear 0s infinite normal none running ${styles['animation-scrub-head']}`;
            } else {
                videoElement.pause();
                setIsPlay(false);
                videoElement.currentTime = 0;
                progressBarElapsedElement.style.animation = '';
                progressBarScrubHeadElement.style.animation = '';
            }
        });

        observer.current.observe(videoElement);

        return () => {
            if (videoElement) {
                observer.current.unobserve(videoElement);
                videoElement.removeEventListener('loadedmetadata', setProgressAnimation);
            }
        };
    }, [isMetadataLoaded]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.addEventListener('ended', () => {
            if (isAutoScroll) scrollToNext();
        });
    }, [isAutoScroll, scrollToNext]);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlay) {
                videoRef.current.pause();
                setShowAnimation('pause');
                PlayPauseProgress('paused');
            } else {
                videoRef.current.play();
                setShowAnimation('play');
                PlayPauseProgress('running');
            }
            setIsPlay(!isPlay);
        }
    };

    const PlayPauseProgress = (value) => {
        const progressBarElapsedElement = progressBarElapsedRef.current;
        const progressBarScrubHeadElement = progressBarScrubHeadRef.current;
        if (progressBarElapsedElement && progressBarScrubHeadElement) {
            progressBarElapsedElement.style.animationPlayState = value;
            progressBarScrubHeadElement.style.animationPlayState = value;
        }
    };

    const handleMute = () => {
        const videoElement = videoRef.current;
        if (!isMute) {
            if (videoElement) videoElement.volume = volume;
        }
        toggleMute();
        setShowAnimation(isMute ? 'unmute' : 'mute');
    };

    return (
        <section className={styles['section-media-card-container']}>
            {showAnimation != null && (
                <div
                    className={styles['animation-icon-wrapper']}
                    onAnimationEnd={() => {
                        setShowAnimation(null);
                    }}
                >
                    <div className={styles['base-animation-container']}>
                        <div className={styles['animation-icon-container']}>
                            {showAnimation === 'play' && <AnimationPlayIcon />}
                            {showAnimation === 'pause' && <AnimationPausedIcon />}
                            {showAnimation === 'mute' && <AnimationMutedIcon />}
                            {showAnimation === 'unmute' && <AnimationVolumeIcon />}
                        </div>
                    </div>
                </div>
            )}
            <div className={styles['video-play-container']}>
                <div className={styles['container']}>
                    <div className={styles['basic-play-wrapper']} onClick={() => togglePlayPause()}>
                        <div>
                            <video loop={!isAutoScroll} muted={isMute} ref={videoRef} className={styles['video']}>
                                <source src={data.play} />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={styles['media-card-top']}>
                    <MediaControlsTop handleMute={handleMute} hoverVisible={styles['hover-visible']} />
                </div>
                <div className={styles['media-bottom-top']}>
                    <div className={styles['anchor-tag-container']}>
                        <div className={styles['anchor-tag-wrapper']}>
                            <div className={styles['anchor-tag']}>
                                <a href="" target="_blank" className={styles['capcut-link']}>
                                    <img
                                        src="https://p9-sg.tiktokcdn.com/obj/tiktok-obj/capcut_logo_64px_bk.png?shp=b59d6b55&shcp=-"
                                        alt="CapCut · Thử mẫu này"
                                        className={styles['img-logo']}
                                    />
                                    <p className={styles['anchor-tag-name']}>CapCut · Thử mẫu này</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles['author-content-wrapper']}>
                        <div className={styles['author-container']}>
                            <Link className={styles['author-anchor']} to={`/@${data.author.unique_id}`}>
                                <h3 className={styles['author-title']}>{data.author.nickname}</h3>
                                <span> · </span>
                                {formatTime(data.create_time)}
                            </Link>
                        </div>
                    </div>
                    <div className={styles['description-content-wrapper']}>
                        <h1 className={styles['description']}>{data.title}</h1>
                    </div>
                    <div className={styles['inline-music-and-icon-container']}>
                        <div className={styles['music-info-container']}>
                            <Link to="/music" className={styles['music-link']}>
                                <MusicNoteIcon className={styles['music-note-icon']} />
                                <p className={styles['music-text']}>{data.music_info.title}</p>
                            </Link>
                        </div>
                        <div className={styles['player-controls-right']}>
                            <div className={clsx(styles['caption-icon-container'], styles['hover-visible'])}>
                                <TooltipNotArrow content="Phụ đề">
                                    <div className={styles['caption-icon']}>
                                        <CaptionIcon />
                                    </div>
                                </TooltipNotArrow>
                            </div>
                            <div className={clsx(styles['mini-player-icon-container'], styles['hover-visible'])}>
                                <TooltipNotArrow content="Trình phát nổi" className="pd8">
                                    <div className={styles['mini-player-icon']}>
                                        <MiniPlayericon />
                                    </div>
                                </TooltipNotArrow>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['video-progressbar-container']}>
                    <div className={styles['progressbar-container']}>
                        <div className={styles['progressbar-scrub-head']} ref={progressBarScrubHeadRef}></div>
                        <div className={styles['progressbar']}>
                            <div ref={progressBarElapsedRef} className={styles['progressbar-elapsed']}></div>
                            <div className={styles['progressbar-bounds']}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
    scrollToNext: PropTypes.func.isRequired,
};
export default Video;
