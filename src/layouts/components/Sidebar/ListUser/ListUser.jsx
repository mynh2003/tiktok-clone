import PropTypes from 'prop-types';
import styles from './ListUser.module.scss';

function ListUser({ children }) {
    return <ul className={styles['user-list']}>{children}</ul>;
}

ListUser.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ListUser;
