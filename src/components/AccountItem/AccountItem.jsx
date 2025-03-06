import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AccountItem.module.scss';
import VerifyBadge from '~/assets/images/verify-badge.svg?react';

function AccountItem({ data }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/@${data.uniqueId}`);
    };
    return (
        <li className={styles['wrapper']} onClick={handleRedirect}>
            <img className={styles['avatar']} src={data.avatarThumb} alt={data.nickname} />
            <div className={styles['info']}>
                <h4 className={styles['user-name']}>
                    {data.uniqueId}
                    <span className={styles['verify-badge']}>{data.verified && <VerifyBadge />}</span>
                </h4>
                <p className={styles['name']}>{data.nickname}</p>
            </div>
        </li>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
