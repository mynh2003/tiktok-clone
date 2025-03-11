import { data, useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';

import styles from './Profile.module.scss';
import Button from '~/components/Button';
import * as userInfoService from '~/services/userInfoService';

import SettingBoldIcon from '~/assets/images/setting-bold-icon.svg?react';
import ShareOutlineIcon from '~/assets/images/share-outline-icon.svg?react';
import VerifyBadge from '~/assets/images/verify-badge.svg?react';
import HorizontalMoreMenuIcon from '~/assets/images/horizontal-more-menu-icon.svg?react';
import LinkIcon from '~/assets/images/link-icon.svg?react';
import FollowingIcon from '~/assets/images/following-icon.svg?react';

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

    const authuser_uniqueid = 'dsereal';
    const { nickname } = useParams();

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
        const uniqueId = nickname.replace('@', '');
        const fetchApi = async () => {
            try {
                const result = await userInfoService.userInfo(uniqueId);
                setUserInfo(result.userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        setIsOwnProfile(uniqueId === authuser_uniqueid);
        fetchApi();
    }, [nickname]);

    const handleClick = () => {
        dispatch({ type: actionMap[state.state] });
    };

    return (
        <div className={styles['profile-wrapper']}>
            <div className={styles['profile-container']}>
                {userInfo && (
                    <div className={styles['profile-header']}>
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
                                        <Button
                                            {...(state.state === 'following' || state.state === 'friend'
                                                ? { secondary: true }
                                                : { primary: true })}
                                            medium={true}
                                            onClick={handleClick}
                                        >
                                            {(state.state === 'following' || state.state === 'friend') && (
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
