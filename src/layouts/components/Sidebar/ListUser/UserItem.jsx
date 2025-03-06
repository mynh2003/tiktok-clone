import PropTypes from 'prop-types';
import styles from './ListUser.module.scss';
import { Link } from 'react-router-dom';
import VerifyBadge from '~/assets/images/verify-badge.svg?react';

function UserItem({ avatar, unique_id, nickname, verified = false }) {
    return (
        <li>
            <Link className={styles['user-item']} to={`/@${unique_id}`}>
                <img src={avatar} className={styles['user-avatar']} />
                <div className={styles['user-info']}>
                    <div className={styles['user-name-wrapper']}>
                        <span className={styles['user-name']}>{unique_id}</span>
                        <span className={styles['verify-badge']}>{verified && <VerifyBadge />}</span>
                    </div>
                    <p className={styles['user-full-name']}>{nickname}</p>
                </div>
            </Link>
        </li>
    );
}

UserItem.propTypes = {
    avatar: PropTypes.string,
    unique_id: PropTypes.string,
    nickname: PropTypes.string,
    verified: PropTypes.bool,
};

export default UserItem;
