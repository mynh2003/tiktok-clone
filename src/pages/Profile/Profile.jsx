import { useParams } from 'react-router-dom';
import { useEffect, useReducer, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './Profile.module.scss';
import './Profile.css';
import Button from '~/components/Button';
import * as userInfoService from '~/services/userInfoService';
import Posts from './Posts';
import TooltipNotArrow from '~/components/TooltipNotArrow';

import SettingBoldIcon from '~/assets/images/setting-bold-icon.svg?react';
import ShareOutlineIcon from '~/assets/images/share-outline-icon.svg?react';
import VerifyBadge from '~/assets/images/verify-badge.svg?react';
import HorizontalMoreMenuIcon from '~/assets/images/horizontal-more-menu-icon.svg?react';
import LinkIcon from '~/assets/images/link-icon.svg?react';
import FollowingIcon from '~/assets/images/following-icon.svg?react';
import GirdIcon from '~/assets/images/grid-icon.svg?react';
import RepostIcon from '~/assets/images/repost-icon.svg?react';
import HeartPrivateIcon from '~/assets/images/heart-private-icon.svg?react';
import PlayList from './PlayList';

const initState = {
    state: 'unfollow',
};
const actionMap = {
    following: 'UNFOLLOW',
    follower: 'FRIEND',
    friend: 'FOLLOWER',
    unfollow: 'FOLLOWING',
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'FOLLOWING':
            return { state: 'following' };
        case 'FOLLOWER':
            return { state: 'follower' };
        case 'UNFOLLOW':
            return { state: 'unfollow' };
        case 'FRIEND':
            return { state: 'friend' };
        default:
            throw new Error('Invalid action.');
    }
};

