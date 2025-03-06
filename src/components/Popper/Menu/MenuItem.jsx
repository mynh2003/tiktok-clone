import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

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
import { useTheme } from '~/providers/ThemeProvider';
import { useMemo } from 'react';

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
    const { theme } = useTheme();
    const Icon = useMemo(() => {
        if ('code' in data) {
            return data.code === theme
                ? iconComponents[data.icon]
                : () => <div style={{ width: '20px', height: '20px' }} />;
        }
        return iconComponents[data.icon] || (() => <div style={{ width: '16px', height: '16px' }} />);
    }, [data, theme]);

    const classes = clsx(styles['item-container'], {
        [styles['sparate']]: data.sparate,
    });

    const itemClass = clsx(styles['item-content'], {
        [styles[className]]: className,
    });

    const content = (
        <>
            {Icon && <Icon className={styles['icon']} style={{ width: '16px', height: '16px' }} />}
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
