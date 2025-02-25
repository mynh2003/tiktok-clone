import HeadlessTippy from '@tippyjs/react/headless';
import PropType from 'prop-types';

import styles from './Popup.module.scss';

import ScrollFillIcon from '~/assets/images/scroll-fill-icon.svg?react';
import HeartBroken from '~/assets/images/heart-broken-icon.svg?react';
import FlagIcon from '~/assets/images/flag-icon.svg?react';
import { useAutoScroll } from '~/providers/AutoScrollProvider';

function Popup({ children }) {
    const { isAutoScroll, toggleSwitch } = useAutoScroll();

    const renderItem = (attrs) => (
        <ul className={styles['popup-container']} tabIndex="-1" {...attrs}>
            <li className={styles['list-item-wrapper']}>
                <div className={styles['icon-wrapper']}>
                    <ScrollFillIcon />
                </div>
                <span className={styles['item-text']}>Cuộn tự động</span>
                <div className={styles['switch-container']}>
                    <button className={styles['switch-button']} onClick={toggleSwitch}>
                        <div className={`${styles['switch-wrapper']} ${isAutoScroll ? styles['switch-on'] : ''}`}>
                            <span
                                className={`${styles['switch-icon']} ${isAutoScroll ? styles['switch-move'] : ''}`}
                            ></span>
                        </div>
                    </button>
                </div>
            </li>
            <li className={styles['list-item-wrapper']}>
                <div className={styles['icon-wrapper']}>
                    <HeartBroken />
                </div>
                <span className={styles['item-text']}>Không quan tâm</span>
            </li>
            <li className={styles['list-item-wrapper']}>
                <div className={styles['icon-wrapper']}>
                    <FlagIcon />
                </div>
                <span className={styles['item-text']}>Báo cáo</span>
            </li>
        </ul>
    );

    return (
        <HeadlessTippy render={renderItem} placement="right-end" interactive offset={[0, 25]} delay={[0, 200]}>
            {children}
        </HeadlessTippy>
    );
}
Popup.prototype = {
    children: PropType.node.isRequired,
};
export default Popup;
