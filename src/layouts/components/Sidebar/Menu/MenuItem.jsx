import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Menu.module.scss';

function MenuItem({ title, to, outlineIcon, fillIcon, isActive = true }) {
    const _isActive = isActive;
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    clsx(styles['nav-link'], {
                        [styles['active']]: isActive && _isActive,
                    })
                }
            >
                {({ isActive }) => (
                    <>
                        {isActive && _isActive ? fillIcon : outlineIcon}
                        <span className={styles['menu-title']}>{title}</span>
                    </>
                )}
            </NavLink>
        </li>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    outlineIcon: PropTypes.node.isRequired,
    fillIcon: PropTypes.node,
};

export default MenuItem;
