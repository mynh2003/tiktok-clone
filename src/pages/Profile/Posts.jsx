import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Profile.module.scss';
import Error from '~/components/Error';
import * as userPostsService from '~/services/userPostsService';
import PlayOutlineIcon from '~/assets/images/play-outline-icon.svg?react';
import GridErrorIcon from '~/assets/images/grid-error-icon.svg?react';
import LockIcon from '~/assets/images/lock-icon.svg?react';

function Posts({ formatNumber, user, stateSelect }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [userPosts, setUserPosts] = useState({ videos: [], cursor: 0, hasMore: true });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchVideos = async () => {
                try {
                    const resultPosts = await userPostsService.userPosts(user.uniqueId, user.id, 30, 0);

                    setUserPosts({
                        videos: resultPosts.data.videos,
                        cursor: resultPosts.data.cursor,
                        hasMore: resultPosts.data.hasMore,
                    });
                } catch (error) {
                    console.error('Error fetching videos:', error);
                }
            };

            setUserPosts({ videos: [], cursor: 0, hasMore: true });
            fetchVideos();
        }
    }, [user]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
                loadMoreVideos();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [userPosts, loading]);

    const loadMoreVideos = async () => {
        if (!user || !userPosts.hasMore || loading) return;

        setLoading(true);
        try {
            const resultPosts = await userPostsService.userPosts(user.uniqueId, user.id, 30, userPosts.cursor);

            setUserPosts((prev) => {
                if (prev.cursor !== userPosts.cursor) return prev;

                return {
                    videos: [...prev.videos, ...resultPosts.data.videos],
                    cursor: resultPosts.data.cursor,
                    hasMore: resultPosts.data.hasMore,
                };
            });
        } catch (error) {
            console.error('Error loading more videos:', error);
        }
        setLoading(false);
    };

    const loadPosts = () => {
        switch (stateSelect) {
            case 'post':
                return userPosts.videos.length > 0 ? Posts : ErrorNoPost;
            case 'repost':
                return ErrorNoPost;
            case 'liked':
                return ErrorPrivatePost;
            default:
                console.log('Invalid stateSelect');
                return null;
        }
    };

    const ErrorNoPost = (
        <Error icon={<GridErrorIcon />} title="Không có nội dung" desc="Người dùng này chưa đăng bất kỳ video nào." />
    );
    const ErrorPrivatePost = (
        <Error
            notMain={true}
            icon={<LockIcon />}
            title="Video người dùng này đã thích đang ở trạng thái riêng tư"
            desc={`Các video ${user.uniqueId} thích hiện đang ẩn`}
        />
    );
    const Posts = (
        <div className={styles['post-container']}>
            <div className={styles['post-grid']}>
                {userPosts.videos
                    .slice()
                    .sort((a, b) => (b.is_top || 0) - (a.is_top || 0))
                    .map((post, index) => (
                        <div key={index} className={styles['post-item-container']}>
                            <div
                                className={styles['post-item']}
                                onMouseEnter={() => {
                                    setHoveredId(index);
                                }}
                            >
                                <div style={{ paddingTop: '132.653%' }}>
                                    <div className={styles['item-wrapper']}>
                                        <a href="#" tabIndex={-1} className={styles['a-video-container']}>
                                            <canvas
                                                width="75.38461538461539"
                                                height="100"
                                                className={styles['canvas-placeholder']}
                                            ></canvas>
                                            <div className={styles['play-container']}>
                                                <div className={styles['item-content']}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                boxSizing: 'border-box',
                                                                display: 'block',
                                                                overflow: 'hidden',
                                                                width: 'initial',
                                                                height: 'initial',
                                                                background: 'none',
                                                                opacity: 1,
                                                                border: '0px',
                                                                margin: '0px',
                                                                padding: '0px',
                                                                position: 'absolute',
                                                                inset: '0px',
                                                            }}
                                                        >
                                                            <picture>
                                                                <source srcSet={post.cover} />
                                                                <img src={post.cover} alt="" />
                                                            </picture>
                                                        </span>
                                                    </div>
                                                    {hoveredId === index ? (
                                                        <div className={styles['basic-player-wrapper']}>
                                                            <video autoPlay muted preload="auto" loop>
                                                                <source src={post.play} />
                                                            </video>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                {post.is_top && (
                                                    <div className={styles['item-card-header']}>
                                                        <div className={styles['card-header-container']}>
                                                            <div className={styles['card-header-title']}>Đã ghim</div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className={styles['item-card-footer']}>
                                                    <PlayOutlineIcon
                                                        style={{
                                                            marginRight: '4px',
                                                            verticalAlign: 'middle',
                                                        }}
                                                    />
                                                    <strong className={styles['card-footer-title']}>
                                                        {formatNumber(post.play_count)}
                                                    </strong>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
    return loadPosts();
}

Posts.propTypes = {
    formatNumber: PropTypes.func,
    user: PropTypes.object,
    stateSelect: PropTypes.string,
};

export default Posts;
