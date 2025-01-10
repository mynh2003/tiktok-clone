import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

// Import các icon
import ToolsForCreatorsIcon from '~/assets/images/tools-for-creators-icon.svg?react';
import LanguageIcon from '~/assets/images/language-icon.svg?react';
import FeedbackAndHelpIcon from '~/assets/images/feedback-and-help-icon.svg?react';
import ThemeIcon from '~/assets/images/theme-icon.svg?react';
import ProfileIcon from '~/assets/images/profile-icon.svg?react';
import CoinTiktokIcon from '~/assets/images/coin-tiktok-icon.svg?react';
import SettingIcon from '~/assets/images/setting-icon.svg?react';
import LogOutIcon from '~/assets/images/log-out-icon.svg?react';
import CheckIcon from '~/assets/images/check-icon.svg?react';
import BackBtnIcon from '~/assets/images/back-btn-icon.svg?react';

// Hàm ánh xạ tên icon thành component
const iconComponents = {
    ToolsForCreatorsIcon,
    LanguageIcon,
    FeedbackAndHelpIcon,
    ThemeIcon,
    ProfileIcon,
    CoinTiktokIcon,
    SettingIcon,
    LogOutIcon,
    CheckIcon,
    BackBtnIcon,
};

function MenuItem({ data, className, onClick, onBack }) {
    // Khởi tạo icon mặc định
    let Icon = () => <div style={{ width: '16px', height: '16px' }}></div>;

    // Kiểm tra và gán icon dựa vào isCheck
    if ('isCheck' in data) {
        Icon = data.isCheck === true ? iconComponents[data.icon] : Icon;
    } else {
        Icon = iconComponents[data.icon];
    }

    const classes = clsx(styles['item-container'], {
        [styles['sparate']]: data.sparate,
    });

    const itemClass = clsx(styles['item-content'], {
        [styles[className]]: className,
    });

    const content = (
        <>
            {Icon && <Icon className={styles['icon']} style={data.isCheck ? { width: '16px', height: '16px' } : {}} />}
            <span>{data.title}</span>
        </>
    );

    return (
        <li className={classes} onClick={onBack || onClick}>
            {data.to ? (
                <Link to={data.to} className={itemClass}>
                    {content}
                </Link>
            ) : (
                <div className={itemClass}>{content}</div>
            )}
        </li>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onBack: PropTypes.func,
};

export default MenuItem;
