import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AccountItem.module.scss';
import VerifyBadge from '~/assets/images/verify-badge.svg?react';

function AccountItem({ data }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/@${data.nickname}`);
    };
    return (
        <li className={styles['wrapper']} onClick={handleRedirect}>
            <img className={styles['avatar']} src={data.avatar} alt={data.full_name} />
            <div className={styles['info']}>
                <h4 className={styles['user-name']}>
                    {data.nickname}
                    <span className={styles['verify-badge']}>{data.tick && <VerifyBadge />}</span>
                </h4>
                <p className={styles['name']}>{data.full_name}</p>
            </div>
        </li>
    );
}

AccountItem.prototype = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
