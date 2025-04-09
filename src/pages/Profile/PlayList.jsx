import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Profile.module.scss';
import * as userPlayListService from '~/services/userPlayListService';
import ArrowLeftIcon from '~/assets/images/arrow-left-icon.svg?react';
import ArrowRightIcon from '~/assets/images/arrow-right-icon.svg?react';

function PlayList({ user, stateSelect, feedTabWrapperRef }) {
    const listRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [userPlayList, setUserPlayList] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchApi = async () => {
                try {
                    const resultPlayList = await userPlayListService.userPlayList(user.secUid, 20, 0);
                    setUserPlayList(resultPlayList);
                } catch (error) {
                    console.error('Error fetching:', error);
                }
            };
            setUserPlayList([]);
            fetchApi();
        }
    }, [user]);

    const checkScroll = () => {
        if (listRef.current) {
            setCanScrollLeft(listRef.current.scrollLeft > 0);
            setCanScrollRight(listRef.current.scrollLeft + listRef.current.clientWidth < listRef.current.scrollWidth);
        }
    };

    const scrollList = (direction) => {
        if (listRef.current) {
            const scrollAmount = listRef.current.offsetWidth + 27;
            listRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const addMarginBottom = () => {
        if (feedTabWrapperRef.current) {
            feedTabWrapperRef.current.style.marginBottom = '24px';
        }
    };
    return (
        <>
            {stateSelect === 'post' && userPlayList?.playList && (
                <div className={styles['playlist-container']}>
                    <p className={styles['playlist-title']}>Danh sách phát</p>
                    <div className={styles['list-container']}>
                        <div ref={listRef} onScroll={checkScroll} className={styles['list-inner-container']}>
                            {userPlayList.playList.map((data, index) => (
                                <a href="#" key={index}>
                                    <div className={styles['play-list-card-container']}>
                                        <div className={styles['play-list-card-cover']}>
                                            <img src={data.cover} alt="" />
                                        </div>
                                        <div className={styles['list-info-container']}>
                                            <p className={styles['list-name']}>{data.mixName}</p>
                                            <p className={styles['video-count']}>{data.videoCount} bài đăng</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        {canScrollLeft && (
                            <div className={styles['switch-left']} onClick={() => scrollList('left')}>
                                <ArrowLeftIcon />
                            </div>
                        )}
                        <div className={styles['style-shadow']}></div>
                        {canScrollRight && (
                            <div className={styles['switch-right']} onClick={() => scrollList('right')}>
                                <ArrowRightIcon />
                            </div>
                        )}
                    </div>
                    <p className={styles['playlist-title']}>Video</p>
                </div>
            )}
            {!userPlayList?.playList && addMarginBottom()}
        </>
    );
}

PlayList.propTypes = {
    user: PropTypes.object,
    stateSelect: PropTypes.string,
    feedTabWrapperRef: PropTypes.object,
};

export default PlayList;