function Profile() {
    const [state, dispatch] = useReducer(reducer, initState);
    const [userInfo, setUserInfo] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const authuser_uniqueid = 'dsereal';
    const { nickname } = useParams();

    //main
    const [stateControl, setSateControl] = useState('new');
    const [stateSelect, setSateSelect] = useState('post');
    const bottomLineRef = useRef();
    const tabsRef = useRef([]);
    const feedTabWrapperRef = useRef();

    const addTabRef = (el) => {
        if (el && !tabsRef.current.includes(el)) {
            tabsRef.current.push(el);
        }
    };
    const formatNumber = (num) => {
        if (num > 1000000) {
            return Math.floor(num / 100000) / 10 + 'M';
        } else if (num > 10000) {
            return Math.floor(num / 100) / 10 + 'K';
        } else return num.toString();
    };
    const formatLink = (link) => {
        if (!link.startsWith('http://') && !link.startsWith('https://')) {
            return `https://${link}`;
        }
        return link;
    };

    useEffect(() => {
        setIsLoading(true);
        const uniqueId = nickname.replace('@', '');
        const fetchApi = async () => {
            try {
                const result = await userInfoService.userInfo(uniqueId);
                setUserInfo(result.userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
            setIsLoading(false);
        };

        setIsOwnProfile(uniqueId === authuser_uniqueid);
        fetchApi();
    }, [nickname]);

    const handleClick = () => {
        dispatch({ type: actionMap[state.state] });
    };
    const handleSelect = ({ value, event }) => {
        setSateSelect(value);

        const targetElement = event.currentTarget;

        if (bottomLineRef.current) {
            bottomLineRef.current.style.transform = `translateX(${targetElement.offsetLeft}px)`;
            bottomLineRef.current.style.width = `${targetElement.offsetWidth}px`;
        }
    };
    const handleMouseEnter = (event) => {
        const targetElement = event.currentTarget;
        if (bottomLineRef.current) {
            bottomLineRef.current.style.transform = `translateX(${targetElement.offsetLeft}px)`;
            bottomLineRef.current.style.width = `${targetElement.offsetWidth}px`;
        }
    };
    const handleMouseLeave = () => {
        const indexMap = {
            repost: 1,
            liked: 2,
        };
        const index = indexMap[stateSelect] || 0;
        bottomLineRef.current.style.transform = `translateX(${tabsRef.current[index].offsetLeft}px)`;
        bottomLineRef.current.style.width = `${tabsRef.current[index].offsetWidth}px`;
    };
    return (
        <div className={styles['profile-container']}>
            <div className={styles['profile-wrapper']}>
                <div className={styles['profile-content']}>
                    <div className={styles['profile-header']}>
                        {isLoading ? (
                            <div className={styles['skeleton-profile']}>
                                <div className={styles['skeleton-avatar']}></div>
                                <div className={styles['skeleton-title-container']}>
                                    <div className={styles['skeleton-title']}></div>
                                    <div className={styles['skeleton-title']}></div>
                                </div>
                            </div>
                        ) : (
                            userInfo && (
                                <>
                                    <div className={styles['header-left']}>
                                        <img
                                            className={styles['user-avatar']}
                                            src={userInfo.user.avatarMedium}
                                            alt={userInfo.user.uniqueId}
                                        />
                                    </div>
                                    <div className={styles['header-right']}>
                                        <div className={styles['user-identifier-wrapper']}>
                                            <div className={styles['user-text-wrapper']}>
                                                <h1 className={styles['uniqueid']}>{userInfo.user.uniqueId}</h1>
                                                {userInfo.user.verified && <VerifyBadge width="20" height="20" />}
                                            </div>
                                            <h2 className={styles['username']}>{userInfo.user.nickname}</h2>
                                        </div>
                                        <div className={styles['button-pane']}>
                                            {isOwnProfile ? (
                                                <>
                                                    <Button primary={true} medium={true}>
                                                        Sửa hồ sơ
                                                    </Button>
                                                    <Button secondary={true} medium={true}>
                                                        Quảng bá bài đăng
                                                    </Button>
                                                    <Button
                                                        secondary={true}
                                                        medium={true}
                                                        iconOnly={true}
                                                        style={{ fontSize: '19px' }}
                                                    >
                                                        <SettingBoldIcon />
                                                    </Button>
                                                    <Button
                                                        secondary={true}
                                                        medium={true}
                                                        iconOnly={true}
                                                        style={{ fontSize: '19px' }}
                                                    >
                                                        <ShareOutlineIcon />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    {state.state == 'following' ? (
                                                        <TooltipNotArrow content="Bỏ follow" placement="bottom">
                                                            <Button
                                                                {...(state.state === 'following' ||
                                                                state.state === 'friend'
                                                                    ? { secondary: true }
                                                                    : { primary: true })}
                                                                medium={true}
                                                                onClick={handleClick}
                                                            >
                                                                {(state.state === 'following' ||
                                                                    state.state === 'friend') && (
                                                                    <FollowingIcon style={{ fontSize: '1.9rem' }} />
                                                                )}
                                                                <div>
                                                                    {state.state === 'following' ||
                                                                    state.state === 'friend'
                                                                        ? 'Đang Follow'
                                                                        : state.state === 'follower'
                                                                        ? 'Follow lại'
                                                                        : 'Follow'}
                                                                </div>
                                                            </Button>
                                                        </TooltipNotArrow>
                                                    ) : (
                                                        <Button
                                                            {...(state.state === 'following' || state.state === 'friend'
                                                                ? { secondary: true }
                                                                : { primary: true })}
                                                            medium={true}
                                                            onClick={handleClick}
                                                        >
                                                            {(state.state === 'following' ||
                                                                state.state === 'friend') && (
                                                                <FollowingIcon style={{ fontSize: '1.9rem' }} />
                                                            )}
                                                            <div>
                                                                {state.state === 'following' || state.state === 'friend'
                                                                    ? 'Đang Follow'
                                                                    : state.state === 'follower'
                                                                    ? 'Follow lại'
                                                                    : 'Follow'}
                                                            </div>
                                                        </Button>
                                                    )}

                                                    <Button secondary={true} medium={true}>
                                                        Tin nhắn
                                                    </Button>
                                                    <Button
                                                        secondary={true}
                                                        medium={true}
                                                        iconOnly={true}
                                                        style={{ fontSize: '19px' }}
                                                    >
                                                        <ShareOutlineIcon />
                                                    </Button>
                                                    <Button
                                                        secondary={true}
                                                        medium={true}
                                                        iconOnly={true}
                                                        style={{ fontSize: '19px' }}
                                                    >
                                                        <HorizontalMoreMenuIcon />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                        <div className={styles['header-text-container']}>
                                            <h3 className={styles['count-infos']}>
                                                <div className={styles['div-number']}>
                                                    <strong>{formatNumber(userInfo.stats.followingCount)}</strong>
                                                    <span>Đang Follow</span>
                                                </div>
                                                <div className={styles['div-number']}>
                                                    <strong>{formatNumber(userInfo.stats.followerCount)}</strong>
                                                    <span>Follower</span>
                                                </div>
                                                <div className={styles['div-number']}>
                                                    <strong>{formatNumber(userInfo.stats.heartCount)}</strong>
                                                    <span>Thích</span>
                                                </div>
                                            </h3>
                                            <h2 className={styles['user-bio']}>
                                                {userInfo?.user?.signature || 'Chưa có tiểu sử.'}
                                            </h2>
                                            {userInfo?.user?.bioLink?.link && (
                                                <div className={styles['bio-link']}>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={formatLink(userInfo.user.bioLink.link)}
                                                    >
                                                        <LinkIcon />
                                                        <span className={styles['span-link']}>
                                                            {userInfo.user.bioLink.link.replace(/^https?:\/\//, '')}
                                                        </span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                    <div className={styles['profile-main']}>
                        <div ref={feedTabWrapperRef} className={styles['feed-tab-wrapper']}>
                            <div className={styles['video-feed-tab']}>
                                <div
                                    ref={addTabRef}
                                    className={clsx(styles['tab-post'], {
                                        [styles['select']]: stateSelect == 'post',
                                    })}
                                    onMouseEnter={(event) => {
                                        handleMouseEnter(event);
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={(event) => {
                                        handleSelect({ value: 'post', event });
                                    }}
                                >
                                    <GirdIcon style={{ fontSize: '20px' }} />
                                    <span>Video</span>
                                </div>
                                <div
                                    ref={addTabRef}
                                    className={clsx(styles['tab-repost'], {
                                        [styles['select']]: stateSelect == 'repost',
                                    })}
                                    onMouseEnter={(event) => {
                                        handleMouseEnter(event);
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={(event) => {
                                        handleSelect({ value: 'repost', event });
                                    }}
                                >
                                    <RepostIcon style={{ fontSize: '20px' }} />
                                    <span>Bài đăng lại</span>
                                </div>
                                <div
                                    ref={addTabRef}
                                    className={clsx(styles['tab-liked'], {
                                        [styles['select']]: stateSelect == 'liked',
                                    })}
                                    onMouseEnter={(event) => {
                                        handleMouseEnter(event);
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={(event) => {
                                        handleSelect({ value: 'liked', event });
                                    }}
                                >
                                    <HeartPrivateIcon style={{ fontSize: '20px' }} />
                                    <span>Đã thích</span>
                                </div>
                                <div
                                    ref={bottomLineRef}
                                    className={styles['bottom-line']}
                                    style={{ transform: 'translateY(0px)', width: '137px' }}
                                ></div>
                            </div>
                            {stateSelect == 'post' && (
                                <div className={styles['control']}>
                                    <Button
                                        className={clsx(styles['control-item'], {
                                            [styles['active']]: stateControl == 'new',
                                        })}
                                        controlItem={true}
                                        mini={true}
                                        onClick={() => {
                                            setSateControl('new');
                                        }}
                                    >
                                        Mới nhất
                                    </Button>
                                    <Button
                                        className={clsx(styles['control-item'], {
                                            [styles['active']]: stateControl == 'trending',
                                        })}
                                        controlItem={true}
                                        mini={true}
                                        onClick={() => {
                                            setSateControl('trending');
                                        }}
                                    >
                                        Thịnh hành
                                    </Button>
                                    <Button
                                        className={clsx(styles['control-item'], {
                                            [styles['active']]: stateControl == 'old',
                                        })}
                                        controlItem={true}
                                        mini={true}
                                        onClick={() => {
                                            setSateControl('old');
                                        }}
                                    >
                                        Cũ nhất
                                    </Button>
                                </div>
                            )}
                        </div>
                        <PlayList data={userInfo} stateSelect={stateSelect} feedTabWrapperRef={feedTabWrapperRef} />
                        <Posts formatNumber={formatNumber} data={userInfo} stateSelect={stateSelect} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
