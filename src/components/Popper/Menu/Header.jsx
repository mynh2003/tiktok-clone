import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import BackIcon from '~/assets/images/back-btn-icon.svg?react';
import Button from '~/components/Button';

function Header({ title, onBack }) {
    return (
        <div className={styles['header']}>
            <Button className={styles['back-btn']} onClick={onBack}>
                <BackIcon className={styles['back-icon-btn']} />
            </Button>
            <p className={styles['header-title']}>{title}</p>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func,
};

export default Header;
