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
    const userId = '7039144695448650754';
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [userFollowingList, setUserFollowingList] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await userFollowingListService.getFollowingList(userId);
                setUserFollowingList(result?.followings || []);
                setHasMore(result.hasMore);
            } catch (error) {
                console.error('Error fetching following list:', error);
                setUserFollowingList([]);
            }
        };

        fetchApi();
    }, [userId]);

    const handleLoadMore = async () => {
        if (!hasMore) {
            try {
                const result = await userFollowingListService.getFollowingList(userId);
                setUserFollowingList(result?.followings || []);
                setHasMore(result.hasMore);
            } catch (error) {
                console.error('Error loading more data:', error.message);
            } finally {
            }
        } else {
            setIsLoading(true);
            try {
                const result = await userFollowingListService.getFollowingList(userId, '50');
                setUserFollowingList(result?.followings || []);
                setHasMore(result.hasMore);
            } catch (error) {
                console.error('Error loading more data:', error.message);
            } finally {
                setIsLoading(false);
            }
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
                            {userFollowingList.map((user) => (
                                <UserItem
                                    key={user.id}
                                    avatar={user.avatar}
                                    nickname={user.nickname}
                                    unique_id={user.unique_id}
                                    verified={user.verified}
                                />
                            ))}
                        </ListUser>
                        {!isLoading && (
                            <button onClick={handleLoadMore} className={styles['following-see-more']}>
                                {hasMore ? 'Xem thêm' : 'Ẩn bớt'}
                            </button>
                        )}
                        {isLoading && <p>Đang tải...</p>}
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
                        {/* <div class="css-1lepjzi-DivLinkContainer e138hxzu0">
                            <a
                                href="https://www.tiktok.com/about?lang=vi-VN"
                                data-e2e="page-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Giới thiệu
                            </a>
                            <a
                                href="https://newsroom.tiktok.com?lang=vi-VN"
                                data-e2e="page-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Phòng tin tức
                            </a>
                            <a
                                href="https://www.tiktok.com/about/contact?lang=vi-VN"
                                data-e2e="page-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Liên hệ
                            </a>
                            <a
                                href="https://careers.tiktok.com?lang=vi-VN"
                                data-e2e="page-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Nghề nghiệp
                            </a>
                        </div> */}
                        <h4 className={styles['link-list-header']}>Chương trình</h4>
                        {/* <div class="css-1lepjzi-DivLinkContainer e138hxzu0">
                            <a
                                href="https://www.tiktok.com/forgood?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                TikTok for Good
                            </a>
                            <a
                                href="https://www.tiktok.com/business/?amp%3Battr_medium=tt_official_site_guidance&amp;amp%3Brefer=tiktok_web&amp;attr_source=tt_official_site&amp;lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Quảng cáo
                            </a>
                            <a
                                href="https://www.tiktok.com/live/creator-networks/vi-VN?enter_from=tiktok_official&amp;lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Đại lý TikTok LIVE
                            </a>
                            <a
                                href="https://developers.tiktok.com/?lang=vi-VN&amp;refer=tiktok_web"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Nhà phát triển
                            </a>
                            <a
                                href="https://www.tiktok.com/transparency?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Minh bạch
                            </a>
                            <a
                                href="https://www.tiktok.com/tiktok-rewards/vi-VN?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Phần thưởng trên TikTok
                            </a>
                            <a
                                href="https://www.tiktok.com/embed?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Nội dung được nhúng từ TikTok
                            </a>
                            <a
                                href="https://www.soundon.global/?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                SoundOn Music Distribution
                            </a>
                            <a
                                href="https://www.tiktok.com/live?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                TikTok Live
                            </a>
                            <a
                                href="https://shop-vn.tiktok.com/?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                TikTok Shop
                            </a>
                            <a
                                href="https://www.tiktok.com/download/vi-VN?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Tải TikTok về
                            </a>
                        </div> */}
                        <h4 className={styles['link-list-header']}>Điều khoản và chính sách</h4>
                        {/* <div class="css-1lepjzi-DivLinkContainer e138hxzu0">
                            <a
                                href="https://www.tiktok.com/forgood?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                TikTok for Good
                            </a>
                            <a
                                href="https://www.tiktok.com/business/?amp%3Battr_medium=tt_official_site_guidance&amp;amp%3Brefer=tiktok_web&amp;attr_source=tt_official_site&amp;lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Quảng cáo
                            </a>
                            <a
                                href="https://www.tiktok.com/live/creator-networks/vi-VN?enter_from=tiktok_official&amp;lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Đại lý TikTok LIVE
                            </a>
                            <a
                                href="https://developers.tiktok.com/?lang=vi-VN&amp;refer=tiktok_web"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Nhà phát triển
                            </a>
                            <a
                                href="https://www.tiktok.com/transparency?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Minh bạch
                            </a>
                            <a
                                href="https://www.tiktok.com/tiktok-rewards/vi-VN?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Phần thưởng trên TikTok
                            </a>
                            <a
                                href="https://www.tiktok.com/embed?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Nội dung được nhúng từ TikTok
                            </a>
                            <a
                                href="https://www.soundon.global/?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                SoundOn Music Distribution
                            </a>
                            <a
                                href="https://www.tiktok.com/live?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                TikTok Live
                            </a>
                            <a
                                href="https://shop-vn.tiktok.com/?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                TikTok Shop
                            </a>
                            <a
                                href="https://www.tiktok.com/download/vi-VN?lang=vi-VN"
                                data-e2e="program-link"
                                target="_blank"
                                class="css-10mwwjx-StyledNavLink e138hxzu1 link-a11y-focus"
                            >
                                Tải TikTok về
                            </a>
                        </div> */}
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
