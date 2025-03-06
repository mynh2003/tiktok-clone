import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import config from '~/config';
import moreMenu from '~/data/moreMenu.json';

import LogoLightIcon from '~/assets/images/logo-light-icon.svg?react';
import LogoDarkIcon from '~/assets/images/logo-dark-icon.svg?react';
import MoreMenuIcon from '~/assets/images/more-menu-icon.svg?react';
import MessageIcon from '~/assets/images/messege-icon.svg?react';
import PlusIcon from '~/assets/images/plus-icon.svg?react';
import { useTheme } from '~/providers/ThemeProvider';

function Header() {
    const currentUse = true;
    const { theme } = useTheme();

    return (
        <header className={styles['wrapper']}>
            <div className={styles['inner']}>
                <div className={styles['left-container']}>
                    <Link to={config.routes.home} className={styles['logo-link']}>
                        {theme === 'dark' ? <LogoDarkIcon /> : <LogoLightIcon />}
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
                                    src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/1a2dda176747b41a91722aec42faa61f.jpeg?lk3s=a5d48078&nonce=79179&refresh_token=67ddd435229b2ba49bc36dee2523b4bc&x-expires=1736694000&x-signature=bA6w%2B3l6viMg9FxtiRuR8d5QZdU%3D&shp=a5d48078&shcp=81f88b70"
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
