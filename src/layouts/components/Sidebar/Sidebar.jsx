import config from '~/config';
import Menu, { MenuItem } from './Menu';
import ListUser, { UserItem } from './ListUser';
import styles from './Sidebar.module.scss';
import * as userFollowingListService from '~/services/userFollowingListService';

import HomeOutlineIcon from '~/assets/images/home-outline-icon.svg?react';
import HomeFillIcon from '~/assets/images/home-fill-icon.svg?react';
import CompassOutlineIcon from '~/assets/images/compass-outline-icon.svg?react';
import CompassFillIcon from '~/assets/images/compass-fill-icon.svg?react';
import PeopleArrowOutlineIcon from '~/assets/images/people-arrow-outline-icon.svg?react';
import PeopleArrowFillIcon from '~/assets/images/people-arrow-fill-icon.svg?react';
import TowPeopleOutlineIcon from '~/assets/images/tow-people-outline-icon.svg?react';
import TowPeopleFillIcon from '~/assets/images/tow-people-fill-icon.svg?react';
import LiveOutlineIcon from '~/assets/images/live-outline-icon.svg?react';
import LiveFillIcon from '~/assets/images/live-fill-icon.svg?react';
import MessageFlyIcon from '~/assets/images/message-fly-icon.svg?react';
import ImgAvatar from './Menu/ImgAvatar';
import { useEffect, useState } from 'react';

function Sidebar() {
    const secUid = 'MS4wLjABAAAAFu6NjHZ7-foxecDeFSkKViwErrl6-JneIuyZLbK6JPAf9N1wGrtb9GNo1TLBlEBK';
    const [isLoading, setIsLoading] = useState(false);
    const [userFollowingList, setUserFollowingList] = useState([]);
    const [minCursor, setMinCursor] = useState(0);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await userFollowingListService.getFollowingList({ secUid: secUid });
                setUserFollowingList(result?.userList || []);
                setMinCursor(result?.minCursor || 0);
            } catch (error) {
                console.error('Error fetching following list:', error);
                setUserFollowingList([]);
            }
        };

        fetchApi();
    }, [secUid]);

    const handleLoadMore = async () => {
        setIsLoading(true);
        try {
            const result = await userFollowingListService.getFollowingList({
                secUid: secUid,
                minCursor: minCursor,
            });

            if (minCursor > 0) {
                setUserFollowingList((prev) => [...prev, ...(result?.userList || [])]);
            } else {
                setUserFollowingList(result?.userList || []);
            }
            setMinCursor(0);
        } catch (error) {
            console.error('Error loading more data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles['side-nav-container']}>
            <div className={styles['scroll-container']}>
                <aside className={styles['wrapper']}>
                    <Menu>
                        <MenuItem
                            title="Dành cho bạn"
                            to={config.routes.home}
                            outlineIcon={<HomeOutlineIcon />}
                            fillIcon={<HomeFillIcon />}
                        />
                        <MenuItem
                            title="Khám phá"
                            to={config.routes.explore}
                            outlineIcon={<CompassOutlineIcon />}
                            fillIcon={<CompassFillIcon />}
                        />
                        <MenuItem
                            title="Đang Follow"
                            to={config.routes.following}
                            outlineIcon={<PeopleArrowOutlineIcon />}
                            fillIcon={<PeopleArrowFillIcon />}
                        />

                        <MenuItem
                            title="Bạn bè"
                            to={config.routes.friends}
                            outlineIcon={<TowPeopleOutlineIcon />}
                            fillIcon={<TowPeopleFillIcon />}
                        />
                        <MenuItem
                            title="LIVE"
                            to={config.routes.live}
                            outlineIcon={<LiveOutlineIcon />}
                            fillIcon={<LiveFillIcon />}
                        />
                        <MenuItem
                            title="Tin nhắn"
                            to={config.routes.messages}
                            outlineIcon={<MessageFlyIcon />}
                            isActive={false}
                        />
                        <MenuItem title="Hồ sơ" to="/@dsereal" outlineIcon={<ImgAvatar />} isActive={false} />
                    </Menu>
                    <div className={styles['following-container']}>
                        <h2 className={styles['title']}>Các tài khoản Đã follow</h2>
                        <ListUser>
                            {userFollowingList?.map((data) => (
                                <UserItem
                                    key={data.user.id}
                                    avatar={data.user.avatarThumb}
                                    nickname={data.user.nickname}
                                    unique_id={data.user.uniqueId}
                                    verified={data.user.verified}
                                />
                            ))}
                        </ListUser>
                        {!isLoading && (
                            <button onClick={handleLoadMore} className={styles['following-see-more']}>
                                {minCursor > 0 ? 'Xem thêm' : 'Ẩn bớt'}
                            </button>
                        )}
                        {isLoading && <p className={styles['text-loading']}>Đang tải...</p>}
                    </div>
                    <div className={styles['footer-container']}>
                        <div className={styles['footer-banner']}>
                            <a
                                href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
                                target="_blank"
                            >
                                <div>
                                    <img
                                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop-islands/021d2ed936cbb9f7033f.png"
                                        alt=""
                                        className={styles['footer-banner-image']}
                                    />
                                </div>
                                <h4 className={styles['footer-banner-content']}>
                                    Tạo hiệu ứng TikTok, nhận phần thưởng
                                </h4>
                            </a>
                        </div>
                        <h4 className={styles['link-list-header']}>Công ty</h4>
                        <h4 className={styles['link-list-header']}>Chương trình</h4>
                        <h4 className={styles['link-list-header']}>Điều khoản và chính sách</h4>
                        <span data-e2e="copyright" className={styles['span-copy-right']}>
                            © 2025 TikTok
                        </span>
                    </div>
                </aside>

                <div className={styles['scroll-bar']}>
                    <div className={styles['scroll-bar-thumb']}></div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
