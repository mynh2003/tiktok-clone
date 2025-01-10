import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import config from '~/config';
import moreMenu from '~/data/moreMenu.json';

import Logo from '~/assets/images/logo.svg?react';
import MoreMenuIcon from '~/assets/images/more-menu-icon.svg?react';
import MessageIcon from '~/assets/images/messege-icon.svg?react';
import PlusIcon from '~/assets/images/plus-icon.svg?react';

function Header() {
    const currentUse = true;

    return (
        <header className={styles['wrapper']}>
            <div className={styles['inner']}>
                <div className={styles['left-container']}>
                    <Link to={config.routes.home} className={styles['logo-link']}>
                        <Logo />
                    </Link>
                </div>
                <div className={styles['center-container']}>
                    <Search />
                </div>
                <div className={styles['right-container']}>
                    {currentUse ? (
                        <>
                            <Link to={config.routes.upload}>
                                <div className={styles['upload']}>
                                    <PlusIcon className={styles['plus-icon']} />
                                    <span className={styles['upload-text']}>Tải lên</span>
                                </div>
                            </Link>
                            <Tippy content="Hộp thư">
                                <div className={styles['message-container']}>
                                    <MessageIcon />
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary className={styles['btn-login']}>
                                Đăng nhập
                            </Button>
                        </>
                    )}

                    <Menu items={currentUse ? moreMenu.userMenu : moreMenu.defaultMenu}>
                        {currentUse ? (
                            <div className={styles['user-avatar-container']}>
                                <img
                                    className={styles['user-avatar']}
                                    src="https://p9-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-avt-0068/92a19045081861f2c56e85d8cc64cdc4.jpeg?lk3s=a5d48078&nonce=40490&refresh_token=7af26bb667b9e943262983cc09ea10b8&x-expires=1736323200&x-signature=XygxEPfHdeIfHFq9wlTlp5we6%2Bo%3D&shp=a5d48078&shcp=81f88b70"
                                    alt=""
                                />
                            </div>
                        ) : (
                            <div className={styles['more-menu-icon']}>
                                <MoreMenuIcon className={styles['ellipsis-vertical']} />
                            </div>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
